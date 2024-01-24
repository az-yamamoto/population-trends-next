# population-trends

RESASAPI を用いて各都道府県の（総人口、年少人口、生産年齢人口、老年人口）をグラフで表示するアプリです。\
[デモ](https://population-trends-lake.vercel.app/)

初めに[RESAS](https://resas.go.jp/#/13/13101)で API キーを取得してください。\
`.env.local`ファイルをプロジェクトのローカルに作成し、以下を記載してください。\
`RESAS_API_KEY='取得したRESASAPIキー'`\
`yarn dev`で実行できます。
