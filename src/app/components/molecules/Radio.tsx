'use client'
import styles from './Radio.module.scss'

export default function Radio<T>(props: Props<T>) {
  const { id, get, set, value, children } = props

  const checked = get === value

  const hundleOnClick = (): void => {
    set(value)
  }

  return (
    <div className={styles.container}>
      <input onChange={hundleOnClick} className={styles.radio} type="radio" checked={checked} id={id} />
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
    </div>
  )
}

type Props<T> = {
  id: string
  get: T
  set: (value: T) => void
  value: T
  children: React.ReactNode
}
