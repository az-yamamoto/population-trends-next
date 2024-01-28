import { PrefectureAndColor } from '@/app/components/pages/GraphPage'
import { PopulationComposition } from '@/app/type/PopulationComposition'
import { NextResponse } from 'next/server'

async function fetchPopulationComposition(prefectures: PrefectureAndColor[]) {
  const selectedPrefectures = prefectures.filter((prefecture) => prefecture.value)

  let newPopulationDataList: PopulationComposition[] = []

  if (selectedPrefectures.length === 0) {
    // value が true の都道府県がない場合は何もしない
    return newPopulationDataList
  }
  const populationDataPromises = selectedPrefectures.map(async (selectedPrefecture) => {
    const res = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${selectedPrefecture.prefCode}`,
      {
        headers: {
          'X-API-KEY': process.env.RESAS_API_KEY as string,
        },
      }
    )
    if (!res.ok) {
      throw new Error('Failed to fetch populationComposition')
    }
    const response = await res.json()
    return {
      prefCode: selectedPrefecture.prefCode,
      prefName: selectedPrefecture.prefName,
      boundaryYear: response.result.boundaryYear,
      data: response.result.data.map((category: any) => ({
        label: category.label,
        data: category.data,
      })),
    }
  })
  newPopulationDataList = await Promise.all(populationDataPromises)
  return newPopulationDataList
}

export async function POST(req: Request) {
  if (req.method === 'POST') {
    const { prefectures } = await req.json()

    if (prefectures.length === 0) return

    try {
      const result = await fetchPopulationComposition(prefectures)
      return NextResponse.json(result)
    } catch (error) {
      console.error('Error fetching populationComposition:', error)
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  } else {
    return NextResponse.json({ msg: 'wrong method' }, { status: 405 })
  }
}
