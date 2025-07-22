# アーキテクチャ詳細

このドキュメントでは、moon TypeScriptモノレポテンプレートの技術的なアーキテクチャについて詳しく説明します。

> 📋 **設定の詳細**: 設定ファイルについては[設定ガイド](./configuration.md)をご覧ください。

## 📁 ディレクトリ構造詳細

### ルートレベル

```
/
├── .moon/                    # Moon設定
│   ├── workspace.yml        # ワークスペース設定
│   └── tasks.yml           # グローバルタスク定義
├── apps/                   # アプリケーション
├── packages/               # 共有ライブラリ
├── docs/                   # ドキュメント
├── biome.json             # コード品質設定
├── package.json           # ルートパッケージ設定
├── pnpm-workspace.yaml    # pnpmワークスペース定義
└── tsconfig.json          # TypeScript基本設定
```

## 🔧 技術スタック詳細

### Moon (モノレポ管理)

**役割**: タスク実行、依存関係管理、キャッシュ

**設定ファイル**:
- `.moon/workspace.yml`: プロジェクト発見、VCS設定
- `.moon/tasks.yml`: 共通タスク定義
- `*/moon.yml`: プロジェクト固有設定

### TypeScript Project References

**役割**: プロジェクト間の型情報共有

**設定**:
```json
// apps/web/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "references": [
    { "path": "../../packages/shared" }
  ]
}
```

### Biome (コード品質)

**役割**: Linting + Formatting

**設定ファイル**: `biome.json`（ルートレベル）

### pnpm (パッケージ管理)

**役割**: 依存関係管理、ワークスペース

**設定ファイル**: `pnpm-workspace.yaml`

## 🚀 新しいプロジェクト・パッケージの追加

moonrepoは新しいプロジェクトの追加が簡単で、モノレポの拡張性に優れています。

> 📚 **新しいプロジェクトの追加**: 詳細な手順と設定例は[プロジェクト追加ガイド](./adding-projects.md)をご覧ください

## 🔧 設定ファイル

このテンプレートでは複数の設定ファイルを使用してシステムを構成しています：

> 🔧 **設定の詳細**: 各設定ファイルの詳しい説明と設定例は[設定ガイド](./configuration.md)をご覧ください
