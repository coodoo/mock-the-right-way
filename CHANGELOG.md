# Changelog

  - Nov 17, 2021: v1

    - 完成初步概念實作

  - Nov 18, 2021: v2

    - 減化 mocked_b 內部邏輯並改為自動比對以減少人工操作
    - 新增支援預定義之 test_data
    - 新增 matcher 自動比對 test_data
    - 大幅減化 test case 內複製、貼上的情況而改用 jest.each(test_data)
    - 新增 `b.unit.test` 示範使用同份 `test_data_b` 測試 `b` 本身
    - 新增此份 `CHANGELOG`

  - Nov 19, 2021: v3

    - 新增 `test_helper.js` 放共用的程式

      - 將 `matcher` 移入 `test_helper.js` 內可共用

      - 於 `test_helper.js` 內新增 `mocker` 可建立任何 fn 的替身版本

    - 簡化 `a.js` 與 `b.js` 的內容

      - 只留下定義 test data 的地方
      - 並將測資更名為 `mock_a` 與 `mock_b` 以方便識別

    - 修改所有 test case 改用 `test_helper.js` 內之 `matcher` 與 `mocker` 指令

    - 於 `README` 下方補充`人為觸發失敗劇情`的正確做法與範例，此手法既能維持本尊與分身執行結果的一致性，也能滿足測試時的彈性(可觸發各種失敗劇情例如錯誤值)
