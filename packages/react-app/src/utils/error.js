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
