<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 项目定位

这是一个“幼师 AI 工作台”网页版 MVP 项目。

目标用户：
- 幼儿园老师
- 托育老师
- 园长

核心目标：
- 减少幼师写材料的时间
- 辅助生成观察记录、家长沟通文案、成长档案、主题活动总结、教案初稿
- 先验证产品可用性，不追求复杂平台化

## 当前阶段

当前阶段只做前端 mock 版本。

暂时不做：
- 数据库
- OpenAI API
- 登录系统
- 图片上传
- 语音识别
- 家长端
- 微信小程序
- 部署上线

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- npm
- Windows 本机环境

## Windows 环境规则

不要使用 WSL/Linux 命令。

禁止使用：
- apt
- bash
- chmod
- curl
- rm -rf
- /home 路径
- ~/ 路径

Windows PowerShell 命令优先使用：
- npm.cmd run dev
- npm.cmd run lint
- cd E:\code\my_work\kindergarten-ai-assistant

## 开发规则

修改代码前先输出：
1. 修改目标
2. 文件列表
3. 实现步骤
4. 风险点

获得确认后再修改代码。

不要一次性大改，优先小步实现。

## 页面要求

所有页面文案必须使用中文。

第一版页面包括：
- 首页 Dashboard
- 幼儿档案列表
- 新建幼儿档案表单
- AI 生成页面
- 生成结果展示
- 复制按钮

## AI 内容安全规则

本项目面向幼儿教育场景。

禁止生成：
- 医学诊断
- 心理诊断
- 发育障碍判断
- 儿童标签化评价
- “这个孩子有自闭症”
- “这个孩子有多动症”
- “这个孩子智力异常”
- “这个孩子不正常”

允许生成：
- 客观观察
- 行为描述
- 能力发展点
- 后续引导建议
- 家长沟通文案
- 继续观察建议

推荐表达：
- “建议继续观察”
- “建议与家长保持沟通”
- “必要时咨询专业人员”
- “该表现需要结合更多场景综合判断”

## 命令
