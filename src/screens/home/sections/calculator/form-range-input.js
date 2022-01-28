import clsx from 'clsx'
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import Tooltip from '../../../../components/tooltip/tooltip'
import styles from './calculator.module.scss'

export default function FormRangeInput({
  label,
  tooltip = null,
  symbol,
  type = 'number',
  value,
  setValue,
  minValue,
  maxValue,
  step = '',
  currencyFormat = false,
  hideBar = false,
}) {
  const labelId = label.replace(' ', '-')

  const handleInputNumberChange = value => {
    if (currencyFormat) {
      value = Number(String(value).replaceAll(',', ''))
    }

    setValue(value)
  }

  return (
    <Row className="gx-4 gx-md-3 gx-lg-2">
      <Form.Label
        column="sm"
        xs={!hideBar ? 12 : 8}
        sm={3}
        lg={!hideBar ? 12 : 8}
        xl={4}
      >
        {label}{' '}
        {tooltip !== null && (
          <Tooltip
            anchorLink={tooltip?.anchorLink}
            anchorText={tooltip?.anchorText}
          >
            {tooltip?.text}
          </Tooltip>
        )}
      </Form.Label>
      {!hideBar && (
        <Col xs={8} sm={6} lg={8} xl={5} className="pt-1">
          <Form.Range
            min={minValue}
            max={maxValue}
            step={step}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </Col>
      )}
      <Col>
        <InputGroup size="sm" className="mb-3">
          {symbol?.position === 'start' && (
            <InputGroup.Text id={labelId}>{symbol?.label}</InputGroup.Text>
          )}
          <FormControl
            type={type}
            min={minValue}
            max={maxValue}
            value={
              currencyFormat
                ? Number(value).toLocaleString('en-US', {
                    maximumFractionDigits: 2,
                  })
                : value
            }
            onChange={e => handleInputNumberChange(e.target.value)}
            aria-label={label}
            aria-describedby={labelId}
            className={clsx(styles.inputNumber, 'text-end')}
          />
          {symbol?.position === 'end' && (
            <InputGroup.Text id={labelId}>{symbol?.label}</InputGroup.Text>
          )}
        </InputGroup>
      </Col>
    </Row>
  )
}
