# markdown-flow-agent-py

Python backend agent for processing MarkdownFlow templates with AI integration. Built on FastAPI for high performance and async support.

## Installation

```bash
pip install markdown-flow-agent
# or with poetry
poetry add markdown-flow-agent
# or with pipenv
pipenv install markdown-flow-agent
```

## Quick Start

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

# Run with: uvicorn main:app --reload
```

## Configuration

### Basic Configuration

```python
from markdown_flow_agent import FlowConfig

config = FlowConfig(
    # LLM Configuration
    llm_provider="openai",  # or "anthropic", "cohere", "local"
    api_key="your-api-key",
    model="gpt-4",          # or "claude-3", etc.

    # Processing Options
    temperature=0.7,
    max_tokens=2000,
    timeout=30,             # seconds

    # Caching
    enable_cache=True,
    cache_ttl=3600,         # seconds

    # Safety
    enable_content_filter=True,
    max_recursion_depth=5
)

agent = FlowAgent(config=config)
```

### Environment Variables

```bash
# .env file
MARKDOWNFLOW_LLM_PROVIDER=openai
MARKDOWNFLOW_API_KEY=sk-...
MARKDOWNFLOW_MODEL=gpt-4
MARKDOWNFLOW_TEMPERATURE=0.7
MARKDOWNFLOW_CACHE_ENABLED=true
MARKDOWNFLOW_CACHE_REDIS_URL=redis://localhost:6379
```

```python
from markdown_flow_agent import FlowAgent

# Automatically loads from environment
agent = FlowAgent()
```

## Core Features

### Template Processing

```python
@app.post("/process")
async def process_template(request: ProcessRequest):
    """Process a MarkdownFlow template with variables."""

    result = await agent.process(
        template=request.template,
        variables=request.variables,
        context=request.context  # Optional additional context
    )

    return {
        "content": result.content,
        "variables_used": result.variables_used,
        "ai_calls": result.ai_calls,
        "processing_time": result.processing_time
    }
```

### Variable Management

```python
from markdown_flow_agent import VariableManager

var_manager = VariableManager()

# Extract variables from template
variables = var_manager.extract(template)
# Returns: ['user_name', 'skill_level', ...]

# Validate variables
validation = var_manager.validate(template, provided_variables)
# Returns: {'valid': True/False, 'missing': [...], 'extra': [...]}

# Interpolate variables
content = var_manager.interpolate(template, variables)
```

### User Input Handling

```python
from markdown_flow_agent import InputHandler

input_handler = InputHandler()

# Parse user inputs from template
inputs = input_handler.parse(template)
# Returns: [
#   {'variable': 'choice', 'options': ['A', 'B', 'C']},
#   ...
# ]

# Process user selection
result = input_handler.process_selection(
    variable="choice",
    value="B",
    template=template,
    variables=current_variables
)
```

### AI Integration

```python
# Configure multiple LLM providers
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

# Process with automatic fallback
result = await agent.process_with_fallback(template, variables)
```

## Advanced Usage

### Streaming Responses

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

### Batch Processing

```python
@app.post("/batch")
async def batch_process(requests: List[ProcessRequest]):
    """Process multiple templates concurrently."""

    tasks = [
        agent.process(req.template, req.variables)
        for req in requests
    ]

    results = await asyncio.gather(*tasks)
    return {"results": results}
```

### Caching

```python
from markdown_flow_agent import CacheManager
import redis

# Redis caching
redis_client = redis.Redis(host='localhost', port=6379, db=0)
cache_manager = CacheManager(backend=redis_client)

agent = FlowAgent(
    config=FlowConfig(enable_cache=True),
    cache_manager=cache_manager
)

# In-memory caching
from markdown_flow_agent.cache import InMemoryCache

cache = InMemoryCache(max_size=1000, ttl=3600)
agent = FlowAgent(cache=cache)
```

### Middleware

```python
from markdown_flow_agent import Middleware

class LoggingMiddleware(Middleware):
    async def process(self, template, variables, next_handler):
        print(f"Processing template with {len(variables)} variables")
        result = await next_handler(template, variables)
        print(f"Generated {len(result.content)} characters")
        return result

class RateLimitMiddleware(Middleware):
    def __init__(self, max_requests=100):
        self.max_requests = max_requests
        self.requests = {}

    async def process(self, template, variables, next_handler):
        # Implement rate limiting logic
        return await next_handler(template, variables)

