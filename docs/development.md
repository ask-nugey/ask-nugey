# 開発ガイド

このドキュメントでは、moon TypeScriptモノレポでの日常的な開発フローについて説明します。

> 💡 **すぐに始める**: 基本的なコマンドは[クイックリファレンス](./quick-reference.md)をご覧ください。  
> 🔧 **設定について**: 詳細な設定は[設定ガイド](./configuration.md)をご覧ください。

## 🌅 開発環境のセットアップ

### 初回セットアップ

```bash
# 1. リポジトリのクローン
git clone <repository-url>
cd ask-nugey

# 2. 依存関係のインストール
pnpm install
```

## 🚀 日常的な開発フロー

### 1. 開発中の作業

#### ファイル編集後
基本的なコマンドは[クイックリファレンス](./quick-reference.md)をご覧ください。

#### 新しい機能の実装

```bash
# 1. 機能ブランチの作成
git checkout -b feature/new-feature

# 2. コード実装
# ファイルを編集...

# 3. 品質チェック（詳細はクイックリファレンス参照）
moon run :fix && moon run :typecheck && moon run :build
```

### 2. コミット前のチェック

推奨される品質チェックフロー：

```bash
# 一括チェック（詳細なコマンドはクイックリファレンス参照）
moon run :fix && moon run :check && moon run :typecheck && moon run :build

# コミット
git add .
git commit -m "feat: 新機能の実装"
```

## 📦 パッケージ管理

パッケージ管理の詳細なコマンドは[コマンドリファレンス](./commands.md#%F0%9F%9B%A0%EF%B8%8F-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E7%AE%A1%E7%90%86)をご覧ください。

基本的な操作：
- 新しいパッケージの追加
- 依存関係の更新
- バージョン管理

## 🔧 トラブルシューティング

### よくある問題と解決方法

#### 1. 型エラーが出る

```bash
# 原因: sharedライブラリが古い
# 解決: sharedを先にビルド
moon run shared:build
moon run :typecheck
```

#### 2. キャッシュ関連の問題

```bash
# キャッシュをクリアして再実行
moon clean
moon run :build
```

#### 3. 依存関係の問題

```bash
# node_modulesとlockファイルを削除して再インストール
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

#### 4. Biome設定の問題

```bash
# Biome設定を確認
moon run :check --log debug

# 特定ファイルのみチェック
cd apps/web
pnpm biome check src/index.ts
```

### デバッグコマンド

詳細なデバッグオプションは[コマンドリファレンス](./commands.md#%F0%9F%9A%80-ci-cd%E5%90%91%E3%81%91%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89)をご覧ください。

基本的なデバッグ手順：
1. `--log debug`で詳細ログ確認
2. `--force`でキャッシュを無視して実行
3. `moon task`でタスクの詳細情報確認

## 📝 コーディング規約

### TypeScript

```typescript
// ✅ 良い例
export interface UserData {
	id: string;
	name: string;
	email: string;
}

export const createUser = (data: UserData): User => {
	return new User(data);
};

// ❌ 避ける例
export const createUser = (data: any) => {
	return new User(data);
};
```

### ファイル構成

```
src/
├── index.ts              # エントリーポイント・エクスポート
├── types/                # 型定義
│   └── user.ts
├── utils/                # ユーティリティ関数
│   └── validation.ts
└── services/             # ビジネスロジック
    └── userService.ts
```

### インポート規約

```typescript
// 1. 外部ライブラリ
import axios from 'axios';
import { z } from 'zod';

// 2. 内部パッケージ
import { Logger } from '@packages/shared';

// 3. 相対インポート
import { validateUser } from './utils/validation';
import type { UserData } from './types/user';
```

## 🧪 テスト（将来実装予定）

現在のテンプレートにはテストフレームワークは含まれていませんが、将来的にvitestを追加予定です。

### 推奨テスト構成

```bash
# 将来的に利用可能になる予定
moon run :test              # 全プロジェクトのテスト
moon run web:test           # webプロジェクトのテスト
moon run shared:test        # sharedプロジェクトのテスト
```

## 🚀 本番環境への展開

### ビルド確認

```bash
# プロダクションビルド
moon run :build

# ビルド成果物の確認
ls -la apps/web/dist
ls -la packages/shared/dist
```

### CI/CD向けコマンド

```bash
# CI環境での実行
moon ci

# 影響を受けるプロジェクトのみビルド
moon run :build --affected
```

## 💡 開発のベストプラクティス

### 1. コミット前チェックの自動化

`.git/hooks/pre-commit`を作成：

```bash
#!/bin/sh
moon run :fix
moon run :typecheck
moon run :build
```

### 2. VSCode設定

`.vscode/settings.json`に推奨設定：

```json
{
	"typescript.preferences.includePackageJsonAutoImports": "on",
	"typescript.preferences.organizeImports": true,
	"editor.formatOnSave": true,
	"editor.defaultFormatter": "biomejs.biome"
}
```

### 3. 効率的な開発

- `moon run :fix`を頻繁に使用してコード品質を保つ
- 大きな変更前には`moon run :typecheck`で確認
- moonのキャッシュを活用して高速開発
- 依存関係の自動解決を信頼して、手動ビルドは避ける

## 🤝 チーム開発

### ブランチ戦略

```bash
# 機能開発
git checkout -b feature/user-authentication
# 開発・テスト・コミット
git push origin feature/user-authentication

# バグ修正
git checkout -b fix/login-validation
# 修正・テスト・コミット
git push origin fix/login-validation
```

### プルリクエスト前のチェックリスト

- [ ] `moon run :fix`でコード整形
- [ ] `moon run :typecheck`で型チェック
- [ ] `moon run :build`でビルド確認
- [ ] 適切なコミットメッセージ
- [ ] 必要に応じてドキュメント更新

### コードレビューのポイント

- 型安全性の確保
- パフォーマンスへの影響
- 既存コードとの整合性
- テストカバレッジ（将来実装時）
