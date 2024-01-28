type PopulationDataItem = {
  year: number
  value: number
  rate?: number // rateは年少人口のデータにのみ存在する
}

type PopulationDataCategory = {
  label: string
  data: PopulationDataItem[]
}

export type PopulationComposition = {
  prefCode: number
  prefName: string
  boundaryYear: number
  data: PopulationDataCategory[]
}
