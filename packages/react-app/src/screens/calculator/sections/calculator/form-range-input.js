import React, { useEffect, useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';

import clsx from 'clsx';

import Tooltip from '../../../../components/tooltip/tooltip';
import styles from './calculator.module.scss';

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
  const [rangeValue, setRangeValue] = useState(value);
  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    setRangeValue(value);
  }, [value]);

  useEffect(() => {
    setValueToInput(rangeValue);
    setValue(Number(rangeValue));
  }, [rangeValue]);

  const labelId = label.replace(' ', '-');

  const handleInputNumberBlur = _value => {
    if (currencyFormat) {
      _value = Number(String(_value).replaceAll(',', ''));
    }

    if (_value < minValue) {
      _value = minValue;
    }

    if (_value > maxValue) {
      _value = maxValue;
    }

    if (_value === rangeValue) {
      setValueToInput(_value);
    }

    setRangeValue(_value);
  };

  const setValueToInput = _value => {
    const _inputValue = currencyFormat
      ? Number(_value).toLocaleString('en-US', { maximumFractionDigits: 2 })
      : _value;

    setInputValue(_inputValue);
  };

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
        <Col xs={8} sm={6} lg={8} xl={4} className="pt-1">
          <Form.Range
            min={minValue}
            max={maxValue}
            step={step}
            value={rangeValue}
            onChange={e => setRangeValue(Number(e.target.value))}
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
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onBlur={e => handleInputNumberBlur(e.target.value)}
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
  );
}
