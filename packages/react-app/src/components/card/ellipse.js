import React from 'react';

import styles from './ellipse.module.scss';

function Ellipse({ position }) {
  if (position === 'top-left') {
    return (
      <svg
        width="112"
        height="100"
        viewBox="0 0 112 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.topLeft}
      >
        <path
          opacity="0.05"
          d="M105.847 22.5C105.847 62.309 73.8631 94.5 34.5076 94.5C-4.8479 94.5 -36.832 62.309 -36.832 22.5C-36.832 -17.309 -4.8479 -49.5 34.5076 -49.5C73.8631 -49.5 105.847 -17.309 105.847 22.5Z"
          stroke="#FF5E49"
          strokeWidth="11"
        />
      </svg>
    );
  }
  if (position === 'top-right') {
    return (
      <svg
        width="61"
        height="68"
        viewBox="0 0 61 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.topRight}
      >
        <circle
          opacity="0.05"
          cx="56.5"
          cy="11.5"
          r="51"
          stroke="#FF5E49"
          strokeWidth="11"
        />
      </svg>
    );
  }

  return <></>;
}

export default Ellipse;
