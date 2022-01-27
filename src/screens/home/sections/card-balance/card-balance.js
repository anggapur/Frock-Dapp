import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import RoundButton from '../../../../components/button/button'
import Card from '../../../../components/card/card'
import Tooltip from '../../../../components/tooltip/tooltip'
import { useCalculatorStore } from '../../../../store'
import styles from './card-balance.module.scss'

const DAYS_IN_YEAR = 365
const FROCK_SUPPLY = 1000000

export default function CardBalance({
  frockYourReturn,
  handleSetBalanceReflections,
}) {
  const [pending, setPending] = useState(0)
  const [reflections, setReflections] = useState(0)
  const [claimable, setClaimable] = useState(0)
  const [yourApr, setYourApr] = useState(0)

  const store = useCalculatorStore()

  useEffect((_store = store) => {
    calculateBalance([
      _store.precentClaimPeriod,
      _store.precentYourPortfolio,
      _store.dailyVolume,
      _store.precentReflection,
      _store.days,
      _store.ftmPrice,
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    (_store = store) => {
      getApr(_store.days, _store.precentYourPortfolio, _store.yourEntryPrice)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [frockYourReturn]
  )

  const calculateBalance = ([
    precentClaimPeriod,
    precentYourPortfolio,
    dailyVolume,
    precentReflection,
    days,
    ftmPrice,
  ]) => {
    const _reflections =
      (precentClaimPeriod / 100) *
      (precentYourPortfolio / 100) *
      dailyVolume *
      (precentReflection / 100) *
      days
    const _pending = _reflections / ftmPrice
    const _claimable = _pending.valueOf()

    setReflections(_reflections)
    handleSetBalanceReflections(_reflections)
    setPending(_pending)
    setClaimable(_claimable)
  }

  useCalculatorStore.subscribe(
    state => [
      state.precentClaimPeriod,
      state.precentYourPortfolio,
      state.dailyVolume,
      state.precentReflection,
      state.days,
      state.ftmPrice,
    ],
    calculateBalance
  )

  useCalculatorStore.subscribe(
    state => [state.days, state.precentYourPortfolio, state.yourEntryPrice],
    ([days, precentYourPortfolio, yourEntryPrice]) =>
      getApr(days, precentYourPortfolio, yourEntryPrice)
  )

  const getApr = (days, precentYourPortfolio, yourEntryPrice) => {
    const returns =
      (reflections + frockYourReturn) * (1 / (days / DAYS_IN_YEAR))
    const invested =
      (precentYourPortfolio / 100) * FROCK_SUPPLY * yourEntryPrice

    setYourApr(parseInt(returns / invested))
  }

  return (
    <>
      <Card ellipse="top-left" className="global-card-balance-1">
        <h2 className={styles.h2}>Balance</h2>
        <Row>
          <Col xs={6}>
            <h5 className={styles.h5}>Your pending</h5>
          </Col>
          <Col xs={6}>
            <p className={styles.p}>
              <strong>
                $FTM{' '}
                {Number(pending).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </strong>
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <h5 className={styles.h5}>reflections</h5>
          </Col>
          <Col xs={6}>
            <p className={styles.p}>
              ${' '}
              {Number(reflections).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </Col>
        </Row>
        <hr className={styles.hr} />
        <Row>
          <Col xs={6}>
            <h5 className={styles.h5}>Your claimable</h5>
          </Col>
          <Col xs={6}>
            <p className={styles.p}>
              <strong>
                $FTM{' '}
                {Number(claimable).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </strong>
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <h5 className={styles.h5}>reflections</h5>
          </Col>
          <Col xs={6}>
            <p className={styles.p}>
              ${' '}
              {Number(reflections).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </Col>
        </Row>
        <RoundButton variant="primary" className="mt-4 w-100" isRounded>
          Claim
        </RoundButton>
        <Card.Footer>
          <Row>
            <Col xs={6}>
              <h5 className={clsx(styles.h5, styles.textGray)}>Your claimed</h5>
            </Col>
            <Col xs={6}>
              <p className={styles.p}>
                <strong className={styles.textGray}>$FTM 27.00</strong>
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <h5 className={clsx(styles.h5, styles.textGray)}>reflections</h5>
            </Col>
            <Col xs={6}>
              <p className={clsx(styles.p, styles.textGray)}>$ 60.21</p>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      <Card
        lineBottom="light"
        className={clsx(styles.cardApr, 'global-card-balance-2 my-4')}
      >
        <Row>
          <Col xs={6} lg={12}>
            <h5 className={clsx(styles.h5, styles.mb7)}>
              <strong>Your APR</strong>{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
          </Col>
          <Col xs={6} lg={12}>
            <h1 className={styles.h1}>{yourApr * 100}%</h1>
          </Col>
        </Row>
      </Card>
    </>
  )
}
