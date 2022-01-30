import { Container, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RoundButton from '../button/button'
import CompanyLogo from '../logo/company-logo'
import './header.scss'

function NotificationBar({ text }) {
  return (
    <div className="notification-bar">
      <p>{text}</p>
    </div>
  )
}

export default function Header() {
  return (
    <header>
      <NotificationBar text="Some notice can go here to alert users on anything newsworthy" />
      <Container>
        <CompanyLogo />
        <nav>
          <Link to="/public-sale" className="nav-link">
            Public Sale
          </Link>
          <Link to="/community-sale" className="nav-link">
            Community Sale
          </Link>
          <Dropdown align="end">
            <Dropdown.Toggle variant="link">
              $FROCK{' '}
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9004 4.94995L5.95064 9.8997"
                  stroke="#CB2D3E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1 4.94995L5.94975 9.8997"
                  stroke="#CB2D3E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                Add $FROCK to wallet
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">Buy $FROCK</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <RoundButton variant="primary" isRounded>
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="logo"
            >
              <path
                d="M17.7256 2.70523C14.1493 -0.901745 8.34315 -0.901745 4.7669 2.70523C2.27404 5.21951 1.52724 8.8371 2.51596 12.0197L4.89312 11.2241C4.18839 8.91136 4.73534 6.3016 6.54451 4.48751C9.14255 1.86714 13.3604 1.86714 15.9585 4.48751C18.5565 7.10787 18.5565 11.362 15.9585 13.9823C14.1598 15.7964 11.5723 16.3587 9.28981 15.6479L8.50093 18.0455C11.6564 19.0427 15.2432 18.2895 17.7361 15.7646C21.3018 12.1682 21.3018 6.3016 17.7256 2.70523Z"
                fill="white"
              />
              <path
                d="M10.5002 9.32499L4.88339 11.2134L2.50624 12.009L0.518271 12.6774C0.234276 12.7728 0.0870186 13.0805 0.192202 13.3563C0.413088 13.9398 1.17041 14.9264 2.11706 15.9873C2.14862 16.0297 2.19069 16.0722 2.23276 16.1146C2.23276 16.1146 2.23276 16.1146 2.24328 16.1252C2.71661 16.6026 3.42134 16.7193 4.01036 16.4647C4.11555 16.4223 4.22073 16.5283 4.17866 16.6344C3.93674 17.1967 4.0314 17.865 4.46265 18.3424C4.48369 18.3637 4.50473 18.3849 4.52576 18.4167C4.58887 18.4804 4.65198 18.5334 4.72561 18.5864C5.71434 19.4776 6.61892 20.1671 7.15535 20.3687C7.42883 20.4748 7.74438 20.3263 7.82853 20.0398L8.49118 18.0348L9.28006 15.6372L11.1523 9.97213C11.2891 9.5796 10.9104 9.19769 10.5002 9.32499ZM7.37624 14.8309C6.91343 15.2977 6.15611 15.2977 5.6933 14.8309C5.23049 14.3642 5.23049 13.6003 5.6933 13.1335C5.71434 13.1123 5.74589 13.0805 5.77745 13.0593C6.24026 12.6668 6.94499 12.688 7.37624 13.1335C7.81801 13.5791 7.83905 14.2793 7.44987 14.7461C7.42883 14.7779 7.40779 14.8097 7.37624 14.8309Z"
                fill="white"
              />
              <path
                d="M1.76013 20.4109H0.171875V18.809C0.171875 17.9284 0.876598 17.207 1.76013 17.207C2.63315 17.207 3.34839 17.9178 3.34839 18.809C3.33787 19.6895 2.63315 20.4109 1.76013 20.4109Z"
                fill="white"
              />
            </svg>
            Connect
          </RoundButton>
        </nav>
      </Container>
    </header>
  )
}
