'use client'
import { useCallback, useEffect, useState } from 'react'
import LineGraph, { ChartData } from '../molecules/LineGraph'
import styles from './GraphArea.module.scss'
import Radio from '../molecules/Radio'
import { PopulationComposition } from '@/app/type/PopulationComposition'
import { PrefectureAndColor } from '../pages/GraphPage'

const GraphType = [
  { name: '総人口', value: 0 },
  { name: '年少人口', value: 1 },
  { name: '生産年齢人口', value: 2 },
  { name: '老年人口', value: 3 },
]

export default function GraphArea(props: Props) {
  const { prefectures } = props
  const [populationDataList, setPopulationDataList] = useState<PopulationComposition[]>([])
  const [graphData, setGraphData] = useState<ChartData[]>([])
  const [graphType, setGraphType] = useState(0)

  useEffect(() => {
    if (!prefectures || prefectures.length === 0) return

    const fetchData = async () => {
      try {
        // APIルートに対してリクエストを行う
        const response = await fetch('/api/populationComposition', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prefectures }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch data from API')
        }

        // 取得したデータを使ってグラフデータをセット
        const result = await response.json()
        setPopulationDataList(result)
      } catch (error) {
        console.error('Error fetching data from API:', error)
        // エラーが発生した場合の処理を追加
      }
    }

    fetchData()
  }, [prefectures])

  const createGraphData = useCallback(() => {
    const graphTypeName = GraphType.find((type) => type.value === graphType)?.name
    if (!graphTypeName) return
    if (!populationDataList) return
    // 年ごとに都道府県のデータをまとめる
    const mergedData: Record<number, ChartData> = {}
    populationDataList.forEach((populationData) => {
      const { prefName, data } = populationData
      data.forEach((category) => {
        if (category.label !== graphTypeName) return
        category.data.forEach((item) => {
          if (!mergedData[item.year]) {
            mergedData[item.year] = { name: item.year }
          }
          // 都道府県のデータを追加
          mergedData[item.year][prefName] = item.value
        })
      })
    })
    // ChartData[]形式のデータに変換
    const newGraphData = Object.values(mergedData)
    setGraphData(newGraphData)
  }, [populationDataList, graphType])

  useEffect(() => {
    createGraphData()
  }, [createGraphData, populationDataList, graphType])

  const colors = prefectures.map((prefecture) => ({ [`${prefecture.prefName}`]: prefecture.color }))

  return (
    <div className={styles.container}>
      <div className={styles.radio}>
        {GraphType.map((type) => (
          <Radio key={type.name} id={`${type.name}`} get={graphType} set={setGraphType} value={type.value}>
            {type.name}
          </Radio>
        ))}
      </div>
      {graphData.length !== 0 ? (
        <LineGraph data={graphData} colors={colors} />
      ) : (
        <div className={styles.message}>都道府県を選択してください</div>
      )}
    </div>
  )
}

type Props = {
  prefectures: PrefectureAndColor[]
}
