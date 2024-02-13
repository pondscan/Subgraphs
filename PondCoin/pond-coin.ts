import {
  Approval as ApprovalEvent,
  Transfer as TransferEvent
} from "../generated/PondCoin/PondCoin"
import { Approval, Transfer, UserStat } from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let transferId = event.transaction.hash.concatI32(event.logIndex.toI32());
  let entity = new Transfer(transferId)
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let zeroAddress = '0x0000000000000000000000000000000000000000'

  // Handle minting
  if (event.params.from.toHex() == zeroAddress) {
    let receiverId = event.params.to.toHex();
    let receiverStats = UserStat.load(receiverId)
    if (!receiverStats) {
      receiverStats = new UserStat(receiverId)
      initializeUserStats(receiverStats)
    }
    receiverStats.totalTransactions += 1
    receiverStats.totalReceived = receiverStats.totalReceived.plus(event.params.value)
    receiverStats.totalBalance = receiverStats.totalBalance.plus(event.params.value)
    receiverStats.totalMinted = receiverStats.totalMinted.plus(event.params.value) // Update totalMinted
    receiverStats.save()
  }
  // Handle burning
  else if (event.params.to.toHex() == zeroAddress) {
    let senderId = event.params.from.toHex();
    let senderStats = UserStat.load(senderId)
    if (!senderStats) {
      senderStats = new UserStat(senderId)
      initializeUserStats(senderStats)
    }
    senderStats.totalTransactions += 1
    senderStats.totalSent = senderStats.totalSent.plus(event.params.value)
    senderStats.totalBalance = senderStats.totalBalance.minus(event.params.value)
    senderStats.totalBurned = senderStats.totalBurned.plus(event.params.value) // Update totalBurned
    senderStats.save()
  }
  // Handle regular transfers
  else {
    // Update stats for sender
    let senderId = event.params.from.toHex();
    let senderStats = UserStat.load(senderId)
    if (!senderStats) {
      senderStats = new UserStat(senderId) // Use Ethereum address as id
      initializeUserStats(senderStats)
    }
    senderStats.totalTransactions += 1
    senderStats.totalSent = senderStats.totalSent.plus(event.params.value)
    senderStats.totalBalance = senderStats.totalBalance.minus(event.params.value)
    senderStats.save()

    // Update stats for receiver
    let receiverId = event.params.to.toHex();
    let receiverStats = UserStat.load(receiverId)
    if (!receiverStats) {
      receiverStats = new UserStat(receiverId) // Use Ethereum address as id
      initializeUserStats(receiverStats)
    }
    receiverStats.totalTransactions += 1
    receiverStats.totalReceived = receiverStats.totalReceived.plus(event.params.value)
    receiverStats.totalBalance = receiverStats.totalBalance.plus(event.params.value)
    receiverStats.save()
  }
}

function initializeUserStats(userStats: UserStat): void {
  userStats.totalTransactions = 0
  userStats.totalReceived = BigInt.fromI32(0)
  userStats.totalSent = BigInt.fromI32(0)
  userStats.totalBalance = BigInt.fromI32(0)
  userStats.totalMinted = BigInt.fromI32(0)
  userStats.totalBurned = BigInt.fromI32(0)
}
