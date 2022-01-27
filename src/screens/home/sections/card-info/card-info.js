import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Card from '../../../../components/card/card'
import Tooltip from '../../../../components/tooltip/tooltip'
import { useCalculatorStore } from '../../../../store'
import styles from './card-info.module.scss'

const GAS_FEE_FOR_CLAIM = 15
const GAS_FEE_FOR_CREATE = 100
const DAYS_IN_YEAR = 365
const FROCK_SUPPLY = 1000000

export default function CardInfo({
  handleSetFrockYourReturn,
  balanceReflections,
}) {
  const [treasury, setTreasury] = useState(0)
  const [treasuryReturnLastDay, setTreasuryReturnLastDay] = useState(0)
  const [compoundedValue, setCompoundedValue] = useState(0)
  const [returnedValue, setReturnedValue] = useState(0)
  const [yourReturns, setYourReturns] = useState(0)
  const [marketingDev, setMarketingDev] = useState(0)
  const [aprNewInvestors, setAprNewInvestors] = useState(0)

  const store = useCalculatorStore()

  useEffect(() => {
    const { nodes, cumulativeStrongTotal } = calculateCompoundingTable(
      store.nodesCount,
      store.days,
      store.strongReturn,
      store.precentCompound,
      store.dailyVolume,
      store.precentTreasury,
      store.strongPrice
    )
    getTreasury(nodes, store.strongPrice)
    getTreasuryReturnLastDay(
      cumulativeStrongTotal,
      store.strongPrice,
      store.precentCompound,
      store.precentReturn,
      store.precentMarketingWallet,
      store.precentYourPortfolio
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getAprNewInvestors(store.days, store.precentYourPortfolio, store.frocPrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceReflections])

  useCalculatorStore.subscribe(
    state => [
      state.nodesCount,
      state.days,
      state.strongReturn,
      state.precentCompound,
      state.dailyVolume,
      state.precentTreasury,
      state.strongPrice,
      state.precentReturn,
      state.precentMarketingWallet,
      state.precentYourPortfolio,
    ],
    ([
      nodesCount,
      days,
      strongReturn,
      precentCompound,
      dailyVolume,
      precentTreasury,
      strongPrice,
      precentReturn,
      precentMarketingWallet,
      precentYourPortfolio,
    ]) => {
      const { nodes, cumulativeStrongTotal } = calculateCompoundingTable(
        nodesCount,
        days,
        strongReturn,
        precentCompound,
        dailyVolume,
        precentTreasury,
        strongPrice
      )
      getTreasury(nodes, strongPrice)
      getTreasuryReturnLastDay(
        cumulativeStrongTotal,
        strongPrice,
        precentCompound,
        precentReturn,
        precentMarketingWallet,
        precentYourPortfolio
      )
    }
  )

  const getTreasury = (nodes, strongPrice) => {
    const _treasury = Number((nodes * 10 * strongPrice).toFixed(2))
    setTreasury(_treasury)
  }

  const getTreasuryReturnLastDay = (
    cumulativeStrongTotal,
    strongPrice,
    precentCompound,
    precentReturn,
    precentMarketingWallet,
    precentYourPortfolio
  ) => {
    const _treasuryReturnLastDay = Number(
      (cumulativeStrongTotal * strongPrice).toFixed(2)
    )
    setTreasuryReturnLastDay(_treasuryReturnLastDay)
    getCompounded(_treasuryReturnLastDay, precentCompound)
    getReturned(
      _treasuryReturnLastDay,
      precentReturn,
      precentMarketingWallet,
      precentYourPortfolio
    )
    getMarketingDev(
      _treasuryReturnLastDay,
      precentReturn,
      precentMarketingWallet
    )
  }

  const getCompounded = (returnLastDay, precentCompound) => {
    const _compounded = Number(
      (returnLastDay * (precentCompound / 100)).toFixed(2)
    )
    setCompoundedValue(_compounded)
  }

  const getReturned = (
    returnLastDay,
    precentReturn,
    precentMarketingWallet,
    precentYourPortfolio
  ) => {
    const _returned = Number(
      (
        returnLastDay *
        (precentReturn / 100) *
        (1 - precentMarketingWallet / 100)
      ).toFixed(2)
    )
    setReturnedValue(_returned)
    getYourReturn(_returned, precentYourPortfolio)
  }

  const getYourReturn = (_returned, precentYourPortfolio) => {
    const _yourReturn = Number(
      (_returned * (precentYourPortfolio / 100)).toFixed(2)
    )
    setYourReturns(_yourReturn)
    handleSetFrockYourReturn(_yourReturn)
  }

  const getMarketingDev = (
    returnLastDay,
    precentReturn,
    precentMarketingWallet
  ) => {
    const _marketingDev = Number(
      (
        returnLastDay *
        (precentReturn / 100) *
        (precentMarketingWallet / 100)
      ).toFixed(2)
    )
    setMarketingDev(_marketingDev)
  }

  const calculateCompoundingTable = (
    _startNodes,
    _days,
    _strongReturn,
    _precentCompound,
    _dailyVolume,
    _precentTreasury,
    _strongPrice
  ) => {
    const getCostToClaimValue = (_balance, _nodes) => {
      if (_balance < 10) {
        return Number(0)
      }

      return Number(_nodes * GAS_FEE_FOR_CLAIM + GAS_FEE_FOR_CREATE)
    }

    const getPayoutValue = _nodes => {
      return Number((_nodes * _strongReturn).toFixed(2))
    }

    let nodes = _startNodes
    let balance = 0
    let cumulativeStrongTotal = 0
    let costToClaim = 0
    let payout = getPayoutValue(nodes)
    for (let day = 1; day <= _days; day++) {
      if (day === 1) {
        balance = Number((nodes * _strongReturn).toFixed(2))
        costToClaim = getCostToClaimValue(balance, nodes)
        cumulativeStrongTotal = payout
      } else {
        if (balance > 10) {
          balance = Number(
            (
              balance -
              10 +
              nodes * _strongReturn * (_precentCompound / 100) +
              (_dailyVolume * (_precentTreasury / 100)) / _strongPrice -
              costToClaim / _strongPrice
            ).toFixed(2)
          )
        } else {
          balance = Number(
            (
              balance +
              nodes * _strongReturn * (_precentCompound / 100) +
              (_dailyVolume * (_precentTreasury / 100)) / _strongPrice
            ).toFixed(2)
          )
        }
        nodes += Number(balance >= 10)
        payout = getPayoutValue(nodes)
        costToClaim = getCostToClaimValue(balance, nodes)
        cumulativeStrongTotal = Number(
          (cumulativeStrongTotal + payout).toFixed(2)
        )
      }
    }

    return { nodes, cumulativeStrongTotal }
  }

  useCalculatorStore.subscribe(
    state => [state.days, state.precentYourPortfolio, state.frocPrice],
    ([days, precentYourPortfolio, frocPrice]) => {
      getAprNewInvestors(days, precentYourPortfolio, frocPrice)
    }
  )

  const getAprNewInvestors = (days, precentYourPortfolio, frocPrice) => {
    const returnsFromReflections =
      (1 / (days / DAYS_IN_YEAR)) * balanceReflections
    const returnsFromTreasury = yourReturns
    const returns = returnsFromReflections + returnsFromTreasury
    const invested = (precentYourPortfolio / 100) * FROCK_SUPPLY * frocPrice

    setAprNewInvestors(returns / invested)
  }

  return (
    <>
      <Card
        ellipse="top-right"
        lineBottom="light"
        className="global-card-info-1 mt-4 mt-lg-0"
      >
        <h5 className={styles.h5}>
          Treasury value{' '}
          <Tooltip anchorLink="/" anchorText="Read more">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            malesuada posuere dolor in tempus.
          </Tooltip>
        </h5>
        <p className={styles.mb14}>
          $ {treasury.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </p>

        <h5 className={styles.h5}>
          Last {store.days > 1 ? `${store.days} days` : `${store.days} day`}{' '}
          treasury <br />
          net returns{' '}
          <Tooltip anchorLink="/" anchorText="Read more">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            malesuada posuere dolor in tempus.
          </Tooltip>
        </h5>
        <p className={styles.mb14}>
          ${' '}
          {treasuryReturnLastDay.toLocaleString('en-US', {
            maximumFractionDigits: 0,
          })}
        </p>

        <h6 className={styles.h6}>
          of which will be compounded{' '}
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
          of which will be returned to $FROCK holders{' '}
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
          Your returns{' '}
          <Tooltip anchorLink="/" anchorText="Read more">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            malesuada posuere dolor in tempus.
          </Tooltip>
        </h6>
        <p className={styles.mb14}>
          $ {yourReturns.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </p>

        <h6 className={styles.h6}>
          marketing / dev{' '}
          <Tooltip anchorLink="/" anchorText="Read more">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            malesuada posuere dolor in tempus.
          </Tooltip>
        </h6>
        <p>
          $ {marketingDev.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </p>
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
