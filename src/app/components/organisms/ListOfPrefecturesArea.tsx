'use client'
import { CheckBox } from '../molecules/CheckBox'
import { PrefectureAndColor } from '../pages/GraphPage'
import styles from './ListOfPrefecturesArea.module.scss'

export const ListOfPrefecturesArea = (props: Props) => {
  const { prefectures, updatePrefecturesData } = props

  return (
    <div className={styles.container}>
      {prefectures.map((prefecture) => (
        <CheckBox
          key={prefecture.prefCode}
          id={`${prefecture.prefCode}`}
          checked={prefecture.value}
          onChange={() => updatePrefecturesData(prefecture.prefCode)}
          label={prefecture.prefName}
        />
      ))}
    </div>
  )
}

type Props = {
  prefectures: PrefectureAndColor[]
  updatePrefecturesData: (code: number) => void
}
