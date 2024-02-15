'use client'
import styles from './Radio.module.scss'

type Props<T> = {
  id: string
  selectedValue: T
  onClick: (value: T) => void
  value: T
  children: React.ReactNode
}

export default function Radio<T>(props: Props<T>) {
  const { id, selectedValue, onClick, value, children } = props

  const checked = selectedValue === value

  const hundleClick = (): void => {
    onClick(value)
  }

  return (
    <div className={styles.container}>
      <input onChange={hundleClick} className={styles.radio} type="radio" checked={checked} id={id} />
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
    </div>
  )
}
