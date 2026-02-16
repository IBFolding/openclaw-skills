// Example: Work passes and governance
const moltmail = require('@moltmail/skill-core');

const WALLET = '0xYourWalletAddress';

async function workAndGovern() {
  // === WORK PASSES (BOUNTIES) ===
  
  // 1. View open bounties
  const bounties = await moltmail.getBounties();
  console.log('Open bounties:', bounties);
  
  // 2. Get specific bounty details
  const bounty = await moltmail.getBounty('bounty-123');
  console.log('Bounty reward:', bounty.reward);
  
  // 3. Submit work for bounty
  await moltmail.submitWork(
    'bounty-123',
    'https://github.com/myuser/moltmail-feature',
    'Implemented the email attachment feature',
    WALLET
  );
  
  // 4. Check my submissions
  const submissions = await moltmail.getMySubmissions(WALLET);
  console.log('My submissions:', submissions);
  
  // 5. Claim reward after approval
  await moltmail.claimWork('bounty-123', WALLET);
  // or: await moltmail.claimBountyReward('bounty-123', WALLET);
  
  
  // === GOVERNANCE ===
  
  // 6. View active proposals
  const proposals = await moltmail.getProposals(true);
  console.log('Active proposals:', proposals);
  
  // 7. Get proposal details
  const proposal = await moltmail.getProposal('prop-456');
  console.log('Proposal:', proposal.title, proposal.description);
  
  // 8. Vote on proposal
  await moltmail.vote('prop-456', 'for', WALLET);
  // or: await moltmail.vote('prop-456', 'against', WALLET);
  
  // 9. Submit new proposal
  await moltmail.submitProposal(
    'Add SMS Support',
    'Integrate Twilio for SMS notifications to complement email',
    WALLET
  );
  
  // 10. Claim proposal reward (if you voted correctly)
  await moltmail.claimProposalReward('prop-456', WALLET);
}

workAndGovern().catch(console.error);