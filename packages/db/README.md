# @packages/db

Drizzle ORM + LibSQL/Tursoを使用したデータベースパッケージ

## セットアップ

### ローカル環境
```bash
# 初回セットアップ
pnpm run db:local:setup

# または手動で
echo "NODE_ENV=local\nDATABASE_URL=file:./local.db" > .env.local
pnpm run db:local:migrate
```

### ドキュメント生成用のコマンドインストール
DBのドキュメント生成には tbls を使用しています。  
事前にインストールしておいてください。

```bash
brew install k1LoW/tap/tbls
```

### 開発/本番環境
```bash
# .env.dev または .env.prod を作成
NODE_ENV=dev # または prod
DATABASE_URL=libsql://your-db.turso.io
DATABASE_AUTH_TOKEN=your-auth-token
```

## 使用方法

```typescript
import { db } from "@packages/db";
import { users } from "@packages/db";

// データ挿入
await db.insert(users).values({
  email: "user@example.com",
  name: "Test User",
});

// データ取得
const allUsers = await db.select().from(users);
```

## テストデータの投入（Seed）

### ローカル環境
```bash
# テストデータを投入
moon run db:db-local-seed

# データベースをリセットしてからテストデータを投入
moon run db:db-local-seed-reset
```

### 開発環境
```bash
# 開発環境にテストデータを投入
moon run db:db-dev-seed

# 開発環境でリセット + テストデータ投入
moon run db:db-dev-seed-reset
```

### 直接実行
```bash
# 環境変数で実行
NODE_ENV=local pnpm run db:local:seed
NODE_ENV=local pnpm run db:local:seed:reset

# リセットオプション付き
tsx src/seed/index.ts --reset
```

## コマンド一覧

```bash
# 以下のコマンドでこのプロジェクトで使用できるコマンド一覧を出力
moon query tasks --project db
```

## スキーマ

`src/schema/`ディレクトリにテーブル定義を配置

## データベースの変更

### テーブルの新規作成・削除

1. `.tbls.yml`のテーブルコメント設定とviewpointsを編集
2. テーブルコメント設定を元に`src/schema`にスキーマファイルを追加または削除
3. 追加したスキーマファイルを`src/schema/index.ts`に登録
4. 以下のコマンドを実行：
   ```bash
   # マイグレーションファイル生成
   moon run db:db-generate

   # ローカルDBにマイグレーション適用
   moon run db:db-local-migrate

   # ドキュメント更新
   moon run db:docs-generate
   ```

### カラムの追加・削除・編集

1. `.tbls.yml`のテーブルコメント設定で編集すべき箇所を修正
2. `src/schema`の対応するスキーマファイルを編集
3. 以下のコマンドを実行：
   ```bash
   # マイグレーションファイル生成
   moon run db:db-generate

   # ローカルDBにマイグレーション適用
   moon run db:db-local-migrate

   # ドキュメント更新
   moon run db:docs-generate
   ```

### 例：新しいテーブルの追加

```typescript
// src/schema/posts.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content"),
  userId: integer("user_id").references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// src/schema/index.tsに追加
export * from "./posts";
