# markdown-flow-agent-py

用于处理 MarkdownFlow 模板并集成 AI 的 Python 后端智能体。基于 FastAPI 构建，支持高性能和异步处理。

## 安装

```bash
pip install markdown-flow-agent
# 或使用 poetry
poetry add markdown-flow-agent
# 或使用 pipenv
pipenv install markdown-flow-agent
```

## 快速上手

```python
from fastapi import FastAPI
from markdown_flow_agent import FlowAgent, FlowConfig

app = FastAPI()
agent = FlowAgent(config=FlowConfig(
    llm_provider="openai",
    api_key="your-api-key"
))

@app.post("/process")
async def process_template(template: str, variables: dict):
    result = await agent.process(template, variables)
    return {"content": result.content, "metadata": result.metadata}

# 运行命令: uvicorn main:app --reload
```

## 配置

### 基础配置

```python
from markdown_flow_agent import FlowConfig

config = FlowConfig(
    # LLM 配置
    llm_provider="openai",  # 或 "anthropic", "cohere", "local"
    api_key="your-api-key",
    model="gpt-4",          # 或 "claude-3" 等

    # 处理选项
    temperature=0.7,
    max_tokens=2000,
    timeout=30,             # 秒

    # 缓存
    enable_cache=True,
    cache_ttl=3600,         # 秒

    # 安全
    enable_content_filter=True,
    max_recursion_depth=5
)

agent = FlowAgent(config=config)
```

### 环境变量

```bash
# .env 文件
MARKDOWNFLOW_LLM_PROVIDER=openai
MARKDOWNFLOW_API_KEY=sk-...
MARKDOWNFLOW_MODEL=gpt-4
MARKDOWNFLOW_TEMPERATURE=0.7
MARKDOWNFLOW_CACHE_ENABLED=true
MARKDOWNFLOW_CACHE_REDIS_URL=redis://localhost:6379
```

```python
from markdown_flow_agent import FlowAgent

# 自动从环境变量加载
agent = FlowAgent()
```

## 核心功能

### 模板处理

```python
@app.post("/process")
async def process_template(request: ProcessRequest):
    """处理 MarkdownFlow 模板和变量。"""

    result = await agent.process(
        template=request.template,
        variables=request.variables,
        context=request.context  # 可选的附加上下文
    )

    return {
        "content": result.content,
        "variables_used": result.variables_used,
        "ai_calls": result.ai_calls,
        "processing_time": result.processing_time
    }
```

### 变量管理

```python
from markdown_flow_agent import VariableManager

var_manager = VariableManager()

# 从模板中提取变量
variables = var_manager.extract(template)
# 返回: ['user_name', 'skill_level', ...]

# 验证变量
validation = var_manager.validate(template, provided_variables)
# 返回: {'valid': True/False, 'missing': [...], 'extra': [...]}

# 插入变量
content = var_manager.interpolate(template, variables)
```

### 用户输入处理

```python
from markdown_flow_agent import InputHandler

input_handler = InputHandler()

# 从模板解析用户输入
inputs = input_handler.parse(template)
# 返回: [
#   {'variable': 'choice', 'options': ['A', 'B', 'C']},
#   ...
# ]

# 处理用户选择
result = input_handler.process_selection(
    variable="choice",
    value="B",
    template=template,
    variables=current_variables
)
```

### AI 集成

```python
# 配置多个 LLM 提供商
from markdown_flow_agent import MultiProviderAgent

agent = MultiProviderAgent({
    "primary": {
        "provider": "openai",
        "api_key": "sk-...",
        "model": "gpt-4"
    },
    "fallback": {
        "provider": "anthropic",
        "api_key": "sk-ant-...",
        "model": "claude-3"
    }
})

# 使用自动故障转移处理
result = await agent.process_with_fallback(template, variables)
```

## 高级用法

### 流式响应

```python
from fastapi import StreamingResponse
import asyncio

@app.post("/stream")
async def stream_processing(request: ProcessRequest):
    async def generate():
        async for chunk in agent.stream_process(
            template=request.template,
            variables=request.variables
        ):
            yield f"data: {chunk.json()}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream"
    )
```

### 批量处理

```python
@app.post("/batch")
async def batch_process(requests: List[ProcessRequest]):
    """并发处理多个模板。"""

    tasks = [
        agent.process(req.template, req.variables)
        for req in requests
    ]

    results = await asyncio.gather(*tasks)
    return {"results": results}
```

