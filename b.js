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

/* mock data
-------------------------------------------------- */

/*
  # b 的測資

    - 所有想要驗証的情境與答案皆應事先表列於此

    - 將來 mocked_b 內部會跑 matcher 比對 input 與此份 test_data 找出答案

    - 此份測資也會 export 將來可於其它 test case 內使用

  # mock data 注意事項

    - mock data 應由 b 的作者撰寫與維護，目地是確保 mock 行為與本尊完全一致

    - 每次 refactor 完 b 就要連帶修改 mock data 內容確保它與本尊結果仍然一致

    - 外部會有 smoke test 來確保此事

  # 如果 b 會打 db 或 api 去檢查 a, b 參數的合法性

    - 例如當 a, b 不存在於 db 內就要返還錯誤訊息

    - 只要在 mock_b 內預先寫好一組答案呈現此劇情即可

*/
exports.mock_b = [
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
