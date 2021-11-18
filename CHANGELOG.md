# Changelog

  - Nov 17, 2021: v1

    - 完成初步概念實作

  - Nov 18, 2021: v2

    - 大幅減化 mocked_b 內部邏輯並改為自動比對以減少人工操作
    - 新增支援預定義之 test_data
    - 新增 matcher 自動比對 test_data
    - 大幅減化 test case 內複製、貼上的情況而改用 jest.each(test_data)
    - 新增 `b.unit.test` 示範使用同份 `test_data_b` 測試 `b` 本身
    - 新增此份 `CHANGELOG`
