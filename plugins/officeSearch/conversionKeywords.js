const exist = function (obj) {
  if (!!obj && obj.length > 0) {
    return true
  } else {
    return false
  }
}

const keywordExist = function (char) {
  if (exist(char)) {
    return char
  } else {
    throw new Error('検索ワードを入力してください')
  }
}
/* 配列からから郵便番号抽出
   ["さんぷる", "113-5511", "2-11-39", "080-1111-1111", "014-4155", "１１１ー１１１１"]
   => [113-5511, 014-4155, １１１ー１１１１] */
const extractPostalCode = function (arry) {
  const postCode = []
  const re =
    /^[0-9|０-９]{3}[-|−|ー|‐]{1}[0-9|０-９]{4}$|^[0-9|０-９]{3}[0-9|０-９]{4}$/g
  arry.forEach((ele) => {
    const matchEle = ele.match(re)
    if (matchEle) postCode.push(matchEle[0])
  })
  return postCode
}

/* arryに郵便番号が存在すればture
   true:  '000-0000' '0000000'
   false: '000-000-0000 '00000000' */
const postalCodeExist = function (arry) {
  const postCodeArry = extractPostalCode(arry)
  // return !!postCode_arry.filter(Boolean).length
  return !!postCodeArry.length
}

/* "サンプル１ サンプル2, さんぷる３  ,さんぷる"
   => ["サンプル1", "サンプル2", "サンプル3", "さんぷる"] */
const removeDelimiter = function (keyword) {
  const re = /[,、]{1}|[,、]{1}\s+|\s+/
  const split = keyword.split(re)
  // split内の空白を削除
  // ["sampple", "sampl1", "", "sam", ""] => ["sample", "sampl", "sam"]
  const filtered = split.filter(Boolean)
  return filtered
}

/* stringが半角数字ならtrue
   true:  '111' '1112224'
   false: '１１１' 'aaa' '１１５５５５１' */
const isAlphanumericNumbers = function (string) {
  const re = /^[0-9]{7}$/
  return !!string.match(re)
}

const isNumber = function (obj) {
  return !!obj.match(/\d/)
}

/* stringを半角の英数値に変換
  '１１１２２２２' => '1112222'
  '123ー４５６７'  => '1234567' */
const conversionAlphanumericNumbers = function (string) {
  const numbers = []
  const hafe = '1'.charCodeAt() - 1
  const full = '１'.charCodeAt() - 1
  for (let i = 0; i < string.length; i++) {
    const utfCode = isNumber(string[i]) ? hafe : full
    const number = string[i].charCodeAt(0) - utfCode
    numbers.push(number)
  }
  return numbers.join('')
}

const conversionSevenNumber = function (arry) {
  const conversionArry = []
  const re = /[-|−|ー|‐]/
  const postCodes = extractPostalCode(arry)
  postCodes.forEach((code) => {
    const removeHyphen = code.replace(re, '')
    let number
    // codeが全角英数値の場合、半角数値へ変換
    if (!isAlphanumericNumbers(removeHyphen)) {
      number = conversionAlphanumericNumbers(removeHyphen)
    } else {
      number = Number(removeHyphen)
    }
    conversionArry.push(number)
  })
  return conversionArry
}

// arryからre(正規表現)にマッチした要素を削除
const takeOutArray = function (arry, re) {
  const replaced = []
  arry.forEach((word) => {
    const repace = word.replace(re, '')
    replaced.push(repace)
  })
  return replaced.filter(Boolean)
}

/* arryから郵便番号のみを削除
['111-1111', '1234567', 'sample', 'aaa']
=> ['sample', 'aaa'] */
const removePostCode = function (arry) {
  const re =
    /^[0-9|０-９]{3}[-|−|ー|‐]{1}[0-9|０-９]{4}$|^[0-9|０-９]{3}[0-9|０-９]{4}$/g
  const keywords = takeOutArray(arry, re)
  return keywords
}

// const searchOfficeKeywords = function(keywords = null, postCodes = null, axios) {
const searchOfficeKeywords = async function (
  keywords = null,
  postCodes = null,
  axios
) {
  try {
    const offices = await axios.$get(
      `offices?keywords=${keywords}&postCodes=${postCodes}&page=${0}`
    )
    return offices
  } catch (error) {
    // console.log(error)
    return error
  }
}

export default function ({ $axios }, inject) {
  inject('conversionKeywords', async (keywords) => {
    // 何も入力されてなかったらalert
    const keyword = keywordExist(keywords)

    /* "サンプル１ サンプル2, さんぷる３  ,さんぷる"
       => ["サンプル1", "サンプル2", "サンプル3", "さんぷる"] */
    const keywordsArry = removeDelimiter(keyword)

    // 郵便番号があるかどうか判定
    if (postalCodeExist(keywordsArry)) {
      /* 郵便番号からハイフンを削除した配列を出力
      ["さんぷる", "113-5511", "2-11-39", "080-1111-1111", "014-4155", "さんぷる3"]
      => [1135511, 0144155] */
      const requestPostalCodes = conversionSevenNumber(keywordsArry)

      /* keywordsArryから郵便番号のみ削除
      ["さんぷる", "113-5511", "2-11-39", "080-1111-1111", "014-4155", "さんぷる3"]
      => ['サンプル', 'サンプル3'] */
      const requestKeywords = removePostCode(keywordsArry)
      // this.searchOfficeKeywords(requestKeywords, requestPostalCodes)
      const res = await searchOfficeKeywords(
        requestKeywords,
        requestPostalCodes,
        $axios
      )
      return {
        offices: res,
        keywords: requestKeywords,
        postCodes: requestPostalCodes,
      }
    } else {
      const res = await searchOfficeKeywords(keywordsArry, null, $axios)
      return {
        offices: res,
        keywords: keywordsArry,
      }
    }
  })
}
