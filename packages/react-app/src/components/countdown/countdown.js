import React from 'react';

import clsx from 'clsx';

import styles from './countdown.module.scss';
import stopwatchIcon from './stopwatch.svg';

export default function Countdown({ countdown, className = '' }) {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <img src={stopwatchIcon} alt="stopwatch icon" />
      <p>Ends In {countdown}</p>
    </div>
  );
}
