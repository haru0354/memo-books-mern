# 本型メモアプリの概要

本型のメモを保存できる WEB アプリです。

主に下記の点を重視しています。

- 即時にメモの追加・編集・削除ができる
- 必要なメモがすぐに見つかる

個人的に使用していたその他のメモアプリだと、個人的に不満な点などがあり、私自信が使いやすいアプリとして作成しました。

- 追加・削除・編集は各モーダルで操作（画面推移を少なく）
- 作成したメモで自動で目次作成（メモを即発見・スクロールの時間を省く）
- 本・チャプター・メモの 3 種類に分類（分類することでメモを整理）

メモアプリなのでシンプルかつ、誰でも使いやすいアプリを心がけています。

エンジニアの学習中にメモを取っていたのですが、閲覧したい時にスクロールして探すのに時間がかかったり、どこにあるのか正確な位置が分からなくて時間がかかったことがありました。

そのため、私自信が使いやすいアプリを目的に作成しています。

下記 URL にデプロイしていますのでご覧ください。
URL：https://www.memo-books-note.com/

## 主な機能

複数の本が作成でき、本には複数のチャプターの作成ができ、チャプターの中には複数のメモを作れます。

- 「本の一覧ページ」と「本の中身ページ」により構成
- 複数の本が登録・削除・編集ができる
- 本の詳細ページはサイドバーに「チャプターの一覧」メインエリアに「メモの一覧」が表示
- 各本は複数のチャプターが登録・削除・編集できる
- 各チャプターは複数のメモが登録・削除・編集できる
- 自動でメモの目次が作成（ページ上部にメモへのリンク）

「本の一覧ページ」と「本の中身ページ」となっており、「本の中身」にはサイドバーがチャプターの一覧が表示され、メインコンテンツとしてメモが表示されるようになっています。

## 使用技術

MERN スタックで作られたアプリです。

- フロント：JavaScript(React)
- バックエンド：Node.js(Express)
- DB：mongoDB
- スタイル： Emotion
- 状態管理： Redux/Toolkit
- 認証: Firebase

全て私が今まで使ったことがない技術で作成しています。

- バックエンドを学びたい：　 Express(TS を利用したことがあるため)
- PostgreSQL の経験あり：　 mongoDB
- NextAuth の経験あり：　 Firebase
- TailwindCSS の経験あり：　 Emotion

以上から分かるように、学習の意味もありこれらの技術で作成しています。

## セットアップ手順

1. リポジトリをクローン：

git clone https://github.com/haru0354/memo-books-mern.git

cd memo-books-mern

2. 依存関係をインストール：

npm install

3. 環境ファイルを用意：

cp .env.example .env

env ファイルへの記載

4. サーバーを起動：

npm run dev

### コマンドの概要

| コマンド        | 説明                                                 |
| --------------- | ---------------------------------------------------- |
| `npm install`   | フロントエンドの依存関係をインストール               |
| `npm run dev`   | フロント・バックのサーバー起動と監視を開始           |
| `npm run image` | public フォルダの画像の圧縮と拡張子を変更（webp へ） |

## clone する場合の注意事項

一部の画像ファイルは画像素材元の規約によるアップロードをしていません。
そのため、一部の画像が正常に表示されません。

「.env.sample」を「.env」に変更して、各項目への記載が必要となります。

下記 URL にアプリをアップロードしています。
URL：https://www.memo-book-note.com/

## 画像

画像は sharp を使用して webp に変換したのを利用しています。
(scripts > convertToWebp.mjs を参照)

public フォルダの画像を変換し、convert_webp フォルダに変換された画像が作られます。
専用のコマンド(image)として追加をしており、「dev」や「build」コマンド時に実行されます。

変換タイミングでファイル名を json として追加をし、同じファイル名は再度変換しないようにしています。
そのため、万が一同じファイル名で画像を差し替えた場合は、List からファイル名を削除する必要があります。

## 備考

- 画像はフリーの素材の利用規約もありアップロードしていません。
- データベースは自分で用意してください。
- env.sample ファイルをご確認ください。

## ここからは個人的メモエリアです。

### 作成経緯

エンジニアの学習中にメモをたくさん取っていたが（メモアプリや HDD に管理）、作成と閲覧の共に手間がかかると感じました。

- フォルダを作成が面倒
- いちいち装飾して見やすくする手間
- メモが長くなりスクロールが必要
- どこにメモがあるか分からなくなる
- メモを取った気がしたがそもそもなかった

エンジニアとして働き始めた時に、今作っているメモの確認が仕事用の PC でもできるようにしたいとも考えました。

そして、作成したり見つけたりするのに面倒な手間がかかるのもあり、時間がもったいないと感じることが多々ありました。

そのため、個人的に使いやすいアプリを作成しようと思った経緯があります。

### 今後の追加予定機能

- google でのログイン機能
- redux の status と rejected を利用したエラーメッセ―ジを全てに実装
- メモ・チャプターの並び替え
- 画像を追加できるようにする
- 本の共有を可能にする。（実装しないかも）
- 表を追加できるようにする。（実装しないかも）
