import { Col, Row } from 'react-bootstrap'
import RoundButton from '../../../../components/button/button'
import Card from '../../../../components/card/card'
import Tooltip from '../../../../components/tooltip/tooltip'
import styles from './card-frock-price.module.scss'

export default function CardFrockPrice() {
  return (
    <>
      <Card ellipse="top-left" lineBottom="primary">
        <Row>
          <Col xs={6} className="pb-3">
            <h3 className={styles.h3}>$FROCK Price</h3>
            <h1 className={styles.h1}>$0,00394</h1>
            <RoundButton
              variant="primary"
              className={styles.buyFrock}
              isRounded
              isOutline
            >
              Buy $FRock
            </RoundButton>
          </Col>
          <Col xs={6}>
            <h5 className={styles.h5}>
              $FROCK market cap{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>$ 3,947,383</p>
            <br />
            <h5 className={styles.h5}>
              $FROCK circulating supply{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>1,000,000,000 $FROCK</p>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col xs={6}>
          <Card ellipse="top-right" lineBottom="light" className="mt-4">
            <h5 className={styles.h5}>
              Total pending reflections{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>$ 3,947,383</p>
            <small>$ 1,000.00</small>
          </Card>
          <Card ellipse="top-right" lineBottom="light" className="mt-4">
            <h5 className={styles.h5}>
              Last 24 Hour Volume{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>$ 200,000.00</p>
          </Card>
        </Col>
        <Col xs={6}>
          <Card ellipse="top-right" lineBottom="light" className="mt-4">
            <h5 className={styles.h5}>
              Total paid reflections{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>$FTM 80,050.00</p>
            <small>$ 23,000.00</small>
          </Card>
          <Card ellipse="top-right" lineBottom="light" className="my-4">
            <h5 className={styles.h5}>
              Last 24 Hour reflections{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>$FTM 1,230.00</p>
          </Card>
        </Col>
      </Row>
    </>
  )
}
