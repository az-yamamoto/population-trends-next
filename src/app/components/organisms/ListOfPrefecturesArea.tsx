'use client'
import CheckBox from '../molecules/CheckBox'
import type { ExtendedPrefecture } from '../pages/GraphPage'
import styles from './ListOfPrefecturesArea.module.scss'

export default function ListOfPrefecturesArea(props: Props) {
  const { prefectures, updatePrefecturesData } = props

  return (
    <div className={styles.container}>
      {prefectures.map((prefecture) => (
        <CheckBox
          key={prefecture.prefCode}
          id={`${prefecture.prefCode}`}
          get={prefecture.value}
          set={() => updatePrefecturesData(prefecture.prefCode)}
        >
          {prefecture.prefName}
        </CheckBox>
      ))}
    </div>
  )
}

type Props = {
  prefectures: ExtendedPrefecture[]
  updatePrefecturesData: (code: number) => void
}
