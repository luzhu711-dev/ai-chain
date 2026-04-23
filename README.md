# AI 产业价值链全景图

第一性原理版 AI 产业链图谱，含 10 层功能节点 + bn 1-5 紧缺度打分 + ~60 只标的映射。

## 在线地址（长期有效）

- **🖥️ 桌面版**：https://luzhu711-dev.github.io/ai-chain/
- **📱 手机版**：https://luzhu711-dev.github.io/ai-chain/mobile.html

## 文件结构

| 文件 | 用途 |
|------|------|
| `index.html` | 桌面版（D3.js 横向交互图），部署到 GitHub Pages 根路径 |
| `mobile.html` | 手机版（纯 SVG 竖向节点图 + iOS 底部抽屉） |
| `_react原型/` | 早期 Vite + React 原型，7 层结构 + 边类型数据模型。已归档，未来做 v2 数据升级时可参考 |

## 更新工作流

```bash
cd /Users/zhanglulu/Documents/knowledge-base/projects/AI产业链全景图/
# 改 index.html 或 mobile.html
git add .
git commit -m "描述改动"
git push
```

推送后 30-60 秒，GitHub Pages 自动重新部署，URL 不变。

## 设计原则（v1）

- **按真实因果链分层**，不按券商行业分类
- **先定义功能节点**，再挂代表标的
- **节点大小按紧缺度 bn 1-5 动态缩放**——越紧越大
- **多业务公司在名称中标注"主业 / 分部"**
- **A 股排除，H 股带代码后缀**
- **三链着色**：🟠 能量链 L1-L4 / 🔵 算力链 L5-L8 / 🟢 货币化链 L9-L10 / 🔴 隐性瓶颈

## 数据源（v1 bn 打分依据）

1. SemiAnalysis 17 篇中译（`knowledge-base/research/行业研究/半导体产业链地图/SemiAnalysis原文/`）
2. AlphaEngine 详尽版报告（71 份中文研报综合，2026-04-22 跑）
3. 知识库内其它研究（`research/行业研究/核电/`、`铀/`、`能源综合/`、`泛AI/`、`companies/` 等）

## 方法论笔记

详见：`knowledge-base/research/行业研究/AI产业链/2026-04-22-全景图v1-第一性原理.md`
