# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

技術スタック:
- **Moon**: モノレポ管理とタスク実行
- **TypeScript**: 型安全な開発環境
- **Biome**: 高速なlinter/formatter
- **Bun**: 効率的なパッケージマネージャー

## アーキテクチャ
@docs/architecture.md を参照

## 開発フロー
@docs/development.md を参照

## 主要コマンド

コマンドの詳細は @docs/quick-reference.md および @docs/commands.md を参照。

最重要コマンド:
- `moon run web:dev` - 開発サーバー起動
- `moon run :fix` - 自動修正
- `moon run :build` - 全体ビルド
- `bun install` - 依存関係インストール

## 重要な設定原則

### Moon設定
moonの設定の詳細は @docs/configuration.md を参照

### コード品質
- **Biome**: ESLint + Prettierの代替、統一されたルール
- **タブインデント**: プロジェクト全体でタブ使用
- **自動修正**: `moon run :fix`で一括修正

## 新しいapp・packageを追加

詳細手順は @docs/adding-projects.md を参照。

重要: ルート`tsconfig.json`の`references`配列への追加を忘れずに。  
tsconfig.jsonの設定詳細は @docs/configuration-typescript.md を参照

## ドキュメント
- ファイルを編集したとき、docsディレクトリのファイルを編集・追加した方がいい場合は編集する
- docsディレクトリを編集した場合、docs/README.mdも必要な場合は更新する
- docsディレクトリを編集した場合、CLAUDE.mdも必要な場合は更新する
- docsを編集・追加する場合、 @docs/documentation-guidelines.md を参照して遵守する
- docsディレクトリのファイル、CLAUDE.mdよりも実際のコードのが必ず正しい
