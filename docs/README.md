# Moon TypeScript モノレポテンプレート

このプロジェクトは、moonrepoを使用したTypeScriptモノレポ環境のテンプレートです。

## 📋 プロジェクト概要

TypeScriptベースのモノレポ構成で、複数のアプリケーションと共有ライブラリを効率的に管理できます。

## 🚀 クイックスタート

詳細なセットアップ手順は[クイックリファレンス](./quick-reference.md)をご覧ください。

```bash
# 基本的な流れ
bun install          # 依存関係インストール
moon run web:dev     # 開発サーバー起動
moon run :fix        # コード品質管理
```

## 📚 ドキュメント

### 🚀 すぐに始める
- [クイックリファレンス](./quick-reference.md) - よく使うコマンドと設定
- [開発ガイド](./development.md) - 日常的な開発フロー

### 📖 詳細ガイド
- [コマンドリファレンス](./commands.md) - 利用可能なすべてのコマンド
- [設定ガイド](./configuration.md) - 設定ファイルの詳細説明
- [プロジェクト追加](./adding-projects.md) - 新しいapp・packageの追加方法
  - [TypeScript設定](./configuration-typescript.md) - TypeScript設定の詳細
- [アーキテクチャ](./architecture.md) - 技術的な詳細とシステム構成

### 🔧 メンテナンス
- [ドキュメント編集ガイドライン](./documentation-guidelines.md) - docs編集・追加の方針

## 🤝 貢献

新しい機能やバグ修正を追加する際は、以下の手順に従ってください：

1. 機能ブランチを作成
2. `moon run :fix` でコードを整形
3. `moon run :typecheck` で型チェック
4. `moon run :build` でビルド確認
5. プルリクエストを作成
