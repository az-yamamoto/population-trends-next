'use client'
import styles from './CheckBox.module.scss'

type Props = {
  id: string
  checked: boolean
  onChange: () => void
  label: string
}

export const CheckBox = (props: Props) => {
  const { id, checked: get, onChange: set, label } = props

  const hundleOnClick = (): void => {
    set()
  }

  return (
    <div className={styles.container}>
      <input onChange={hundleOnClick} className={styles.checkbox} type="checkbox" checked={get} id={id} />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  )
}
