import GlobalHeader from '../organisms/GlobalHeader'
import styles from './GraphPage.module.scss'
import MainArea from '../organisms/MainArea'
import { Prefecture } from '@/app/type/Prefecture'

async function fetchPrefectures() {
  const res = await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
    headers: {
      'X-API-KEY': process.env.RESAS_API_KEY as string,
    },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch prefectures')
  }
  const response = await res.json()
  const prefectures: Prefecture[] = response.result
  return prefectures
}

export default async function GraphPage() {
  const prefectures = await fetchPrefectures()

  const getRandomColor = () => {
    const randomInt = () => Math.floor(Math.random() * 256)
    const r = randomInt()
    const g = randomInt()
    const b = randomInt()
    return `rgb(${r}, ${g}, ${b})`
  }

  const generateRandomColors = (count: number) => {
    const colors = []
    for (let i = 0; i < count; i += 1) {
      colors.push(getRandomColor())
    }
    return colors
  }

  // 例: 47個のランダムな色を生成
  const randomColors = generateRandomColors(47)

  let prefecturesData: PrefectureAndColor[] = prefectures.map((prefecture, index) => ({
    ...prefecture,
    value: false,
    color: randomColors[index],
  }))

  return (
    <>
      <GlobalHeader />
      <div className={styles.container}>
        <MainArea prefecturesData={prefecturesData} />
      </div>
    </>
  )
}

export interface PrefectureAndColor extends Prefecture {
  value: boolean
  color: string
}
