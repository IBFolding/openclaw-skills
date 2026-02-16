// Example: Complete agent workflow
const moltmail = require('@moltmail/skill-core');
const trading = require('@moltmail/skill-trading');

const WALLET = '0xYourWalletAddress';

async function agentWorkflow() {
  // 1. Register agent (one time)
  await moltmail.registerAgent(WALLET, 'MyAgent');
  
  // 2. Stake MMAIL for email quota
  await moltmail.stake('1000', WALLET);
  
  // 3. Send an email
  await moltmail.sendEmail(
    WALLET,
    'recipient@example.com',
    'Hello from Agent',
    'This is an automated email from my AI agent!'
  );
  
  // 4. Claim staking rewards
  await moltmail.claimStakingRewards(WALLET);
  
  // 5. Check points
  const points = await moltmail.getPoints(WALLET);
  console.log(`Points: ${points.total}`);
}

agentWorkflow().catch(console.error);