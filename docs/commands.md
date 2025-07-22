# コマンドリファレンス

moon TypeScriptモノレポで利用可能なすべてのコマンドの詳細説明です。

## 🎯 基本概念

### コマンドの種類

- **`moon run`**: タスクを実行
- **`moon task`**: タスクの詳細情報を表示
- **`moon project`**: プロジェクトの詳細情報を表示
- **`moon query`**: プロジェクトやタスクの一覧表示

### タスクの指定方法

```bash
moon run :taskname          # 全プロジェクトで実行
moon run project:taskname   # 特定プロジェクトで実行
```

> 💡 **クイックスタートガイド**: よく使うコマンドは[クイックリファレンス](./quick-reference.md)をご覧ください。

## 🚀 開発関連コマンド

### 開発サーバー

```bash
# 特定アプリケーション開発サーバー起動
moon run projectA:dev
```

### ビルド

```bash
# 全プロジェクトのビルド
moon run :build-all

# 特定プロジェクトのビルド
moon run web:build          # webプロジェクトのみ
moon run shared:build       # sharedプロジェクトのみ

# 依存関係を含めてビルド
moon run web:build --dependents
```

## 🔍 コード品質管理

### Biomeコマンド

```bash
# 🎯 推奨: 自動修正（lint + format）
moon run :fix

# チェックのみ（lint + format）
moon run :check

# フォーマットのみ
moon run :format

# lintのみ
moon run :lint

# 全プロジェクトの型チェック
moon run :typecheck

# 特定プロジェクトのみ（webプロジェクト例）
moon run web:typecheck
moon run web:lint
moon run web:format
moon run web:check
moon run web:fix

```

## 📊 情報表示コマンド

### プロジェクト情報

```bash
# プロジェクト一覧
moon query projects

# 特定プロジェクトの詳細
moon project web
moon project shared
```

### タスク情報

```bash
# タスク一覧
moon query tasks

# 特定タスクの詳細
moon task web:dev
moon task shared:build
```

### 依存関係の確認

```bash
# プロジェクト依存関係グラフ
moon project-graph

# タスク依存関係グラフ
moon task-graph
```

## 🛠️ プロジェクト管理

### 依存関係管理

```bash
# 依存関係のインストール
pnpm install

# パッケージの追加
pnpm add --filter web [パッケージ名]        # webプロジェクトに追加
pnpm add --filter shared [パッケージ名]     # sharedプロジェクトに追加
```

### キャッシュ管理

```bash
# キャッシュのクリア
moon clean

# 強制実行（キャッシュを無視）
moon run :build --force
```

## 🚀 CI/CD向けコマンド

### CI環境での実行

```bash
# CI環境で実行
moon ci

# 特定ジョブの実行
moon ci --job 1 --jobTotal 2
```

### 高度な実行オプション

```bash
# 影響を受けるプロジェクトのみ実行
moon run :build --affected

# 依存関係を含めて実行
moon run :build --dependents

# 詳細ログ出力
moon run :build --log debug

# 実行サマリー表示
moon run :build --summary
```

## 💡 ヒント

- **開発効率**: `moon run :fix` を頻繁に使用してコード品質を保つ
- **型安全性**: 変更後は必ず `moon run :typecheck` で確認
- **依存関係**: moonが自動的に依存関係を解決するため、個別にsharedをビルドする必要はない
- **キャッシュ**: moonは効率的なキャッシュシステムを持つため、変更されたファイルのみ処理される
