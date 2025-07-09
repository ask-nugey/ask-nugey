# CLAUDE.md

このファイルは、このリポジトリのコードを扱う際のClaude Code（claude.ai/code）へのガイダンスを提供します。

## プロジェクト概要

これはApp Routerで構築されたNext.js 14のブログ/コンテンツサイトで、OpenNext.jsを使用してCloudflare Workersにデプロイされています。サイトはカスタムコンポーネントを持つMDXをコンテンツに使用し、Cloudflareの両方のデプロイメントをサポートしています。

## 共通開発コマンド

### 開発
```bash
bun run dev          # 開発サーバーを起動（.nextを先にクリーン）
bun run dev:all      # 開発サーバー + ポスト監視を並列実行
```

### ビルド＆デプロイ
```bash
bun run build                # 標準的なNext.jsビルド
bun run deploy:worker        # Cloudflareへの完全デプロイ（ポスト生成、ビルド、デプロイ）
bun run deploy-dry:worker    # Cloudflareデプロイのドライラン
bun run preview:worker       # Cloudflare向けにローカルでビルド＆プレビュー
```

### コード品質
```bash
bun run lint         # ESLintを実行
bun run format       # Prettierを実行
bun run fix          # PrettierとESLint fixの両方を実行
```

### ユーティリティ
```bash
bun run generate:posts    # ポストのスラッグJSONを生成
bun run watch:posts       # ポストの変更を監視
```

## アーキテクチャと主要パターン

### コンテンツ管理
- ブログ記事は`/src/post/[post-name]/`に以下の構成で保存されます：
  - `content.mdx` - 目次用の`%toc%`プレースホルダーを含むMDXコンテンツ
  - `meta.ts` - メタデータのエクスポート（title、description、createdAt、tags、thumbnail）
- MDXファイル内で記事は`<div className="article-content">`でラップされます
- カスタムMDXコンポーネントは`/src/ui/components/MDX/MdxComponents.tsx`で定義されています

### スタイリングシステム
- **Panda CSS** - カスタムテーマトークンを使用したユーティリティファーストスタイリング
- **Ant Design v5** - カスタムテーマ設定を使用したUIコンポーネント
- カスタムスタイルのMDXコンポーネント（見出し、テーブル、コードブロック）

### デプロイメントアーキテクチャ
- **Cloudflare Workers**：OpenNext.jsを使用した主要なデプロイメントターゲット
  - Next.jsキャッシング用のKVネームスペース（バインディング：`NEXT_CACHE_WORKERS_KV`）
  - カスタムドメイン：ask-nugey.com
- 20MBのボディサイズ制限でServer Actionsが有効

### 主要機能
- プラグイン付きMDX：rehype-katex（数式）、rehype-highlight（コード）、mdx-mermaid（図表）
- スクロールハイライト付き目次
- URLプレビュー用LinkCardコンポーネント
- `/src/app/_actions/ai-ocr/`内のAI OCR機能
- エッジキャッシングを使用したIncremental Static Regeneration

### TypeScript設定
- パスエイリアスの設定：
  - `@/src/*` → `./src/*`
  - `@/lib/*` → `./lib/*`
- Typed routes実験的機能が有効

## 重要な注意事項
- 現在、テストフレームワークは設定されていません
- 新しい記事を追加する際は、`bun run generate:posts`を実行してポストのスラッグを更新してください
- MDXコンテンツは適切なスタイリングのためにarticleラッパーdivが必要です
- 外部リンクはMDXコンポーネント設定により自動的に新しいタブで開きます
