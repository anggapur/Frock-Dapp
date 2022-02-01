import React from 'react';

import Card from '../../../../components/card/card';
import styles from './card-balance.module.scss';

export default function CardBalance() {
  return (
    <Card className={styles.wrapper}>
      <h2>Balance:</h2>
      <div>
        <USDCLogo />
        <p>00.00 $USDC</p>
      </div>
      <div>
        <FrockLogo />
        <p>00.00 $FROCK</p>
      </div>
    </Card>
  );
}

function USDCLogo() {
  return (
    <svg
      width="20"
      height="20"
      data-name="86977684-12db-4850-8f30-233a7c267d11"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 2000 2000"
    >
      <path
        d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z"
        fill="#2775ca"
      />
      <path
        d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z"
        fill="#fff"
      />
      <path
        d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zM1229.17 295.83c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z"
        fill="#fff"
      />
    </svg>
  );
}

function FrockLogo() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0153 20C4.48855 20 0 15.5114 0 10.0153C0 4.48855 4.48855 0 10.0153 0C15.542 0 20.0305 4.48855 20.0305 10.0153C20 15.5114 15.5115 20 10.0153 20Z"
        fill="url(#paint0_linear_718_4349)"
      />
      <path
        d="M13.8331 6.16799C12.001 4.33593 8.97809 4.33593 7.14603 6.16799C5.86359 7.45043 5.46664 9.31303 5.98573 10.9313L4.94756 11.2672C4.79489 11.3283 4.73382 11.481 4.79489 11.6031C4.91702 11.9084 5.31397 12.397 5.80252 12.9466C5.83305 12.9772 5.83305 12.9772 5.86359 13.0077C6.10786 13.252 6.47428 13.313 6.77962 13.1909C6.84069 13.1604 6.90176 13.2214 6.87122 13.2825C6.74908 13.5573 6.81015 13.9237 7.02389 14.168L7.05443 14.1985C7.08496 14.2291 7.1155 14.2596 7.14603 14.2901C7.66512 14.7481 8.12313 15.084 8.39794 15.2062C8.55061 15.2672 8.70328 15.1756 8.73382 15.0535L9.0697 14.0153C10.688 14.5344 12.5506 14.1375 13.8331 12.855C15.6956 11.023 15.6956 8.00005 13.8331 6.16799ZM7.63458 11.5115L7.66512 11.481C7.90939 11.2672 8.2758 11.2978 8.48954 11.5115C8.70328 11.7252 8.73382 12.0917 8.52008 12.3359L8.48954 12.3665C8.24527 12.6107 7.84832 12.6107 7.60405 12.3665C7.39031 12.1222 7.39031 11.7558 7.63458 11.5115ZM12.917 11.939C11.9705 12.8855 10.6575 13.1604 9.46664 12.7939L10.4437 9.89318C10.5048 9.67944 10.3216 9.49624 10.1079 9.5573L7.2071 10.5344C6.84069 9.34356 7.1155 8.03059 8.06206 7.08402C9.40557 5.74051 11.5735 5.74051 12.917 7.08402C14.2605 8.42753 14.2605 10.5955 12.917 11.939Z"
        fill="white"
      />
      <path
        d="M5.5881 15.2367H4.76367V14.4123C4.76367 13.9543 5.13008 13.5879 5.5881 13.5879C6.04612 13.5879 6.41253 13.9543 6.41253 14.4123C6.41253 14.8703 6.04612 15.2367 5.5881 15.2367Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_718_4349"
          x1="1.94183"
          y1="2.01969"
          x2="16.8556"
          y2="16.7894"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.3827" stopColor="#EF473A" />
          <stop offset="0.8792" stopColor="#CB2D3E" />
        </linearGradient>
      </defs>
    </svg>
  );
}