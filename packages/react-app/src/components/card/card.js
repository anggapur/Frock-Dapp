import clsx from 'clsx'
import Ellipse from './ellipse'
import styles from './card.module.scss'

function getLineButtonClass(type) {
  if (type !== 'primary' && type !== 'light') {
    return ''
  }

  return styles[`line-bottom-${type}`]
}

const Card = ({
  children,
  ellipse = '',
  lineBottom = '',
  className = '',
  ...rest
}) => {
  return (
    <div className={clsx(styles.card, className)} {...rest}>
      <Ellipse position={ellipse} />
      {children}
      <div className={getLineButtonClass(lineBottom)} />
    </div>
  )
}

Card.Footer = ({ children, className = '', ...rest }) => (
  <div className={clsx(styles.footer, className)} {...rest}>
    {children}
  </div>
)

export default Card
