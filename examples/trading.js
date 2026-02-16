// Example: Email-based trading
const trading = require('@moltmail/skill-trading');

const WALLET = '0xYourWalletAddress';

async function emailTrading() {
  // Example incoming email
  const emails = [
    { subject: 'Buy order', body: 'Buy $500 SOL please' },
    { subject: 'Sell', body: 'Sell 50% of my ETH' },
    { subject: 'Swap', body: 'Swap 100 USDC for MMAIL' },
    { subject: 'Check', body: 'Check my portfolio' }
  ];
  
  for (const email of emails) {
    console.log(`\nProcessing: ${email.subject}`);
    
    // 1. Parse trading intent
    const intent = trading.parseIntent(email.body, email.subject);
    
    if (!intent) {
      console.log('No trading intent detected');
      continue;
    }
    
    console.log('Intent:', intent);
    
    // 2. Build command
    const command = trading.buildCommand(intent, WALLET);
    console.log('Command:', command);
    
    // 3. Check if confirmation needed
    const needsConfirm = trading.requiresConfirmation(intent.amount);
    
    if (needsConfirm) {
      console.log(`⚠️ Large trade detected ($${intent.amount}). Confirmation required.`);
      // Send confirmation email to user
    } else {
      // 4. Execute trade
      console.log('✅ Executing trade...');
      const result = await trading.execute(intent, WALLET);
      console.log('Result:', result);
    }
  }
}

emailTrading().catch(console.error);