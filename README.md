# auto-restarter
一定時間ごとにプログラムを自動再起動するプログラム

# configについて
設定は `config.yml` から行います<br>
```yaml
loggerLevel: all # ログのレベル
configLoadInterval: 60000 # 設定ファイルの再読み込み頻度 単位 ms
restartInterval: 5 # プログラムの再起動頻度 単位 m
cmd: "run" # 実行するコマンド
cwd: "test" # コマンドを実行するカレントディレクトリ
arg: # スペースが必要な引数をここで追加していく
  - "--o"
  - "test"
```
