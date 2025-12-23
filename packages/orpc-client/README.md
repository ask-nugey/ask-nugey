# @packages/orpc-client

ORPCサーバーと通信するための型安全なクライアントライブラリ

## 概要

`@packages/api-contract`の定義を使用して、型安全なRPCクライアントを提供します。TanStack Queryとの統合もサポート。

## 機能

- **型安全なクライアント**: API contract定義に基づく完全な型サポート
- **認証対応**: Bearer tokenによる認証
- **TanStack Query統合**: React Query向けユーティリティ

## 使用方法

```typescript
import { createOrpcClient, createOrpcQuery } from '@packages/orpc-client';

// 基本的なクライアント
const client = createOrpcClient('http://localhost:3001');
const planets = await client.planet.list();

// TanStack Query統合
const orpcQuery = createOrpcQuery('http://localhost:3001');
const { data, isLoading } = orpcQuery.planet.list.useQuery();
```

## エクスポート

- `createOrpcClient` - ORPCクライアント作成
- `createOrpcQuery` - TanStack Queryユーティリティ作成
- `ORPCClient` - クライアントの型定義

## 依存関係

- `@packages/api-contract` - API契約定義
- `@orpc/client` - ORPCクライアントベース
- `@orpc/tanstack-query` - TanStack Query統合
