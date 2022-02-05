export const timePad = params => String(params).padStart(2, '0');

export const converSecondsToHours = d => {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);

  const hDisplay = h > 0 ? h + (h === 1 ? ' hour ' : ' hours ') : '0 hours ';
  const mDisplay = m > 0 ? `${m} min` : '0 min';
  return hDisplay + mDisplay;
};

export const handleShortenAddress = address => {
  let result = '';
  for (let i = 0; i < address.length; i++) {
    if (i < 5) {
      result += address[i];
    }
    if (i === address.length - 9) {
      result += '...';
    }
    if (i > address.length - 8) {
      result += address[i];
    }
  }
  return result;
};
