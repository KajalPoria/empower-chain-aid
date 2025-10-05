# EmpowerChain Deployment Guide

## Overview
This guide will walk you through deploying EmpowerChain, a decentralized micro-grant platform for specially-abled students on the Aeternity blockchain.

## Prerequisites

1. **Aeternity Wallet**
   - Install [Superhero Wallet](https://wallet.superhero.com/) browser extension
   - Create a wallet and switch to Testnet
   - Get testnet AE from [Aeternity Faucet](https://faucet.aepps.com/)

2. **Development Tools**
   - Node.js (v16 or higher)
   - npm or yarn
   - Git

## Step 1: Smart Contract Deployment

### Install aeproject CLI
```bash
npm install -g @aeternity/aeproject
```

### Initialize Contract Project
```bash
mkdir empowerchain-contract
cd empowerchain-contract
aeproject init
```

### Copy Smart Contract
Copy the `src/contracts/EmpowerChain.aes` file to your contract project's `contracts` folder.

### Compile the Contract
```bash
aeproject compile
```

### Deploy to Testnet
```bash
aeproject deploy
```

**Important:** Save the contract address from the deployment output. You'll need this for the frontend.

Example output:
```
Contract deployed at: ct_2AfD6...
```

## Step 2: Frontend Configuration

### Install Dependencies
```bash
npm install
```

### Configure Contract Address
Create a `.env` file in the project root (note: this is for local development reference only):

```env
# Contract Address (update with your deployed contract)
CONTRACT_ADDRESS=ct_YOUR_CONTRACT_ADDRESS_HERE

# Network Configuration
NETWORK=testnet
```

### Update Integration Code
In `src/pages/Index.tsx`, update the contract initialization (when you integrate real blockchain calls):

```typescript
import { AeSdk, Node, MemoryAccount } from '@aeternity/aepp-sdk';

const CONTRACT_ADDRESS = 'ct_YOUR_CONTRACT_ADDRESS_HERE';
const NODE_URL = 'https://testnet.aeternity.io';
```

## Step 3: Wallet Integration

### Install Superhero Wallet
Users need to install the Superhero Wallet browser extension and switch to testnet.

### Connection Flow
The app will:
1. Detect Superhero Wallet
2. Request connection permission
3. Get user's address
4. Enable donations and project creation

## Step 4: Testing the Platform

### 1. Connect Wallet
- Click "Connect Wallet" in the header
- Approve the connection in Superhero Wallet
- Verify your address appears in the header

### 2. Create a Project
- Click "Submit Project"
- Fill in all required fields:
  - Student Name
  - Project Title
  - Description
  - Funding Goal (in AE)
  - Category
  - Milestones with amounts
- Submit and confirm transaction in wallet

### 3. Make a Donation
- Browse active projects
- Click "Donate Now"
- Enter donation amount and optional message
- Confirm transaction in wallet
- Verify blockchain transaction

### 4. Track Milestones
- View project details
- Community can vote on milestone completion
- Funds released when milestones are approved

## Step 5: Production Deployment

### Deploy Frontend
You can deploy the frontend to various platforms:

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

#### GitHub Pages
```bash
npm run build
# Deploy the dist/ folder
```

### Update for Mainnet

When ready for production:

1. Deploy contract to Aeternity Mainnet
2. Update contract address in configuration
3. Change network from testnet to mainnet
4. Ensure all users have mainnet AE

## Smart Contract Functions

### Student Functions
- `create_project()` - Submit new project
- `complete_milestone()` - Mark milestone as complete

### Donor Functions
- `donate()` - Send AE to a project
- `vote_milestone()` - Vote on milestone completion

### Query Functions
- `get_project()` - Get project details
- `get_all_projects()` - List all projects
- `get_project_donations()` - View donations for a project
- `get_stats()` - Platform-wide statistics

## Frontend Integration Guide

### Complete Wallet Integration

```typescript
import { AeSdk, Node, BrowserWindowMessageConnection } from '@aeternity/aepp-sdk';

// Initialize connection to wallet
const scanForWallets = async () => {
  return new Promise((resolve) => {
    const handleWallets = ({ wallets, newWallet }) => {
      newWallet = newWallet || Object.values(wallets)[0];
      resolve(newWallet);
    };
    
    const scannerConnection = new BrowserWindowMessageConnection();
    scannerConnection.connect((data) => {
      if (data.method === 'connection.announcePresence') {
        handleWallets(data);
      }
    });
  });
};

// Connect to wallet
const connectWallet = async () => {
  const wallet = await scanForWallets();
  const aeSdk = new AeSdk({
    nodes: [{ name: 'testnet', instance: new Node('https://testnet.aeternity.io') }],
  });
  
  await aeSdk.connectToWallet(wallet.connection);
  const address = await aeSdk.address();
  return { aeSdk, address };
};
```

### Call Contract Functions

```typescript
// Donate to project
const donate = async (aeSdk, projectId, amount, message) => {
  const contract = await aeSdk.initializeContract({
    address: CONTRACT_ADDRESS,
    aci: contractACI,
  });
  
  const result = await contract.donate(projectId, message, {
    amount: amount * 1e18, // Convert AE to aettos
  });
  
  return result;
};

// Create project
const createProject = async (aeSdk, projectData) => {
  const contract = await aeSdk.initializeContract({
    address: CONTRACT_ADDRESS,
    aci: contractACI,
  });
  
  const result = await contract.create_project(
    projectData.studentName,
    projectData.projectTitle,
    projectData.description,
    projectData.fundingGoal * 1e18,
    projectData.category,
    projectData.milestones.map(m => m.description),
    projectData.milestones.map(m => m.amount * 1e18)
  );
  
  return result;
};
```

## Security Considerations

1. **Smart Contract Auditing**
   - Audit contract before mainnet deployment
   - Test thoroughly on testnet
   - Have multiple reviewers check the code

2. **Frontend Security**
   - Validate all user inputs
   - Never store private keys
   - Use HTTPS for production
   - Implement rate limiting

3. **Platform Fees**
   - Default 2% platform fee for maintenance
   - Transparent and disclosed to users
   - Adjustable by contract owner if needed

## Monitoring and Maintenance

### Track Platform Health
- Monitor contract balance
- Track number of active projects
- Analyze donation patterns
- Review milestone completion rates

### User Support
- Provide clear documentation
- Help users with wallet setup
- Explain blockchain concepts
- Assist with transactions

## Troubleshooting

### Common Issues

**Wallet Not Connecting**
- Ensure Superhero Wallet is installed
- Check you're on the correct network (testnet/mainnet)
- Refresh the page and try again

**Transaction Failed**
- Check you have sufficient AE for gas
- Verify contract address is correct
- Ensure all parameters are valid

**Contract Call Errors**
- Validate input data types
- Check project exists and is active
- Ensure you have permission for the action

## Resources

- [Aeternity Documentation](https://docs.aeternity.com/)
- [Sophia Language Guide](https://docs.aeternity.com/sophia/)
- [AEpp SDK Documentation](https://docs.aeternity.com/aepp-sdk-js/)
- [Superhero Wallet](https://wallet.superhero.com/)
- [Aeternity Forum](https://forum.aeternity.com/)

## Support

For issues and questions:
- GitHub Issues: [Your Repository]
- Community Forum: [Aeternity Forum]
- Email: support@empowerchain.example

---

**Built with ❤️ for specially-abled students worldwide**
