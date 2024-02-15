'use client'
import { useState } from 'react'
import { ListOfPrefecturesArea } from './ListOfPrefecturesArea'
import { GraphArea } from './GraphArea'
import { PrefectureAndColor } from '../pages/GraphPage'

export const MainArea = (props: Props) => {
  const { prefecturesDatas } = props

  const [prefectures, setPrefectures] = useState<PrefectureAndColor[]>(prefecturesDatas)

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
