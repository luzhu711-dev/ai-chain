# React 原型（已归档）

**状态**：已被 `../index.html` + `../mobile.html` 取代。保留作为 v2 数据模型升级时的参考。

**技术栈**：Vite + React 18 + TypeScript，需要 `npm run dev` 才能跑。

## 为什么归档

- 7 层结构（需求 / 模型平台 / 芯片内存 / 网络互联 / 制造封装 / 服务器机房 / 电力能源），被新的 10 层第一性原理版替代
- 改动需要 build，迭代慢；新 HTML 版是零构建直接改，更适合日常维护
- 未部署到 GitHub Pages

## 值得保留的数据模型（v2 升级时可用）

文件 `src/data/mapData.ts` 定义了有价值的类型：

- `MapNode`：每个节点含 `upstream[]` / `downstream[]` / `valueCapture` / `watchpoints[]` / `companies[]` / `metrics[]`
- `MapEdge`：边有 5 种类型（`demand` 需求拉动 / `bottleneck` 瓶颈约束 / `capex` Capex 传导 / `substitute` 替代路径 / `pricing` 议价权）+ 三级强度

**未来 v2 做"时间快照切换 + 多边类型"时，可以参考这个数据结构**，把 HTML 版里扁平的 `tickers: []` 扩成带边信息的图。

## 本地运行（如需查看）

```bash
cd _react原型
npm install
npm run dev
```
