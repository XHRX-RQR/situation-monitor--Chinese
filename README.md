# 态势监控系统 (Situation Monitor) 中文版

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Svelte](https://img.shields.io/badge/Svelte-5.0-ff3e00.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6.svg)

**实时全球态势监控与智能分析平台**

[English](README.en.md) | 简体中文

</div>

---

## 📋 目录

- [项目简介](#-项目简介)
- [核心特性](#-核心特性)
- [技术架构](#-技术架构)
- [快速开始](#-快速开始)
- [功能模块](#-功能模块)
- [配置说明](#-配置说明)
- [部署指南](#-部署指南)
- [开发指南](#-开发指南)
- [API集成](#-api集成)
- [贡献指南](#-贡献指南)
- [许可证](#-许可证)

---

## 🎯 项目简介

**态势监控系统**是一个基于 SvelteKit 构建的实时全球态势监控平台，集成了多源数据聚合、智能翻译、可视化分析等功能，为用户提供全方位的全球事件、市场动态、地缘政治等信息的实时监控与分析。

本项目为**完全中文化版本**，所有界面元素、提示信息均已汉化，并集成 DeepLX 翻译 API，实现英文内容的实时自动翻译，翻译覆盖率达到 **100%**。

### ✨ 项目亮点

- 🌍 **全球态势可视化** - TopoJSON 地图展示全球事件分布
- 🔄 **实时数据同步** - 多源数据实时聚合与更新
- 🌐 **智能翻译** - 集成 DeepLX API，自动翻译英文内容
- 📊 **多维度分析** - 关联分析、叙事追踪、预测市场
- 🎨 **现代化 UI** - 基于 Tailwind CSS 的响应式设计
- ⚡ **高性能** - Vite 构建，服务端渲染 (SSR)

---

## 🚀 核心特性

### 1. 多源数据聚合

集成全球主流数据源，提供全方位信息监控：

| 数据源 | 类型 | 说明 |
|--------|------|------|
| **GDELT Project** | 新闻事件 | 全球新闻数据库，覆盖政治、科技、金融等 |
| **Finnhub** | 金融市场 | 实时股票、加密货币、商品期货数据 |
| **Polymarket** | 预测市场 | 去中心化预测市场数据 |
| **USA Spending** | 政府合同 | 美国政府采购与合同信息 |
| **Layoffs.fyi** | 裁员追踪 | 科技行业裁员动态 |
| **Federal Reserve** | 美联储 | 美联储新闻与政策动态 |

### 2. 实时翻译系统

- ✅ **100% 翻译覆盖** - 所有英文数据自动翻译为中文
- ✅ **智能缓存** - 避免重复翻译，提升性能
- ✅ **批量处理** - 并发翻译，控制 API 调用频率
- ✅ **降级策略** - 翻译失败时显示原文
- ✅ **可视化标识** - 🌐 标记已翻译内容

**翻译覆盖范围**：
- 新闻标题与描述（政治、科技、金融、政府、AI）
- 世界领袖相关新闻
- 预测市场问题
- 政府合同描述
- 裁员信息标题
- 美联储新闻动态

### 3. 可视化分析

#### 全球地图
- TopoJSON 矢量地图
- 自定义监控点标注
- 地缘政治事件可视化

#### 实时面板
- **25+ 监控面板**，包括：
  - 全球地图
  - 地缘政治
  - 科技与 AI
  - 金融市场
  - 政府政策
  - 板块热力图
  - 加密货币
  - 预测市场
  - 巨鲸监控
  - 世界领袖
  - 情报动态
  - 关联分析
  - 叙事追踪
  - 美联储

#### 智能分析
- **关联分析** - 发现新闻间的关联关系
- **叙事追踪** - 追踪热门话题演变
- **今日主角** - 识别高频人物与实体

---

## 🛠 技术架构

### 前端框架

```
Svelte 5.0          现代响应式框架
├── SvelteKit 2.0   全栈应用框架 (SSR)
├── TypeScript 5.0  类型安全
└── Vite 6.0        超快构建工具
```

### UI 与样式

```
Tailwind CSS 3.4    实用优先的 CSS 框架
├── PostCSS         CSS 后处理器
└── Autoprefixer    浏览器前缀自动添加
```

### 数据可视化

```
D3.js 7.9           强大的数据可视化库
└── TopoJSON        地理数据格式
```

### 质量保障

```
ESLint 9.0          代码规范检查
├── Prettier 3.0    代码格式化
├── Vitest 2.0      单元测试
└── Playwright 1.49 端到端测试
```

### 架构特点

- **服务端渲染 (SSR)** - 首屏加载速度优化
- **响应式状态管理** - Svelte 5 Runes ($state, $derived, $effect)
- **模块化设计** - 组件化、可扩展
- **类型安全** - 完整的 TypeScript 类型定义

---

## ⚡ 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### 安装步骤

```bash
# 1. 克隆仓库
git clone https://github.com/your-username/situation-monitor-cn.git
cd situation-monitor-cn

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入你的 DeepLX API 密钥

# 4. 启动开发服务器
npm run dev

# 5. 访问应用
# 浏览器打开 http://localhost:5173
```

### 验证安装

访问 `http://localhost:5173`，你应该看到：
- ✅ 全中文界面
- ✅ 地图正常显示
- ✅ 新闻面板加载数据
- ✅ 翻译功能正常工作（带有 🌐 标记）

---

## 📦 功能模块

### 新闻监控模块

```typescript
// 支持的新闻类别
export type NewsCategory = 
  | 'world'      // 全球
  | 'politics'   // 地缘政治
  | 'tech'       // 科技
  | 'ai'         // AI
  | 'finance'    // 金融
  | 'gov'        // 政府
```

**特性**：
- 实时获取 GDELT 新闻数据
- 自动去重与排序
- 批量翻译标题与描述
- 智能缓存机制

### 市场监控模块

**股票市场**
- 实时价格与涨跌幅
- 板块热力图
- 市场情绪指标

**加密货币**
- 主流币种价格监控
- 巨鲸交易追踪
- 市场波动分析

**商品期货**
- 黄金、白银、原油
- VIX 恐慌指数

### 世界领袖模块

**监控对象**：
- 🇺🇸 Donald Trump (美国总统)
- 🇨🇳 Xi Jinping (中国国家主席)
- 🇷🇺 Vladimir Putin (俄罗斯总统)
- 🇬🇧 Keir Starmer (英国首相)
- 🇫🇷 Emmanuel Macron (法国总统)
- 🇩🇪 Olaf Scholz (德国总理)
- 🇮🇱 Benjamin Netanyahu (以色列总理)
- 🇮🇳 Narendra Modi (印度总理)
- ... 以及其他全球主要领导人

**功能**：
- 自动抓取领袖相关新闻
- 活跃度排名
- 关键议题标签
- 实时翻译

### 态势分析模块

**预设态势监控**：
- 🇻🇪 委内瑞拉态势
- 🇬🇱 格陵兰态势
- 🇮🇷 伊朗危机

**自定义监控**：
- 添加自定义监控点
- 设置关键词过滤
- 地图可视化标注

---

## ⚙️ 配置说明

### 环境变量配置

项目使用环境变量管理敏感信息，**不会将 API 密钥提交到 Git**。

#### 1. 创建环境变量文件

```bash
# 复制示例文件
cp .env.example .env
```

#### 2. 编辑 .env 文件

```bash
# Finnhub API Key（可选）
# 获取地址: https://finnhub.io/
VITE_FINNHUB_API_KEY=your_finnhub_key

# DeepLX Translation API（必需）
# 将 YOUR_KEY_HERE 替换为你的真实密钥
VITE_DEEPLX_API_URL=https://api.deeplx.org/YOUR_KEY_HERE/translate
VITE_DEEPLX_API_KEY=YOUR_KEY_HERE
```

#### 3. 获取 DeepLX API 密钥

- 访问 DeepLX 服务提供商
- 注册账号并获取 API 密钥
- 将密钥填入 `.env` 文件

**注意**: `.env` 文件已在 `.gitignore` 中，不会被提交到 Git，确保密钥安全。

### 翻译服务配置

翻译服务会自动从环境变量读取配置，无需修改代码。

**配置文件**: `src/lib/services/translation.ts`

```typescript
// 自动从环境变量读取，开源安全
const DEEPLX_API_URL = import.meta.env.VITE_DEEPLX_API_URL || '默认值';
const DEEPLX_API_KEY = import.meta.env.VITE_DEEPLX_API_KEY || '默认值';
```

### CORS 代理配置

编辑 `src/lib/config/api.ts`：

```typescript
// 默认使用 cors-anywhere
export const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

// 也可以使用其他公共代理
// export const CORS_PROXY_URL = 'https://api.allorigins.win/raw?url=';
```

### 面板配置

编辑 `src/lib/config/panels.ts` 自定义面板布局：

```typescript
export const PANELS: Record<PanelId, PanelConfig> = {
  map: { name: '全球地图', priority: 1, category: 'core' },
  politics: { name: '地缘政治', priority: 1, category: 'news' },
  // ... 添加或修改面板
};
```

### 日志配置

编辑 `src/lib/config/api.ts`：

```typescript
export const logger = {
  log: (source: string, ...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.log(`[${source}]`, ...args);
    }
  },
  // ... 其他日志方法
};
```

---

## 🚀 部署指南

### 开发环境部署

```bash
# 启动开发服务器
npm run dev

# 指定端口
npm run dev -- --port 3000

# 允许外网访问
npm run dev -- --host
```

### 生产环境部署

#### 1. 构建生产版本

```bash
# 构建静态文件
npm run build

# 预览构建结果
npm run preview
```

#### 2. 使用 PM2 部署

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "situation-monitor" -- run preview

# 设置开机自启
pm2 startup
pm2 save

# 查看状态
pm2 status

# 查看日志
pm2 logs situation-monitor
```

#### 3. Nginx 反向代理

创建 Nginx 配置文件 `/etc/nginx/sites-available/situation-monitor`：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/situation-monitor /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 4. Docker 部署（可选）

创建 `Dockerfile`：

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
```

构建并运行：

```bash
docker build -t situation-monitor .
docker run -d -p 5173:5173 --name situation-monitor situation-monitor
```

---

## 💻 开发指南

### 项目结构

```
situation-monitor-main/
├── src/
│   ├── lib/
│   │   ├── api/              # API 集成
│   │   │   ├── news.ts       # 新闻 API
│   │   │   ├── markets.ts    # 市场数据 API
│   │   │   ├── leaders.ts    # 世界领袖 API
│   │   │   ├── fred.ts       # 美联储 API
│   │   │   └── misc.ts       # 其他 API
│   │   ├── components/       # 组件
│   │   │   ├── common/       # 通用组件
│   │   │   ├── panels/       # 面板组件
│   │   │   ├── modals/       # 模态框组件
│   │   │   └── layout/       # 布局组件
│   │   ├── config/           # 配置文件
│   │   ├── services/         # 服务层
│   │   │   └── translation.ts # 翻译服务
│   │   ├── stores/           # 状态管理
│   │   ├── types/            # TypeScript 类型
│   │   └── utils/            # 工具函数
│   ├── routes/               # SvelteKit 路由
│   ├── app.css               # 全局样式
│   └── app.html              # HTML 模板
├── static/                   # 静态资源
├── tests/                    # 测试文件
├── .gitignore                # Git 忽略规则
├── package.json              # 项目依赖
├── svelte.config.js          # Svelte 配置
├── vite.config.ts            # Vite 配置
├── tsconfig.json             # TypeScript 配置
└── tailwind.config.js        # Tailwind 配置
```

### 开发命令

```bash
# 启动开发服务器
npm run dev

# 类型检查
npm run check

# 代码检查
npm run lint

# 代码格式化
npm run format

# 运行单元测试
npm run test

# 运行端到端测试
npm run test:e2e

# 构建生产版本
npm run build
```

### 添加新面板

1. **创建面板组件** `src/lib/components/panels/YourPanel.svelte`：

```svelte
<script lang="ts">
  import Panel from '$lib/components/common/Panel.svelte';
  import type { PanelId } from '$lib/types';

  const panelId: PanelId = 'your-panel';
  let loading = $state(false);
  let error = $state<string | null>(null);
</script>

<Panel id={panelId} {loading} {error}>
  <!-- 面板内容 -->
</Panel>
```

2. **注册面板配置** `src/lib/config/panels.ts`：

```typescript
export const PANELS: Record<PanelId, PanelConfig> = {
  // ... 其他面板
  'your-panel': {
    name: '你的面板',
    priority: 2,
    category: 'analysis'
  }
};
```

3. **添加到主页面** `src/routes/+page.svelte`：

```svelte
{#if isPanelVisible('your-panel')}
  <div class="panel-slot">
    <YourPanel />
  </div>
{/if}
```

### 添加新数据源

1. **创建 API 模块** `src/lib/api/your-api.ts`：

```typescript
import { logger } from '$lib/config/api';

export interface YourData {
  // 定义数据接口
}

export async function fetchYourData(): Promise<YourData[]> {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    logger.error('Your API', 'Fetch failed:', error);
    throw error;
  }
}
```

2. **创建状态存储** `src/lib/stores/your-store.ts`：

```typescript
import { writable } from 'svelte/store';
import type { YourData } from '$lib/api/your-api';

export const yourData = writable<YourData[]>([]);
export const yourDataLoading = writable(false);
export const yourDataError = writable<string | null>(null);
```

3. **在组件中使用**：

```typescript
import { fetchYourData } from '$lib/api/your-api';
import { yourData } from '$lib/stores/your-store';

async function loadData() {
  const data = await fetchYourData();
  yourData.set(data);
}
```

### 代码规范

项目使用 ESLint + Prettier 统一代码风格：

```bash
# 检查代码规范
npm run lint

# 自动格式化代码
npm run format
```

**编码规范**：
- 使用 TypeScript 严格模式
- 组件文件使用 PascalCase 命名
- 工具函数使用 camelCase 命名
- 常量使用 UPPER_SNAKE_CASE 命名
- 使用 Tab 缩进（项目配置）
- 使用单引号字符串
- 函数和变量添加类型注解

---

## 🔌 API 集成

### 支持的 API

| API | 说明 | 文档 |
|-----|------|------|
| **GDELT** | 全球新闻事件数据库 | [gdeltproject.org](https://www.gdeltproject.org/) |
| **Finnhub** | 金融市场数据 | [finnhub.io](https://finnhub.io/) |
| **DeepLX** | 翻译服务 | - |
| **USA Spending** | 政府合同数据 | [usaspending.gov](https://www.usaspending.gov/) |
| **Layoffs.fyi** | 裁员追踪 | [layoffs.fyi](https://layoffs.fyi/) |

### API 限流说明

为避免触发 API 限流，系统实现了：
- **批量请求控制** - 分批次处理
- **请求间隔** - 每批次间延迟 200-300ms
- **智能缓存** - 避免重复请求
- **错误重试** - 失败自动重试

### 添加新 API

参考 [开发指南 - 添加新数据源](#添加新数据源) 章节。

---

## 🤝 贡献指南

欢迎贡献代码！请遵循以下流程：

### 贡献流程

1. **Fork 项目**

```bash
# 在 GitHub 上点击 Fork 按钮
```

2. **克隆到本地**

```bash
git clone https://github.com/your-username/situation-monitor-cn.git
cd situation-monitor-cn
```

3. **配置环境**

```bash
# 复制环境变量文件
cp .env.example .env

# 编辑 .env，填入你的 API 密钥
nano .env

# 安装依赖
npm install
```

4. **创建特性分支**

```bash
git checkout -b feature/your-feature-name
```

5. **开发与测试**

```bash
# 开发功能
npm run dev

# 运行测试
npm run test

# 代码检查
npm run lint
```

6. **提交代码**

```bash
git add .
git commit -m "feat: 添加新功能描述"
```

**提交信息规范**：
- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建/工具相关

7. **推送到远程**

```bash
git push origin feature/your-feature-name
```

8. **创建 Pull Request**

在 GitHub 上创建 Pull Request，描述你的改动。

### 代码审查标准

- ✅ 代码符合项目规范
- ✅ 通过所有测试
- ✅ 添加必要的文档
- ✅ 不破坏现有功能

### 安全注意事项

⚠️ **严禁提交包含 API 密钥的文件**：
- ✅ **可以提交**: `.env.example`（示例文件）
- ❌ **禁止提交**: `.env`（真实密钥）
- ✅ **确认**: `.env` 已在 `.gitignore` 中

**提交前检查**：
```bash
# 查看将要提交的文件
git status

# 确认没有 .env 文件
# 确认代码中没有硬编码密钥
```

---

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

```
MIT License

Copyright (c) 2024 Situation Monitor Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 致谢

感谢以下开源项目和服务：

- [Svelte](https://svelte.dev/) - 响应式前端框架
- [SvelteKit](https://kit.svelte.dev/) - 全栈应用框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [D3.js](https://d3js.org/) - 数据可视化库
- [GDELT Project](https://www.gdeltproject.org/) - 全球事件数据
- [Finnhub](https://finnhub.io/) - 金融市场数据
- [DeepLX](https://deeplx.org/) - 翻译服务

---

## 📞 联系方式

- **问题反馈**: [GitHub Issues](https://github.com/your-username/situation-monitor-cn/issues)
- **功能建议**: [GitHub Discussions](https://github.com/your-username/situation-monitor-cn/discussions)

---

## 🗺️ 路线图

### v2.1.0 (计划中)
- [ ] 添加更多数据源
- [ ] 增强移动端适配
- [ ] 优化翻译性能
- [ ] 添加数据导出功能

### v2.2.0 (未来)
- [ ] 用户自定义面板布局
- [ ] 实时通知与告警
- [ ] 多语言支持（英文、日文等）
- [ ] 数据分析报告生成

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐️ Star！**

Made with ❤️ by Situation Monitor Community

</div>
