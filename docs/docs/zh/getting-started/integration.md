# 集成指南

了解如何将 MarkdownFlow 集成到您现有的应用程序中。选择最适合您架构和需求的集成方式。

## 集成方式

### 仅前端集成

**适用于：** 静态站点、简单个性化、客户端处理

```bash
# React 应用程序
npm install markdown-flow-ui

# Vue/Vanilla JS 应用程序  
npm install markdown-it markdown-it-flow
```

### 仅后端集成

**适用于：** 服务端渲染、API 服务、复杂的 AI 处理

```bash
# Python 后端
pip install markdown-flow-agent

# Go 后端
go get github.com/ai-shifu/markdown-flow-agent-go
```

### 全栈集成

**适用于：** 生产应用程序、可扩展的个性化、用户数据集成

结合前端组件和后端处理，实现最佳性能和安全性。

## 前端集成

### React 应用程序

1. **安装包：**

   ```bash
   npm install markdown-flow-ui
   ```

2. **导入样式：**

   ```jsx
   import "markdown-flow-ui/dist/styles.css";
   ```

3. **使用组件：**

   ```jsx
   import { MarkdownFlow } from "markdown-flow-ui";

   function App() {
     const template = `
       # Hello {{user_name}}!
       ?[%{{choice}}Continue|Cancel]
     `;

     return (
       <MarkdownFlow
         template={template}
         variables={{ user_name: "World" }}
         apiEndpoint="https://your-api.com/process"
       />
     );
   }
   ```

### React 配合 react-markdown

1. **安装包：**

   ```bash
   npm install react-markdown remark-flow
   ```

2. **设置组件：**

   ```jsx
   import ReactMarkdown from "react-markdown";
   import remarkFlow from "remark-flow";

   function App() {
     return (
       <ReactMarkdown remarkPlugins={[remarkFlow]}>
         {markdownContent}
       </ReactMarkdown>
     );
   }
   ```

## 后端集成

### Python 应用程序

**使用场景：** 服务端 MarkdownFlow 处理、API 服务、数据库集成

1. **基础 FastAPI 集成：**

   ```bash
   pip install markdown-flow-agent fastapi uvicorn
   ```

   ```python
   from fastapi import FastAPI, HTTPException
   from pydantic import BaseModel
   from markdown_flow_agent import FlowAgent
   import logging

   app = FastAPI(title="MarkdownFlow API")
   agent = FlowAgent()
   logger = logging.getLogger(__name__)

   class ProcessRequest(BaseModel):
       template: str
       variables: dict
       user_id: str = None

   @app.post("/api/process")
   async def process_template(request: ProcessRequest):
       try:
           # 如果可用，添加用户上下文
           if request.user_id:
               request.variables['user_id'] = request.user_id

           result = await agent.process(
               request.template,
               request.variables
           )

           # 记录日志用于分析
           logger.info(f"Processed template for user {request.user_id}")

           return {
               "success": True,
               "content": result,
               "variables_used": request.variables
           }
       except Exception as e:
           raise HTTPException(status_code=500, detail=str(e))
   ```

2. **与数据库和用户管理的集成：**

   ```python
   from sqlalchemy import create_engine, Column, String, DateTime
   from sqlalchemy.ext.declarative import declarative_base
   from sqlalchemy.orm import sessionmaker

   # 数据库模型
   Base = declarative_base()

   class UserTemplate(Base):
       __tablename__ = "user_templates"

       id = Column(String, primary_key=True)
       user_id = Column(String)
       template = Column(String)
       variables = Column(String)  # JSON
       created_at = Column(DateTime)

   @app.post("/api/process-and-save")
   async def process_and_save(request: ProcessRequest, db: Session = Depends(get_db)):
       # 处理模板
       result = await agent.process(request.template, request.variables)

       # 保存到数据库
       user_template = UserTemplate(
           user_id=request.user_id,
           template=request.template,
           variables=json.dumps(request.variables)
       )
       db.add(user_template)
       db.commit()

       return result
   ```

### Go 应用程序

**使用场景：** 高性能后端服务、微服务架构

