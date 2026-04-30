# 幼师 AI 工作台

## 项目简介

幼师 AI 工作台是一个面向幼儿园教师的网页版 MVP，用于管理幼儿档案，并根据教师输入的观察文字生成常用工作文案。

## 当前 MVP 功能

- 首页 Dashboard
- 幼儿档案列表
- 新建幼儿档案表单
- AI 文案生成页面
- 支持生成以下类型：
  - 每日观察记录
  - 家长沟通文案
  - 成长档案
  - 主题活动总结
  - 教案初稿
- 显示生成结果
- 支持复制生成结果

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- React

## 本地启动方式

Windows 环境下运行：

```powershell
npm.cmd run dev
```

启动后访问：

```text
http://localhost:3000
```

## 页面路径

- `/`：首页 Dashboard
- `/children`：幼儿档案列表
- `/children/new`：新建幼儿档案
- `/ai`：AI 文案生成

## 当前阶段说明

当前版本是前端 mock 版本，暂未接数据库，暂未接 OpenAI API。

## 后续计划

- 接入 OpenAI API
- 保存生成历史记录
- 部署到 Vercel
