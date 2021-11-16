/*

  # 本尊

  # 其 spec 規則為
    1. a 需為正值
    2. b 需為負值
    3. a 與 b 總合需小於 10
    4. 如參數正確則將兩數相加

  # 返還格式

    { ok: Boolean, result: String }
    { ok: Boolean, code: Int,  message: String }

*/
exports.b = (a, b) => {
  // console.debug(`b 執行時參數: ${a}, ${b}`)
  if (a < 0) return { ok: false, code: 1, message: `a 不可為負值，拿到: ${a}` }
  if (b > 0) return { ok: false, code: 2, message: `b 需為負值，拿到: ${b}` }
  if (a + b > 10)
    return {
      ok: false,
      code: 3,
      message: `a 與 b 總合不可大於 10，拿到 ${a}, ${b}`
    }
  // 這裏操作各種 side effects 但最終返還計算結果
  const result = a + b
  return { ok: true, result }
}

/*
  # mock

  - 需由 b 的作者撰寫與維護，目地是讓 mock 行為與本尊完全一致

  - 因此每次 refactor 完 b 就要連帶修改 mock 內容確保它與本尊仍然一致

  - 外部會有 mock test 來驗証此事

  # 如果 b 會打 db 或 api 去檢查 a, b 參數的合法性

    - 例如當 a, b 不存在於 db 內就要返還錯誤訊息

    - 此時可在下面 switch case 內寫死一組 a, b 的值以觸發錯誤流程

    - 例如

      case a === `FAKE_ID`: return { ok: false, code: 4, message:`id not found` }

*/
exports.mocked_b = jest.fn().mockImplementation((a, b) => {
  switch (true) {
    case a < 0:
      return { ok: false, code: 1, message: `a 不可為負值，拿到: ${a}` }
    case b > 0:
      return { ok: false, code: 2, message: `b 需為負值，拿到: ${b}` }
    case a + b > 10:
      return {
        ok: false,
        code: 3,
        message: `a 與 b 總合不可大於 10，拿到 ${a}, ${b}`
      }
    case a === 8 && b === -2:
      // 注意：只支援 (8, -2) 這組參數並預先寫好正確答案為 6
      // 這裏不真的跑 a+b 的原因是在真實世界中 b 的內部計算邏輯可能很複雜
      // 而 mock 的目地就是為了避免真的執行這些邏輯(含 side effects)
      // 因此要寫死 input 與 output 否則就失去 mock 的意義了
      return { ok: true, result: 6 }
    default:
      return `不支援的測資`
  }
})
