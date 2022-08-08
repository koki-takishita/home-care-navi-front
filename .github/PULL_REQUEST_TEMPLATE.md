## やったこと

- このプルリクで何をしたのか？

## やらないこと

- このプルリクでやらないことは何か？（**やらない場合は、いつやるのかを明記する**）

### API 側

- fetch and checkout

```ruby
git fetch && git checkout origin/<ここを変える>/<ここを変える>
```

### Front 側

- fetch and checkout

```ruby
git fetch && git checkout origin/<ここを変える>/<ここを変える>
```

### 動作確認 Loom 手順

- 〇〇をする

```ruby

```

### 確認書類

**URL は該当のものに変えること**  
[画面図](https://xd.adobe.com/view/fbf6c289-81b2-4a4c-80fe-12a68930cc3b-aea5/grid/)  
[ユーザーストーリー](https://docs.google.com/spreadsheets/d/1lORIuXfr7PV5dslAHE4NnRGgNqk0hJ5krfN-tV2YKq8/edit#gid=0)  
[テスト仕様書](https://docs.google.com/spreadsheets/d/12xMuHo1K8Fd7FIB7rqeioxdWmrWw7aYK4QZ_Clsfk5Q/edit#gid=1789577746)

## 参考になったサイト

- [サイトのタイトル（必須） なければ「なし」と記入](url)

## 確認項目

- [ ] ここまでで各項目に漏れなく記入しているか・不要な箇所はないか

```javascript
NG
API・Front両方ブランチを指定していない（developの場合は省略可）
APIのプルリクとセットで確認する場合は、APIプルリクのURLを添付する
```

- [ ] プルリクのタイトルがコミット名そのままになっていないか
- [ ] レビュワーを正しく設定しているか
- [ ] ファイル名・変数名・メソッド名は適切か
- [コーディングの命名規則一覧](https://murashun.jp/article/programming/naming-conventions.html)
- [ ] ファイル名・変数名・メソッド名は直感でわかりやすいものになっているか
- [変数名の付け方をまとめてみた](https://zenn.dev/naoki_oshiumi/articles/aad7e1b3719fad)
- [ ] バリデーションは仕様に沿っているか
- [ ] バリデーションメッセージは適切か
- [ ] ページ内の文章に違和感はないか。統一感はあるか

```javascript
NG例1　統一感のないアラートメッセージ
- アラート1
ログインをする必要があります
- アラート2
ログインをしてください
NG例2　書き言葉になっていない
- メールを送りました
- ログインしたら利用できます
OK
- メールを送信しました
- ログインをする必要があります
```
