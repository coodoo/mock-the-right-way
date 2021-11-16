const _ = require('lodash')

describe('a', () => {

  //
  beforeEach(() => {
    // mock
    const mod = require(`../b`)
    jest.spyOn(mod, 'b')

    // 用 mock 版取代本尊，b 就不會真的執行
    mod.b = mod.mocked_b

    // 下面兩寫法皆無效
    // mod.b.mockImplementation = mod.mocked_b
    // mod.b.mockReturnValue(9)
  })

  //
  test('計算成功', async () => {
    const mod = require(`../b`)
    const { a } = require('../a')
    // 只能餵入 (8, -2) 這組參數才會執行成功劇情
    const params = [8, -2]
    const result = a(...params)
    // console.debug(`[測試結果]`, result)
    // console.debug(`[次數]`, mod.b.mock.calls)
    // 驗証
    expect(result).toContain(`計算完成`)
    expect(mod.b.mock.calls.length).toEqual(1)
    expect(mod.b.mock.calls[0]).toEqual(params)
  })

  //
  test('計算失敗 - a 需為正值', async () => {
    const mod = require(`../b`)
    const { a } = require('../a')

    // 這是原本的寫法，在外部假造 b 的返還值
    // 缺點是如果 b 將來不是返還此格式則測試就會失敗或無效
    // mod.b.mockReturnValue({ok: false, code: 1, message: 'blah'})

    // 執行
    // 這是正確做法，讓 a() 真的跑，但它內部用的 b 已被換成 mock 版
    // 然後餵入不正確參數並預期結果失敗
    const params = [-1, -2]
    const result = a(...params)
    // console.debug(`[測試結果]`, result)
    // console.debug(`[次數]`, mod.b.mock.calls)

    // 驗証
    expect(result).toContain(`參數 m 錯誤`)
    expect(mod.b.mock.calls.length).toEqual(1)
    expect(mod.b.mock.calls[0]).toEqual(params)
  })

  //
  test('計算失敗 - b 需為負值', async () => {
    const mod = require(`../b`)
    const { a } = require('../a')

    // 這是原本的寫法，在外部假造 b 的返還值
    // 缺點是如果 b 將來不是返還此格式則測試就會失敗或無效
    // mod.b.mockReturnValue({ok: false, code: 2, message: 'blah'})

    // 執行
    // 這是正確做法，讓 a() 真的跑，但它內部用的 b 已被換成 mock 版
    // 然後餵入不正確參數並預期結果失敗
    const params = [1, 2]
    const result = a(...params)
    // console.debug(`[測試結果]`, result)
    // console.debug(`[次數]`, mod.b.mock.calls)

    // 驗証
    expect(result).toContain(`參數 n 錯誤`)
    expect(mod.b.mock.calls.length).toEqual(1)
    expect(mod.b.mock.calls[0]).toEqual(params)
  })

  //
  test('計算失敗 - a+b 總合需小於 10', async () => {
    const mod = require(`../b`)
    const { a } = require('../a')

    // 這是原本的寫法，在外部假造 b 的返還值
    // 缺點是如果 b 將來不是返還此格式則測試就會失敗或無效
    // mod.b.mockReturnValue({ok: false, code: 3, message: 'blah'})

    // 執行
    // 這是正確做法，讓 a() 真的跑，但它內部用的 b 已被換成 mock 版
    // 然後餵入不正確參數並預期結果失敗
    const params = [18, -2]
    const result = a(...params)
    // console.debug(`[測試結果]`, result)
    console.debug(`[次數]`, mod.b.mock.calls)

    // 驗証
    expect(result).toContain(`參數 m, n 總合錯誤`)
    expect(mod.b.mock.calls.length).toEqual(1)
    expect(mod.b.mock.calls[0]).toEqual(params)
  })
})
