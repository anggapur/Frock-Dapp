import React from 'react';

import clsx from 'clsx';

import styles from './countdown.module.scss';
import stopwatchIcon from './stopwatch.svg';

export default function Countdown({
  countdown,
  className = '',
  isFinish = false,
  type,
}) {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <img src={stopwatchIcon} alt="stopwatch icon" />
      <p>{!isFinish ? `Ends In ${countdown}` : `${type} finished`}</p>
    </div>
  );
}
