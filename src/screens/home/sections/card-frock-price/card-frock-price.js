import { Col, Row } from 'react-bootstrap'
import RoundButton from '../../../../components/button/button'
import Card from '../../../../components/card/card'
import Tooltip from '../../../../components/tooltip/tooltip'
import { useCalculatorStore } from '../../../../store'
import styles from './card-frock-price.module.scss'

const FROCK_SUPPLY = 1000000000

export default function CardFrockPrice() {
  const store = useCalculatorStore()

  const getFrockMarketCap = () => {
    return (FROCK_SUPPLY * store.frocPrice).toLocaleString()
  }

  const totalPendingReflections = () => {
    const reflections =
      (store.precentClaimPeriod / 100) *
      store.dailyVolume *
      (store.precentReflection / 100)
    const total = reflections / store.ftmPrice
    return {
      reflections: reflections.toLocaleString(),
      total: total.toLocaleString(),
    }
  }

  const totalPaidReflections = () => {
    return {
      total: Number(80050).toLocaleString(),
      reflections: Number(23000).toLocaleString(),
    }
  }

  const totalLast24Hour = () => {
    const dailyVolume = store.dailyVolume
    const reflections =
      (dailyVolume * (store.precentReflection / 100)) / store.ftmPrice
    return {
      volume: dailyVolume.toLocaleString(),
      reflections: reflections.toLocaleString(),
    }
  }

  return (
    <>
      <Card
        ellipse="top-left"
        lineBottom="primary"
        className="global-card-frock-price-1"
      >
        <Row>
          <Col xs={6} className="pb-3">
            <h3 className={styles.h3}>$FROCK Price</h3>
            <h1 className={styles.h1}>${store.frocPrice}</h1>
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
            <p className={styles.mb20}>$ {getFrockMarketCap()}</p>

            <h5 className={styles.h5}>
              $FROCK circulating supply{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>{FROCK_SUPPLY.toLocaleString()} $FROCK</p>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col xs={6}>
          <Card
            ellipse="top-right"
            lineBottom="light"
            className="global-card-frock-price-2 mt-4"
          >
            <h5 className={styles.h5}>
              Total pending reflections{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>$ {totalPendingReflections().total}</p>
            <small>$ {totalPendingReflections().reflections}</small>
          </Card>
          <Card
            ellipse="top-right"
            lineBottom="light"
            className="global-card-frock-price-3 mt-4"
          >
            <h5 className={styles.h5}>
              Last 24 Hour Volume{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>$ {totalLast24Hour().volume}</p>
          </Card>
        </Col>
        <Col xs={6}>
          <Card
            ellipse="top-right"
            lineBottom="light"
            className="global-card-frock-price-2 mt-4"
          >
            <h5 className={styles.h5}>
              Total paid reflections{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>$FTM {totalPaidReflections().total}</p>
            <small>$ {totalPaidReflections().reflections}</small>
          </Card>
          <Card
            ellipse="top-right"
            lineBottom="light"
            className="global-card-frock-price-3 mt-4"
          >
            <h5 className={styles.h5}>
              Last 24 Hour reflections{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>$FTM {totalLast24Hour().reflections}</p>
          </Card>
        </Col>
      </Row>
    </>
  )
}
