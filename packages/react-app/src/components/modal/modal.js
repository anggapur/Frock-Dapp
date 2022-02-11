import React from 'react';
import { Modal as ModalBs } from 'react-bootstrap';

import alertIcon from '../../assets/alert-icon-big.svg';
import frockLogo from '../../assets/frock-logo-big.svg';
import backgroundHeader from './background-header.svg';
import styles from './modal.module.scss';

function Modal({ show, onHide, children }) {
  return (
    <ModalBs className={styles.wrapper} show={show} onHide={onHide}>
      {children}
    </ModalBs>
  );
}

Modal.Header = function ({ type, title, description, iconSize = 'medium' }) {
  return (
    <ModalBs.Header className={styles.header} closeButton>
      <img src={backgroundHeader} alt="background header" />
      {type === 'greeting' && (
        <>
          <div className={styles.circle}>
            <img src={frockLogo} alt="fractionalrocket logo" />
          </div>
        </>
      )}
      {type === 'alert' && (
        <div className={styles.circleBorder} role="alert">
          <img src={alertIcon} className={styles[iconSize]} alt="alert icon" />
          {iconSize === 'small' && (
            <>
              {title && <h3>{title}</h3>}
              {description && <p>{description}</p>}
            </>
          )}
        </div>
      )}
      {iconSize !== 'small' && (
        <>
          {title && <h3 style={{ bottom: !description && '40px' }}>{title}</h3>}
          {description && <p>{description}</p>}
        </>
      )}
    </ModalBs.Header>
  );
};

Modal.Body = function ({ children }) {
  return <ModalBs.Body className={styles.body}>{children}</ModalBs.Body>;
};

export default Modal;
