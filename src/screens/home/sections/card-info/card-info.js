import clsx from 'clsx'
import { Col, Row } from 'react-bootstrap'
import Card from '../../../../components/card/card'
import styles from './card-info.module.scss'

export default function CardInfo() {
  return (
    <>
      <Card ellipse="top-right" lineBottom="light">
        <h5 className={styles.h5}>Treasury value</h5>
        <p>$ 45,000.00</p>
        <br />
        <h5 className={styles.h5}>
          Last 24 hour treasury <br />
          net returns
        </h5>
        <p>$ 3,685.50</p>
        <br />
        <h6 className={styles.h6}>of which will be compounded</h6>
        <p>$ 3,685.50</p>
        <br />
        <h6 className={styles.h6}>
          of which will be returned to $FROCK holders
        </h6>
        <p>$ 3,685.50</p>
      </Card>
      <Card lineBottom="light" className={clsx(styles.cardApr, 'mt-4')}>
        <Row>
          <Col xs={6} lg={12}>
            <h5 className={styles.h5}>
              <strong>APR new Investors</strong>
            </h5>
          </Col>
          <Col xs={6} lg={12}>
            <h1 className={styles.h1}>200%</h1>
          </Col>
        </Row>
      </Card>
    </>
  )
}
