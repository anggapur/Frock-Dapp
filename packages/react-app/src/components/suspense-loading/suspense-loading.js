import React from 'react';
import { Spinner } from 'react-bootstrap';

import styles from './suspense-loading.module.scss';

function SuspenseLoading() {
  return (
    <div className={styles.wrapper}>
      <Spinner animation="border" variant="danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default SuspenseLoading;