1. **基础服务器设置：**

   ```bash
   go get github.com/ai-shifu/markdown-flow-agent-go
   go get github.com/gin-gonic/gin
   ```

   ```go
   package main

   import (
       "net/http"
       "github.com/gin-gonic/gin"
       mf "github.com/ai-shifu/markdown-flow-agent-go"
   )

   type ProcessRequest struct {
       Template  string            `json:"template"`
       Variables map[string]string `json:"variables"`
       UserID    string            `json:"user_id,omitempty"`
   }

   func main() {
       agent := mf.NewAgent(mf.Config{
           LLMProvider: "openai",
           APIKey:      os.Getenv("OPENAI_API_KEY"),
       })

       r := gin.Default()

       r.POST("/api/process", func(c *gin.Context) {
           var req ProcessRequest
           if err := c.ShouldBindJSON(&req); err != nil {
               c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
               return
           }

           result, err := agent.Process(req.Template, req.Variables)
           if err != nil {
               c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
               return
           }

           c.JSON(http.StatusOK, gin.H{
               "success": true,
               "content": result,
               "user_id": req.UserID,
           })
       })

       r.Run(":8080")
   }
   ```

2. **与中间件和缓存的集成：**

   ```go
   func CacheMiddleware() gin.HandlerFunc {
       cache := make(map[string]string)
       return func(c *gin.Context) {
           // 基于模板 + 变量哈希检查缓存
           key := generateCacheKey(c)
           if cached, exists := cache[key]; exists {
               c.JSON(http.StatusOK, gin.H{
                   "success": true,
                   "content": cached,
                   "cached":  true,
               })
               c.Abort()
               return
           }
           c.Next()
       }
   }

   // 应用中间件
   r.Use(CacheMiddleware())
   ```

### 原生 JavaScript 集成

**使用场景：** 静态站点、简单集成、无需构建过程

1. **CDN 集成快速设置：**

   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>MarkdownFlow 集成</title>
       <script src="https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js"></script>
       <script src="https://cdn.jsdelivr.net/npm/markdown-it-flow/dist/markdown-it-flow.min.js"></script>
   </head>
   <body>
       <div id="content"></div>
       <button onclick="generateContent()">个性化内容</button>

       <script>
           const template = `
               您是哪种身份？
               ?[%{{user_type}}访客|客户|开发者]

               为 {{user_type}} 生成欢迎消息。
           `;

           async function generateContent() {
               // 发送到后端进行处理
               const response = await fetch('/api/process', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({ template, variables: {} })
               });

               const result = await response.json();
               const md = window.markdownit().use(window.markdownItFlow);
               document.getElementById('content').innerHTML = md.render(result.content);
           }
       </script>
   </body>
   </html>
   ```

2. **使用构建工具的 NPM 集成：**

   ```bash
   npm install markdown-it markdown-it-flow
   ```

   ```javascript
   import MarkdownIt from 'markdown-it';
   import markdownItFlow from 'markdown-it-flow';

   class MarkdownFlowRenderer {
       constructor() {
           this.md = new MarkdownIt().use(markdownItFlow);
       }

       async renderTemplate(template, variables = {}) {
           const response = await fetch('/api/process', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ template, variables })
           });

           const result = await response.json();
           return this.md.render(result.content);
       }
   }

   export default MarkdownFlowRenderer;
   ```

## 全栈集成

### 架构模式

#### 模式 1：前端处理

```text
用户 → 前端 (React/Vue) → LLM API → 渲染的内容
```

- 适用于：简单个性化、静态托管
- 优点：快速、无需后端
- 缺点：API 密钥暴露、服务端功能有限

#### 模式 2：后端处理

```text
用户 → 前端 → 您的后端 → MarkdownFlow 智能体 → LLM API → 内容
```

- 适用于：生产应用程序、用户数据集成
- 优点：安全的 API 密钥、服务端逻辑、缓存
- 缺点：设置较复杂

#### 模式 3：混合处理

```text
用户 → 前端 (UI) → 后端 (处理) → 前端 (显示)
```

- 适用于：复杂应用程序、实时更新
- 优点：最佳性能、完全控制
- 缺点：实现最复杂

### 完整集成示例

**前端 (React)：**

```jsx
function PersonalizedDashboard({ userId }) {
    const [content, setContent] = useState('');
    const [userPrefs, setUserPrefs] = useState({});

    const template = `
        您今天的重点是什么？
        ?[%{{focus}}工作|学习|个人]

        文档提示词：您是一个生产力助手。

        为用户 {{user_name}} 生成个性化的仪表板内容，
        重点关注 {{focus}}。包含相关的组件和建议。
    `;

    const handlePreferenceChange = async (newPrefs) => {
        setUserPrefs(newPrefs);

        const response = await fetch('/api/personalize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                template,
                variables: { ...userPrefs, ...newPrefs }
            })
        });

        const result = await response.json();
        setContent(result.content);
    };

    return (
        <div>
            <MarkdownFlow
                template={template}
                variables={userPrefs}
                onChange={handlePreferenceChange}
            />
        </div>
    );
}
```

**后端 (Python)：**

```python
@app.post("/api/personalize")
async def personalize_content(request: PersonalizeRequest, db: Session = Depends(get_db)):
    # 从数据库获取用户数据
    user = db.query(User).filter(User.id == request.userId).first()

    # 合并用户数据与表单变量
    variables = {
        'user_name': user.name,
        'user_role': user.role,
        **request.variables
    }

    # 使用 MarkdownFlow 处理
    result = await agent.process(request.template, variables)

    # 缓存结果
    cache_key = f"user:{request.userId}:content"
    redis_client.set(cache_key, result, ex=3600)  # 1 小时

    # 记录用于分析
    analytics.track(request.userId, 'content_personalized', {
        'variables': variables,
        'template_length': len(request.template)
    })

    return {
        'success': True,
        'content': result,
        'cached_until': time.time() + 3600
    }
