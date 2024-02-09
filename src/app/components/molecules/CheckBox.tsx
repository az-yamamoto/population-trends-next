'use client'
import styles from './CheckBox.module.scss'

export const CheckBox = (props: Props) => {
  const { id, get, set, children } = props

  const hundleOnClick = (): void => {
    set()
  }

  return (
    <div className={styles.container}>
      <input onChange={hundleOnClick} className={styles.checkbox} type="checkbox" checked={get} id={id} />
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
    </div>
  )
}

type Props = {
  id: string
  get: boolean
  set: () => void
  children: React.ReactNode
}
