# tbls コマンドリファレンス

## 目次
- [基本コマンド](#基本コマンド)
- [tbls doc - ドキュメント生成](#tbls-doc---ドキュメント生成)
- [tbls diff - 差分表示](#tbls-diff---差分表示)
- [tbls lint - リント実行](#tbls-lint---リント実行)
- [tbls out - 各種形式での出力](#tbls-out---各種形式での出力)
- [tbls coverage - カバレッジ測定](#tbls-coverage---カバレッジ測定)
- [tbls completion - シェル補完](#tbls-completion---シェル補完)
- [tbls version - バージョン表示](#tbls-version---バージョン表示)
- [環境変数](#環境変数)
- [Docker使用例](#docker使用例)

---

## 基本コマンド

### コマンド構文
```bash
tbls [サブコマンド] [DSN] [オプション]
```

### ヘルプ表示
```bash
# 全般的なヘルプ
tbls help

# 特定のコマンドのヘルプ
tbls help doc
tbls help diff
tbls help lint
```

---

## tbls doc - ドキュメント生成

データベースを分析してGitHub対応のMarkdown形式でドキュメントを生成します。

### 基本使用法
```bash
# 設定ファイルを使用
tbls doc

# DSNを直接指定
tbls doc postgres://user:pass@localhost:5432/dbname

# DSNとドキュメントパスを指定
tbls doc postgres://user:pass@localhost:5432/dbname ./docs
```

### オプション
```bash
# テーブルのカラム幅を調整
tbls doc --adjust-table
tbls doc -j

# ベースURLを指定（リンク用）
tbls doc --base-url https://example.com/schema

# 設定ファイルを指定
tbls doc --config .tbls.yml
tbls doc -c custom-config.yml

# ER図の形式を指定（png, svg, jpg, mermaid）
tbls doc --er-format png
tbls doc -t svg

# 強制的に上書き
tbls doc --force
tbls doc -f

# 生成前に出力ディレクトリをクリーンアップ
tbls doc --rm-dist

# テーブルとカラムをソート
tbls doc --sort

# 実行条件を指定
tbls doc --when "ENV=production"

# ER図を生成しない
tbls doc --without-er
```

### 使用例
```bash
# PostgreSQL
tbls doc postgres://dbuser:dbpass@localhost:5432/mydb

# MySQL（AUTO_INCREMENTを非表示）
tbls doc "mysql://root:password@localhost:3306/mydb?hide_auto_increment"

# SQLite
tbls doc sqlite:///path/to/database.db

# BigQuery
tbls doc "bigquery://project-id/dataset-id?creds=/path/to/credentials.json"

# MongoDB（サンプルサイズ指定）
tbls doc "mongodb://admin:secret@localhost:27017/test?sampleSize=50"

# 環境変数を使用
tbls doc "mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:3306/${DB_NAME}"

# 複数のオプションを組み合わせ
tbls doc -c .tbls.yml --force --sort --rm-dist
```

---

## tbls diff - 差分表示

データベースとドキュメント、または2つのデータベース間の差分を表示します。

### 基本使用法
```bash
# データベースとドキュメントの差分
tbls diff

# 2つのデータベース間の差分
tbls diff postgres://user:pass@dev:5432/db postgres://user:pass@prod:5432/db

# データベースとJSONスキーマの差分
tbls diff postgres://user:pass@localhost:5432/db schema.json
```

### オプション
```bash
# カラム幅を調整
tbls diff --adjust-table
tbls diff -j

# 設定ファイルを指定
tbls diff --config .tbls.yml
tbls diff -c config.yml

# ER図形式を指定
tbls diff --er-format png
tbls diff -t svg

# ソートして比較
tbls diff --sort

# 実行条件を指定
tbls diff --when "BRANCH=main"
```

### 使用例
```bash
# ローカルとプロダクションの差分
tbls diff mysql://root:pass@localhost:3306/db mysql://root:pass@prod:3306/db

# 現在のデータベースとドキュメントの差分
tbls diff

# スキーマファイル間の差分
tbls diff schema_old.json schema_new.json

# GitHubのスキーマとローカルDBの差分
tbls diff github://owner/repo/schema.json postgres://localhost:5432/mydb
```

---

## tbls lint - リント実行

データベーススキーマを設定されたルールに基づいてチェックします。

### 基本使用法
```bash
# 設定ファイルのルールでリント
tbls lint

# DSNを指定してリント
tbls lint postgres://user:pass@localhost:5432/dbname
```

### オプション
```bash
# 設定ファイルを指定
tbls lint --config .tbls.yml
tbls lint -c lint-config.yml

# 実行条件を指定
tbls lint --when "CI=true"

# 出力形式を指定（デフォルト, json）
tbls lint --format json
```

### リントルールの例
```bash
# コメント必須チェック
tbls lint  # requireColumnComment, requireTableCommentなど

# カラム数チェック
tbls lint  # columnCount.max: 20

# リレーションチェック
tbls lint  # unrelatedTable, duplicateRelations

# 外部キーインデックスチェック
tbls lint  # requireForeignKeyIndex
```

### 使用例
```bash
# 基本的なリント
tbls lint

# 特定のデータベースをリント
tbls lint mysql://root:pass@localhost:3306/mydb

# CI環境での実行
tbls lint --when "CI=true" --format json

# 複数の設定ファイルを試す
tbls lint -c .tbls.yml || tbls lint -c .tbls.prod.yml
```

---

## tbls out - 各種形式での出力

スキーマ情報を様々な形式で出力します。

### 基本使用法
```bash
# 形式を指定して出力
tbls out -t [形式] -o [出力ファイル]
```

### 出力形式
- `md` - Markdown
- `dot` - DOT（Graphviz）
- `plantuml` / `puml` - PlantUML
- `mermaid` - Mermaid
- `svg` - SVG画像
- `png` - PNG画像
- `jpg` - JPEG画像
- `json` - JSON
- `yaml` / `yml` - YAML
- `xlsx` - Excel
- `config` - tbls設定ファイル

### オプション
```bash
# 出力形式を指定
tbls out --format md
tbls out -t json

# 出力ファイルを指定
tbls out --out schema.json
tbls out -o output.md

# 特定のテーブルのみ出力（画像形式の場合）
tbls out -t svg --table users

# ER図の距離を指定（画像形式の場合）
tbls out -t png --distance 2

# カラム幅を調整
tbls out -t md --adjust-table

# ソート
tbls out -t md --sort

# 設定ファイルを指定
tbls out -t json --config .tbls.yml
```

### 使用例
```bash
# Markdown形式で出力
tbls out -t md -o schema.md

# JSON形式で出力（他のツールとの連携用）
tbls out -t json -o schema.json

# PlantUML形式で出力
tbls out -t plantuml -o schema.puml

# Mermaid形式で出力
tbls out -t mermaid -o schema.mmd

# SVG画像として特定テーブルのER図を出力
tbls out -t svg --table users --distance 2 -o users.svg

# PNG画像として全体のER図を出力
tbls out -t png -o schema.png

# Excel形式で出力
tbls out -t xlsx -o schema.xlsx

# YAML形式で出力
tbls out -t yaml -o schema.yaml

# 現在のスキーマから設定ファイルを生成
tbls out -t config -o .tbls.generated.yml

# DOT形式で出力（Graphvizで処理可能）
tbls out -t dot -o schema.dot
# Graphvizでレンダリング
dot -Tpng schema.dot -o schema.png
```

---

## tbls coverage - カバレッジ測定

ドキュメントカバレッジ（コメント率）を測定・表示します。

### 基本使用法
```bash
# カバレッジを表示
tbls coverage

# DSNを指定
tbls coverage postgres://user:pass@localhost:5432/dbname
```

### オプション
```bash
# 設定ファイルを指定
tbls coverage --config .tbls.yml
tbls coverage -c config.yml

# 出力形式を指定（default, json）
tbls coverage --format json

# 実行条件を指定
tbls coverage --when "CHECK=true"
```

### 使用例
```bash
# 基本的なカバレッジ表示
tbls coverage

# JSON形式で出力（CI連携用）
tbls coverage --format json > coverage.json

# 特定のデータベースのカバレッジ
tbls coverage mysql://root:pass@localhost:3306/mydb

# パイプラインでの使用
tbls coverage --format json | jq '.tables[] | select(.coverage < 50)'
```

### 出力例
```
Table                       Coverage
All tables                  16.1%
 public.users               20%
 public.user_options        37.5%
 public.posts               35.3%
 public.comments            14.3%
```

---

## tbls completion - シェル補完

シェルの自動補完スクリプトを生成します。

### Bash
```bash
# 補完スクリプトを生成
tbls completion bash > /tmp/tbls_completion.bash

# 現在のセッションで有効化
source /tmp/tbls_completion.bash

# 永続的に有効化
echo "source /tmp/tbls_completion.bash" >> ~/.bashrc
```

### Zsh
```bash
# 補完スクリプトを生成
tbls completion zsh > /tmp/tbls_completion.zsh

# 現在のセッションで有効化
source /tmp/tbls_completion.zsh

# 永続的に有効化
echo "source /tmp/tbls_completion.zsh" >> ~/.zshrc
```

### Fish
```bash
# 補完スクリプトを生成して配置
tbls completion fish > ~/.config/fish/completions/tbls.fish
```

### PowerShell
```powershell
# 補完スクリプトを生成
tbls completion powershell > tbls_completion.ps1

# 現在のセッションで有効化
. ./tbls_completion.ps1
```

---

## tbls version - バージョン表示

tblsのバージョン情報を表示します。

```bash
# バージョン表示
tbls version

# 短縮形
tbls --version
```

---

## 環境変数

tblsで使用可能な環境変数：

### TBLS_DSN
データベース接続文字列
```bash
export TBLS_DSN="postgres://user:pass@localhost:5432/mydb"
tbls doc
```

### TBLS_DOC_PATH
ドキュメント出力パス
```bash
export TBLS_DOC_PATH="./documentation"
tbls doc
```

### 使用例
```bash
# 環境変数を設定して実行
export TBLS_DSN="mysql://root:pass@localhost:3306/mydb"
export TBLS_DOC_PATH="./docs"
tbls doc

# 一時的に環境変数を設定
TBLS_DSN="postgres://localhost:5432/test" tbls lint

# .envファイルから読み込み
source .env && tbls doc
```

---

## Docker使用例

### 基本的な使用
```bash
# ドキュメント生成
docker run --rm -v $PWD:/work -w /work \
  ghcr.io/k1low/tbls doc postgres://user:pass@host:5432/db

# 設定ファイルを使用
docker run --rm -v $PWD:/work -w /work \
  ghcr.io/k1low/tbls doc -c .tbls.yml
```

### ネットワーク接続
```bash
# ホストネットワークを使用
docker run --rm --network host -v $PWD:/work -w /work \
  ghcr.io/k1low/tbls doc postgres://localhost:5432/mydb

# Dockerネットワークを使用
docker run --rm --network mynetwork -v $PWD:/work -w /work \
  ghcr.io/k1low/tbls doc postgres://db:5432/mydb
```

### Docker Compose環境
```bash
# docker-compose.ymlと同じネットワーク
docker run --rm \
  --network myapp_default \
  -v $PWD:/work -w /work \
  ghcr.io/k1low/tbls doc mysql://root:pass@db:3306/mydb
```

### 環境変数を渡す
```bash
docker run --rm \
  -e TBLS_DSN="postgres://user:pass@db:5432/mydb" \
  -v $PWD:/work -w /work \
  ghcr.io/k1low/tbls doc
```

---

## CI/CD統合例

### GitHub Actions
```yaml
- name: Generate DB Documentation
  uses: k1low/setup-tbls@v1
- run: tbls doc

- name: Check Documentation
  run: |
    tbls diff
    tbls lint
```

### GitLab CI
```yaml
db-doc:
  script:
    - curl -sL https://raw.githubusercontent.com/k1LoW/tbls/main/use | sh
    - tbls doc
    - tbls lint
```

### Jenkins
```groovy
stage('Database Documentation') {
    steps {
        sh 'tbls doc --force'
        sh 'tbls coverage --format json > coverage.json'
    }
}
```

---

## トラブルシューティング用コマンド

### デバッグ情報の表示
```bash
# 詳細ログを表示（-vフラグ）
tbls doc -v

# 設定の検証
tbls out -t config -o - | head -20
```

### 接続テスト
```bash
# 最小限の出力でテスト
tbls out -t json -o /dev/null && echo "接続成功"
```

### スキーマの簡易確認
```bash
# テーブル一覧のみ
tbls out -t json | jq '.tables[].name'

# カラム数の確認
tbls out -t json | jq '.tables[] | {name: .name, columns: .columns | length}'
```
