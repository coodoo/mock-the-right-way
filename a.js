const { b } = require('./b')

/*
  - a 操作 b 做運算
  - unit test 時 b 會被換成 mock 版本
  - 但對 a 來說是無差別的，所有運作邏輯與流程仍然照跑
  - 寫 a 的 unit test 時重點在能人工觸發 b 各種運算成功與失敗劇情，以驗証 a 能否正確處理各種後續流程
*/
exports.a = (m, n) => {
  const ans = b(m, n)
  const { ok, code } = ans
  // console.debug(`[b] 計算結果 ans: `, ans)

  // a 內部會依 b 操作結果而有不同後續流程，這就是 unit test 要測試的重點
  switch (true) {
    case ok === true:
      return `計算完成`
    case ok === false && code === 1:
      return `參數 m 錯誤`
    case ok === false && code === 2:
      return `參數 n 錯誤`
    case ok === false && code === 3:
      return `參數 m, n 總合錯誤`
  }
}

/* test data
-------------------------------------------------- */

// a.js 專用的測資
exports.test_data_a = [
  {
    m: -1,
    n: 2,
    ans: `參數 m 錯誤`
  },
  {
    m: 3,
    n: 4,
    ans: `參數 n 錯誤`
  },
  {
    m: 15,
    n: -2,
    ans: `參數 m, n 總合錯誤`
  },
  { m: 8, n: -2, ans: `計算完成` }
]
