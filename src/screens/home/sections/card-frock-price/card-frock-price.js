import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Card from '../../../../components/card/card'
import Tooltip from '../../../../components/tooltip/tooltip'
import { FROCK_SUPPLY } from '../../../../constant'
import styles from './card-frock-price.module.scss'

export default function CardFrockPrice({
  calc: { frocPrice, precentReflection, ftmPrice, dailyVolume, days },
  volumeUsed,
}) {
  const [frockMarketCap, setFrockMarketCap] = useState(0)
  const [totalReflections, setTotalReflections] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [totalPaidReflections] = useState(23000)
  // eslint-disable-next-line no-unused-vars
  const [totalPaid] = useState(80050)
  const [last24HourVolume, setLast24HourVolume] = useState(volumeUsed)
  const [last24HourVolumeReflections, setLast24HourVolumeReflections] =
    useState(0)

  // get frock market cap value
  useEffect(() => {
    setFrockMarketCap(Number(FROCK_SUPPLY * frocPrice))
  }, [frocPrice])

  // get total reflections
  useEffect(() => {
    const _precentReflection = precentReflection / 100
    setTotalReflections(dailyVolume * _precentReflection * days)
  }, [dailyVolume, precentReflection, days])

  // get last 24 hour volume value
  useEffect(() => {
    setLast24HourVolume(volumeUsed)
  }, [volumeUsed])

  // get last 24 hour volume reflections value
  useEffect(() => {
    const _precentReflection = precentReflection / 100
    const _last24HourVolumeReflections = Number(
      (last24HourVolume * _precentReflection) / ftmPrice
    )
    setLast24HourVolumeReflections(_last24HourVolumeReflections)
  }, [last24HourVolume, precentReflection, ftmPrice])

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
            <h1 className={styles.h1}>${frocPrice}</h1>
            {/* <RoundButton
              variant="primary"
              className={styles.buyFrock}
              isRounded
              isOutline
            >
              Buy $FRock
            </RoundButton> */}
          </Col>
          <Col xs={6}>
            <h5 className={styles.h5}>
              $FROCK market cap{' '}
              {/*<Tooltip anchorLink="/" anchorText="Read more">*/}
              {/*  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras*/}
              {/*  malesuada posuere dolor in tempus.*/}
              {/*</Tooltip>*/}
            </h5>
            <p className={styles.mb20}>
              ${' '}
              {frockMarketCap.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
            </p>

            <h5 className={styles.h5}>
              $FROCK supply{' '}
              {/*<Tooltip anchorLink="/" anchorText="Read more">*/}
              {/*  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras*/}
              {/*  malesuada posuere dolor in tempus.*/}
              {/*</Tooltip>*/}
            </h5>
            <p>{FROCK_SUPPLY.toLocaleString('en-US')} $FROCK</p>
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
              Total reflections{' '}
              {/*<Tooltip anchorLink="/" anchorText="Read more">*/}
              {/*  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras*/}
              {/*  malesuada posuere dolor in tempus.*/}
              {/*</Tooltip>*/}
            </h5>
            <p>
              ${' '}
              {totalReflections.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
            </p>
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
            <p>
              ${' '}
              {last24HourVolume.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
            </p>
          </Card>
        </Col>
        <Col xs={6}>
          <Card
            ellipse="top-right"
            lineBottom="light"
            className="global-card-frock-price-2 mt-4"
          >
            {/* <h5 className={styles.h5}>
              Total paid reflections{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>
              $FTM{' '}
              {totalPaid.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
            </p>
            <small>
              ${' '}
              {totalPaidReflections.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
            </small> */}
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
            <p>
              $FTM{' '}
              {last24HourVolumeReflections.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
            </p>
          </Card>
        </Col>
      </Row>
    </>
  )
}
