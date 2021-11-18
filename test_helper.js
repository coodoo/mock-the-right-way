const _ = require('lodash')

/*
  # 功能

    - 泛用型參數比對器

*/
// 可比對任意數量的 input 與 test_data 內資料是否相符並返還預期的答案
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
  # 功能

    - 依 test_data 建立 mocked 版本以取代原始 fn 供測試用

  # 原則

    - mock_fn 內部不應包含任何邏輯

    - 只需單純將傳入的 input 送去給 matcher 與預先寫好的 test_data 比對找出答案即可

    - 如此做目地是讓 mock 版功能單純化，不要想試圖複製本尊內部的邏輯，那耗時費力又易錯

    - 也因此可用 mocker() 來建立所有 fn 的 mock_fn，只要傳入不同 test_data 即可

    + 未來此事或可由 codegen 自動替檔案內每支 fn 生成 mock_fn？

  # 原理

    - 是支 curried function
    - 先傳入一份 test_data 並返還一支 mock_fn()
    - mock_fn(a, b, ...) 可收任意數量的參數
    - mock_fn 的目地即為取代原始 fn

  # 返還

    - 最終返 jest.fn()

    - 因此可操作 fn.mockImplementation, fn.mockReturnValue 等十數支指令

    - 也可驗証 fn.mock.calls 等各種參數

  # 用例

    const mocked_b = mocker(test_data)
    expect(mocked_b(1,2)).toBe(3)

  # 注意 mocker 收的第一個參數為 test_data 也就是測資

    - 如果沒給入即會炸掉讓測試立即失敗

    - 如此設計是方便在 test case 內可隨時傳入一組新的測資

*/
exports.mocker = test_data =>
  jest.fn().mockImplementation((...args) => {
    if (!test_data) throw new Error(`test_data 不可為空值`)
    return matcher(test_data, args) ?? `不支援的測資`
  })
