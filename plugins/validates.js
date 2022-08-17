// 文字の長さを検証する
// value:   値を指定
// strItem: 項目名を指定
// max:     最大の文字数を指定
//
// maxLength('山田 太郎', '名前', 6)
// => true
// maxLength('山田 太郎', '名前', 5)
// => 名前は5文字以下で入力してください
const maxLength = function (value, strItem = 'item', max = 255) {
  return value.length <= max || `${strItem}は${max}文字以下で入力してください`
}

export { maxLength }
