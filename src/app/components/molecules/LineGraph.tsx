'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function LineGraph(props: Props) {
  const { data, colors } = props

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 30, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(data[0] || {}).map((key) => {
          // 'name' フィールド以外のデータに対して処理を行う
          if (key !== 'name') {
            // 各都道府県のデータを線グラフで表示
            // eslint-disable-next-line no-bitwise
            const colorString = ((Math.random() * 0xffffff) | 0).toString(16)
            const randomColor = `#${`000000${colorString}`.slice(-6)}`
            const color = colors.find((c) => Object.keys(c).some((colorKey) => colorKey.includes(key)))
            return <Line key={key} type="monotone" dataKey={key} stroke={color?.[key] ?? randomColor} />
          }
          return null
        })}
      </LineChart>
    </ResponsiveContainer>
  )
}

export type ChartData = {
  name: number
} & Record<string, number>

type Props = {
  data: ChartData[]
  colors: {
    [x: string]: string
  }[]
}