```

## 配置和设置

### 环境变量和 API 密钥

**生产环境设置：**

```bash
# 必需的 API 密钥
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# 应用程序配置
MARKDOWNFLOW_ENV=production
CACHE_TTL=3600
MAX_TEMPLATE_SIZE=10000

# 数据库（如果使用后端）
DATABASE_URL=postgresql://user:pass@localhost/mdflow
REDIS_URL=redis://localhost:6379

# 安全
JWT_SECRET=your-jwt-secret
CORS_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
```

**开发环境与生产环境对比：**

```python
# config.py
import os

class Config:
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')

class DevelopmentConfig(Config):
    DEBUG = True
    CACHE_TTL = 60  # 开发环境短缓存

class ProductionConfig(Config):
    DEBUG = False
    CACHE_TTL = 3600  # 生产环境长缓存
    RATE_LIMIT = "100/hour"
```

### 依赖管理

**Python 虚拟环境：**

```bash
# 创建隔离环境
python -m venv venv
source venv/bin/activate  # Unix/macOS
# 或者
venv\Scripts\activate     # Windows

# 安装依赖
pip install markdown-flow-agent[fastapi,redis,postgres]

# 开发环境
pip install markdown-flow-agent[dev]
```

**Node.js 包管理器：**

```bash
# 使用 npm
npm install markdown-flow-ui

# 使用 yarn（推荐用于 monorepos）
yarn add markdown-flow-ui

# 使用 pnpm（推荐用于性能）
pnpm add markdown-flow-ui
```

### 平台要求

**Node.js 应用程序：**

- Node.js 16+（推荐 18+）
- NPM 8+ 或 Yarn 3+
- 现代浏览器支持 (ES2018+)

**Python 应用程序：**

- Python 3.8+（推荐 3.11+）
- pip 21+ 或 Poetry 1.2+
- 可选：Redis 缓存、PostgreSQL 持久化

**Go 应用程序：**

- Go 1.19+（推荐 1.21+）
- 启用模块支持

```bash
# 检查版本
node --version  # 应该是 16+
python --version  # 应该是 3.8+
go version  # 应该是 1.19+
```

## Docker 集成

### 生产就绪容器

**前端容器（多阶段）：**

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**后端容器（Python）：**

```dockerfile
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .

# 安全：非 root 用户
RUN useradd -m appuser
USER appuser

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**完整 Docker Compose：**

```yaml
version: "3.8"

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://localhost:8000

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - ./backend:/app
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=markdownflow
      - POSTGRES_USER=mdflow
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    restart: unless-stopped

volumes:
  postgres_data:
```

## 测试您的集成

### 集成测试

**前端测试：**

```javascript
// test/integration.test.js
import { render, screen, waitFor } from '@testing-library/react';
import { MarkdownFlow } from 'markdown-flow-ui';

test('渲染个性化内容', async () => {
    const template = 'Hello {{name}}!';
    const variables = { name: 'Test User' };

    render(
        <MarkdownFlow
            template={template}
            variables={variables}
            apiEndpoint="/api/test-process"
        />
    );

    await waitFor(() => {
        expect(screen.getByText(/Hello Test User/)).toBeInTheDocument();
    });
});
```

**后端测试：**

```python
# test_integration.py
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_process_template():
    response = client.post("/api/process", json={
        "template": "Hello {{name}}!",
        "variables": {"name": "Test User"}
    })

    assert response.status_code == 200
    data = response.json()
    assert "Hello Test User" in data["content"]
    assert data["success"] == True
```

**端到端测试：**

