import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import { useTheme } from '../../hooks/useTheme';
import styles from './tooltip.module.scss';

const popover = ({ body, anchorLink = '', anchorText = '' }) => (
  <Popover>
    <Popover.Body className={styles.wrapper}>
      <p className={styles.p}>{body}</p>
      {anchorText !== '' ? (
        <a
          href={anchorLink}
          dangerouslySetInnerHTML={{ __html: anchorText }}
          className={styles.a}
        />
      ) : (
        <></>
      )}
    </Popover.Body>
  </Popover>
);

export default function Tooltip({
  children,
  anchorLink = '',
  anchorText = '',
}) {
  const { isDark } = useTheme();

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={popover({ body: children, anchorLink, anchorText })}
    >
      <svg
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <g clipPath="url(#clip0_549_2711)">
          <path
            d="M7.3513 14C11.106 14 14.1499 10.866 14.1499 7C14.1499 3.13401 11.106 0 7.3513 0C3.59655 0 0.552734 3.13401 0.552734 7C0.552734 10.866 3.59655 14 7.3513 14Z"
            fill="#D1C7C7"
          />
          <path
            d="M9.05067 10.3249C9.05067 10.4999 8.96568 10.5874 8.96568 10.7624C8.96568 10.7624 8.96569 10.8499 8.8807 10.8499C8.54078 10.9374 8.20085 11.1999 7.77594 11.1999C7.43601 11.2874 7.0111 11.2874 6.67117 11.1124C6.24626 10.9374 5.99132 10.4999 5.99132 10.0624C5.99132 9.6249 6.16128 9.1874 6.24626 8.7499C6.41623 8.3124 6.58619 7.8749 6.67117 7.3499C6.75615 7.1749 6.75615 6.9124 6.67117 6.6499C6.67117 6.4749 6.58619 6.3874 6.33124 6.2999C6.16128 6.3874 5.90633 6.3874 5.65139 6.4749H5.56641C5.56641 6.3874 5.56641 6.2124 5.65139 6.1249C5.65139 6.1249 5.65139 6.0374 5.73637 6.0374C6.16128 5.8624 6.58619 5.6874 7.0111 5.6874C7.43601 5.5999 7.77594 5.6874 8.11587 5.8624C8.45579 6.1249 8.54078 6.4749 8.54078 6.8249C8.54078 7.2624 8.37081 7.6999 8.28583 8.1374C8.11587 8.6624 7.9459 9.0999 7.86092 9.6249C7.86092 9.7999 7.77594 9.9749 7.86092 10.1499C7.86092 10.3249 7.9459 10.4999 8.20085 10.4999C8.45579 10.4999 8.62576 10.4999 8.8807 10.4124C8.96569 10.4124 8.96569 10.4124 9.05067 10.3249Z"
            fill={isDark ? '#191919' : '#FEFEFE'}
          />
          <path
            d="M8.20229 2.7124C8.71218 2.7124 9.13709 3.0624 9.22207 3.5874C9.30706 4.1124 8.88215 4.6374 8.37225 4.7249C7.94734 4.8124 7.52243 4.6374 7.26749 4.2874C6.92756 3.6749 7.18251 2.9749 7.77738 2.7999C7.94734 2.7124 8.03233 2.7124 8.20229 2.7124Z"
            fill={isDark ? '#191919' : '#FEFEFE'}
          />
        </g>
        <defs>
          <clipPath id="clip0_549_2711">
            <rect
              width="13.5971"
              height="14"
              fill="white"
              transform="translate(0.552734)"
            />
          </clipPath>
        </defs>
      </svg>
    </OverlayTrigger>
  );
}
