# クイックリファレンス

よく使用するコマンドと設定の簡単なリファレンスです。

## 🚀 よく使うコマンド

```bash
# 📝 開発開始
bun install               # 依存関係インストール
moon run web:dev          # 開発サーバー起動

# ✨ コード品質管理（日常使用）
moon run :fix         # 自動修正（推奨）
moon run :typecheck   # 型チェック

# 🏗️ ビルド
moon run :build       # 全プロジェクトビルド

# 🔧 トラブル時
moon clean               # キャッシュクリア
```

> 📖 全コマンドの詳細は[コマンドリファレンス](./commands.md)をご覧ください

## 📋 基本構成

```
moon-ts/
├── .moon/              # Moon設定
├── apps/web/           # Webアプリケーション  
├── packages/shared/    # 共有ライブラリ
└── biome.json         # コード品質設定
```

**技術スタック**: Moon + TypeScript + Biome + Bun

> 🏗️ 詳細なアーキテクチャは[アーキテクチャガイド](./architecture.md)をご覧ください

## 🔧 重要な設定ファイル

| ファイル                    | 用途                 |
| --------------------------- | -------------------- |
| `.moon/workspace.yml`       | Moon全体設定         |
| `.moon/tasks.yml`           | 共通タスク定義       |
| `*/moon.yml`                | プロジェクト固有設定 |
| `biome.json`                | コード品質ルール     |
| `package.json` (workspaces) | ワークスペース定義   |

## 📝 設定

> 🔧 詳細な設定は[設定ガイド](./configuration.md)をご覧ください

### 新しいプロジェクト追加の基本手順
1. `apps/` または `packages/` にディレクトリ作成
2. 設定ファイル追加（`moon.yml`, `package.json`, `tsconfig.json`）
3. 自動的にmoonが認識
