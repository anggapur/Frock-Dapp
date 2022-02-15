export const handleCommunityDepositErr = err => {
  let errorMessage = 'There is something wrong. Please try again!';
  const isExceeds = err.includes('transfer amount exceeds balance');
  const isNotStarted = err.includes('not started yet');
  const isNotWhitelist = err.includes('msg.sender is not whitelisted');
  const isOverTotalRaise = err.includes('over total raise');
  const isBelow = err.includes('below minimum invest');
  const isEnded = err.includes('sales ended');
  const isAboveCap = err.includes('above cap');

  if (isExceeds) {
    errorMessage = 'Transfer amount exceeds balance';
  }

  if (isNotStarted) {
    errorMessage = 'Community Sale not started yet';
  }

  if (isNotWhitelist) {
    errorMessage = 'Your wallet address is not in the whitelist';
  }

  if (isOverTotalRaise) {
    errorMessage = 'The value is over total raised';
  }

  if (isBelow) {
    errorMessage = 'The value is below minimum invest';
  }

  if (isEnded) {
    errorMessage = 'Community Sale has ended';
  }

  if (isAboveCap) {
    errorMessage = 'The value is above cap';
  }

  return errorMessage;
};

export const handleCommunityRedeemErr = err => {
  let errorMessage = 'There is something wrong. Please try again!';
  const isExceeds = err.includes('transfer amount exceeds balance');
  const isNotEnabled = err.includes('redeem not enabled');
  const isNotRedeemable = err.includes('not redeemable yet');
  const isNoAmount = err.includes('no amount issued');
  const isClaimed = err.includes('already claimed');
  const isFailed = err.includes('transfer failed');

  if (isExceeds) {
    errorMessage = 'Transfer amount exceeds balance';
  }

  if (isNotEnabled) {
    errorMessage = 'Community Sale redeem not enabled yet';
  }

  if (isNotRedeemable) {
    errorMessage = 'Your token is not redeemable yet';
  }

  if (isNoAmount) {
    errorMessage = 'There is no amount issued';
  }

  if (isClaimed) {
    errorMessage = 'Your token has already claimed';
  }

  if (isFailed) {
    errorMessage = 'Transfer is failed, please try again!';
  }

  return errorMessage;
};

export const handleFairDepositErr = err => {
  let errorMessage = 'There is something wrong. Please try again!';
  const isExceeds = err.includes('transfer amount exceeds balance');
  const isNotEnabled = err.includes('Sale is not enabled yet');
  const isNotStarted = err.includes('Sale has not started yet');
  const isAmountTooSmall = err.includes('Invest amount too small');
  const isBelow = err.includes('below minimum invest');
  const isMaximum = err.includes('Maximum Investments reached');
  const isEnded = err.includes('Sale period has ended');
  const isMaxIndividual = err.includes('Max individual investment reached');
  const isFailed = err.includes('transfer failed');

  if (isExceeds) {
    errorMessage = 'Transfer amount exceeds balance';
  }

  if (isFailed) {
    errorMessage = 'Transfer is Failed, please try again!';
  }

  if (isNotEnabled) {
    errorMessage = 'Public Sale has not been enabled yet';
  }

  if (isNotStarted) {
    errorMessage = 'Public Sale not started yet';
  }

  if (isAmountTooSmall) {
    errorMessage = 'Invest amount is too small';
  }

  if (isMaximum) {
    errorMessage = 'Maximum investment value reached';
  }

  if (isBelow) {
    errorMessage = 'The value is below minimum invest';
  }

  if (isEnded) {
    errorMessage = 'Public Sale has ended';
  }

  if (isMaxIndividual) {
    errorMessage = 'Maximum investment per person reached';
  }

  return errorMessage;
};

export const handleFairClaimErr = err => {
  let errorMessage = 'There is something wrong. Please try again!';
  const isClaimed = err.includes('tokens already claimed');
  const isNotEnabled = err.includes('claim not enabled');
  const isNotStarted = err.includes('Time to claim has not arrived');
  const isNoInvestment = err.includes('No investment made');
  const isNoAmount = err.includes('no amount issued');

  if (isClaimed) {
    errorMessage = 'Token has already been claimed';
  }

  if (isNotEnabled) {
    errorMessage = 'Claim has not been enabled yet';
  }

  if (isNotStarted) {
    errorMessage = 'Time to claim has not yet started';
  }

  if (isNoInvestment) {
    errorMessage = 'You have no investment yet';
  }

  if (isNoAmount) {
    errorMessage = 'No amount issued';
  }

  return errorMessage;
};

export const handleFairRedeemErr = err => {
  let errorMessage = 'There is something wrong. Please try again!';
  const isRedeemed = err.includes('already redeemed');
  const isNotEnabled = err.includes('redeem not enabled');
  const isNotStarted = err.includes('not redeemable yet');
  const isNoInvestment = err.includes('No investment made');
  const isNoAmount = err.includes('no amount issued');
  const isNoProtocol = err.includes('Launth token not setted');

  if (isRedeemed) {
    errorMessage = 'Your token has already been redeemed';
  }

  if (isNotEnabled) {
    errorMessage = 'Redeem has not been enabled yet';
  }

  if (isNotStarted) {
    errorMessage = 'Time to redeem has not yet started';
  }

  if (isNoInvestment) {
    errorMessage = 'You have no investment yet';
  }

  if (isNoAmount) {
    errorMessage = 'No amount issued';
  }

  if (isNoProtocol) {
    errorMessage = 'Launch Token has not been setted yet';
  }

  return errorMessage;
};
