# Pond0x: PondWater💧

## Introduction

The PondWater subgraph is an integral part of the decentralized web, leveraging The Graph Protocol to index and query data from the Ethereum blockchain. The Graph is a powerful tool that transforms blockchain data into easily accessible and interpretable information, addressing a common challenge in the decentralized space: the difficulty of retrieving detailed and structured data from blockchains using traditional APIs and block explorers. These conventional methods often fall short in providing real-time, indexed data that can be queried efficiently. The Graph fills this gap by allowing developers to create and publish open APIs, known as subgraphs, which applications can query using GraphQL.

PondWater subgraph specifically targets a unique dataset within the Ethereum ecosystem, focusing on a collection of interconnected contracts, including PondWater, PondClaims, PondCoin, MiningRigV3, Distillery, and ERC20Template. By indexing events emitted by these contracts, the subgraph makes a wide range of data readily available and searchable. This data encompasses various blockchain activities, from token transfers and approvals in PondCoin to ownership changes in PondClaims, and more specialized events like mining operations in MiningRigV3 and contract interactions within Distillery and PondWater.

The purpose of the PondWater subgraph is multifaceted: it not only enhances transparency and accessibility of blockchain data for developers and users alike but also supports real-time data analysis, dApp development, and broader research within the decentralized finance (DeFi) space. By providing a structured and queryable interface to the rich data landscape of these Ethereum contracts, the PondWater subgraph empowers developers to build more intuitive and responsive applications, fostering innovation and user engagement in the DeFi ecosystem.

## Subgraph Specification

- **Spec Version**: `1.0.0` - Indicates the version of the subgraph manifest specification.
- **Indexer Hints**:
  - `prune: auto` - Advises indexers on data pruning strategies.

## Schema Definition

Schema location: `./schema.graphql` - Path to the GraphQL schema file.

### Entities

#### Lock

- **Description**: Represents a lock event in the PondWater contract. Includes details such as the locker's address, the amount locked, the lock duration, and transaction metadata.
- **Fields**:
  - `id`: The unique identifier for the lock event.
  - `locker`: The address of the locker.
  - `PondWater_id`: The unique identifier for the PondWater event.
  - `locked`: The amount locked.
  - `startsAt`: The start time of the lock.
  - `lockedFor`: The duration of the lock.
  - `blockNumber`: The block number of the lock event.
  - `blockTimestamp`: The timestamp of the block.
  - `transactionHash`: The transaction hash of the lock event.

#### [Other Entities]

For each additional entity (`NewStream`, `OuncesObserved`, `Unlock`, `OwnershipTransferred`, `Approval`, `Transfer`, `ClaimBooster`, `Mine`, `ExecutionSuccess`, `SafeReceived`, `ExecutionFailure`, `RemovedOwner`, `AddedOwner`), provide a structured description similar to the Lock entity.

## Data Sources and Mappings

### PondWater Data Source

- **Network**: `mainnet`
- **Source Address**: `0xed96E69d54609D9f2cFf8AaCD66CCF83c8A1B470`
- **ABI**: PondWater, located at `./abis/PondWater.json`
- **Start Block**: `19073167`
- **Entities**: Lock, NewStream, OuncesObserved, Unlock
- **Event Handlers**: Describe the functionality and purpose of each event handler (`handleLock`, `handleNewStream`, `handleOuncesObserved`, `handleUnlock`).

### PondClaims Data Source

- **Network**: `mainnet`
- **Source Address**: `0xe7f01261EF9792095E22aBBF7F6f7B881D423C28`
- **ABI**: PondClaims, located at `./abis/PondClaims.json`
- **Start Block**: `17844056`
- **Entities**: `OwnershipTransferred`
- **Event Handlers**: 
  - `handleOwnershipTransferred`: Explain the event's purpose, what triggers it, and the action taken by the handler.

### PondCoin Data Source

- **Network**: `mainnet`
- **Source Address**: `0x423f4e6138E475D85CF7Ea071AC92097Ed631eea`
- **ABI**: PondCoin, located at `./abis/PondCoin.json`
- **Start Block**: `17844056`
- **Entities**: `Approval`, `Transfer`
- **Event Handlers**: 
  - `handleApproval`: Describe the approval event, its significance, and the handler's functionality.
  - `handleTransfer`: Detail the transfer event, what it signifies, and how the handler processes it.

### MiningRigV3 Data Source

- **Network**: `mainnet`
- **Source Address**: `0x2D50efbc3690b6D0Ea0B179C18F016ae9031c00a`
- **ABI**: MiningRigV3, located at `./abis/MiningRigV3.json`
- **Start Block**: `18928707`
- **Entities**: `ClaimBooster`, `Mine`
- **Event Handlers**: 
  - `handleClaimBooster`: Explain how this event is triggered, its role in the contract ecosystem, and the data it processes.
  - `handleMine`: Detail the mining event, its importance, and the actions taken by the handler.

### Distillery Data Source

- **Network**: `mainnet`
- **Source Address**: `0x17CC6042605381c158D2adab487434Bde79Aa61C`
- **ABI**: Distillery, located at `./abis/Distillery.json`
- **Start Block**: `17790975`
- **Entities**: `ExecutionSuccess`, `SafeReceived`, `ExecutionFailure`, `RemovedOwner`, `AddedOwner`
- **Event Handlers**: 
  - `handleExecutionSuccess`: Describe the event's purpose and handler action.
  - `handleSafeReceived`: Explain the significance of this event and how the handler processes it.
  - `handleExecutionFailure`, `handleRemovedOwner`, `handleAddedOwner`: For each, detail the event's role and the corresponding handler's functionality.

### ERC20Template Data Source

- **Network**: `mainnet`
- **Source Address**: N/A (Template for ERC20 tokens, addresses to be dynamically instantiated)
- **ABI**: ERC20, located at `./abis/ERC20.json`
- **Start Block**: `17790975`
- **Entities**: `Transfer`
- **Event Handlers**: 
  - `handleERC20TransferEvent`: Provide an overview of ERC20 transfer events and describe how this handler processes such events.

## Querying the Subgraph

After detailing the data sources and mappings, provide comprehensive examples and explanations for querying each entity within the subgraph. This section should enable users to understand how to retrieve and manipulate the data indexed by your subgraph effectively.

### OwnershipTransferred Query

```graphql
query {
  ownershipTransferreds {
    id
    previousOwner
    newOwner
    blockNumber
    blockTimestamp
    transactionHash
  }
}

### Approval Query

```graphql
query {
  approvals(where: {owner: "0x..."}, orderBy: value, orderDirection: desc) {
    id
    owner
    spender
    value
    blockNumber
    blockTimestamp
    transactionHash
  }
}


