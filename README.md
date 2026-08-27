# スタンプ余白拡張ツール(PWA版)

LINEスタンプ用・5×5(25マス)の透明PNGを、スタンプの大きさを一切変えずに間隔だけ広げるツールです。
画像処理はすべて端末内(ブラウザのJavaScript)で完結し、サーバーへのアップロードは一切行いません。
GitHub Pagesにそのまま配置でき、iPhoneのSafariで「ホーム画面に追加」するとPWA(単体アプリのように起動できるWebアプリ)として使えます。

## ファイル構成

```
.
├── index.html            アプリ本体(これ単体でも動作します)
├── manifest.webmanifest  PWA用マニフェスト
├── sw.js                 オフライン動作用のService Worker
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-152.png
│   ├── icon-167.png
│   └── apple-touch-icon.png
└── README.md
```

## GitHub Pagesへの公開手順

1. GitHubで新しいリポジトリを作成する(例: `line-stamp-spacer`)
2. このフォルダの中身(index.html, manifest.webmanifest, sw.js, icons/)をリポジトリのルートにそのままアップロードする
   - GitHubの「Add file」→「Upload files」でドラッグ&ドロップでもOK
3. リポジトリの「Settings」→「Pages」を開く
4. 「Build and deployment」の「Source」で `Deploy from a branch` を選択
5. 「Branch」で `main`(または公開したいブランチ)と `/ (root)` を選んで「Save」
6. 数分待つと、ページ上部に公開URLが表示される
   - 例: `https://ユーザー名.github.io/line-stamp-spacer/`

これで公開完了です。パスはすべて相対パス(`./`)で書かれているため、
リポジトリ名がそのままURLのサブパスになる形式(GitHub Pagesの通常の公開のされ方)でも問題なく動作します。

## iPhoneでホーム画面に追加する

1. iPhoneのSafariで、公開したURLを開く
2. 画面下部(または上部)の共有アイコン(四角に↑)をタップ
3. メニューを下にスクロールし「ホーム画面に追加」をタップ
4. 名前を確認して右上の「追加」をタップ

ホーム画面のアイコンから起動すると、アドレスバーの無い単体アプリのような画面(スタンドアロン表示)で使えます。
一度開いてService Workerが登録されれば、以降は電波の無い場所でも起動・利用できます(初回アクセス時のみネット接続が必要です)。

## プライバシーについて

アップロードした画像はブラウザの中(Canvas API)だけで処理され、どこにも送信されません。
このアプリ自体、`fetch`によるデータ送信コードを一切含んでいません。ソースコード(index.html)を見ていただければ確認できます。