### 缓存

```python
from markdown_flow_agent import CacheManager
import redis

# Redis 缓存
redis_client = redis.Redis(host='localhost', port=6379, db=0)
cache_manager = CacheManager(backend=redis_client)

agent = FlowAgent(
    config=FlowConfig(enable_cache=True),
    cache_manager=cache_manager
)

# 内存缓存
from markdown_flow_agent.cache import InMemoryCache

cache = InMemoryCache(max_size=1000, ttl=3600)
agent = FlowAgent(cache=cache)
```

### 中间件

```python
from markdown_flow_agent import Middleware

class LoggingMiddleware(Middleware):
    async def process(self, template, variables, next_handler):
        print(f"处理包含 {len(variables)} 个变量的模板")
        result = await next_handler(template, variables)
        print(f"生成了 {len(result.content)} 个字符")
        return result

class RateLimitMiddleware(Middleware):
    def __init__(self, max_requests=100):
        self.max_requests = max_requests
        self.requests = {}

    async def process(self, template, variables, next_handler):
        # 实现速率限制逻辑
        return await next_handler(template, variables)

# 应用中间件
agent.use(LoggingMiddleware())
agent.use(RateLimitMiddleware(max_requests=100))
```

### 自定义处理器

```python
from markdown_flow_agent import Processor

class CustomProcessor(Processor):
    """特定模板模式的自定义处理器。"""

    def can_process(self, template):
        """检查此处理器是否可以处理模板。"""
        return "CUSTOM:" in template

    async def process(self, template, variables):
        """处理模板。"""
        # 自定义处理逻辑
        return ProcessResult(
            content="已处理内容",
            metadata={"processor": "custom"}
        )

# 注册自定义处理器
agent.register_processor(CustomProcessor())
```

## API 端点

### 完整的 FastAPI 应用

```python
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional, List, Dict
import asyncio

app = FastAPI(title="MarkdownFlow API")

class ProcessRequest(BaseModel):
    template: str
    variables: Dict[str, any]
    context: Optional[Dict] = None
    stream: bool = False

class ProcessResponse(BaseModel):
    content: str
    variables_used: List[str]
    processing_time: float
    cached: bool = False

@app.post("/process", response_model=ProcessResponse)
async def process_template(request: ProcessRequest):
    try:
        result = await agent.process(
            template=request.template,
            variables=request.variables,
            context=request.context
        )
        return ProcessResponse(**result.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/validate")
async def validate_template(template: str):
    """验证 MarkdownFlow 语法。"""
    validation = agent.validate(template)
    return {
        "valid": validation.is_valid,
        "errors": validation.errors,
        "warnings": validation.warnings
    }

@app.get("/variables")
async def extract_variables(template: str):
    """从模板提取变量。"""
    variables = agent.extract_variables(template)
    return {"variables": variables}

@app.post("/batch")
async def batch_process(requests: List[ProcessRequest]):
    """处理多个模板。"""
    tasks = [
        agent.process(req.template, req.variables)
        for req in requests
    ]
    results = await asyncio.gather(*tasks, return_exceptions=True)

    return {
        "results": [
            r.dict() if not isinstance(r, Exception) else {"error": str(r)}
            for r in results
        ]
    }

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """用于实时处理的 WebSocket。"""
    await websocket.accept()

    try:
        while True:
            data = await websocket.receive_json()

            async for chunk in agent.stream_process(
                template=data["template"],
                variables=data.get("variables", {})
            ):
                await websocket.send_json({
                    "type": "chunk",
                    "content": chunk.content
                })

            await websocket.send_json({"type": "complete"})
    except WebSocketDisconnect:
        pass
```

## 测试

### 单元测试

```python
import pytest
from markdown_flow_agent import FlowAgent

@pytest.fixture
def agent():
    return FlowAgent(config=FlowConfig(
        llm_provider="mock",  # 使用模拟提供商进行测试
        enable_cache=False
    ))

@pytest.mark.asyncio
async def test_process_template(agent):
    template = "Hello {{name}}!"
    variables = {"name": "Test"}

    result = await agent.process(template, variables)

    assert "Test" in result.content
    assert "name" in result.variables_used

@pytest.mark.asyncio
async def test_user_input_parsing(agent):
    template = "?[%{{choice}}Yes|No]"

    inputs = agent.parse_inputs(template)

    assert len(inputs) == 1
    assert inputs[0]["variable"] == "choice"
    assert inputs[0]["options"] == ["Yes", "No"]

@pytest.mark.asyncio
async def test_conditional_processing(agent):
    template = """
    If {{level}} is "beginner":
        Start with basics.
    If {{level}} is "advanced":
        Dive into complex topics.
    """

    result = await agent.process(template, {"level": "beginner"})
    assert "basics" in result.content.lower()
```

