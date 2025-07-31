# TypeScript設定ガイド

このドキュメントでは、moonrepoモノレポ環境でのTypeScript設定について説明します。

## 📋 設定ファイル構造

```
.
├── tsconfig.json              # ルートレベル設定
└── apps/
    └── web/
        └── tsconfig.json      # プロジェクトレベル設定
```

## 🔧 ルートレベル設定（tsconfig.json）

ルートレベルの`tsconfig.json`は、モノレポ全体の共通設定を定義します。

```json
{
  "compilerOptions": {
    // ターゲット設定
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022"],
    
    // モジュール解決
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    
    // 型チェック設定
    "strict": true,
    "skipLibCheck": true,
    
    // 相互運用性
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    
    // 出力設定
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noEmit": true,              // ルートでは型チェックのみ
    
    // パス設定
    "baseUrl": ".",
    "paths": {
      "@/src/*": ["apps/*/src"],
      "@/lib/*": ["apps/*/src"]
    }
  },
  "exclude": [
    "node_modules",
    "dist",
    "build",
    ".moon",
    "**/*.spec.ts",
    "**/*.test.ts"
  ],
  "references": [
    { "path": "apps/web" }       // プロジェクト参照
  ]
}
```

## 🎯 プロジェクトレベル設定（apps/*/tsconfig.json）

各プロジェクトの`tsconfig.json`は、ルート設定を継承しつつ、プロジェクト固有の設定を追加します。

```json
{
  "extends": "../../tsconfig.json",   // ルート設定を継承
  "compilerOptions": {
    // 出力設定
    "outDir": "./dist",               // 出力ディレクトリ
    "rootDir": "./src",               // ソースルート
    
    // プロジェクト参照設定
    "composite": true,                // プロジェクト参照有効化
    "declaration": true,              // 型定義生成（composite必須）
    "tsBuildInfoFile": ".tsbuildinfo", // ビルド情報ファイル
    
    // プロジェクト固有のオーバーライド
    // noEmitは削除（compositeと互換性なし）
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## ⚠️ 重要な注意点

### Composite設定の制約

1. **`composite: true`と`noEmit: true`は併用不可**
   - `composite`はビルド出力が必要
   - `noEmit`は出力を無効化するため矛盾

2. **`composite`プロジェクトの必須設定**
   - `declaration: true`が必須
   - `outDir`または`declarationDir`の指定推奨

3. **プロジェクト参照の利点**
   - 依存関係の明示化
   - インクリメンタルビルド
   - 型安全な相互参照

### 設定の継承パターン

```
ルート（共通設定）
  ↓ extends
プロジェクト（個別設定）
```

## 🛠️ トラブルシューティング

### エラー: Referenced project cannot disable emit

**原因**: `composite: true`と`noEmit: true`の併用

**解決策**:
```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    // "noEmit": true を削除
  }
}
```

### エラー: Project references may not disable declaration emit

**原因**: `composite: true`で`declaration: false`

**解決策**:
```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true  // 必須
  }
}
```

## 📖 参考リンク

- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [tsconfig.json Reference](https://www.typescriptlang.org/tsconfig)
- [Moon TypeScript Support](https://moonrepo.dev/docs/guides/javascript/typescript-project-refs)