# Apply middleware
agent.use(LoggingMiddleware())
agent.use(RateLimitMiddleware(max_requests=100))
```

### Custom Processors

```python
from markdown_flow_agent import Processor

class CustomProcessor(Processor):
    """Custom processor for specific template patterns."""

    def can_process(self, template):
        """Check if this processor can handle the template."""
        return "CUSTOM:" in template

    async def process(self, template, variables):
        """Process the template."""
        # Custom processing logic
        return ProcessResult(
            content="Processed content",
            metadata={"processor": "custom"}
        )

# Register custom processor
agent.register_processor(CustomProcessor())
```

## API Endpoints

### Complete FastAPI Application

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
    """Validate MarkdownFlow syntax."""
    validation = agent.validate(template)
    return {
        "valid": validation.is_valid,
        "errors": validation.errors,
        "warnings": validation.warnings
    }

@app.get("/variables")
async def extract_variables(template: str):
    """Extract variables from template."""
    variables = agent.extract_variables(template)
    return {"variables": variables}

@app.post("/batch")
async def batch_process(requests: List[ProcessRequest]):
    """Process multiple templates."""
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
    """WebSocket for real-time processing."""
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

## Testing

### Unit Tests

```python
import pytest
from markdown_flow_agent import FlowAgent

@pytest.fixture
def agent():
    return FlowAgent(config=FlowConfig(
        llm_provider="mock",  # Use mock provider for testing
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

### Integration Tests

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

## Performance Optimization

### Async Processing

```python
# Process multiple templates concurrently
async def process_many(templates_and_vars):
    tasks = [
        agent.process(t, v)
        for t, v in templates_and_vars
    ]
    return await asyncio.gather(*tasks)
```

### Connection Pooling

```python
import httpx

# Configure connection pooling for LLM API calls
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

### Response Caching

```python
from functools import lru_cache
import hashlib

@lru_cache(maxsize=1000)
def get_cached_result(template_hash, variables_hash):
    # Cache lookup logic
    pass

async def process_with_cache(template, variables):
    template_hash = hashlib.md5(template.encode()).hexdigest()
    variables_hash = hashlib.md5(str(variables).encode()).hexdigest()

    cached = get_cached_result(template_hash, variables_hash)
    if cached:
        return cached

    result = await agent.process(template, variables)
    # Store in cache
    return result
```

## Deployment

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

### Production Settings

```python
from markdown_flow_agent import FlowConfig

production_config = FlowConfig(
    # Performance
    worker_count=4,
    connection_pool_size=20,

    # Reliability
    retry_attempts=3,
    retry_delay=1.0,
    timeout=30,

    # Security
    enable_content_filter=True,
    allowed_domains=["api.openai.com", "api.anthropic.com"],

    # Monitoring
    enable_metrics=True,
    metrics_port=9090,

    # Logging
    log_level="INFO",
    log_format="json"
)
```

## Monitoring

### Prometheus Metrics

```python
from prometheus_client import Counter, Histogram, start_http_server

# Define metrics
request_count = Counter('markdownflow_requests_total', 'Total requests')
request_duration = Histogram('markdownflow_request_duration_seconds', 'Request duration')
error_count = Counter('markdownflow_errors_total', 'Total errors')

# Start metrics server
start_http_server(9090)

# Track metrics
@request_duration.time()
async def process_with_metrics(template, variables):
    request_count.inc()
    try:
        return await agent.process(template, variables)
    except Exception as e:
        error_count.inc()
        raise
```

### Logging

```python
import logging
from markdown_flow_agent import setup_logging

# Configure logging
setup_logging(
    level=logging.INFO,
    format="json",
    output_file="markdownflow.log"
)

# Use structured logging
logger = logging.getLogger("markdownflow")

@app.post("/process")
async def process_template(request: ProcessRequest):
    logger.info("Processing template", extra={
        "template_length": len(request.template),
        "variable_count": len(request.variables)
    })

    result = await agent.process(request.template, request.variables)

    logger.info("Processing complete", extra={
        "content_length": len(result.content),
        "processing_time": result.processing_time
    })

    return result
```

## Links

- [GitHub Repository](https://github.com/ai-shifu/markdown-flow-agent-py)
- [PyPI Package](https://pypi.org/project/markdown-flow-agent/)
- [API Documentation](https://markdownflow.ai/docs/api/python)
- [Issue Tracker](https://github.com/ai-shifu/markdown-flow-agent-py/issues)
