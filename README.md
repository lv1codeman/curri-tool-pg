## 系統架構

本專案為 curri-tool 的客戶端(前端)，資料庫使用 PostgreSQL  
雲端伺服器(後端)架設在 vercel.com  
雲端資料庫架設在 neon.com  
帳號皆為lv1codeman@gmail.com

客戶端訪問伺服器端，伺服器根據要求向資料庫端存取，透過 axios api 回傳給客戶端網頁
網頁資料大多需要向伺服器端訪問取得，所以您必須架設自己的伺服器和資料庫  
伺服器端專案網址為`https://github.com/lv1codeman/curridata_server_pg`
雲端伺服器 api 網址為`https://curridata-server-pg.vercel.app`
(nuxt.config.ts 會讀取.env 的 NUXT_PUBLIC_API_BASE_URL=https://curridata-server-pg.vercel.app作為apiBaseUrl的參數)

## 使用注意

因為後端伺服器架設在 vercel.com，是一種 serverless 的服務，
所以休眠後重啟速度較快，但也因此每次訪問時需要的時間會稍微久一點，請耐心使用

之前架在 render.com 沒有這問題，但每次休眠後重啟需要等候 20~30 秒實在太久了...

## 在本地端執行

1. 安裝使用到的模組，產生 node_modules

```
pnpm install
```

2. 設定 server 端網址  
   建立一個.env 檔放在專案的根目錄  
   內容貼上 NUXT_PUBLIC_API_BASE_URL=[server 端 API 網址]
3. 執行開發環境測試

```
pnpm dev
```

## 更新 github page

當想要更新 github page 時，執行以下指令：

1. pnpm run generate
2. git commit
3. git push

以下這段 yaml 檔的代碼，代表在 push 的時候會自動 deploy 到 github page

```
on:
  push:
    branches:
      - main
```

## useMenu

useMenu：控制不同身份可以看到 siderbar 的內容
useRBAC：設定不同身份可以存取的頁面
