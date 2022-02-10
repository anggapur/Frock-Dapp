import React from 'react';

import frockLogo from '../../../../assets/frock-logo-small.svg';
import usdcLogo from '../../../../assets/usdc-logo-small.svg';
import Card from '../../../../components/card/card';
import { renderNumberFormatter } from '../../../../utils';
import styles from './card-balance.module.scss';

export default function CardBalance({
  communitySale = false,
  usdcBalance,
  frockBalance,
}) {
  return (
    <Card className={styles.wrapper}>
      <h2>Balance:</h2>
      <div>
        <img src={usdcLogo} alt="USDC logo" />
        <p>{renderNumberFormatter(usdcBalance)} $USDC</p>
      </div>
      <div>
        <img src={frockLogo} alt="FROCK logo" />
        <p>
          {renderNumberFormatter(frockBalance)}{' '}
          {communitySale ? '$aFROCK' : '$bFROCK'}
        </p>
      </div>
    </Card>
  );
}
