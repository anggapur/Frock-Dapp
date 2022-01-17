import { Accordion, Col, Row } from 'react-bootstrap'
import styles from './faq-section.module.scss'

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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" className={styles['accordion-item']}>
                <Accordion.Header className={styles['accordion-header']}>
                  How is my APR calculated?
                </Accordion.Header>
                <Accordion.Body className={styles['accordion-body']}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col lg={6}>
            <Accordion flush>
              <Accordion.Item eventKey="3" className={styles['accordion-item']}>
                <Accordion.Header className={styles['accordion-header']}>
                  Can't buy or sell $FROCK on SpookySwap?
                </Accordion.Header>
                <Accordion.Body className={styles['accordion-body']}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4" className={styles['accordion-item']}>
                <Accordion.Header className={styles['accordion-header']}>
                  How is my APR calculated?
                </Accordion.Header>
                <Accordion.Body className={styles['accordion-body']}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5" className={styles['accordion-item']}>
                <Accordion.Header className={styles['accordion-header']}>
                  Some other questions goes here ?
                </Accordion.Header>
                <Accordion.Body className={styles['accordion-body']}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </div>
    </div>
  )
}
