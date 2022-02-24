import React from 'react';

import bfrockLogo from '../../../../assets/bfrock-logo-small.svg';
import afrockLogo from '../../../../assets/frock-dark-logo-small.svg';
import frockLogo from '../../../../assets/frock-logo-small.svg';
import { useStore } from '../../../../hooks/useStore';
import { renderNumberFormatter } from '../../../../utils';
import styles from './balance.module.scss';

export default function Balance() {
  const { aFrockBalance, bFrockBalance, frockBalance } = useStore();

  return (
    <div className={styles.wrapper}>
      <p>Your balance:</p>
      {renderNumberFormatter(aFrockBalance) !== '0' && (
        <div>
          <img src={afrockLogo} alt="aFROCK logo" />
          <span>{renderNumberFormatter(aFrockBalance)} $aFROCK</span>
        </div>
      )}
      {renderNumberFormatter(bFrockBalance) !== '0' && (
        <div>
          <img src={bfrockLogo} alt="bFROCK logo" />
          <span>{renderNumberFormatter(bFrockBalance)} $bFROCK</span>
        </div>
      )}
      <div>
        <img src={frockLogo} alt="FROCK logo" />
        <span>{renderNumberFormatter(frockBalance)} $FROCK</span>
      </div>
    </div>
  );
}
