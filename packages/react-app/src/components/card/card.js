import React from 'react';

import clsx from 'clsx';

import styles from './card.module.scss';
import Ellipse from './ellipse';

function getLineButtonClass(type) {
  if (type !== 'primary' && type !== 'light') {
    return '';
  }

  return styles[`line-bottom-${type}`];
}

function Card({
  children,
  ellipse = '',
  lineBottom = '',
  className = '',
  ...rest
}) {
  return (
    <div className={clsx(styles.card, className)} {...rest}>
      <Ellipse position={ellipse} />
      {children}
      <div className={getLineButtonClass(lineBottom)} />
    </div>
  );
}

Card.Header = function ({ children, className = '', ...rest }) {
  return (
    <h2 className={clsx(styles.header, className)} {...rest}>
      {children}
    </h2>
  );
};

Card.Footer = function ({ children, className = '', ...rest }) {
  return (
    <div className={clsx(styles.footer, className)} {...rest}>
      {children}
    </div>
  );
};

export default Card;
