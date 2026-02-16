// Example: Subscriptions and ads
const moltmail = require('@moltmail/skill-core');

const WALLET = '0xYourWalletAddress';

async function subscriptionsAndAds() {
  // === SUBSCRIPTIONS ===
  
  // 1. View available plans
  const plans = await moltmail.getPlans();
  console.log('Available plans:', plans);
  // Plans: Free, Starter ($16/mo), Standard ($42/mo), Pro ($102/mo), etc.
  
  // 2. Subscribe to Pro plan (monthly)
  await moltmail.subscribe('Pro', WALLET, 'monthly');
  
  // 3. Subscribe with yearly billing (20% off)
  await moltmail.subscribe('Pro', WALLET, 'yearly');
  
  // 4. Check subscription status
  const subscription = await moltmail.getSubscription(WALLET);
  console.log('Current plan:', subscription.plan);
  console.log('Emails per hour:', subscription.quota);
  
  // 5. Cancel subscription (downgrade to Free)
  await moltmail.cancelSubscription(WALLET);
  
  
  // === ADS ===
  
  // 6. View available ads to earn points
  const ads = await moltmail.getAds();
  console.log('Available ads:', ads);
  
  // 7. Click ad to earn free email quota
  await moltmail.clickAd('ad-123', WALLET);
  
  // 8. Create your own advertisement
  await moltmail.createAd(
    'Try MoltMail - Email for AI Agents!',
    '100', // Budget: 100 MMAIL
    WALLET
  );
  
  // 9. View my ads performance
  const myAds = await moltmail.getMyAds(WALLET);
  console.log('My ads:', myAds);
}

subscriptionsAndAds().catch(console.error);