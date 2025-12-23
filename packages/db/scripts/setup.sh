#!/bin/bash

# packages/db/scripts/manual-setup.sh
# 手動でローカル環境をセットアップするスクリプト

cd "$(dirname "$0")/.." || exit

echo "🔧 手動セットアップを開始します..."

# .env.localファイルの作成
echo "📝 .env.local ファイルを作成しています..."
cat > .env.local << 'EOF'
NODE_ENV=local
DATABASE_URL=file:./local.db
EOF

echo "✅ .env.local ファイルを作成しました"

# 既存のローカルDBファイルがある場合は確認
if [ -f local.db ]; then
    read -p "⚠️  既存のlocal.dbファイルが見つかりました。削除して新規作成しますか？ (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -f local.db
        echo "🗑️  既存のlocal.dbファイルを削除しました"
    else
        echo "ℹ️  既存のデータベースを保持します"
    fi
fi

# マイグレーション実行
echo "🚀 マイグレーションを実行しています..."
bun run db:local:migrate

echo "✅ 手動セットアップが完了しました！"
echo ""
echo "次のコマンドでDrizzle Studioを起動できます:"
echo "  bun run db:local:studio"