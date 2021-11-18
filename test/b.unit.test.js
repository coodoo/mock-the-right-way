const _ = require('lodash')
const { mock_b } = require('../b')

//
describe('b unit test', () => {
  // 用預先寫好的測資與答案去驗算 b 計算結果是否正確
  test.each(mock_b)('b 各種計算應成功', ({ m, n, ans }) => {
    const { b } = require(`../b`)
    const result = b(m, n)
    // console.debug(`計算結果`, {result, ans, m, n} )

    // 驗証
    // b 計算結果應正確
    expect(result).toEqual(ans)
  })

  // 也可人工給入不同參數驗算結果
  test('給入隨機 input 應計算應成功', () => {
    const { b } = require(`../b`)
    const result = b(100, -95)
    // console.debug(`計算結果`, result )

    // 驗証
    // b 計算結果應正確
    expect(result).toEqual({ ok: true, result: 5 })
  })
})
