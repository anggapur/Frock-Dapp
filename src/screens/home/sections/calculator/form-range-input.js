import clsx from 'clsx'
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import styles from './calculator.module.scss'

export default function FormRangeInput({
  label,
  symbol,
  type = 'number',
  value,
  setValue,
  minValue,
  maxValue,
  step = '',
}) {
  const labelId = label.replace(' ', '-')

  return (
    <Row>
      <Form.Label column="sm" xs={12} sm={3} lg={12} xl={4}>
        {label}
      </Form.Label>
      <Col xs={8} sm={6} lg={8} xl={5} className="pt-1">
        <Form.Range
          min={minValue}
          max={maxValue}
          step={step}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </Col>
      <Col xs={4} sm={3} lg={4} xl={3}>
        <InputGroup size="sm" className="mb-3">
          {symbol?.position === 'start' && (
            <InputGroup.Text id={labelId}>{symbol?.label}</InputGroup.Text>
          )}
          <FormControl
            type={type}
            min={minValue}
            max={maxValue}
            value={value}
            onChange={e => setValue(e.target.value)}
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
