月見福引｜離線 PWA 版

檔案：
- index.html：主程式
- manifest.webmanifest：PWA 設定
- sw.js：離線快取

使用方式：
1. 如果只想在電腦離線玩：直接開啟 index.html 即可。
2. 如果要安裝到 iPhone/iPad/Android 主畫面：
   必須先把整個資料夾放到 HTTPS 網站上（例如 GitHub Pages、Cloudflare Pages 等）。
3. 第一次在線上開啟後，Service Worker 會快取程式；之後即使沒有網路仍可使用。
4. 抽獎設定與紀錄儲存在該裝置瀏覽器的 localStorage。
5. 建議活動前先開啟一次並測試離線模式。
