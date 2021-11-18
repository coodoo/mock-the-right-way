# 情境

  - A 呼叫 B，但 B 內部會寄信，寫 A unit test 時該如何處理 B？

# 問題

  - 寫 A unit test 時常會將 B mock 掉以避免執行它內部的 side effects

  - 但 B 內部實作將來如發生變動，例如 db schema 修改或 API 格式變動，則返還的資料格式也會變動

  - 此時在 unit test 內人工手寫的 mock 資料就與 B 本尊不一致了

  - 這會導致測試通過但上線後炸掉的局面

# 目標

  - 避免測試通過但上線炸掉的冏境

  - 盡量減少人工撰寫 mock 的時間與降低外人使用 mock 的成本

# 前提

  - 注意 unit test 與 integration test 彼此無法互相取代，兩個都要寫

  - 但在 unit test 內為了能人工觸發不同的成功與錯誤劇情並且避免真的執行 side effects 因此需要寫 mock

  - 此 repo 的重點在研究正確與安全的 mock 手法，而非用 unit test 取代 integration test

# 檔案

  - `a.js` 即為情境中的 A

  - `b.js` 即為情境中的 B

  - `test/a.unit.test.js` 是 A 的 unit test ← 主要操作劇情在此

  - `test/b.smoke.test.js` 是 B 的 smoke test ← 確保 mock 與本尊一致性的實作在此

# 執行

  $ yarn          ← 安裝 npm 套件

  $ jest a.unit   ← 觀察如何測試 A

  $ jest b.unit   ← 觀察如何測試 B

  $ jest b.smoke  ← 觀察如何確保 B mock 行為與本尊一致

# 解法

  - 一律由 B 作者寫 mock 並負責維護

  - 並在 smoke test 內測試此 mock 以確保 mock 格式與本尊一致

# 原則

  - mock 需能完全取代本尊成為一個 authentic test double

  - 也就是實現 same input, same output 之 referential transparency 原則

  - 實作手法是在 smoke test 內用一組測資同時操作本尊與 mock 並比較兩者答案是否相同

  - 盡量透過 `test_data` 表列各種參數與預期結果做為 `single source of truth` 供 test case 使用，如此可高度自動化與減少手寫比例

# 好處

  - mock 只需寫在一處較好維護，而非散落在多個 unit test 內並由外人手工撰寫

  - 由原作者維護，他是最清楚該如何正確建立 mock 以取代本尊的人

  - 外加 smoke test 驗証以確保 mock 與本尊行為一致

  - 避免 unit/integration test 帶來之`錯誤的安全感`

# 壞處

  - 增加工作量，因為需多寫一支 mock 與其相關測試，日後每次 refactor 完也要改所有相關檔案

    - 但其實 mock 遲早都要寫，不是由作者本人寫，就是由測試者在測試時寫，只是後者很可能便宜行事，或無法跟上程式 refactor 的腳步而發生不同步情況，因此一開始就寫好 mock 其實不算增加工作量，它反而減少重複工作，更增加準確度(因為由作者本人寫最精準，且有 smoke test 保護)

  - 寫 test 的人需正確引用此 mock 而非本尊，這無法透過外部工具來防呆(code review 是目前唯一方式)

# 注意

  - 返還的 mock 一律是 jest.fn() 物件

    - 其內部實作可隨時透過 jest.fn.mockImplementation() 由外部視需要修改以增加測試彈性

  - mock 的目地是為了寫測試時能便利的觸發各種正確與錯誤劇情

    - 實現方式為在 mock 的 switch case 內針對指定參數返還不同的成功與失敗結果

  - mock 裏預先寫死參數與答案而不能傳任意值

    - 否則就得真的跑本尊內部邏輯，這就失去避開 side effect 的意義了

  - `package.json` 內有設定 `jest config` 會在每個 test case 前重置環境

# 詞彙

  - test double

    - 泛指 fake, stub, mock

    - 目地是取代本尊(fn)以避免執行內部 side effects

    - 原本在 jest 會用 `mockImplementation` 與 `mockReturnedValue` 來實作這些功能

  - smoke test

    - 泛指 integration, functional 與 e2e tests

    - 只要會碰到 side effects 的就算(例如操作 DB 與 API)

  - referential transparency

    - 如果一個 `function` 拿到 `same input` 總能返還 `same ouput` 即可稱為 referential transparency

    - 這代表可用 `output` 取代此 `function` 而不需執行它，通常這是 pure function 的特色

    - `pure` 是指 function 內部沒有操作任何 side effects (例如 DB, API 甚至 console.log)

    - 此例中我們就是想用 mock 實現 referential transparency 以取代本尊

  - single source of truth

    - 程式中相同的資料只應有一份並存在於單一位置，而非複製多份散落各檔案間

    - 如此可避免多份資料隨時間而呈現不同步狀態

    - 此例中各檔案內的 `test_data` 即為 `single truth` 供外界使用
