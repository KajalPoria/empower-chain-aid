import Ae from '@aeternity/aepp-sdk';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

async function deployContract() {
  try {
    console.log('🚀 Starting contract deployment...');
    
    const privateKey = process.env.PRIVATE_KEY;
    const publicKey = process.env.PUBLIC_KEY;
    
    if (!privateKey || !publicKey) {
      throw new Error('Please set PRIVATE_KEY and PUBLIC_KEY in .env file');
    }
    
    console.log('🔗 Connecting to Æternity testnet...');
    
    // Use the default export directly
    const client = await Ae({
      url: 'https://testnet.aeternity.io',
      keypair: {
        secretKey: privateKey,
        publicKey: publicKey
      },
      networkId: 'ae_uat'
    });
    
    console.log('✅ Connected to testnet');
    
    const contractSource = fs.readFileSync('./contracts/EmpowerChain.ae', 'utf8');
    console.log('⏳ Deploying contract...');
    
    const result = await client.contractDeploy(contractSource);
    
    console.log('🎉 Contract successfully deployed!');
    console.log('📝 Contract Address:', result.address);
    
    return result.address;
    
  } catch (error) {
    console.error('💥 Deployment failed:', error.message);
    return null;
  }
}

deployContract();