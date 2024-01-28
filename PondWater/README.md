# Pond0x: PondWater💧

## Introduction

The PondWater subgraph, powered by The Graph Protocol, is a transformative tool that significantly enhances the capabilities of the decentralized web. By meticulously indexing data from key Pond0x contracts, it unlocks a new realm of possibilities for developers and users alike. The Graph Protocol acts as a bridge between complex blockchain data and the end user, providing a structured and efficient way to access information that is often opaque and challenging to retrieve through traditional means like block explorers.

This subgraph taps into the rich vein of data produced by Pond0x contracts including PondWater, PondClaims, PondCoin, MiningRigV3, GnosisProxySafe, the Uniswap Factories & Routers, etc. It indexes a wide array of events, from token transactions and contract interactions to more nuanced activities like mining operations and swap. What makes the PondWater subgraph particularly powerful is its ability to transform this raw data into a format that's easily queryable using GraphQL, a modern query language. This enables users to craft precise queries to extract the exact data they need, whether for displaying transaction histories, monitoring activity or interpretting real-time blockchain data into visuals for analysis.

Moreover, The Graph Protocol facilitates real-time data indexing, meaning the PondWater subgraph can offer up-to-the-minute data, a critical requirement for operating in the dynamic environments of crypto 2.0. This capability not only enhances user experience by providing timely and accurate information but also supports complex data analysis and decision-making processes that are essential in the fast-paced ecosystem.

In essence, the PondWater subgraph, by leveraging The Graph Protocol, becomes an indispensable tool, enabling more efficient data access, richer user interfaces, and ultimately, fostering innovation and growth in the crypto community.

## Subgraph Specification

- **Spec Version**: `1.0.0` - Specifies the subgraph's adherence to the first major release of the manifest standards.
- **Indexer Hints**:
  - `prune: auto` - Advises indexers on automatic data pruning for optimal indexer performance.

## Schema Definition

Schema location: `./schema.graphql` - Path to the GraphQL schema file.

## Entities

`Lock`
Represents lock events in the PondWater contract, detailing the locker's address, amount locked, duration, and related transaction metadata.

`NewStream`
Captures the creation of new streams, including the streamer's address, interval, and transaction details.

`OuncesObserved`
Logs observations of ounces, detailing the intervals observed, realized credits, debits, and associated transaction data.

`Unlock`
Records unlock events, specifying the locker's address, the related PondWater ID, and transaction information.

`OwnershipTransferred`
Tracks the transfer of ownership, noting previous and new owners, along with the transaction context.

`Approval`
Details approval events, including owner, spender, value approved, and transaction specifics.

`Transfer`
Logs token transfers, including sender, recipient, value, contract details, and transaction metadata.

`ClaimBooster`
Documents booster claims, specifying the claimer, booster ID, and related transaction information.

`Mine`
Captures mining events, detailing the miner's address, input and output amounts, booster ID, and transaction data.

`ExecutionSuccess`
Records successful executions, including the transaction hash and payment details.

`SafeRecieved`
Logs the receipt of safes, including sender, value, and the receiving address's details.

`ExecutionFailure`
Notes failed executions, detailing the transaction hash and payment information.

`RemovedOwner`
Tracks the removal of owners, specifying the owner's address.

`AddedOwner`
Documents the addition of new owners, including the owner's address.


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
  - `handleERC20TransferEvent`
    - The `ERC20Template` Data Source serves as a dynamic interface for interacting with ERC20 token contracts on the Ethereum `mainnet`. This template is uniquely designed to adaptively connect with a range of ERC20 tokens, offering a flexible solution for indexing transaction data across diverse tokens. Utilizing the `ERC20.json` ABI ensures seamless integration with the standardized functions and events of ERC20 tokens. Initiating from block `17790975`, the focus is on capturing `Transfer` events, crucial for tracking the flow of tokens between addresses. The `handleERC20TransferEvent` is instrumental in this context, meticulously extracting and cataloging essential details from each transaction, such as the sender, recipient, and amount transferred. This approach not only enriches the dataset with granular transaction information but also provides invaluable context for deeper analysis of token distribution patterns, liquidity flows, and holder behavior within the Ethereum ecosystem. The `ERC20Template` thereby offers a comprehensive lens through which to view and understand the intricacies of ERC20 token transactions, enhancing the analytical depth available to users and researchers delving into the DeFi space.

## Querying the Subgraph

After detailing the data sources and mappings, provide comprehensive examples and explanations for querying each entity within the subgraph. This section should enable users to understand how to retrieve and manipulate the data indexed by your subgraph effectively.

## GraphQL Query Examples

### Example 1: Fetching the Latest 10 Lock Events

```graphql
{
  locks(first: 10, orderBy: blockTimestamp, orderDirection: desc) {
    id
    locker
    locked
    startsAt
    lockedFor
    blockNumber
    blockTimestamp
  }
}
```

### Example 2: Aggregating Total Locked Value by Address

```graphql
{
  locks(orderBy: locker) {
    locker
    locked
  }
}
```

### Monitoring Significant Wallets: "The Distillery"

To ensure transparency and maintain a high level of accountability, it's crucial to monitor significant transactions involving prominent wallets within the ecosystem. "The Distillery" wallet is one such example, where observing large value transfers can provide insights into its operational dynamics and financial strategies.

#### Example Query: Tracking Large Transfers from "The Distillery"

This query filters for transfer events originating from "The Distillery" wallet, specifically targeting transactions that exceed a significant value threshold, indicating substantial financial activity.

```graphql
{
  transfers(where: {from: "0x17CC6042605381c158D2adab487434Bde79Aa61C", value_gt: "100000000000000000000"}, first: 10, orderBy: blockTimestamp, orderDirection: desc) {
    id
    from
    to
    value
    blockNumber
    blockTimestamp
    tokenName
    tokenSymbol
  }
}
```

The PondWater subgraph streamlines the identification of significant transactions by directly querying and processing blockchain data, bypassing the cumbersome tasks of manual data retrieval, aggregation, and analysis typically required with traditional methods.






