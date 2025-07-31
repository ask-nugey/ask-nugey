# 設定ガイド

moonrepoの設定ファイルについて詳しく説明します。

## 📁 設定ファイル一覧

### ワークスペースレベル

| ファイル              | 説明               |
| --------------------- | ------------------ |
| `.moon/workspace.yml` | Moon全体設定       |
| `.moon/tasks.yml`     | 共通タスク定義     |
| `biome.json`          | コード品質設定     |
| `package.json`        | bunワークスペース  |
| `tsconfig.json`       | TypeScript基本設定 |

### プロジェクトレベル

| ファイル        | 説明                   |
| --------------- | ---------------------- |
| `moon.yml`      | プロジェクト固有設定   |
| `package.json`  | パッケージ依存関係     |
| `tsconfig.json` | プロジェクト固有TS設定 |

## 🔧 詳細設定

### .moon/workspace.yml

```yaml
# Moonバージョン制約
versionConstraint: ">=1.33.0"

# プロジェクト発見パターン
projects:
  - "apps/*"           # アプリケーション層
  - "packages/*"       # ライブラリ層
  - "services/*"       # サービス層（オプション）
  - "tools/*"          # ツール群（オプション）

# VCS設定
vcs:
  provider: "github"   # "github" | "gitlab" | "bitbucket" | "other"
  defaultBranch: "main"
```

### .moon/tasks.yml

```yaml
# ファイルグループ定義
fileGroups:
  sources:
    - "src/**/*.{ts,tsx,js,jsx}"
    - "lib/**/*.{ts,tsx,js,jsx}"
  tests:
    - "**/*.test.{ts,tsx,js,jsx}"
    - "**/*.spec.{ts,tsx,js,jsx}"
  configs:
    - "*.json"
    - "*.yml"
    - "*.yaml"
    - "tsconfig.json"
    - "biome.json"

# 共通タスク定義
tasks:
  build:
    description: "プロジェクトをビルド"
    command: "tsc"
    inputs:
      - "@group(sources)"
      - "@group(configs)"
    outputs:
      - "dist"

  typecheck:
    description: "型チェックを実行"
    command: "tsc"
    args: ["--noEmit"]
    inputs:
      - "@group(sources)"
      - "@group(configs)"

  test:
    description: "テストを実行"
    command: "vitest"
    args: ["run"]
    inputs:
      - "@group(sources)"
      - "@group(tests)"
      - "@group(configs)"

  # Biome関連
  lint:
    description: "Lintチェックを実行"
    command: "biome"
    args: ["lint", "."]
    inputs:
      - "@group(sources)"
      - "@group(configs)"

  format:
    description: "コードフォーマットを実行"
    command: "biome"
    args: ["format", "--write", "."]
    inputs:
      - "@group(sources)"
      - "@group(configs)"

  fix:
    description: "自動修正を実行"
    command: "biome"
    args: ["check", "--fix", "."]
    inputs:
      - "@group(sources)"
      - "@group(configs)"
```

### TypeScript設定
TypeScriptの詳細な設定については、[TypeScript設定ガイド](./configuration-typescript.md)を参照してください。

### プロジェクト設定（moon.yml）

```yaml
# プロジェクト情報
project:
  name: "Project Name"
  description: "プロジェクトの説明"

# 分類情報
type: "application"      # "application" | "library" | "tool"
language: "typescript"  # "typescript" | "javascript" | "rust"
stack: "frontend"        # "frontend" | "backend" | "infrastructure" | "unknown"
tags:
  - "typescript"         # 技術タグ
  - "react"             # フレームワークタグ
  - "web"               # カテゴリタグ

# タスク定義
tasks:
  dev:
    description: "開発サーバーを起動"
    command: "tsx"
    args: ["watch", "src/index.ts"]
    inputs:
      - "src/**/*.{ts,tsx}"
      - "dependency-project:src/**/*.{ts,tsx}"
      - "dependency-project:dist/**/*"
    deps:
      - "dependency-project:build"
    options:
      persistent: true
      cache: false
      runInCI: false

  build:
    description: "プロダクション用ビルド"
    command: "tsc"
    inputs:
      - "src/**/*.{ts,tsx}"
      - "tsconfig.json"
    outputs:
      - "dist"
    deps:
      - "dependency-project:build"

  typecheck:
    description: "型チェックを実行"
    command: "tsc"
    args: ["--noEmit"]
    inputs:
      - "src/**/*.{ts,tsx}"
      - "tsconfig.json"
    deps:
      - "dependency-project:build"
```

## 🎯 設定のベストプラクティス

### ファイルグループの活用

```yaml
# 効率的なファイルグループ
fileGroups:
  sources:
    - "src/**/*.{ts,tsx}"    # ソースファイル
  configs:
    - "*.{json,yml,yaml}"    # 設定ファイル
  tests:
    - "**/*.{test,spec}.ts"  # テストファイル
```

### 依存関係の明示

```yaml
# 明確な依存関係設定
tasks:
  typecheck:
    deps:
      - "shared:build"      # 型チェック前にビルド必要
  
  test:
    deps:
      - "shared:build"      # テスト前にビルド必要
```

### 適切なキャッシュ設定

```yaml
tasks:
  dev:
    options:
      cache: false          # 開発サーバーはキャッシュ無効
      persistent: true      # 継続実行

  build:
    options:
      cache: true           # ビルドはキャッシュ有効
```

## 🔄 設定の拡張

### 新しいツールの追加

```yaml
# 例: vitestの追加
tasks:
  test:
    description: "Vitestでテスト実行"
    command: "vitest"
    args: ["run"]
    inputs:
      - "@group(sources)"
      - "@group(tests)"
      - "vitest.config.ts"
```

### CI/CD向け設定

```yaml
tasks:
  ci-build:
    description: "CI用ビルド"
    command: "tsc"
    options:
      cache: false          # CI環境ではキャッシュ無効
      runFromWorkspaceRoot: true
```

## 📋 設定チェックリスト

### 新しいプロジェクト追加時

- [ ] `moon.yml`にproject情報を設定
- [ ] 適切なtype, stack, tagsを設定
- [ ] 依存関係（deps）を明示
- [ ] inputs/outputsを適切に設定
- [ ] 必要に応じてoptionsを調整

### 設定変更時

- [ ] `moon query projects`で認識確認
- [ ] `moon query tasks`でタスク確認
- [ ] `moon run :build`で動作確認
- [ ] キャッシュが適切に動作するか確認
