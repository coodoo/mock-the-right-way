const _ = require('lodash')

//
describe('mock test', () => {
  //
  test.each([
    { m: -1, n: 2 },  // m 需為正值
    { m: 3, n: 4 },   // n 需為負值
    { m: 15, n: -2 }, // m, n 總合需小於 10
    { m: 8, n: -2 }   // 正確答案只支援這組參數
  ])('b mock 結果需與本尊一致', ({ m, n }) => {
    const { b, mocked_b } = require('../b')

    // 本尊與分身各跑一次然後比較答案是否相同
    const truth = b(m, n)
    const fake = mocked_b(m, n)
    // console.debug(`比較結果`, { truth, fake })

    // 這裏不用驗証 truth 的答案是否正確，那是 unit test 的事
    // 這裏只在意兩者答案需相等就是 referential transparency
    // 代表 mock 與本尊行為一致
    expect(_.isEqual(truth, fake)).toBe(true)
  })
})
