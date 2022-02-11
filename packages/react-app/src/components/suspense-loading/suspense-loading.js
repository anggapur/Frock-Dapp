import React from 'react';

import Loading from '../loading/loading';
import styles from './suspense-loading.module.scss';

function SuspenseLoading() {
  return (
    <div className={styles.wrapper}>
      <Loading variant="primary" />
    </div>
  );
}

export default SuspenseLoading;
