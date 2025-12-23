# 新しいプロジェクトの追加

moonrepoに新しいアプリケーションや共有パッケージを追加する方法を詳しく説明します。

## 🎯 基本概念

### プロジェクトの種類

- **apps/**: アプリケーション（Webアプリ、API、CLI等）
- **packages/**: 共有ライブラリ（ユーティリティ、UI コンポーネント等）

### 必須ファイル

各プロジェクトには以下の3つのファイルが必要です：
- `package.json` - 依存関係とパッケージ情報
- `tsconfig.json` - TypeScript設定
- `moon.yml` - Moonプロジェクト設定

## 🚀 新しいアプリケーションの追加する例
adminアプリを追加する例

### 1. ディレクトリとファイル作成

```bash
# 1. ディレクトリ作成
mkdir -p apps/admin/src

# 2. パッケージ設定ファイル作成
touch apps/admin/package.json
touch apps/admin/tsconfig.json
touch apps/admin/moon.yml
touch apps/admin/src/index.ts
```

### 2. package.json の設定

```json
{
  "name": "@app/admin",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@packages/shared": "workspace:*"
  },
  "devDependencies": {
    "tsx": "^4.15.0"
  }
}
```

### 3. tsconfig.json の設定

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true
  },
  "references": [
    { "path": "../../packages/shared" }
  ],
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

### 4. moon.yml の設定

```yaml
project:
  name: "Admin Application"
  description: "管理画面アプリケーション"

type: "application"
language: "typescript"
stack: "frontend"
tags:
  - "typescript"
  - "admin"
  - "web"

tasks:
  dev:
    description: "開発サーバーを起動"
    command: "tsx"
    args: ["watch", "src/index.ts"]
    inputs:
      - "src/**/*.{ts,tsx}"
      - "shared:src/**/*.{ts,tsx}"
      - "shared:dist/**/*"
    deps:
      - "shared:build"
    options:
      persistent: true
      cache: false
      runInCI: false

  build:
    description: "プロダクション用ビルド"
    command: "tsc"
    inputs:
      - "src/**/*.{ts,tsx}"
      - "tsconfig.json"
    outputs:
      - "dist"
    deps:
      - "shared:build"

  typecheck:
    description: "型チェックを実行"
    command: "tsc"
    args: ["--noEmit"]
    inputs:
      - "src/**/*.{ts,tsx}"
      - "tsconfig.json"
    deps:
      - "shared:build"
```

### 5. 基本的なソースファイル

```typescript
// apps/admin/src/index.ts
import { Logger } from '@packages/shared';

const logger = new Logger();

console.log('Admin app started');
logger.info('Admin application initialized');
```

### 6. ルートtsconfig.jsonの更新

新しいプロジェクトをTypeScript project referencesに追加：

```json
// tsconfig.json (ルート)
{
  "references": [
    { "path": "apps/web" },
    { "path": "apps/admin" },        // 追加
    { "path": "packages/shared" }
  ]
}
```

### 7. 確認

```bash
# プロジェクトが認識されているか確認
moon query projects

# 開発サーバー起動テスト
moon run admin:dev
```

## 📦 新しい共有パッケージの追加する例
ui-componentsパッケージを追加する例

### 1. ディレクトリとファイル作成

```bash
# 1. ディレクトリ作成
mkdir -p packages/ui-components/src

# 2. ファイル作成
touch packages/ui-components/package.json
touch packages/ui-components/tsconfig.json
touch packages/ui-components/moon.yml
touch packages/ui-components/src/index.ts
```

### 2. package.json の設定

```json
{
  "name": "@packages/ui-components",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsc",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@packages/shared": "workspace:*"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "react": "^18.0.0"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  }
}
```

### 3. tsconfig.json の設定

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "jsx": "react-jsx"
  },
  "references": [
    { "path": "../../packages/shared" }
  ],
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

### 4. moon.yml の設定

```yaml
project:
  name: "UI Components"
  description: "共有UIコンポーネントライブラリ"

type: "library"
language: "typescript"
stack: "frontend"
tags:
  - "typescript"
  - "react"
  - "ui"
  - "components"

