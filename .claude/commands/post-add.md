---
description: "記事の雛形作成"
---

# post-add

## 記事を追加

「$ARGUMENTS」という記事を追加します。
必ず以下の手順に順番どおり従って作業してください。
また、content.mdxの中身はこの作業では書きません。

### 手順
1. /.memo/template/post/sample/ディレクトリ を @src/postに複製します。
   - その中にはcontent.mdxとmeta.tsというファイルが2つあります。
2. 「$ARGUMENTS」の記事が同様内容か簡単にチャットで確認し、問題がなければ次に進みます。
3. @src/post/sample/ の"sample"を「$ARGUMENTS」の記事用の命名に変更します。
   - このディレクトリ名は「$ARGUMENTS」の記事のURLとなります。
4. meta.ts は 「$ARGUMENTS」 の内容に合うように修正し、コメントアウトは削除してください。
   - 詳細は @/src/types/post を確認してください。
   - タグが @/src/types/post のTag型に無い場合は追加してください。
   - 日付は本日の日付（yyyy-mm-dd）にしてください。
5. `bun run generate:posts`を実行してください。
6. @src/sitemap/contents.ts の適当な箇所に「$ARGUMENTS」の記事を追加してください。適当な箇所がないと判断した場合は新たに相応しい場所にカテゴリーを作成してください。
