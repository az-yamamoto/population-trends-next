import GlobalHeader from '../atoms/GlobalHeader'
import styles from './GraphPage.module.scss'
import { MainArea } from '../organisms/MainArea'
import { Prefecture } from '@/app/type/Prefecture'
import { notFound } from 'next/navigation'

async function fetchPrefectures() {
  const res = await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
    headers: {
      'X-API-KEY': process.env.RESAS_API_KEY as string,
    },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch prefectures')
  }
  return (await res.json()).result as Prefecture[]
}

export default async function GraphPage() {
  const prefectures = await fetchPrefectures()

  if (!prefectures) {
    return notFound()
  }

  const getRandomColor = () => {
    const randomInt = () => Math.floor(Math.random() * 256)
    const r = randomInt()
    const g = randomInt()
    const b = randomInt()
    return `rgb(${r}, ${g}, ${b})`
  }

  let prefecturesDatas: PrefectureAndColor[] = prefectures.map((prefecture) => ({
    ...prefecture,
    value: false,
    color: getRandomColor(),
  }))

  return (
    <>
      <GlobalHeader />
      <div className={styles.container}>
        <MainArea prefecturesDatas={prefecturesDatas} />
      </div>
    </>
  )
}

export interface PrefectureAndColor extends Prefecture {
  value: boolean
  color: string
}
