# 台灣勞工權益計算器

這是一個以 React + Vite 製作的台灣勞工權益試算網站，包含：

- 加班與假日出勤工資
- 特休資格與法定天數
- 資遣費新舊制拆算
- 勞退提撥與累積試算

## 開發指令

```bash
npm install
npm run dev
```

## 發佈到 GitHub Pages

這個專案已經設定好 GitHub Actions。

- 每次推送到 `master`，GitHub Pages workflow 會自動建置並部署網站。
- React Router 已改成 `HashRouter`，適合 GitHub Pages 靜態部署。

## 本機一鍵同步網站

如果你在本機修改了內容，要同步到 GitHub 與網站，直接執行：

```bash
npm run sync:site -- "你的提交訊息"
```

這個指令會自動做 4 件事：

1. 先跑 `npm run build`
2. 把目前所有變更加入 git
3. 建立 commit
4. 推送到 GitHub

推送完成後，GitHub Pages 會自動開始部署。

如果你沒有輸入提交訊息，腳本會自動用目前時間建立一個預設訊息。

## 如果你要開始賺錢

這個站最適合的變現順序不是先做付費牆，而是先吃搜尋流量，再把高意圖使用者導向廣告或合作轉換。

建議順序：

1. 先開 Google AdSense，放首頁與各工具頁頁尾上方的原生廣告。
2. 等有穩定流量後，再加聯盟或合作導流，例如法律諮詢、記帳薪資系統、人資 SaaS。
3. 如果之後要放大收入，再做付費模板、申訴文件包、進階比較工具或 PDF 匯出功能。

這個 repo 已經內建一套「預設關閉」的廣告骨架，沒有填參數時不會顯示任何廣告。

### 啟用廣告系統

1. 如果你還在用目前這個 repo 的專案頁網址，先不要送 AdSense；它是子路徑站，通常不適合拿來當正式審核站點。
2. 要走根網址方案，請改成 `https://wonbadon.github.io/`，再拿這個網址送 AdSense。
2. 複製 `.env.example` 成 `.env`，讓你本機可以先預覽廣告版位
3. 到 GitHub `Settings -> Secrets and variables -> Actions -> Variables`，新增下列變數，讓 GitHub Pages build 時也能帶入：

	- `VITE_SITE_URL`

	- `VITE_ADS_ENABLED`
	- `VITE_ADS_DEBUG`
	- `VITE_ADS_PROVIDER`
	- `VITE_ADSENSE_CLIENT`
	- `VITE_ADSENSE_HOME_SLOT`
	- `VITE_ADSENSE_PAGE_SLOT`
	- `VITE_ADSENSE_CONTENT_SLOT`

4. 填入你的 AdSense client 與 slot id
5. 重新 build 或直接同步網站

範例設定：

```bash
VITE_SITE_URL=https://wonbadon.github.io/
VITE_ADS_ENABLED=true
VITE_ADS_DEBUG=false
VITE_ADS_PROVIDER=adsense
VITE_ADSENSE_CLIENT=ca-pub-1234567890123456
VITE_ADSENSE_HOME_SLOT=1234567890
VITE_ADSENSE_PAGE_SLOT=0987654321
VITE_ADSENSE_CONTENT_SLOT=1122334455
```

開發時如果你想先看版位而不是真的載廣告，可以把 `VITE_ADS_DEBUG=true`，頁面會顯示 placeholder。

GitHub Pages 正式站會使用 workflow 裡帶入的 Actions Variables；如果你只改本機 `.env`，正式站不會跟著更新。

如果 build 時有帶 `VITE_ADSENSE_CLIENT`，repo 現在也會自動產生根目錄用的 `ads.txt`，內容會是 Google 要的標準格式。

### 版位策略

