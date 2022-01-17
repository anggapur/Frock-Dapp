import clsx from 'clsx'
import { Col, Row } from 'react-bootstrap'
import RoundButton from '../../../../components/button/button'
import Card from '../../../../components/card/card'
import Tooltip from '../../../../components/tooltip/tooltip'
import styles from './card-balance.module.scss'

export default function CardBalance() {
  return (
    <>
      <Card ellipse="top-left">
        <h2 className={styles.h2}>Balance</h2>
        <Row>
          <Col xs={6}>
            <h5 className={styles.h5}>
              Your pending <br />
              reflections
            </h5>
          </Col>
          <Col xs={6}>
            <p className={styles.p}>
              <strong>$FTM 3.50</strong>
            </p>
            <p className={styles.p}>$ 10.20</p>
          </Col>
        </Row>
        <hr className={styles.hr} />
        <Row>
          <Col xs={6}>
            <h5 className={styles.h5}>
              Your claimable <br />
              reflections
            </h5>
          </Col>
          <Col xs={6}>
            <p className={styles.p}>
              <strong>$FTM 13.50</strong>
            </p>
            <p className={styles.p}>$ 30.12</p>
          </Col>
        </Row>
        <RoundButton variant="primary" className="mt-4 w-100" isRounded>
          Claim
        </RoundButton>
        <Card.Footer>
          <Row>
            <Col xs={6}>
              <h5 className={clsx(styles.h5, styles.textGray)}>
                Your claimed <br />
                reflections
              </h5>
            </Col>
            <Col xs={6}>
              <p className={styles.p}>
                <strong className={styles.textGray}>$FTM 27.00</strong>
              </p>
              <p className={clsx(styles.p, styles.textGray)}>$ 60.21</p>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      <Card lineBottom="light" className={clsx(styles.cardApr, 'my-4')}>
        <Row>
          <Col xs={6} lg={12}>
            <h5 className={styles.h5}>
              <strong>Your APR</strong>{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
          </Col>
          <Col xs={6} lg={12}>
            <h1 className={styles.h1}>300%</h1>
          </Col>
        </Row>
      </Card>
    </>
  )
}
