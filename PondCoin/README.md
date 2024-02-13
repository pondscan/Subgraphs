# Pond0x PondCOin ($PNDC) Subgraph

Welcome to the GitHub repository for the PondCoin Subgraph. This subgraph is designed to index and query data from the Ethereum blockchain specifically for the PondCoin ($PNDC) ecosystem, providing valuable insights and data analytics accessible through [The Graph](https://thegraph.com) decentralized API.

## The Graph Protocol

[The Graph](https://thegraph.com) is a decentralized protocol for indexing and querying data from blockchains, starting with Ethereum. It allows developers to build reliable, high-performance dApps by efficiently querying blockchain data without relying on centralized servers. The Graph transforms the data from Ethereum into a format that's easy to query with a standard GraphQL API.

## About the PondCoin Subgraph

The PondCoin Subgraph is tailored to the PondCoin ($PNDC) ecosystem, offering a structured way to access detailed information about token transfers, minting/burning, locking, mining, claims, airdrops, approvals, and so much more user statistics within the network. It's designed to serve developers, analysts, and members of the Pond0x community by providing a comprehensive view of the on-chain activities on the Ethereum mainnet.

### Features

- **Token Transfer Tracking**: Monitor all PondCoin transfers, including sender, recipient, and amount, to understand token circulation, etc.
- **Approval Events**: Keep track of allowance approvals between owners and spenders for PondCoin, enabling a deeper understanding of token delegation.
- **User Statistics**: Aggregate data on user activities, including total transactions, balance changes, and tokens minted or burned, locks/unlocks, claims, rewards, etc. offering insights into user behavior within the Pond0x ecosystem.

## Demo

This demo illustrates the power of the Pond0x Ecosystem Subgraph in querying complex data sets that would be challenging to obtain through traditional block explorers like Etherscan.

![Pond0x Subgraph Demo](https://i.postimg.cc/PJ9wF1M8/Screenshot-2024-02-12-221945.png)

### Example Query

Below is a GraphQL query example that fetches user statistics from the subgraph:

``graphql
query MyQuery {
  userStats() {
    id: 0xd991bcc2956b4e98cfcc12f93e328aef08e1de74, 
    totalTransactions
    totalSent
    totalReceived
    totalMinted
    totalBurned
    totalBalance
  }
}
``

### Sample Result

This result showcases the power of the Pond0x Subgraph, highlighting the detailed statistics for a single user:

``json
...{
  "data": {
    "userStats": [
      {
        id: 0xd991bcc2956b4e98cfcc12f93e328aef08e1de74, 
        "totalTransactions": 68,
        "totalSent": "735076178509607187291645209787",
        "totalReceived": "890528960115049238392123817113",
        "totalMinted": "505154721757591480774820888576",
        "totalBurned": "0",
        "totalBalance": "155452781605442051100478607326"
      }
    ]
  }
}...
``

This snippet demonstrates the subgraph's capability to provide detailed insights into user behavior and token dynamics within the Pond0x ecosystem, offering a level of detail and accessibility that goes beyond what's possible with traditional block explorers.



## Quickstart Guide

We are doing this out of joy for the Pond0x project and openly invite other community memebers to learn and contribute. This subgraph is compeltely decentralized via The Graph Protocl.

Anybody can fetch data from its API, Curate or Index (Essenitally providing data liquidity akin to a Liqidity pool, earn fees, etc.), contribute to this repo or fork the subgraph and deploy it yourself.

1. **Generate Deployment Key**: Visit [The Graph](https://thegraph.com), connect your wallet, and create a deployment key.
2. **Set Up Environment**: Open your terminal in VS Code, and install the Graph CLI with either `npm install -g @graphprotocol/graph-cli` or `yarn global add @graphprotocol/graph-cli`.
3. **Initialize Subgraph**: Run `graph init --studio pondcoin` to start your subgraph project.
4. **Download Source Files**: Clone this repository or download the source files (`subgraph.yaml`, `src/pond-coin.ts`, `schema.graphql`) directly into your project directory.
5. **Organize Files**: Ensure the files are in the correct structure within your VS Code project directory, typically under `graph_protocol/pondcoin/`.

## Resources

- **Website**: [PondScan](https://www.pondscan.com)
- **Twitter/X**: [@pondscan](https://x.com/pondscan)
- **GitHub**: [pondscan/pondcoin_subgraph](https://github.com/pondscan/pondcoin_subgraph)
- **Live Data Demo**: See the subgraph in action at [PondScan User Stats](http://www.pondscan.com/userstats)

## Support

For support, questions, or contributions, please visit our GitHub repository or reach out to us via x.

**Disclaimer**: `PONDSCAN` Twitter/X handle, associated social media accounts, , website and github are not officially affiliated with Pond0x.
