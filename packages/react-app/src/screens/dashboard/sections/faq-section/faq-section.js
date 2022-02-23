import React, { Accordion, Col, Row } from 'react-bootstrap';

import styles from './faq-section.module.scss';

export default function FaqSection() {
  return (
    <div className={styles.wrapper}>
      <h2>Frequently Asked Questions:</h2>
      <div className={styles.card}>
        <Row>
          <Col lg={6} className={styles['border-right']}>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0" className={styles['accordion-item']}>
                <Accordion.Header className={styles['accordion-header']}>
                  Can't buy or sell $FROCK on SpookySwap?
                </Accordion.Header>
                <Accordion.Body className={styles['accordion-body']}>
                  Set slippage to 25% or higher: <a
                      href="https://medium.com/@fr0ck/fractional-rocket-protocol-stealth-launch-trade-instructions-7c807803bc0"
                      className="text-red-dark text-decoration-underline"
                      target="_blank"
                  >Read more</a>

                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </div>
    </div>
  );
}
