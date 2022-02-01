import clsx from 'clsx'
import styles from './button.module.scss'

export default function RoundButton({
  variant,
  size = 'medium',
  children,
  isRounded,
  isOutline,
  type = 'button',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        isRounded ? styles.round : '',
        isOutline ? styles.outline : '',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
