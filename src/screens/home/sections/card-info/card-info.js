import clsx from 'clsx'
import { Col, Row } from 'react-bootstrap'
import Card from '../../../../components/card/card'
import Tooltip from '../../../../components/tooltip/tooltip'
import styles from './card-info.module.scss'

export default function CardInfo() {
  return (
    <>
      <Card ellipse="top-right" lineBottom="light">
        <h5 className={styles.h5}>
          Treasury value{' '}
          <Tooltip anchorLink="/" anchorText="Read more">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            malesuada posuere dolor in tempus.
          </Tooltip>
        </h5>
        <p>$ 45,000.00</p>
        <br />
        <h5 className={styles.h5}>
          Last 24 hour treasury <br />
          net returns{' '}
          <Tooltip anchorLink="/" anchorText="Read more">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            malesuada posuere dolor in tempus.
          </Tooltip>
        </h5>
        <p>$ 3,685.50</p>
        <br />
        <h6 className={styles.h6}>
          of which will be compounded{' '}
          <Tooltip anchorLink="/" anchorText="Read more">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            malesuada posuere dolor in tempus.
          </Tooltip>
        </h6>
        <p>$ 3,685.50</p>
        <br />
        <h6 className={styles.h6}>
          of which will be returned to $FROCK holders{' '}
          <Tooltip anchorLink="/" anchorText="Read more">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            malesuada posuere dolor in tempus.
          </Tooltip>
        </h6>
        <p>$ 3,685.50</p>
      </Card>
      <Card lineBottom="light" className={clsx(styles.cardApr, 'mt-4')}>
        <Row>
          <Col xs={6} lg={12}>
            <h5 className={styles.h5}>
              <strong>
                APR new Investors{' '}
                <Tooltip anchorLink="/" anchorText="Read more">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  malesuada posuere dolor in tempus.
                </Tooltip>
              </strong>
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