### 集成测试

```python
from fastapi.testclient import TestClient

client = TestClient(app)

def test_process_endpoint():
    response = client.post("/process", json={
        "template": "Hello {{name}}!",
        "variables": {"name": "World"}
    })

    assert response.status_code == 200
    assert "World" in response.json()["content"]

def test_websocket():
    with client.websocket_connect("/ws") as websocket:
        websocket.send_json({
            "template": "Generate story for {{character}}",
            "variables": {"character": "Alice"}
        })

        chunks = []
        while True:
            data = websocket.receive_json()
            if data["type"] == "complete":
                break
            chunks.append(data["content"])

        assert len(chunks) > 0
```

## 性能优化

### 异步处理

```python
# 并发处理多个模板
async def process_many(templates_and_vars):
    tasks = [
        agent.process(t, v)
        for t, v in templates_and_vars
    ]
    return await asyncio.gather(*tasks)
```

### 连接池

```python
import httpx

# 为 LLM API 调用配置连接池
client = httpx.AsyncClient(
    limits=httpx.Limits(
        max_keepalive_connections=20,
        max_connections=100
    )
)

agent = FlowAgent(
    config=FlowConfig(http_client=client)
)
```

### 响应缓存

```python
from functools import lru_cache
import hashlib

@lru_cache(maxsize=1000)
def get_cached_result(template_hash, variables_hash):
    # 缓存查找逻辑
    pass

async def process_with_cache(template, variables):
    template_hash = hashlib.md5(template.encode()).hexdigest()
    variables_hash = hashlib.md5(str(variables).encode()).hexdigest()

    cached = get_cached_result(template_hash, variables_hash)
    if cached:
        return cached

    result = await agent.process(template, variables)
    # 存储到缓存
    return result
```

## 部署

### Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Docker Compose

```yaml
version: "3.8"

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - MARKDOWNFLOW_API_KEY=${API_KEY}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

### 生产环境设置

```python
from markdown_flow_agent import FlowConfig

production_config = FlowConfig(
    # 性能
    worker_count=4,
    connection_pool_size=20,

    # 可靠性
    retry_attempts=3,
    retry_delay=1.0,
    timeout=30,

    # 安全性
    enable_content_filter=True,
    allowed_domains=["api.openai.com", "api.anthropic.com"],

    # 监控
    enable_metrics=True,
    metrics_port=9090,

    # 日志
    log_level="INFO",
    log_format="json"
)
```

## 监控

### Prometheus 指标

```python
from prometheus_client import Counter, Histogram, start_http_server

# 定义指标
request_count = Counter('markdownflow_requests_total', '总请求数')
request_duration = Histogram('markdownflow_request_duration_seconds', '请求持续时间')
error_count = Counter('markdownflow_errors_total', '总错误数')

# 启动指标服务器
start_http_server(9090)

# 跟踪指标
@request_duration.time()
async def process_with_metrics(template, variables):
    request_count.inc()
    try:
        return await agent.process(template, variables)
    except Exception as e:
        error_count.inc()
        raise
```

### 日志记录

```python
import logging
from markdown_flow_agent import setup_logging

# 配置日志
setup_logging(
    level=logging.INFO,
    format="json",
    output_file="markdownflow.log"
)

# 使用结构化日志
logger = logging.getLogger("markdownflow")

@app.post("/process")
async def process_template(request: ProcessRequest):
    logger.info("处理模板", extra={
        "template_length": len(request.template),
        "variable_count": len(request.variables)
    })

    result = await agent.process(request.template, request.variables)

    logger.info("处理完成", extra={
        "content_length": len(result.content),
        "processing_time": result.processing_time
    })

    return result
```

## 链接

- [GitHub 代码库](https://github.com/ai-shifu/markdown-flow-agent-py)
- [PyPI 包](https://pypi.org/project/markdown-flow-agent/)
- [API 文档](https://markdownflow.ai/docs/api/python)
- [问题追踪器](https://github.com/ai-shifu/markdown-flow-agent-py/issues)
