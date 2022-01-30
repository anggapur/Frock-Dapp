import Card from '../../../../components/card/card'
import styles from './card-balance.module.scss'

export default function CardBalance() {
  return (
    <Card className={styles.wrapper}>
      <h2>Balance:</h2>
      <div>
        <FantomLogo />
        <p>00.00 $FTM</p>
      </div>
      <div>
        <FrockLogo />
        <p>00.00 $FTM</p>
      </div>
    </Card>
  )
}

const FantomLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.2 20C10.1 20 10 20 9.9 20H9.8H9.7C9.3 20 8.9 20 8.5 19.9C8 19.8 7.5 19.7 7 19.5C6.7 19.4 6.3 19.3 6 19.1C5.6 18.9 5.2 18.7 4.9 18.5C4.6 18.3 4.3 18.1 4 17.9C3.8 17.7 3.6 17.5 3.4 17.4C3.1 17.3 3 17.1 2.8 17C2.5 16.7 2.3 16.4 2 16.1C1.7 15.7 1.5 15.4 1.3 15C1.1 14.7 1 14.4 0.8 14.1C0.7 13.8 0.5 13.5 0.4 13.1C0.3 12.7 0.2 12.3 0.1 11.9C0 11.6 0 11.3 0 11C0 10.8 0 10.7 0 10.5C0 10.4 0 10.4 0 10.3C0 10.3 0 10.3 0 10.2C0 10.2 0 10.2 0 10.1V10C0 9.9 0 9.8 0 9.7V9.6V9.5C0 9.5 0 9.5 0 9.4C0 9.4 0 9.2 0 9C0 8.7 0.1 8.4 0.1 8.1C0.2 7.7 0.3 7.3 0.4 6.9C0.5 6.5 0.7 6.1 0.9 5.7C1.1 5.3 1.3 4.9 1.6 4.5C1.8 4.2 2.1 3.8 2.3 3.5C2.4 3.3 2.6 3.2 2.7 3C2.9 2.9 3 2.8 3.2 2.7C3.4 2.5 3.6 2.3 3.9 2.1C4.2 1.8 4.6 1.6 5 1.3C5.3 1.2 5.6 1 5.9 0.9C6.2 0.8 6.5 0.6 6.8 0.5C7.2 0.4 7.6 0.3 8 0.2C8.3 0.1 8.6 0.1 8.9 0C9.1 0 9.4 0 9.6 0C9.8 0 10 0 10.2 0C10.4 0 10.6 0 10.9 0C11.2 0 11.5 0.1 11.7 0.1C12.2 0.2 12.7 0.3 13.2 0.5C13.5 0.6 13.9 0.8 14.2 0.9C14.6 1.1 15.1 1.3 15.5 1.6C15.8 1.8 16.1 2 16.4 2.3C16.6 2.4 16.7 2.6 16.9 2.7C17 2.8 17.2 3 17.3 3.1C17.6 3.4 17.9 3.8 18.1 4.1C18.3 4.4 18.5 4.7 18.7 5.1C19 5.6 19.2 6 19.3 6.4C19.5 7 19.7 7.5 19.8 8.1C19.9 8.4 19.9 8.7 20 9C20 9.2 20 9.3 20 9.5C20 9.7 20 10 20 10.2C20 10.4 20 10.7 20 10.9C20 11.2 19.9 11.5 19.9 11.7C19.8 12.1 19.7 12.6 19.6 13C19.5 13.4 19.3 13.7 19.2 14.1C19 14.7 18.7 15.2 18.3 15.7C18.1 16 17.9 16.2 17.7 16.5C17.6 16.7 17.4 16.8 17.3 16.9C17 17.3 16.6 17.6 16.2 17.9C15.8 18.2 15.4 18.5 15 18.7C14.6 18.9 14.1 19.2 13.6 19.3C13.2 19.4 12.9 19.6 12.5 19.6C12.1 19.7 11.7 19.8 11.4 19.8C11.2 19.8 11 19.8 10.7 19.8C10.6 19.8 10.6 19.8 10.5 19.8H10.4C10.3 20 10.2 20 10.2 20Z"
      fill="#13B2E9"
    />
    <path
      d="M13.6992 10C13.6992 11.3 13.6992 12.7 13.6992 14C13.6992 14 13.6992 14.1 13.5992 14.1C12.3992 14.8 11.1992 15.5 9.99922 16.2H9.89922C8.69922 15.5 7.49922 14.8 6.19922 14.1C6.19922 14.1 6.19922 14.1 6.19922 14C6.19922 11.3 6.19922 8.60005 6.19922 5.90005V5.80005C7.49922 5.20005 8.69922 4.50005 9.99922 3.80005H10.0992C11.2992 4.50005 12.4992 5.20005 13.7992 5.90005C13.7992 5.90005 13.7992 5.90005 13.7992 6.00005C13.6992 7.30005 13.6992 8.60005 13.6992 10Z"
      fill="#FEFEFE"
    />
    <path
      d="M7 10.6001C7.1 10.7001 7.2 10.7001 7.3 10.8001C8.2 11.3001 9 11.8001 9.9 12.3001H10C11 11.7001 11.9 11.2001 12.9 10.6001C12.9 10.6001 12.9 10.6001 13 10.6001C13 11.6001 13 12.6001 13 13.6001V13.7001C12 14.3001 11.1 14.8001 10.1 15.4001H10C9 14.8001 8 14.3001 7 13.7001C7 13.7001 7 13.7001 7 13.6001C7 12.7001 7 11.7001 7 10.6001C7 10.7001 7 10.6001 7 10.6001Z"
      fill="#13B4EB"
    />
    <path
      d="M12.6004 6.09995C12.4004 6.19995 12.3004 6.29995 12.1004 6.39995C11.4004 6.79995 10.7004 7.19995 10.0004 7.59995H9.90039C9.10039 7.09995 8.20039 6.59995 7.40039 6.19995C8.20039 5.69995 9.10039 5.19995 9.90039 4.69995C9.90039 4.69995 9.90039 4.69995 10.0004 4.69995C10.9004 5.09995 11.7004 5.59995 12.6004 6.09995Z"
      fill="#13B4EB"
    />
    <path
      d="M7 6.80005C7.7 7.20005 8.5 7.70005 9.2 8.10005C8.5 8.50005 7.7 8.90005 7 9.40005C7 8.50005 7 7.60005 7 6.80005Z"
      fill="#13B4EB"
    />
    <path
      d="M13.0008 6.80005C13.0008 7.70005 13.0008 8.50005 13.0008 9.40005C12.3008 9.00005 11.5008 8.50005 10.8008 8.10005C11.5008 7.60005 12.2008 7.20005 13.0008 6.80005Z"
      fill="#13B4EB"
    />
    <path
      d="M10.4004 8.69995C11.2004 9.09995 11.9004 9.59995 12.6004 9.99995C11.9004 10.4 11.2004 10.8 10.4004 11.3C10.4004 10.4 10.4004 9.59995 10.4004 8.69995Z"
      fill="#13B4EB"
    />
    <path
      d="M7.40039 9.99995C8.20039 9.59995 8.90039 9.09995 9.60039 8.69995C9.70039 8.69995 9.70039 8.69995 9.70039 8.69995C9.70039 9.49995 9.70039 10.4 9.70039 11.2C9.70039 11.3 9.70039 11.3 9.70039 11.2C8.90039 10.9 8.10039 10.4 7.40039 9.99995Z"
      fill="#13B4EB"
    />
  </svg>
)

const FrockLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0153 20C4.48855 20 0 15.5114 0 10.0153C0 4.48855 4.48855 0 10.0153 0C15.542 0 20.0305 4.48855 20.0305 10.0153C20 15.5114 15.5115 20 10.0153 20Z"
      fill="url(#paint0_linear_718_4349)"
    />
    <path
      d="M13.8331 6.16799C12.001 4.33593 8.97809 4.33593 7.14603 6.16799C5.86359 7.45043 5.46664 9.31303 5.98573 10.9313L4.94756 11.2672C4.79489 11.3283 4.73382 11.481 4.79489 11.6031C4.91702 11.9084 5.31397 12.397 5.80252 12.9466C5.83305 12.9772 5.83305 12.9772 5.86359 13.0077C6.10786 13.252 6.47428 13.313 6.77962 13.1909C6.84069 13.1604 6.90176 13.2214 6.87122 13.2825C6.74908 13.5573 6.81015 13.9237 7.02389 14.168L7.05443 14.1985C7.08496 14.2291 7.1155 14.2596 7.14603 14.2901C7.66512 14.7481 8.12313 15.084 8.39794 15.2062C8.55061 15.2672 8.70328 15.1756 8.73382 15.0535L9.0697 14.0153C10.688 14.5344 12.5506 14.1375 13.8331 12.855C15.6956 11.023 15.6956 8.00005 13.8331 6.16799ZM7.63458 11.5115L7.66512 11.481C7.90939 11.2672 8.2758 11.2978 8.48954 11.5115C8.70328 11.7252 8.73382 12.0917 8.52008 12.3359L8.48954 12.3665C8.24527 12.6107 7.84832 12.6107 7.60405 12.3665C7.39031 12.1222 7.39031 11.7558 7.63458 11.5115ZM12.917 11.939C11.9705 12.8855 10.6575 13.1604 9.46664 12.7939L10.4437 9.89318C10.5048 9.67944 10.3216 9.49624 10.1079 9.5573L7.2071 10.5344C6.84069 9.34356 7.1155 8.03059 8.06206 7.08402C9.40557 5.74051 11.5735 5.74051 12.917 7.08402C14.2605 8.42753 14.2605 10.5955 12.917 11.939Z"
      fill="white"
    />
    <path
      d="M5.5881 15.2367H4.76367V14.4123C4.76367 13.9543 5.13008 13.5879 5.5881 13.5879C6.04612 13.5879 6.41253 13.9543 6.41253 14.4123C6.41253 14.8703 6.04612 15.2367 5.5881 15.2367Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_718_4349"
        x1="1.94183"
        y1="2.01969"
        x2="16.8556"
        y2="16.7894"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.3827" stopColor="#EF473A" />
        <stop offset="0.8792" stopColor="#CB2D3E" />
      </linearGradient>
    </defs>
  </svg>
)