- 首頁：完整工具庫下方、footer 上方一塊，吃最高流量但不擋主功能。
- 工具頁：主內容結束後、免責聲明前一塊，保留使用者先完成試算。
- 內容頁：FAQ / Guide / About 這類說明頁用獨立 content slot，避免和工具頁混用成效。
- 不建議：輸入欄位中間、結果主卡上方、sticky 滿版廣告。這種會直接傷使用者完成率與 SEO。

## 第二變現入口

除了 AdSense，這個 repo 也內建了第二個變現骨架：合作 CTA。

適合放的內容：

- 法律諮詢合作
- 人資 / 記帳 / 薪資系統導流
- 申訴文件包或進階模板下載

對應的 Actions Variables：

- `VITE_LEAD_CTA_ENABLED`
- `VITE_LEAD_CTA_DEBUG`
- `VITE_LEAD_CTA_TITLE`
- `VITE_LEAD_CTA_BODY`
- `VITE_LEAD_CTA_PRIMARY_LABEL`
- `VITE_LEAD_CTA_PRIMARY_URL`
- `VITE_LEAD_CTA_SECONDARY_LABEL`
- `VITE_LEAD_CTA_SECONDARY_URL`

建議先這樣填：

```bash
VITE_LEAD_CTA_ENABLED=true
VITE_LEAD_CTA_DEBUG=false
VITE_LEAD_CTA_TITLE=需要進一步人工協助？
VITE_LEAD_CTA_BODY=如果你的案件已經超出一般試算範圍，可以整理資料後進一步預約人工諮詢或下載進階資源。
VITE_LEAD_CTA_PRIMARY_LABEL=前往合作諮詢
VITE_LEAD_CTA_PRIMARY_URL=https://你的表單或合作頁
VITE_LEAD_CTA_SECONDARY_LABEL=下載進階資源
VITE_LEAD_CTA_SECONDARY_URL=https://你的模板或商品頁
```

這個 CTA 目前會優先顯示在 Guide、FAQ、About 這些高意圖內容頁，不會硬插進計算流程中間。

### 實際要注意的事

- AdSense 要的是可索引內容、穩定頁面與真實流量，不只是能顯示廣告碼。
- 目前 canonical 已指向 GitHub Pages 網址，比較適合做 SEO 與廣告審核。
- 免責聲明、關於本站、FAQ 都應保留，這些對審核與信任感有幫助。
- 真正比較會賺的通常不是單靠廣告，而是「廣告 + 高意圖合作導流」。

## 改成 wonbadon.github.io 根網址

GitHub Pages 的根網址只能來自使用者站 repo，也就是 repo 名稱必須是 `wonbadon.github.io`。目前這個 repo 叫做 `taiwan-labor-calculator`，所以它只能掛在 `/taiwan-labor-calculator/` 子路徑下。

最穩的搬法：

1. 在 GitHub 建立一個新的公開 repo：`wonbadon.github.io`
2. 把這個 repo 當成原始碼 repo 保留，新增第二個 remote 指向新的根站 repo
3. 在本機執行：

```bash
git remote add user-site https://github.com/wonbadon/wonbadon.github.io.git
git config sync.secondaryRemote user-site
```

4. 之後照常用：

```bash
npm run sync:site -- "你的提交訊息"
```

如果你已經安裝 GitHub CLI 並完成登入，也可以先執行：

```bash
powershell -ExecutionPolicy Bypass -File ./scripts/bootstrap-user-site.ps1
```

這會自動建立 `wonbadon.github.io`、加入 `user-site` remote，並把之後的同步腳本設成會一起推到根站。

現在的同步腳本會先推 `origin`，如果你有設定 `sync.secondaryRemote`，也會一起推到根站 repo。

這份程式也已經支援兩種網址：

- 在 `wonbadon/taiwan-labor-calculator` repo build 時，canonical 會是 `https://wonbadon.github.io/taiwan-labor-calculator/`
- 在 `wonbadon/wonbadon.github.io` repo build 時，canonical 會自動改成 `https://wonbadon.github.io/`

也就是說，你不需要維護兩份不同程式碼，只需要多一個根站 repo 來承接同一份部署內容。
