# @moltmail/skill-trading

Execute crypto trades via email commands using Bankr integration.

## Features

- 📧 Parse trading intents from email text
- 💰 Support for Buy, Sell, Swap, Portfolio Check
- 🔒 Auto-execute small trades (<$100)
- ✅ Confirmation required for large trades (>$100)
- 📤 Confirmation emails with transaction details

## Install

```bash
npm install @moltmail/skill-trading
```

## Quick Start

```javascript
const trading = require('@moltmail/skill-trading');

// Parse email for trading intent
const intent = trading.parseIntent('Buy $500 SOL', 'Trade');
// Returns: { action: 'buy', amount: '500', token: 'SOL' }

// Execute trade
const result = await trading.execute(intent, '0xYourWallet');
// Returns: { success: true, txHash: '0x...', command: 'bankr swap 500 USDC SOL...' }
```

## Supported Commands

| Command | Example | Action |
|---------|---------|--------|
| **Buy** | "Buy $500 SOL" | Buy token with USD amount |
| **Buy** | "Buy 10 ETH" | Buy specific token amount |
| **Sell** | "Sell 5 SOL" | Sell specific amount |
| **Sell** | "Sell 50% of my ETH" | Sell percentage of holdings |
| **Swap** | "Swap 100 USDC for SOL" | Direct token swap |
| **Check** | "Check my portfolio" | View all holdings |

## API Reference

### parseIntent(body, subject)
Extracts trading intent from email text.

```javascript
const intent = trading.parseIntent('Buy $500 SOL', 'Trade');
// { action: 'buy', amount: '500', token: 'SOL', raw: '...' }
```

### buildCommand(intent, walletAddress)
Builds Bankr command string.

```javascript
const cmd = trading.buildCommand(intent, '0x...');
// 'bankr swap 500 USDC SOL --wallet 0x...'
```

### execute(intent, walletAddress)
Executes trade via Bankr CLI.

```javascript
const result = await trading.execute(intent, '0x...');
// { success: true, mock: true, txHash: '0x...', command: '...' }
```

### requiresConfirmation(amount)
Checks if trade requires confirmation (>$100).

```javascript
trading.requiresConfirmation(500); // true
trading.requiresConfirmation(50);  // false
```

### normalizeToken(token)
Normalizes token symbols (e.g., 'sol' → 'SOL').

## Security Features

- **Small trades** (<$100): Auto-execute immediately
- **Large trades** (>$100): Require explicit confirmation
- **Email verification**: Validates sender email matches wallet
- **Mock mode**: Test trades without real execution

## Supported Tokens

| Symbol | Name |
|--------|------|
| SOL | Solana |
| ETH | Ethereum |
| BTC | Bitcoin |
| USDC | USD Coin |
| USDT | Tether |
| MMAIL | MoltMail |

## Example Workflow

```javascript
const trading = require('@moltmail/skill-trading');

// 1. Receive email webhook
const email = {
  from: 'user@example.com',
  subject: 'Trade order',
  body: 'Buy $500 SOL please'
};

// 2. Parse intent
const intent = trading.parseIntent(email.body, email.subject);
// { action: 'buy', amount: '500', token: 'SOL' }

// 3. Check if confirmation needed
if (trading.requiresConfirmation(intent.amount)) {
  // Send confirmation request
  console.log('Please confirm: Buy $500 SOL');
} else {
  // Execute immediately
  const result = await trading.execute(intent, walletAddress);
  console.log('Trade executed:', result.txHash);
}
```

## Requirements

- Node.js 18+
- Bankr CLI (for production execution)

## Links

- [MoltMail Platform](https://moltmail.com)
- [GitHub Repo](https://github.com/IBFolding/openclaw-skills)