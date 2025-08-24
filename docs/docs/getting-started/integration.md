# Integration Guide

Learn how to integrate MarkdownFlow into your existing applications. Choose the integration approach that best fits your architecture and requirements.

## Integration Approaches

### Frontend-Only Integration

**Best for:** Static sites, simple personalization, client-side processing

```bash
# React applications
npm install markdown-flow-ui

# Vue/Vanilla JS applications  
npm install markdown-it markdown-it-flow
```

### Backend-Only Integration

**Best for:** Server-side rendering, API services, complex AI processing

```bash
# Python backend
pip install markdown-flow-agent

# Go backend
go get github.com/ai-shifu/markdown-flow-agent-go
```

### Full-Stack Integration

**Best for:** Production applications, scalable personalization, user data integration

Combines frontend components with backend processing for optimal performance and security.

## Frontend Integration

### React Applications

1. **Install the package:**

   ```bash
   npm install markdown-flow-ui
   ```

2. **Import styles:**

   ```jsx
   import "markdown-flow-ui/dist/styles.css";
   ```

3. **Use the component:**

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

### React with react-markdown

1. **Install packages:**

   ```bash
   npm install react-markdown remark-flow
   ```

2. **Set up the component:**

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

## Backend Integration

### Python Applications

**Use Case:** Server-side MarkdownFlow processing, API services, database integration

