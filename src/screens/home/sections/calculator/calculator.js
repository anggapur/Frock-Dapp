import { Col, Row } from 'react-bootstrap'
import RoundButton from '../../../../components/button/button'
import Card from '../../../../components/card/card'
import FormRangeInput from './form-range-input'

export default function Calculator({
  calc,
  setCalc,
  strongPriceFromApi,
  ftmPriceFromApi,
}) {
  const handleResetClicked = () => {
    setCalc({
      ftmPrice: ftmPriceFromApi,
      dailyVolume: 50000,
      precentClaimPeriod: 100,
      precentReflection: 7,
      precentTreasury: 14,
      frocPrice: 0.1,
      yourEntryPrice: 0.094,
      precentYourPortfolio: 1,
      precentCompound: 67,
      precentReturn: 33,
      precentMarketingWallet: 0,
      days: 150,
      strongPrice: strongPriceFromApi,
      strongReturn: 0.09,
      nodesCount: 20,
    })
  }

  const handleOnChange = (state, value) => {
    setCalc({
      ...calc,
      [state]: value,
    })
  }

  return (
    <Card ellipse="top-left">
      <RoundButton
        className="float-end"
        variant="light"
        size="small"
        isRounded
        onClick={handleResetClicked}
      >
        Reset
      </RoundButton>
      <Card.Header>Calculator</Card.Header>
      <Row>
        <Col lg={4}>
          {/* <FormRangeInput
            label="FTM price"
            type="text"
            symbol={{ label: '$', position: 'start' }}
            minValue={1}
            maxValue={20}
            value={calc.ftmPrice}
            setValue={value => handleOnChange('ftmPrice', value)}
            currencyFormat={true}
            hideBar={true}
          /> */}
          <FormRangeInput
            label="Daily Volume"
            type="text"
            symbol={{ label: '$', position: 'start' }}
            minValue={0}
            maxValue={100000}
            step={5000}
            value={calc.dailyVolume}
            setValue={value => handleOnChange('dailyVolume', value)}
            currencyFormat={true}
          />
          {/* <FormRangeInput
            label="% of claim period"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calc.precentClaimPeriod}
            setValue={value => handleOnChange('precentClaimPeriod', value)}
          /> */}
          <FormRangeInput
            label="Reflection %"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={21}
            value={calc.precentReflection}
            setValue={value => handleOnChange('precentReflection', value)}
          />
          <FormRangeInput
            label="Treasury %"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={21}
            value={calc.precentTreasury}
            setValue={value => handleOnChange('precentTreasury', value)}
          />
        </Col>
        <Col lg={4}>
          <FormRangeInput
            label="$FROCK price"
            type="text"
            symbol={{ label: '$', position: 'start' }}
            minValue={0}
            maxValue={2.5}
            step={0.01}
            value={calc.frocPrice}
            setValue={value => handleOnChange('frocPrice', value)}
            currencyFormat={true}
          />
          <FormRangeInput
            label="Your portfolio"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            step={2}
            value={calc.precentYourPortfolio}
            setValue={value => handleOnChange('precentYourPortfolio', value)}
          />
          <FormRangeInput
            label="Your entry price"
            type="text"
            symbol={{ label: '$', position: 'start' }}
            minValue={0}
            maxValue={2.5}
            step={0.01}
            value={calc.yourEntryPrice}
            setValue={value => handleOnChange('yourEntryPrice', value)}
            currencyFormat={true}
          />
          <FormRangeInput
            label="Compound"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calc.precentCompound}
            setValue={value => handleOnChange('precentCompound', value)}
          />
          <FormRangeInput
            label="Return"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calc.precentReturn}
            setValue={value => handleOnChange('precentReturn', value)}
          />
        </Col>
        <Col lg={4}>
          {/* <FormRangeInput
            label="Marketing/dev wallet"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calc.precentMarketingWallet}
            setValue={value => handleOnChange('precentMarketingWallet', value)}
          /> */}
          <FormRangeInput
            label="Days"
            type="number"
            minValue={1}
            maxValue={365}
            value={calc.days}
            setValue={value => handleOnChange('days', value)}
          />
          <FormRangeInput
            label="Strong price"
            type="text"
            symbol={{ label: '$', position: 'start' }}
            minValue={1}
            maxValue={1000}
            value={calc.strongPrice}
            setValue={value => handleOnChange('strongPrice', value)}
            currencyFormat={true}
          />
          <FormRangeInput
            label="Strong returns"
            type="number"
            minValue={0.01}
            maxValue={0.09}
            step={0.005}
            value={calc.strongReturn}
            setValue={value => handleOnChange('strongReturn', value)}
          />
          <FormRangeInput
            label="Nodes bought starting point"
            tooltip={{
              anchorText: 'Read more',
              anchorLink: '/',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            }}
            type="number"
            minValue={1}
            maxValue={100}
            value={calc.nodesCount}
            setValue={value => handleOnChange('nodesCount', value)}
          />
        </Col>
      </Row>
    </Card>
  )
}
