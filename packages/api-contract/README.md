# @packages/api-contract

APIの型定義とスキーマを提供する共有パッケージ

## 概要

ORPC contractベースの型定義とZodスキーマを使用して、サーバーとクライアント間で型安全な通信を実現します。

## 主な機能

- **型定義**: TypeScript型の自動生成
- **Zodスキーマ**: 実行時バリデーション
- **APIの型定義**: APIエンドポイントの型安全な定義
- **共有可能**: サーバー・クライアント間での型の再利用

## 使用方法

```typescript
import { contract, PlanetSchema } from '@packages/api-contract';

// 契約の使用
const planetList = contract.planet.list;
const planetCreate = contract.planet.create;

// スキーマの使用
const validatedPlanet = PlanetSchema.parse(data);
```

## エクスポート

- `contract` - APIエンドポイントの定義
- `PlanetSchema` - Planetのスキーマ定義
- `NewPlanetSchema` - 新規Planet作成用スキーマ
- `UpdatePlanetSchema` - Planet更新用スキーマ

## 依存関係

- `@orpc/contract` - ORPC契約システム
- `@orpc/zod` - Zod統合
- `zod` - スキーマバリデーション
