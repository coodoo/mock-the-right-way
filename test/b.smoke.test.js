const _ = require('lodash')
const { mock_b } = require('../b')
const { mocker } = require('../test_helper')
//
describe('mock test', () => {
  //
  test.each(mock_b)('本尊與 mock 執行結果應相同', ({ m, n }) => {
    const { b } = require('../b')

    // 同組測資分別餵給本尊與分身各跑一次然後比較兩者答案是否相同
    const truth = b(m, n)
    const fake = mocker(mock_b)(m, n)
    // console.debug(`比較結果`, { truth, fake })

    // 驗証
    // 這裏不用管 truth 的計算答案是否正確，那是 b.unit.test 的事
    // 這裏只在意兩者答案需相等就是 referential transparency
    // 代表 mock 與本尊行為一致
    expect(_.isEqual(truth, fake)).toBe(true)
  })

  //
  test('傳入不存在的測資參數應失敗', () => {
    const { mocked_b } = require('../b')
    const result = mocker(mock_b)(0, 1)
    // console.debug(`測試結果:`, result)

    // 驗証
    expect(result).toContain(`不支援的測資`)
  })
})
