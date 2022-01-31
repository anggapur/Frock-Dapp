import { FormControl, InputGroup } from 'react-bootstrap'
import Card from '../../../../components/card/card'
import RoundButton from '../../../../components/button/button'
import Tooltip from '../../../../components/tooltip/tooltip'
import styles from './card-deposit.module.scss'
import { useState } from 'react'

export default function CardDeposit() {
  const [selected, setSelected] = useState('deposit')

  return (
    <Card lineBottom="light" className={styles.wrapper}>
      <div className={styles.header}>
        <div
          className={selected === 'deposit' ? styles.selected : ''}
          onClick={() => setSelected('deposit')}
        >
          <svg
            width="13"
            height="15"
            viewBox="0 0 13 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.19832 15C5.93454 14.9275 5.74834 14.7518 5.55827 14.5686C3.81269 12.8468 2.06711 11.1288 0.317645 9.41079C-0.0120759 9.08628 -0.109052 8.68923 0.13145 8.36854C0.356436 8.07075 0.635729 7.80351 0.934417 7.57445C1.20207 7.36829 1.59774 7.42937 1.86151 7.64698C1.91582 7.68898 1.96625 7.73861 2.0128 7.78824C3.0136 8.77704 4.0144 9.76584 5.01908 10.7546C5.05787 10.7928 5.09666 10.8272 5.15872 10.8806C5.15872 10.7966 5.15872 10.7394 5.15872 10.6821C5.15872 7.44082 5.15873 4.19954 5.15873 0.958259C5.15873 0.335963 5.4962 0.00381693 6.13237 -5.73409e-07C6.32633 -5.56453e-07 6.52028 -0.0038181 6.71423 -5.22541e-07C7.17584 0.0114531 7.5172 0.33978 7.54047 0.797912C7.54435 0.855178 7.54047 0.916263 7.54047 0.973529C7.54047 4.19572 7.54047 7.41792 7.54047 10.6401C7.54047 10.6974 7.54047 10.7546 7.54047 10.8425C7.59866 10.789 7.63745 10.7585 7.67236 10.7241C8.68092 9.7353 9.6856 8.74268 10.6942 7.75388C11.0161 7.44082 11.4351 7.34156 11.757 7.57826C12.0596 7.79969 12.3311 8.07457 12.56 8.36854C12.7733 8.64342 12.7113 9.02138 12.4863 9.29244C12.4436 9.34589 12.3932 9.39552 12.3428 9.44133C10.6049 11.1555 8.86324 12.8659 7.12541 14.58C6.9431 14.7633 6.75302 14.9313 6.497 15C6.39615 15 6.29917 15 6.19832 15Z"
              fill={selected === 'deposit' ? '#CB2D3E' : '#7E7A7A'}
            />
          </svg>
          <h2>Deposit</h2>
        </div>
        <div
          className={selected === 'withdraw' ? styles.selected : ''}
          onClick={() => setSelected('withdraw')}
        >
          <svg
            width="13"
            height="15"
            viewBox="0 0 13 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.49309 0C6.75687 0.0725375 6.94306 0.248155 7.13314 0.431408C8.87872 2.15322 10.6243 3.87121 12.3738 5.58921C12.7035 5.91372 12.8005 6.31077 12.56 6.63146C12.335 6.92924 12.0557 7.19649 11.757 7.42555C11.4893 7.63171 11.0937 7.57063 10.8299 7.35302C10.7756 7.31102 10.7252 7.26139 10.6786 7.21176C9.67781 6.22296 8.67701 5.23416 7.67233 4.24536C7.63354 4.20718 7.59475 4.17282 7.53268 4.11937C7.53268 4.20336 7.53268 4.26063 7.53268 4.31789C7.53268 7.55918 7.53268 10.8005 7.53268 14.0417C7.53268 14.664 7.1952 14.9962 6.55904 15C6.36508 15 6.17113 15.0038 5.97718 15C5.51557 14.9885 5.17421 14.6602 5.15093 14.2021C5.14705 14.1448 5.15093 14.0837 5.15093 14.0265C5.15093 10.8043 5.15093 7.58208 5.15093 4.35989C5.15093 4.30262 5.15093 4.24536 5.15093 4.15755C5.09275 4.211 5.05396 4.24154 5.01904 4.2759C4.01049 5.2647 3.00581 6.25732 1.99725 7.24612C1.67529 7.55918 1.25635 7.65844 0.934384 7.42174C0.631816 7.20031 0.360281 6.92543 0.131416 6.63146C-0.0819328 6.35658 -0.0198677 5.97862 0.205118 5.70756C0.247788 5.65411 0.298216 5.60448 0.348644 5.55867C2.08647 3.84449 3.82817 2.13413 5.56599 0.419954C5.74831 0.236701 5.93838 0.0687198 6.1944 0C6.29526 0 6.39224 0 6.49309 0Z"
              fill={selected === 'withdraw' ? '#CB2D3E' : '#7E7A7A'}
            />
          </svg>
          <h2>Withdraw</h2>
        </div>
      </div>
      <div className={styles.main}>
        {selected === 'deposit' ? (
          <>
            <h3>
              Your total Contribution{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h3>
            <h2>200 $USDC</h2>
            <p>Maximum Contribution: 800 $USDC</p>
            <InputGroup size="lg" className={styles.inputGroup}>
              <FormControl
                type="text"
                aria-label="deposit"
                aria-describedby="deposit"
                className={styles.input}
                placeholder="Contribution Amount"
              />
              <InputGroup.Text id="deposit" className={styles.inputSymbol}>
                MAX
              </InputGroup.Text>
            </InputGroup>
            <RoundButton variant="primary" className={styles.button} isRounded>
              Deposit
            </RoundButton>
          </>
        ) : (
          <>
            <h3>
              Your total Contribution{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h3>
            <h2>200 $USDC</h2>
            <p>Maximum Contribution: 800 $USDC</p>
            <InputGroup size="lg" className={styles.inputGroup}>
              <FormControl
                type="text"
                aria-label="withdraw"
                aria-describedby="withdraw"
                className={styles.input}
                placeholder="Contribution Amount"
              />
              <InputGroup.Text id="withdraw" className={styles.inputSymbol}>
                MAX
              </InputGroup.Text>
            </InputGroup>
            <RoundButton variant="primary" className={styles.button} isRounded>
              Withdraw
            </RoundButton>
          </>
        )}
      </div>
    </Card>
  )
}
