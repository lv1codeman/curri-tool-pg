# 功能介紹

可將班級簡稱轉成對應的資訊。

# 使用教學

> 輸入限制：班級簡稱

- 在左輸入框貼上從 Excel 複製的班級簡稱，右邊輸入框會自動產出結果。
- 貼上後想看不同結果可選擇下拉選項
- 可將結果複製貼回 Excel 中使用。

# 在本地端執行

1. 安裝使用到的模組，產生 node_modules

```
pnpm install
```

2. 設定 server 端網址  
   建立一個.env 檔放在專案的根目錄  
   內容貼上 NUXT_PUBLIC_API_BASE_URL=[server 端網址]  
   server 端網址請詢問管理者
3. 執行開發環境測試

```
pnpm dev
```

# 上傳到 github page

依序執行

```
pnpm run generate
```

```
pnpm run deploy
```
