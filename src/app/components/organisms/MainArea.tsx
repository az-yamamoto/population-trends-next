'use client'
import { useState } from 'react'
import { PrefectureAndColor } from '../pages/GraphPage'
import GraphArea from './GraphArea'
import ListOfPrefecturesArea from './ListOfPrefecturesArea'

export default function MainArea(props: Props) {
  const { prefecturesDatas: prefecturesData } = props

  const [prefectures, setPrefectures] = useState<PrefectureAndColor[]>(prefecturesData)

  const updatePrefecturesData = (code: number) => {
    const newPrefecturesDatas = [...prefectures].map((prefecture) => ({
      ...prefecture,
      value: code === prefecture.prefCode ? !prefecture.value : prefecture.value,
    }))
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
