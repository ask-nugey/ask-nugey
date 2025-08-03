# Function: Container()

> **Container**(`props`): `Element`

Defined in: [apps/web/src/ui/components/layout/Container.tsx:29](https://github.com/ask-nugey/ask-nugey/blob/73c3ed96c023db55eae3b75eb2b687687ade1718/apps/web/src/ui/components/layout/Container.tsx#L29)

レイアウト用のコンテナーコンポーネント

外側のラッパーと内側のコンテンツ領域にスタイルを適用可能

使用例：
```tsx
<Container
  wrapperStyles={css.raw({ bg: 'red' })}
  contentStyles={css.raw({ color: 'white' })}
>
  コンテンツ
</Container>
```

## Parameters

### props

`Props`

## Returns

`Element`
