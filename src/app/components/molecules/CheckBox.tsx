'use client'
import styles from './CheckBox.module.scss'

export const CheckBox = (props: Props) => {
  const { id, checked, onChange, label } = props

  const hundleOnClick = (): void => {
    onChange()
  }

  return (
    <div className={styles.container}>
      <input onChange={hundleOnClick} className={styles.checkbox} type="checkbox" checked={checked} id={id} />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  )
}

type Props = {
  id: string
  checked: boolean
  onChange: () => void
  label: string
}