tasks:
  build:
    description: "UIコンポーネントライブラリをビルド"
    command: "tsc"
    inputs:
      - "src/**/*.{ts,tsx}"
      - "tsconfig.json"
    outputs:
      - "dist"
    deps:
      - "shared:build"

  typecheck:
    description: "型チェックを実行"
    command: "tsc"
    args: ["--noEmit"]
    inputs:
      - "src/**/*.{ts,tsx}"
      - "tsconfig.json"
    deps:
      - "shared:build"
```

### 5. 基本的なソースファイル

```typescript
// packages/ui-components/src/index.ts
export { Button } from './Button';
export { Input } from './Input';
export type { ButtonProps, InputProps } from './types';
```

```typescript
// packages/ui-components/src/Button.tsx
import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
};
```

### 6. ルートtsconfig.jsonの更新

新しいパッケージをTypeScript project referencesに追加：

```json
// tsconfig.json (ルート)
{
  "references": [
    { "path": "apps/web" },
    { "path": "packages/shared" },
    { "path": "packages/ui-components" }  // 追加
  ]
}
```

### 7. 他のプロジェクトから使用

```bash
# 他のアプリケーションの依存関係に追加
pnpm add --filter web @packages/ui-components
```

```typescript
// apps/web/src/index.ts
import { Button } from '@packages/ui-components';

// 使用例
const app = () => {
  return <Button variant="primary">Click me</Button>;
};
```

## 🔧 プロジェクト追加後の作業

### 1. 依存関係のインストール

```bash
# ワークスペース全体の依存関係を更新
pnpm install
```

### 2. ビルドテスト

```bash
# 新しいプロジェクトのビルド
moon run new-project:build

# 全体のビルド確認
moon run :build
```

### 3. 型チェック

```bash
# 新しいプロジェクトの型チェック
moon run new-project:typecheck

# 全体の型チェック
moon run :typecheck
```

## 💡 ベストプラクティス

### 命名規則

- **アプリケーション**: `@app/project-name`
- **パッケージ**: `@packages/package-name`
- **ディレクトリ**: kebab-case（`ui-components`, `user-service`）

### 依存関係設定

```json
{
  "dependencies": {
    "@packages/shared": "workspace:*",
    "@packages/ui-components": "workspace:*"
  }
}
```

### moon.yml のタグ活用

```yaml
tags:
  - "typescript"      # 言語
  - "react"           # フレームワーク
  - "frontend"        # カテゴリ
  - "admin"          # 機能
```

## 🔧 TypeScript設定の重要事項

### tsconfig.jsonの基本構造

各プロジェクトのtsconfig.jsonは以下の要素が必要です：

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "composite": true,               // 必須設定
    "outDir": "./dist",             // または moon cache
    "rootDir": "./src"
  },
  "references": [
    { "path": "../../packages/shared" }
  ],
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

### 重要な設定項目

#### `"composite": true`
- **必須設定**: TypeScript Project Referencesを使用する際に必要
- この設定により型情報の増分コンパイルが可能
- 設定しない場合はビルドエラーが発生

#### Project References
- `"references"`: 依存するプロジェクトのパスを指定
- ルートのtsconfig.jsonにも新しいプロジェクトを追加：

```json
// tsconfig.json (ルート)
{
  "references": [
    { "path": "apps/web" },
    { "path": "apps/new-app" },          // 新しいapp
    { "path": "packages/shared" },
    { "path": "packages/new-package" }   // 新しいpackage
  ]
}
```

## 🚨 注意事項

### 循環依存の回避

```
❌ 悪い例:
shared → ui-components → shared

✅ 良い例:
shared ← ui-components ← web
```

### ビルド順序の考慮

```yaml
# 依存関係を明示してビルド順序を制御
deps:
  - "shared:build"
  - "ui-components:build"
```

## 📋 追加後のチェックリスト

- [ ] `moon query projects`でプロジェクトが表示される
- [ ] ルートtsconfig.jsonのreferencesに追加済み
- [ ] プロジェクトのtsconfig.jsonに`"composite": true`設定済み（必須）
- [ ] `moon run project-name:build`が成功する
- [ ] `moon run project-name:typecheck`が成功する
- [ ] 独自にタスク`moon run project-name:task`が成功する
- [ ] 依存関係が正しく解決される
- [ ] 他のプロジェクトからインポートできる
- [ ] `moon run :build-all`が全体で成功する
- [ ] `moon run :typecheck-all`が全体で成功する
