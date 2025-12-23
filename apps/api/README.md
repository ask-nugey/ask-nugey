# @apps/api

ORPC(Open Remote Procedure Call)を使用したAPIサーバー

## 概要

TypeScriptベースのRPCサーバーで、OpenAPI仕様のサポートと型安全なAPIを提供します。

## 機能

- **RPCエンドポイント**: `/rpc`経由での型安全なRPC通信
- **OpenAPI対応**: `/api`経由でREST APIとOpenAPIドキュメント生成
- **型安全**: `@packages/api-contract`による型定義の共有
- **自動コード生成**: スキーマからのJSON Schema変換

## 起動方法

```bash
# 開発サーバー
moon run api:dev-worker

# ビルド
moon run api:build-worker
```

## エンドポイント

- `http://localhost:3001/api` - OpenAPI Playground
- `http://localhost:3001/rpc` - RPCエンドポイント

## 依存関係

- `@packages/api-contract` - 共有型定義
- `@packages/orpc-client` - クライアントライブラリ
- `@orpc/*` - ORPCフレームワーク
