# CLAUDE.md

このファイルは、Claude Code（claude.ai/code）がこのリポジトリのコードを扱う際のガイダンスを提供します。

## プロジェクト概要

このプロジェクトは、App Routerを用いたNext.js 14のブログ／コンテンツサイトです。OpenNext.jsを使ってCloudflare Workers上にデプロイされています。MDXによるコンテンツ管理、カスタムコンポーネントの利用、VercelとCloudflareの両方でのデプロイに対応しています。

## よく使う開発コマンド

### 開発
```bash
npm run dev          # 開発サーバーを起動（.nextをクリーンしてから）
npm run dev:all      # 開発サーバー＋投稿監視を並列実行
```

### ビルド＆デプロイ
```bash
npm run build                # 標準のNext.jsビルド
npm run deploy:worker        # Cloudflareへの本番デプロイ（投稿生成、ビルド、デプロイ）
npm run deploy-dry:worker    # Cloudflareデプロイのドライラン
npm run preview:worker       # Cloudflare用のローカルプレビュー
```

### コード品質
```bash
npm run lint         # ESLint実行
npm run format       # Prettier実行
npm run fix          # PrettierとESLintの自動修正を両方実行
```

### ユーティリティ
```bash
npm run generate:posts    # 投稿スラッグJSONの生成
npm run watch:posts       # 投稿の変更を監視
```

## アーキテクチャと主要パターン

### コンテンツ管理
- ブログ投稿は `/src/post/[post-name]/` に保存：
  - `content.mdx` - 目次用の `%toc%` プレースホルダー付きMDXコンテンツ
  - `meta.ts` - メタデータ（タイトル、説明、作成日、タグ、サムネイル）
- 投稿はMDXファイル内で `<div className="article-content">` でラップ
- カスタムMDXコンポーネントは `/src/ui/components/MDX/MdxComponents.tsx` に定義

### スタイリングシステム
- **Panda CSS**：ユーティリティファーストなスタイリングとカスタムテーマトークン
- **Ant Design v5**：UIコンポーネントとカスタムテーマ設定
- カスタムスタイルのMDXコンポーネント（見出し、テーブル、コードブロック）

### デプロイアーキテクチャ
- **Cloudflare Workers**：OpenNext.jsを使った主要なデプロイ先
  - KVネームスペースによるNext.jsキャッシュ(バインディング: `NEXT_CACHE_WORKERS_KV`)
  - カスタムドメイン: ask-nugey.com
- **Vercel**：代替デプロイオプション
- サーバーアクション有効（ボディサイズ上限20MB）

### 主な機能
- MDXプラグイン：rehype-katex（数式）、rehype-highlight（コード）、mdx-mermaid（ダイアグラム）
- スクロールハイライト付き目次
- URLプレビュー用LinkCardコンポーネント
- `/src/app/_actions/ai-ocr/` のAI OCR機能
- エッジキャッシュ付きインクリメンタル・スタティック・リジェネレーション

### TypeScript設定
- パスエイリアス設定：
  - `./src/*` → `@/src/*`
  - `./lib/*` → `@/lib/*`
- 型付きルートの実験的機能有効

## 注意事項
- テストフレームワークは未導入
- 新しい投稿を追加したら `npm run generate:posts` を実行してスラッグを更新
- MDXコンテンツはスタイル適用のためarticleラッパーdivが必須
- 外部リンクはMDXコンポーネント設定により自動で新しいタブで開く