1. **Basic FastAPI integration:**

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
           # Add user context if available
           if request.user_id:
               request.variables['user_id'] = request.user_id

           result = await agent.process(
               request.template,
               request.variables
           )

           # Log for analytics
           logger.info(f"Processed template for user {request.user_id}")

           return {
               "success": True,
               "content": result,
               "variables_used": request.variables
           }
       except Exception as e:
           raise HTTPException(status_code=500, detail=str(e))
   ```

2. **Integration with database and user management:**

   ```python
   from sqlalchemy import create_engine, Column, String, DateTime
   from sqlalchemy.ext.declarative import declarative_base
   from sqlalchemy.orm import sessionmaker

   # Database models
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
       # Process the template
       result = await agent.process(request.template, request.variables)

       # Save to database
       user_template = UserTemplate(
           user_id=request.user_id,
           template=request.template,
           variables=json.dumps(request.variables)
       )
       db.add(user_template)
       db.commit()

       return result
   ```

### Go Applications

**Use Case:** High-performance backend services, microservices architecture

1. **Basic server setup:**

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

2. **Integration with middleware and caching:**

   ```go
   func CacheMiddleware() gin.HandlerFunc {
       cache := make(map[string]string)
       return func(c *gin.Context) {
           // Check cache based on template + variables hash
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

   // Apply middleware
   r.Use(CacheMiddleware())
   ```

### Vanilla JavaScript Integration

**Use Case:** Static sites, simple integrations, no build process required

1. **CDN integration for quick setup:**

   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>MarkdownFlow Integration</title>
       <script src="https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js"></script>
       <script src="https://cdn.jsdelivr.net/npm/markdown-it-flow/dist/markdown-it-flow.min.js"></script>
   </head>
   <body>
       <div id="content"></div>
       <button onclick="generateContent()">Personalize Content</button>

       <script>
           const template = `
               Who are you?
               ?[%{{user_type}}Visitor|Customer|Developer]

               Generate welcome message for {{user_type}}.
           `;

           async function generateContent() {
               // Send to backend for processing
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

2. **NPM integration with build tools:**

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

## Full-Stack Integration

### Architecture Patterns

#### Pattern 1: Frontend Processing

```text
User → Frontend (React/Vue) → LLM API → Rendered Content
```

- Best for: Simple personalization, static hosting
- Pros: Fast, no backend needed
- Cons: API keys exposed, limited server-side features

#### Pattern 2: Backend Processing

```text
User → Frontend → Your Backend → MarkdownFlow Agent → LLM API → Content
```

- Best for: Production apps, user data integration
- Pros: Secure API keys, server-side logic, caching
- Cons: More complex setup

#### Pattern 3: Hybrid Processing

```text
User → Frontend (UI) → Backend (Processing) → Frontend (Display)
```

- Best for: Complex applications, real-time updates
- Pros: Optimal performance, full control
- Cons: Most complex to implement

### Complete Integration Example

**Frontend (React):**

```jsx
function PersonalizedDashboard({ userId }) {
    const [content, setContent] = useState('');
    const [userPrefs, setUserPrefs] = useState({});

    const template = `
        What's your focus today?
        ?[%{{focus}}Work|Learning|Personal]

        Document prompt: You are a productivity assistant.

        Generate personalized dashboard content for user {{user_name}}
        focusing on {{focus}}. Include relevant widgets and suggestions.
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

**Backend (Python):**

```python
@app.post("/api/personalize")
async def personalize_content(request: PersonalizeRequest, db: Session = Depends(get_db)):
    # Get user data from database
    user = db.query(User).filter(User.id == request.userId).first()

    # Merge user data with form variables
    variables = {
        'user_name': user.name,
        'user_role': user.role,
        **request.variables
    }

    # Process with MarkdownFlow
    result = await agent.process(request.template, variables)

    # Cache result
    cache_key = f"user:{request.userId}:content"
    redis_client.set(cache_key, result, ex=3600)  # 1 hour

    # Log for analytics
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

## Configuration & Setup

### Environment Variables and API Keys

**Production Environment Setup:**

```bash
# Required API keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Application configuration
MARKDOWNFLOW_ENV=production
CACHE_TTL=3600
MAX_TEMPLATE_SIZE=10000

# Database (if using backend)
DATABASE_URL=postgresql://user:pass@localhost/mdflow
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your-jwt-secret
CORS_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
```

**Development vs Production:**

```python
# config.py
import os

class Config:
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')

class DevelopmentConfig(Config):
    DEBUG = True
    CACHE_TTL = 60  # Short cache for dev

class ProductionConfig(Config):
    DEBUG = False
    CACHE_TTL = 3600  # Long cache for prod
    RATE_LIMIT = "100/hour"
```

### Dependency Management

**Python with virtual environments:**

```bash
# Create isolated environment
python -m venv venv
source venv/bin/activate  # Unix/macOS
# or
venv\Scripts\activate     # Windows

# Install with dependencies
pip install markdown-flow-agent[fastapi,redis,postgres]

# For development
pip install markdown-flow-agent[dev]
```

**Node.js with package managers:**

```bash
# Using npm
npm install markdown-flow-ui

# Using yarn (recommended for monorepos)
yarn add markdown-flow-ui

# Using pnpm (recommended for performance)
pnpm add markdown-flow-ui
```

### Platform Requirements

**Node.js Applications:**

- Node.js 16+ (18+ recommended)
- NPM 8+ or Yarn 3+
- Modern browser support (ES2018+)

**Python Applications:**

- Python 3.8+ (3.11+ recommended)
- pip 21+ or Poetry 1.2+
- Optional: Redis for caching, PostgreSQL for persistence

**Go Applications:**

- Go 1.19+ (1.21+ recommended)
- Module support enabled

```bash
# Check versions
node --version  # Should be 16+
python --version  # Should be 3.8+
go version  # Should be 1.19+
```

## Docker Integration

### Production-Ready Containers

**Frontend Container (Multi-stage):**

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Backend Container (Python):**

```dockerfile
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .

# Security: non-root user
RUN useradd -m appuser
USER appuser

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Complete Docker Compose:**

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

## Testing Your Integration

### Integration Testing

**Frontend Testing:**

```javascript
// test/integration.test.js
import { render, screen, waitFor } from '@testing-library/react';
import { MarkdownFlow } from 'markdown-flow-ui';

test('renders personalized content', async () => {
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

**Backend Testing:**

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

**End-to-End Testing:**

```javascript
// e2e/personalization.spec.js (Playwright/Cypress)
test('complete personalization flow', async ({ page }) => {
    await page.goto('/personalized-content');

    // Select user type
    await page.click('[data-testid="user-type-customer"]');

    // Wait for personalized content
    await page.waitForSelector('[data-testid="personalized-content"]');

    // Verify content is personalized
    const content = await page.textContent('[data-testid="personalized-content"]');
    expect(content).toContain('customer');
});
```

## Troubleshooting Integration Issues

### Common Integration Problems

#### 1. Template Processing Fails

```bash
# Symptoms: Templates don't process, return raw content
# Check: API connectivity and keys
curl -X POST http://localhost:8000/api/process \
  -H "Content-Type: application/json" \
  -d '{"template":"Hello {{name}}", "variables":{"name":"test"}}'
```

**Solution:**

- Verify API endpoint is correct
- Check API keys are loaded: `echo $OPENAI_API_KEY`
- Test with minimal template first

#### 2. CORS and Network Issues

```python
# backend/main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React dev server
        "https://yourdomain.com"   # Production frontend
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

#### 3. Performance Issues

```python
# Add caching to reduce API calls
from functools import lru_cache
import hashlib

@lru_cache(maxsize=1000)
def process_template_cached(template_hash: str, variables_hash: str):
    return agent.process(template, variables)

# Use in endpoint
template_hash = hashlib.md5(template.encode()).hexdigest()
variables_hash = hashlib.md5(str(sorted(variables.items())).encode()).hexdigest()
```

#### 4. Variable Resolution Problems

```javascript
// Debug variable extraction
import { extractVariables } from 'markdown-flow-ui/utils';

const template = 'Hello {{user_name}} from {{location}}';
const extracted = extractVariables(template);
console.log('Expected variables:', extracted);
// Ensure all variables are provided in your variables object
```

#### 5. Memory and Resource Issues

```yaml
# docker-compose.yml - set resource limits
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

### Performance Optimization

**Frontend Optimization:**

```javascript
// Implement template caching
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

**Backend Optimization:**

```python
# Use connection pooling and async processing
from sqlalchemy.pool import QueuePool
from asyncio import Semaphore

# Limit concurrent LLM requests
llm_semaphore = Semaphore(5)

async def process_with_rate_limit(template, variables):
    async with llm_semaphore:
        return await agent.process(template, variables)
```

## Integration Best Practices

### Security Considerations

1. **API Key Management:**
   - Never expose keys in frontend code
   - Use environment variables and secret management
   - Rotate keys regularly

2. **Input Validation:**
   - Validate template size limits
   - Sanitize user input
   - Rate limit requests

3. **Error Handling:**
   - Don't expose internal errors to frontend
   - Log errors for debugging
   - Provide graceful fallbacks

### Monitoring and Analytics

```python
# Add logging for integration monitoring
import logging
from prometheus_client import Counter, Histogram

# Metrics
template_requests = Counter('template_requests_total', 'Total template requests')
processing_time = Histogram('template_processing_seconds', 'Template processing time')

@app.post("/api/process")
async def process_template(request: ProcessRequest):
    template_requests.inc()

    with processing_time.time():
        result = await agent.process(request.template, request.variables)

    logger.info(f"Processed template with {len(request.variables)} variables")
    return result
```

## Getting Help

- 📚 [Complete Documentation](https://markdownflow.ai/docs/)
- 🚀 [Integration Examples](../examples/index.md)
- 💬 [Community Discussions](https://github.com/ai-shifu/markdown-flow/discussions)
- 🐛 [Bug Reports](https://github.com/ai-shifu/markdown-flow/issues)
- 📧 [Integration Support](mailto:integration@markdownflow.ai)

## What's Next?

**Next Steps for Your Integration:**

1. **🎨 [Quick Start](first-mdflow.md)** - Learn the basics with hands-on tutorial
2. **🛠️ [SDK Documentation](../sdks/index.md)** - Deep dive into specific SDK features
3. **🎯 [Real-World Examples](../examples/index.md)** - See complete integration examples
4. **📈 [Advanced Patterns](../specification/overview.md)** - Master complex use cases

**Ready to integrate MarkdownFlow?** Start with the [Quick Start tutorial](first-mdflow.md)!
