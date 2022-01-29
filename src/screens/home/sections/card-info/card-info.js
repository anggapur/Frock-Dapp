import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Card from '../../../../components/card/card'
import Tooltip from '../../../../components/tooltip/tooltip'
import {
  DAYS_IN_YEAR,
  FROCK_SUPPLY,
  GAS_FEE_FOR_CLAIM,
  GAS_FEE_FOR_CREATE,
} from '../../../../constant'
import styles from './card-info.module.scss'

export default function CardInfo({
  calc: {
    days,
    strongPrice,
    nodesCount,
    strongReturn,
    precentCompound,
    dailyVolume,
    precentTreasury,
    precentReturn,
    precentMarketingWallet,
    precentYourPortfolio,
    frocPrice,
  },
  setCumulativeStrongTotalInYear,
  yearReturn,
  returnFromTreasury,
}) {
  const [treasury, setTreasury] = useState(0)
  const [lastDayTreasuryNetReturn, setLastDayTreasuryNetReturn] = useState(0)
  const [compoundedValue, setCompoundedValue] = useState(0)
  const [returnedValue, setReturnedValue] = useState(0)
  const [yourReturns, setYourReturns] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [marketingDev, setMarketingDev] = useState(0)
  const [aprNewInvestors, setAprNewInvestors] = useState(0)
  const [nodeByDay, setNodeByDay] = useState(0)
  const [cumulativeStrongTotalByDay, setCumulativeStrongTotalByDay] =
    useState(0)

  // get nodes from Fractional rocket compounding table
  useEffect(() => {
    let nodes = nodesCount
    let balance = 0
    let costToClaim = 0
    let payout = 0
    let cumulativeStrongTotal = 0
    const rewardPerDay = strongReturn
    const _precentCompound = precentCompound / 100
    const _precentTreasury = precentTreasury / 100
    const treasuryBuildupPerDay = dailyVolume * _precentTreasury

    const getBalance = (_balance, _nodes, minusValue = 0, _costToClaim = 0) => {
      _balance =
        _balance -
        minusValue +
        _nodes * rewardPerDay * _precentCompound +
        treasuryBuildupPerDay / strongPrice

      if (_balance > 10) {
        _balance -= _costToClaim / strongPrice
      }

      return _balance
    }

    for (let day = 1; day <= DAYS_IN_YEAR; day++) {
      if (day === 1) {
        balance = nodes * rewardPerDay
        costToClaim =
          parseInt(balance / 10) === 1
            ? nodes * GAS_FEE_FOR_CLAIM + GAS_FEE_FOR_CREATE
            : 0
      } else {
        if (balance <= 10) {
          balance = getBalance(balance, nodes)
        } else {
          if (balance <= 20) {
            balance = getBalance(balance, nodes, 10, costToClaim)
          } else if (balance <= 30) {
            balance = getBalance(balance, nodes, 20, costToClaim)
          } else if (balance <= 40) {
            balance = getBalance(balance, nodes, 30, costToClaim)
          } else if (balance <= 50) {
            balance = getBalance(balance, nodes, 40, costToClaim)
          } else if (balance <= 60) {
            balance = getBalance(balance, nodes, 50, costToClaim)
          } else if (balance <= 70) {
            balance = getBalance(balance, nodes, 60, costToClaim)
          } else if (balance <= 80) {
            balance = getBalance(balance, nodes, 70, costToClaim)
          } else if (balance <= 90) {
            balance = getBalance(balance, nodes, 80, costToClaim)
          } else if (balance <= 100) {
            balance = getBalance(balance, nodes, 90, costToClaim)
          } else if (balance <= 110) {
            balance = getBalance(balance, nodes, 100, costToClaim)
          } else if (balance <= 120) {
            balance = getBalance(balance, nodes, 110, costToClaim)
          } else if (balance <= 130) {
            balance = getBalance(balance, nodes, 120, costToClaim)
          } else if (balance <= 140) {
            balance = getBalance(balance, nodes, 130, costToClaim)
          } else if (balance <= 150) {
            balance = getBalance(balance, nodes, 140, costToClaim)
          } else if (balance <= 160) {
            balance = getBalance(balance, nodes, 150, costToClaim)
          } else if (balance <= 170) {
            balance = getBalance(balance, nodes, 160, costToClaim)
          }

          if (day > 3) {
            nodes += parseInt(balance / 10)
          }
        }

        costToClaim =
          parseInt(balance / 10) > 0
            ? nodes * GAS_FEE_FOR_CLAIM + GAS_FEE_FOR_CREATE
            : 0
      }

      payout = nodes * rewardPerDay
      cumulativeStrongTotal =
        day === 1 ? payout : payout + cumulativeStrongTotal

      if (day === days) {
        setNodeByDay(nodes)
        setCumulativeStrongTotalByDay(cumulativeStrongTotal)
      }
    }

    setCumulativeStrongTotalInYear(cumulativeStrongTotal)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    strongPrice,
    nodesCount,
    strongReturn,
    precentCompound,
    dailyVolume,
    precentTreasury,
    days,
  ])

  // get treasury value
  useEffect(() => {
    setTreasury(Number(nodeByDay * 10 * strongPrice))
  }, [nodeByDay, strongPrice])

  // get last day treasury net return value
  useEffect(() => {
    setLastDayTreasuryNetReturn(
      Number(cumulativeStrongTotalByDay * strongPrice)
    )
  }, [cumulativeStrongTotalByDay, strongPrice])

  // get compounded value
  useEffect(() => {
    const _precentCompound = precentCompound / 100
    setCompoundedValue(Number(lastDayTreasuryNetReturn * _precentCompound))
  }, [lastDayTreasuryNetReturn, precentCompound])

  // get returned value
  useEffect(() => {
    const _precentReturn = precentReturn / 100
    const _precentMarketingWallet = precentMarketingWallet / 100
    setReturnedValue(
      Number(
        lastDayTreasuryNetReturn *
          _precentReturn *
          (1 - _precentMarketingWallet)
      )
    )
  }, [lastDayTreasuryNetReturn, precentReturn, precentMarketingWallet])

  // get your return
  useEffect(() => {
    const _precentYourPortfolio = precentYourPortfolio / 100
    setYourReturns(Number(returnedValue * _precentYourPortfolio))
  }, [returnedValue, precentYourPortfolio])

  // get APR new investor
  useEffect(() => {
    const _precentYourPortfolio = precentYourPortfolio / 100
    const invested = _precentYourPortfolio * FROCK_SUPPLY * frocPrice

    const returnsFromReflections = yearReturn
    const totalReturns = returnsFromReflections + returnFromTreasury

    setAprNewInvestors(totalReturns / invested)
  }, [precentYourPortfolio, frocPrice, returnFromTreasury, yearReturn])

  return (
    <>
      <Card
        ellipse="top-right"
        lineBottom="light"
        className="global-card-info-1 mt-4 mt-lg-0"
      >
        <h2 className={styles.h2}>Treasury</h2>
        <h5 className={styles.h5}>
          Treasury value{' '} at {days > 1 ? `${days} days` : `${days} day`}
          <Tooltip anchorLink="/" anchorText="Read more">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            malesuada posuere dolor in tempus.
          </Tooltip>
        </h5>
        <p className={styles.mb14}>
          $ {treasury.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </p>

        <h5 className={styles.h5}>
          {days > 1 ? `${days} days` : `${days} day`} treasury <br />
          returns{' '}
          <Tooltip anchorLink="/" anchorText="Read more">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            malesuada posuere dolor in tempus.
          </Tooltip>
        </h5>
        <p className={styles.mb14}>
          ${' '}
          {lastDayTreasuryNetReturn.toLocaleString('en-US', {
            maximumFractionDigits: 0,
          })}
        </p>

        <h6 className={styles.h6}>
          of which compounded{' '}
          <Tooltip anchorLink="/" anchorText="Read more">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            malesuada posuere dolor in tempus.
          </Tooltip>
        </h6>
        <p className={styles.mb14}>
          ${' '}
          {compoundedValue.toLocaleString('en-US', {
            maximumFractionDigits: 0,
          })}
        </p>

        <h6 className={styles.h6}>
          of which returned {' '}
          <Tooltip anchorLink="/" anchorText="Read more">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            malesuada posuere dolor in tempus.
          </Tooltip>
        </h6>
        <p className={styles.mb14}>
          ${' '}
          {returnedValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </p>

        <h6 className={styles.h6}>
          Your treasury returns{' '}
          <Tooltip anchorLink="/" anchorText="Read more">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            malesuada posuere dolor in tempus.
          </Tooltip>
        </h6>
        <p>
          $ {yourReturns.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </p>

        {/* <h6 className={styles.h6}>
          marketing / dev{' '}
          <Tooltip anchorLink="/" anchorText="Read more">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            malesuada posuere dolor in tempus.
          </Tooltip>
        </h6>
        <p>
          $ {marketingDev.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </p> */}
      </Card>

      <Card
        lineBottom="light"
        className={clsx(styles.cardApr, 'global-card-info-2 mt-4')}
      >
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
            <h1 className={styles.h1}>{parseInt(aprNewInvestors * 100)}%</h1>
          </Col>
        </Row>
      </Card>
    </>
  )
}
