'use client'
import { useState } from 'react'
import ListOfPrefecturesArea from './ListOfPrefecturesArea'
import GraphArea from './GraphArea'
import { PrefectureAndColor } from '../pages/GraphPage'

export default function MainArea(props: Props) {
  const { prefecturesData } = props

  const [prefectures, setPrefectures] = useState<PrefectureAndColor[]>(prefecturesData)

  const updatePrefecturesData = (code: number) => {
    const copyPrefecturesData = [...prefectures]
    const newPrefecturesData = copyPrefecturesData.map((prefecture) => {
      if (code === prefecture.prefCode) {
        return { ...prefecture, value: !prefecture.value }
      }
      return { ...prefecture }
    })
    setPrefectures(newPrefecturesData)
  }

  return (
    <>
      <ListOfPrefecturesArea prefectures={prefectures} updatePrefecturesData={updatePrefecturesData} />
      <GraphArea prefectures={prefectures} />
    </>
  )
}

type Props = {
  prefecturesData: PrefectureAndColor[]
}
