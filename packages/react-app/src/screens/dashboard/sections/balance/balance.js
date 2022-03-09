import React, { useEffect, useState } from 'react';

import bfrockLogo from '../../../../assets/bfrock-logo-small.svg';
import afrockLogo from '../../../../assets/frock-dark-logo-small.svg';
import frockLogo from '../../../../assets/frock-logo-small.svg';
import { FROCK_SUPPLY } from '../../../../constants';
import { useStore } from '../../../../hooks/useStore';
import { renderNumberFormatter } from '../../../../utils';
import styles from './balance.module.scss';
import Tooltip from "../../../../components/tooltip/tooltip";

export default function Balance({ totalExcludedDistri }) {
  const { aFrockBalance, bFrockBalance, frockBalance } = useStore();
  const [percentEligibleRewards, setPercentEligibleRewards] = useState(0);

  useEffect(() => {
    const percent = frockBalance / (FROCK_SUPPLY - totalExcludedDistri);
    setPercentEligibleRewards(percent * 100);
  }, [totalExcludedDistri, frockBalance]);

  return (
    <div className={styles.wrapper}>
      <p>Your balance{' '}
          <Tooltip>
              The % is based on the last reward distribution, minor changes will occur.
          </Tooltip>
      </p>
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
        <span>
          {renderNumberFormatter(frockBalance)} $FROCK (
          {renderNumberFormatter(percentEligibleRewards)} %)
        </span>
      </div>
    </div>
  );
}
