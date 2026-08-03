# Portfolio v2 — Hsin-Yu (Sherly) Huang

UX Researcher & Product Designer 的個人作品集網站。

## 結構

```
index.html      首頁：Hero / About + Capabilities / Selected Work / Contact
resume.html     經歷頁
styles.css      全站樣式
script.js       平滑捲動、導覽列、圖片淡入
js/rail.js      More Projects 橫向 rail（箭頭、觸控板、拖曳、鍵盤、觸控）
js/nav.js       導覽列捲動狀態（目前未載入）
js/sparkle.js   Hero 星塵（目前未載入）
assets/         圖片與影片
```

## 設計系統

**背景** — 整頁一條連續漸層畫在 `body` 上，各 section 皆為 `transparent`，
hero 底部用 `mask-image` 溶入，因此沒有任何橫向接縫。
色停：`#ffd1d1 → #ffd0cf → #ffd8ce → #fde2d6 → #fdecdd → #fef2e1 → #fef6e4`

**文字色**

| 用途 | 色碼 | 白底對比 |
|---|---|---|
| 標題（無漸層） | `#2d3436` | 12.7 : 1 |
| icon、次要標題 | `#5e6472` | 5.9 : 1 |
| 內文 | `#6f6055` | 6.0 : 1 |
| 次要資訊 | `#7d6f63` | 4.9 : 1 |
| 連結、badge | `#ff69b4` | 2.7 : 1 |

**漸層文字** — 區塊大標（About Me / Selected Work / More Projects / Get in touch）
使用日落漸層 `#e64796 → #f5865f → #f8c47c`；Hero 的 `SHERLY.` 使用
`#2d3436 → #a18cd1 → #fbc2eb`。兩者皆套 `shimmerText` 動畫。

**縮放** — `--s` 控制 About 與 Selected Work 的整體比例（目前 `0.9`）。
改這一個值即可等比放大縮小，比例關係不變。

**rail** — `--media-h` 控制媒體區高度，四張卡等高的關鍵（目前 `440px × --s`）。

## 待辦

- [ ] VLE Redesign 缺案例圖
- [ ] Eye tracking / 生理訊號研究的獨立頁面
- [ ] 三個 featured 專案的內頁
- [ ] 素材壓縮：首次載入目前 91.6 MB
