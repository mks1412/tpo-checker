[![CircleCI](https://circleci.com/gh/mks1412/fasherge.svg?style=svg)](https://circleci.com/gh/mks1412/fasherge)
[![codecov](https://codecov.io/gh/mks1412/fasherge/branch/master/graph/badge.svg)](https://codecov.io/gh/mks1412/fasherge)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://mks1412.github.io/fasherge/)

## 技術構成

- Vue + Vuex (Nuxt)
- TypeScript
- Firebase
  - Authentication
  - Cloud Firestore
  - Cloud Storage
  - Hosting
- Storybook (コンポーネント管理)
- jest (ユニットテスト)
- reg-suit (ビジュアルテスト)
- CircleCI (自動テスト & デプロイ)

## ディレクトリ構成

Nuxtを利用しているため基本的にNuxtのディレクトリ構成に従いつつ、データフローの明確化のためにいくつか専用のディレクトリ(*)を追加

```
├── src
│    ├── components               コンポーネント
│    ├── constants                *
│    ├── entities                 *
│    ├── gateways                 *
│    ├── layouts                  アプリケーションレイアウト
│    ├── middleware               ミドルウェア(認証など)
│    ├── pages                    ビュー及びルーティングファイル
│    ├── plugins                  プラグイン
│    ├── repositories             *
│    ├── static                   静的ディレクトリ
│    ├── store                    Vuexストア
│    ├── type                     型定義ファイル
│    └── util                     *
│
├── stories                       Storybookのストーリファイル
│
└── test
      └─ store                    Vuexストアテスト

```

### constants
定数やセレクトボックスの選択肢となるリストを生成する関数を用意

### entities
アプリケーションで使用するデータのインターフェースを定義

ストアには基本的にプリミティブ型 or Entitiyを保存する

### gateways
外部リソース(API等)のリクエスト処理を担当

今回はcloud firestoreに対してのリクエストをラップした`FirestoreGateway`を用意

### repositories
- 各リソースに対して必要なリクエストをgatewayを用いて具体的に実装
- gatewayで取得したデータをentityにマッピング


## デモユーザーアカウント

hoge@gmail.com / hogehoge
