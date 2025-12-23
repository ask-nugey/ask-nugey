- @README.md を参考にしてください
- Drizzle ORMのドキュメント: Contex7 MCPを使用してください
- tblsのドキュメント:
  - tbls.ymlの設定: @packages/db/docs/tbls/tbls_reference.yml を参照してください
  - tblsのコマンド: @packages/db/docs/tbls/commands.md を参照してください
- テーブルを追加・削除する手順
  1. @packages/db/.tbls.yml の テーブルコメント設定 と viewpoints を編集
  2. テーブルコメント設定を元に @packages/db/src/schema にスキーマファイルを追加 or 削除
  3. 追加したスキーマファイルを @packages/db/src/schema/index.ts に編集してください
  4. 作業完了後に実行するコマンド：
     1. moon run db:db-generate
     2. moon run db:db-local-migrate
     3. moon run db:docs-generate
- テーブルのカラムを追加・削除・編集する手順
  1. @packages/db/.tbls.yml の テーブルコメント設定 で編集すべき箇所を編集してください
  2. @packages/db/src/schema を編集してください。
  3. 作業完了後に実行するコマンド：
     1. moon run db:db-generate
     2. moon run db:db-local-migrate
     3. moon run db:docs-generate
