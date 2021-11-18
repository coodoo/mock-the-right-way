const _ = require('lodash')
const { mock_a } = require('../a')
const { mock_b } = require('../b')
const { mocker } = require('../test_helper')

// 說明
// 示範寫 a 的 unit test 時會將 b mock 起來
// 也就是改用 mocked_b 取代 b
describe('a unit test', () => {
  //
  beforeEach(() => {
    // 用 mock 版取代本尊 b 就不會真的執行
    const mod = require('../b')
    jest.spyOn(mod, 'b')

    // mocker 的功能是建立 b 的替身版本
    // 注意 mocker 的 signature 是先收一個參數 test_data
    // 然後返還一支 curried fn 等著第二次呼叫時收 (m, n) 參數才真正進行運算
    // 這支 curried fn 就是 mocked_b (替身版本)
    mod.b = mocker(mock_b)

    // 注意：下面兩寫法皆無效
    // mod.b.mockImplementation = mod.mocked_b
    // mod.b.mockReturnValue(9)
  })

  // 遍歷 a.js 的 mock_a 驗証計算結果正確
  // 如此即不需複製多個 test case 比較簡潔、易讀與好管理
  // 只需專心維護一份 single truth 也就是 mock_a 即可
  test.each(mock_a)(`a 各種計算應成功`, ({ m, n, ans }) => {
    const mod = require('../b')
    const { a } = require('../a')

    // 執行
    const result = a(m, n)
    // console.debug(`[測試結果]`, result)
    // console.debug(`[次數]`, mod.b.mock.calls)

    // 驗証
    // a 的計算結果需正確
    expect(result).toContain(ans)
    // mocked_b 呼叫次數與收到參數需正確
    expect(mod.b.mock.calls.length).toEqual(1)
    expect(mod.b.mock.calls[0]).toEqual([m, n])
  })
})
