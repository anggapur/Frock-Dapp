import clsx from 'clsx'
import styles from './button.module.scss'

export default function RoundButton({
  variant,
  children,
  isRounded,
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        isRounded ? styles.round : ''
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
