'use client'
import { useState } from 'react'
import { PrefectureAndColor } from '../pages/GraphPage'
import GraphArea from './GraphArea'
import ListOfPrefecturesArea from './ListOfPrefecturesArea'

export default function MainArea(props: Props) {
  const { prefecturesDatas: prefecturesData } = props

  const [prefectures, setPrefectures] = useState<PrefectureAndColor[]>(prefecturesData)

  const updatePrefecturesData = (code: number) => {
    const newPrefecturesDatas = [...prefectures].map((prefecture) => {
      if (code === prefecture.prefCode) {
        return { ...prefecture, value: !prefecture.value }
      }
      return { ...prefecture }
    })
    setPrefectures(newPrefecturesDatas)
  }

  return (
    <>
      <ListOfPrefecturesArea prefectures={prefectures} updatePrefecturesData={updatePrefecturesData} />
      <GraphArea prefectures={prefectures} />
    </>
  )
}

type Props = {
  prefecturesDatas: PrefectureAndColor[]
}