```javascript
// e2e/personalization.spec.js (Playwright/Cypress)
test('完整个性化流程', async ({ page }) => {
    await page.goto('/personalized-content');

    // 选择用户类型
    await page.click('[data-testid="user-type-customer"]');

    // 等待个性化内容
    await page.waitForSelector('[data-testid="personalized-content"]');

    // 验证内容已个性化
    const content = await page.textContent('[data-testid="personalized-content"]');
    expect(content).toContain('customer');
});
```

## 集成问题排查

### 常见集成问题

#### 1. 模板处理失败

```bash
# 症状：模板不处理，返回原始内容
# 检查：API 连接和密钥
curl -X POST http://localhost:8000/api/process \
  -H "Content-Type: application/json" \
  -d '{"template":"Hello {{name}}", "variables":{"name":"test"}}'
```

**解决方案：**

- 验证 API 端点正确
- 检查 API 密钥已加载：`echo $OPENAI_API_KEY`
- 先用最简模板测试

#### 2. CORS 和网络问题

```python
# backend/main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React 开发服务器
        "https://yourdomain.com"   # 生产前端
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

#### 3. 性能问题

```python
# 添加缓存以减少 API 调用
from functools import lru_cache
import hashlib

@lru_cache(maxsize=1000)
def process_template_cached(template_hash: str, variables_hash: str):
    return agent.process(template, variables)

# 在端点中使用
template_hash = hashlib.md5(template.encode()).hexdigest()
variables_hash = hashlib.md5(str(sorted(variables.items())).encode()).hexdigest()
```

#### 4. 变量解析问题

```javascript
// 调试变量提取
import { extractVariables } from 'markdown-flow-ui/utils';

const template = 'Hello {{user_name}} from {{location}}';
const extracted = extractVariables(template);
console.log('预期变量：', extracted);
// 确保在您的变量对象中提供所有变量
```

#### 5. 内存和资源问题

```yaml
# docker-compose.yml - 设置资源限制
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          memory: 512M
```

### 性能优化

**前端优化：**

```javascript
// 实现模板缓存
const TemplateCache = new Map();

function CachedMarkdownFlow({ template, variables }) {
    const cacheKey = `${template}:${JSON.stringify(variables)}`;

    if (TemplateCache.has(cacheKey)) {
        return <div>{TemplateCache.get(cacheKey)}</div>;
    }

    return (
        <MarkdownFlow
            template={template}
            variables={variables}
            onProcessed={(result) => {
                TemplateCache.set(cacheKey, result);
            }}
        />
    );
}
```

**后端优化：**

```python
# 使用连接池和异步处理
from sqlalchemy.pool import QueuePool
from asyncio import Semaphore

# 限制并发 LLM 请求
llm_semaphore = Semaphore(5)

async def process_with_rate_limit(template, variables):
    async with llm_semaphore:
        return await agent.process(template, variables)
```

## 集成最佳实践

### 安全考虑

1. **API 密钥管理：**
   - 永远不要在前端代码中暴露密钥
   - 使用环境变量和秘钥管理
   - 定期轮换密钥

2. **输入验证：**
   - 验证模板大小限制
   - 清理用户输入
   - 请求频率限制

3. **错误处理：**
   - 不向前端暴露内部错误
   - 记录错误用于调试
   - 提供优雅的降级处理

### 监控和分析

```python
# 为集成监控添加日志记录
import logging
from prometheus_client import Counter, Histogram

# 指标
template_requests = Counter('template_requests_total', 'Total template requests')
processing_time = Histogram('template_processing_seconds', 'Template processing time')

@app.post("/api/process")
async def process_template(request: ProcessRequest):
    template_requests.inc()

    with processing_time.time():
        result = await agent.process(request.template, request.variables)

    logger.info(f"处理了包含 {len(request.variables)} 个变量的模板")
    return result
```

## 获取帮助

- 📚 [完整文档](https://markdownflow.ai/docs/)
- 💬 [社区讨论](https://github.com/ai-shifu/markdown-flow/discussions)
- 🐛 [错误报告](https://github.com/ai-shifu/markdown-flow/issues)
- 📧 [集成支持](mailto:integration@markdownflow.ai)

## 下一步

**您的集成的后续步骤：**

1. **🎨 [快速上手](quick-start.md)** - 通过实践教程学习基础知识
2. **🛠️ [SDK 文档](../sdks/index.md)** - 深入了解特定 SDK 功能
3. **📈 [高级模式](../specification/overview.md)** - 掌握复杂用例

**准备集成 MarkdownFlow？** 从[快速上手教程](quick-start.md)开始！
