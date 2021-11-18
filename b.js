const _ = require('lodash')

/*

  # 本尊

  # 其 spec 規則為
    1. a 需為正值
    2. b 需為負值
    3. a 與 b 總合需小於 10
    4. 如參數正確則將兩數相加並返還

  # 返還格式

    - 成功劇情：{ ok: Boolean, result: String }
    - 錯誤劇情：{ ok: Boolean, code: Int,  message: String }

*/
exports.b = (a, b) => {
  // console.debug(`b 執行時參數: ${a}, ${b}`)
  if (a < 0) return { ok: false, code: 1, message: `a 需為正值，拿到: ${a}` }
  if (b > 0) return { ok: false, code: 2, message: `b 需為負值，拿到: ${b}` }
  if (a + b > 10)
    return {
      ok: false,
      code: 3,
      message: `a 與 b 總合不可大於 10，拿到 ${a}, ${b}`
    }
  // 實務上這裏可操作各種 side effects 例如 DB, API 拉資料與計算再返還最終結果
  const result = a + b
  return { ok: true, result }
}

/* mock
-------------------------------------------------- */

// 泛用型參數比對器，可比對任意數量的 input 與 test_data 內資料是否相符並返還預期的答案
const matcher = (test_data, input) => {
  const found = test_data.find(td => {
    // 將 {a: 'aa', b: 'bb' } 轉為 ['aa', 'bb'] 較好比對
    // 並且 test_data 最後一個元素為 ans 先移除
    const td_array = _.toArray(td).slice(0, -1)
    // 拿當前 input 去比對 test_data 內是否有符合的設定
    // 沒有的話返還 false
    return _.isEqual(input, td_array)
  })
  // 找到符合的 test_data 即返還當初設定好的 ans
  // 它等同於 b 真實執行運算後會得到的結果
  return found ? found.ans : null
}

/*
  # mock 注意事項

    - 由 b 的作者撰寫與維護，目地是讓 mock 行為與本尊完全一致

    - 每次 refactor 完 b 就要連帶修改 test_data 內容確保它與本尊結果仍然一致

    - 外部會有 smoke test 來確保此事

  # mock 版本內部不應包含任何邏輯

    - 只需單純將傳入的 input 送去給 matcher 與預先寫好的 test_data 比對找出答案即可

    - 如此做目地是讓 mock 版功能單純化，不要想試圖複製本尊內部的邏輯，那耗時費力又易錯

    - 未來此事或可由 codegen 自動替檔案內每支 fn 生成 mocked_fn 版本

  # 如果 b 會打 db 或 api 去檢查 a, b 參數的合法性

    - 例如當 a, b 不存在於 db 內就要返還錯誤訊息

    - 只要在 test_data 內預先寫好一組答案即可

  # 注意 mocked_b 收的第一個參數為 test_data 也就是測資

    - 如果沒給入即會炸掉讓測試立即失敗

    - 如此設計是方便在 test case 內可隨時傳入新的測資
*/
exports.mocked_b = test_data =>
  jest.fn().mockImplementation((...args) => {
    if (!test_data) throw new Error(`test_data 不可為空值`)
    return matcher(test_data, args) ?? `不支援的測資`
  })

/* test data
-------------------------------------------------- */

/*
  # b 的測資

  - 所有想要驗証的情境與答案皆應事先表列於此

  - 將來 mocked_b 內部會跑 matcher 比對 input 與此份 test_data 找出答案

  - 此份測資也會 export 將來可於其它 test case 內使用

*/
exports.test_data_b = [
  {
    m: -1,
    n: 2,
    ans: { ok: false, code: 1, message: `a 需為正值，拿到: -1` }
  },
  {
    m: 3,
    n: 4,
    ans: { ok: false, code: 2, message: `b 需為負值，拿到: 4` }
  },
  {
    m: 15,
    n: -2,
    ans: {
      ok: false,
      code: 3,
      message: `a 與 b 總合不可大於 10，拿到 15, -2`
    }
  },
  { m: 8, n: -2, ans: { ok: true, result: 6 } }
]
