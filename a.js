const { b } = require('./b')

/*
  - a 操作 b 做運算
  - unit test 時 b 會被換成 mock 版本
  - 但對 a 來說是無差別的，所有運作邏輯與流程仍然照跑
  - 寫 a 的 unit test 時重點在能人工觸發 b 各種運算結果的正確與錯誤劇情，以驗証 a 能否正確處理各種情況
*/
exports.a = (m, n) => {
  const ans = b(m, n)
  const { ok, result, code } = ans
  // console.debug(`[a] 計算結果: `, { ans, m, n })

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
