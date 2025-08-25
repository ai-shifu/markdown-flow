# markdown-flow-agent-go

高性能 Go 后端智能体，用于处理 MarkdownFlow 模板。专为需要极致性能和低资源使用的企业级应用而设计。

## 安装

```bash
go get github.com/ai-shifu/markdown-flow-agent-go
```

## 快速上手

```go
package main

import (
    "log"
    "net/http"

    mf "github.com/ai-shifu/markdown-flow-agent-go"
)

func main() {
    // 创建智能体配置
    agent := mf.NewAgent(mf.Config{
        LLMProvider: "openai",
        APIKey:      "your-api-key",
        Model:       "gpt-4",
    })

    // 创建 HTTP 处理器
    handler := mf.NewHTTPHandler(agent)

    // 启动服务器
    log.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", handler))
}
```

## 配置

### 基础配置

```go
config := mf.Config{
    // LLM 设置
    LLMProvider: "openai",     // 或 "anthropic", "local"
    APIKey:      "your-key",
    Model:       "gpt-4",

    // 处理选项
    Temperature:    0.7,
    MaxTokens:      2000,
    Timeout:        30 * time.Second,
    MaxConcurrency: 10,

    // 缓存
    EnableCache: true,
    CacheTTL:    1 * time.Hour,

    // 安全设置
    EnableContentFilter: true,
    MaxRecursionDepth:   5,
}

agent := mf.NewAgent(config)
```

### 环境变量

```bash
export MARKDOWNFLOW_LLM_PROVIDER=openai
export MARKDOWNFLOW_API_KEY=sk-...
export MARKDOWNFLOW_MODEL=gpt-4
export MARKDOWNFLOW_CACHE_ENABLED=true
export MARKDOWNFLOW_REDIS_URL=localhost:6379
```

```go
// 从环境变量加载
agent := mf.NewAgentFromEnv()
```

## 核心 API

### 处理模板

```go
func processTemplate(agent *mf.Agent) {
    template := "Hello {{name}}! Your level is {{level}}."
    variables := map[string]interface{}{
        "name":  "Alice",
        "level": "intermediate",
    }

    result, err := agent.Process(template, variables)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("Content:", result.Content)
    fmt.Println("Variables Used:", result.VariablesUsed)
    fmt.Println("Processing Time:", result.ProcessingTime)
}
```

### 异步处理

```go
func asyncProcess(agent *mf.Agent) {
    // 使用回调处理
    agent.ProcessAsync(template, variables, func(result *mf.Result, err error) {
        if err != nil {
            log.Printf("Error: %v", err)
            return
        }
        fmt.Println("Processed:", result.Content)
    })

    // 使用 channel 处理
    resultChan := make(chan *mf.Result)
    errorChan := make(chan error)

    go agent.ProcessWithChannels(template, variables, resultChan, errorChan)

    select {
    case result := <-resultChan:
        fmt.Println("Result:", result)
    case err := <-errorChan:
        fmt.Println("Error:", err)
    }
}
```

### 流式处理

```go
func streamProcess(agent *mf.Agent) {
    stream, err := agent.StreamProcess(template, variables)
    if err != nil {
        log.Fatal(err)
    }

    for chunk := range stream {
        if chunk.Error != nil {
            log.Printf("Stream error: %v", chunk.Error)
            break
        }
        fmt.Print(chunk.Content)
    }
}
```

## HTTP 服务器

### 基础服务器

```go
package main

import (
    "encoding/json"
    "net/http"

    mf "github.com/ai-shifu/markdown-flow-agent-go"
)

func main() {
    agent := mf.NewAgent(mf.Config{
        LLMProvider: "openai",
        APIKey:      "your-key",
    })

    http.HandleFunc("/process", func(w http.ResponseWriter, r *http.Request) {
        var req struct {
            Template  string                 `json:"template"`
            Variables map[string]interface{} `json:"variables"`
        }

        if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }

        result, err := agent.Process(req.Template, req.Variables)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(result)
    })

    http.ListenAndServe(":8080", nil)
}
```

### Gin 框架

```go
package main

import (
    "github.com/gin-gonic/gin"
    mf "github.com/ai-shifu/markdown-flow-agent-go"
)

func main() {
    agent := mf.NewAgent(mf.Config{
        LLMProvider: "openai",
        APIKey:      "your-key",
    })

    r := gin.Default()

    r.POST("/process", func(c *gin.Context) {
        var req struct {
            Template  string                 `json:"template"`
            Variables map[string]interface{} `json:"variables"`
        }

        if err := c.ShouldBindJSON(&req); err != nil {
            c.JSON(400, gin.H{"error": err.Error()})
            return
        }

        result, err := agent.Process(req.Template, req.Variables)
        if err != nil {
            c.JSON(500, gin.H{"error": err.Error()})
            return
        }

        c.JSON(200, result)
    })

    r.Run(":8080")
}
```

### Echo 框架

```go
package main

import (
    "github.com/labstack/echo/v4"
    mf "github.com/ai-shifu/markdown-flow-agent-go"
)

func main() {
    agent := mf.NewAgent(mf.Config{
        LLMProvider: "openai",
        APIKey:      "your-key",
    })

    e := echo.New()

    e.POST("/process", func(c echo.Context) error {
        var req struct {
            Template  string                 `json:"template"`
            Variables map[string]interface{} `json:"variables"`
        }

        if err := c.Bind(&req); err != nil {
            return echo.NewHTTPError(400, err.Error())
        }

        result, err := agent.Process(req.Template, req.Variables)
        if err != nil {
            return echo.NewHTTPError(500, err.Error())
        }

        return c.JSON(200, result)
    })

    e.Start(":8080")
}
```

## 高级功能

### 批处理

```go
func batchProcess(agent *mf.Agent) {
    requests := []mf.ProcessRequest{
        {Template: "Hello {{name}}!", Variables: map[string]interface{}{"name": "Alice"}},
        {Template: "Welcome {{user}}!", Variables: map[string]interface{}{"user": "Bob"}},
        {Template: "Greetings {{person}}!", Variables: map[string]interface{}{"person": "Charlie"}},
    }

    results, errors := agent.BatchProcess(requests)

    for i, result := range results {
        if errors[i] != nil {
            log.Printf("Request %d failed: %v", i, errors[i])
        } else {
            log.Printf("Request %d: %s", i, result.Content)
        }
    }
}
```

### 缓存

```go
// 内存缓存
cache := mf.NewInMemoryCache(mf.CacheConfig{
    MaxSize: 1000,
    TTL:     1 * time.Hour,
})

agent := mf.NewAgent(mf.Config{
    EnableCache: true,
    Cache:       cache,
})

// Redis 缓存
import "github.com/go-redis/redis/v8"

redisClient := redis.NewClient(&redis.Options{
    Addr: "localhost:6379",
})

cache := mf.NewRedisCache(redisClient)
agent.SetCache(cache)
```

### 中间件

```go
// 日志中间件
func loggingMiddleware(next mf.ProcessFunc) mf.ProcessFunc {
    return func(template string, variables map[string]interface{}) (*mf.Result, error) {
        start := time.Now()
        log.Printf("Processing template with %d variables", len(variables))

        result, err := next(template, variables)

        log.Printf("Processing took %v", time.Since(start))
        return result, err
    }
}

// 限流中间件
func rateLimitMiddleware(limit int) mf.Middleware {
    limiter := rate.NewLimiter(rate.Limit(limit), 1)

    return func(next mf.ProcessFunc) mf.ProcessFunc {
        return func(template string, variables map[string]interface{}) (*mf.Result, error) {
            if err := limiter.Wait(context.Background()); err != nil {
                return nil, err
            }
            return next(template, variables)
        }
    }
}

// 应用中间件
agent.Use(loggingMiddleware)
agent.Use(rateLimitMiddleware(100))
```

### 自定义处理器

```go
type CustomProcessor struct{}

func (p *CustomProcessor) CanProcess(template string) bool {
    return strings.Contains(template, "CUSTOM:")
}

func (p *CustomProcessor) Process(template string, variables map[string]interface{}) (*mf.Result, error) {
    // 自定义处理逻辑
    return &mf.Result{
        Content: "Custom processed content",
        Metadata: map[string]interface{}{
            "processor": "custom",
        },
    }, nil
}

// 注册自定义处理器
agent.RegisterProcessor(&CustomProcessor{})
```

## WebSocket 支持

```go
package main

import (
    "github.com/gorilla/websocket"
    mf "github.com/ai-shifu/markdown-flow-agent-go"
)

var upgrader = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool {
        return true // 生产环境请适当配置
    },
}

func handleWebSocket(agent *mf.Agent) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        conn, err := upgrader.Upgrade(w, r, nil)
        if err != nil {
            log.Printf("WebSocket upgrade failed: %v", err)
            return
        }
        defer conn.Close()

        for {
            var req struct {
                Template  string                 `json:"template"`
                Variables map[string]interface{} `json:"variables"`
                Stream    bool                   `json:"stream"`
            }

            if err := conn.ReadJSON(&req); err != nil {
                log.Printf("Read error: %v", err)
                break
            }

            if req.Stream {
                // 流式响应
                stream, err := agent.StreamProcess(req.Template, req.Variables)
                if err != nil {
                    conn.WriteJSON(map[string]interface{}{
                        "error": err.Error(),
                    })
                    continue
                }

                for chunk := range stream {
                    conn.WriteJSON(map[string]interface{}{
                        "type":    "chunk",
                        "content": chunk.Content,
                    })
                }

                conn.WriteJSON(map[string]interface{}{
                    "type": "complete",
                })
            } else {
                // 常规响应
                result, err := agent.Process(req.Template, req.Variables)
                if err != nil {
                    conn.WriteJSON(map[string]interface{}{
                        "error": err.Error(),
                    })
                } else {
                    conn.WriteJSON(result)
                }
            }
        }
    }
}

func main() {
    agent := mf.NewAgentFromEnv()
    http.HandleFunc("/ws", handleWebSocket(agent))
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

## 性能优化

### 连接池

```go
import (
    "net/http"
    "time"
)

// 配置带连接池的 HTTP 客户端
httpClient := &http.Client{
    Transport: &http.Transport{
        MaxIdleConns:        100,
        MaxIdleConnsPerHost: 10,
        MaxConnsPerHost:     100,
        IdleConnTimeout:     90 * time.Second,
    },
    Timeout: 30 * time.Second,
}

agent := mf.NewAgent(mf.Config{
    HTTPClient: httpClient,
})
```

### 工作池

```go
type WorkerPool struct {
    agent   *mf.Agent
    workers int
    jobs    chan Job
    results chan Result
}

type Job struct {
    ID        string
    Template  string
    Variables map[string]interface{}
}

type Result struct {
    ID      string
    Content string
    Error   error
}

func NewWorkerPool(agent *mf.Agent, workers int) *WorkerPool {
    pool := &WorkerPool{
        agent:   agent,
        workers: workers,
        jobs:    make(chan Job, 100),
        results: make(chan Result, 100),
    }

    // 启动工作进程
    for i := 0; i < workers; i++ {
        go pool.worker()
    }

    return pool
}

func (p *WorkerPool) worker() {
    for job := range p.jobs {
        result, err := p.agent.Process(job.Template, job.Variables)
        p.results <- Result{
            ID:      job.ID,
            Content: result.Content,
            Error:   err,
        }
    }
}

func (p *WorkerPool) Submit(job Job) {
    p.jobs <- job
}

func (p *WorkerPool) GetResult() Result {
    return <-p.results
}
```

## 测试

### 单元测试

```go
package main

import (
    "testing"

    mf "github.com/ai-shifu/markdown-flow-agent-go"
    "github.com/stretchr/testify/assert"
)

func TestProcessTemplate(t *testing.T) {
    agent := mf.NewAgent(mf.Config{
        LLMProvider: "mock",
    })

    template := "Hello {{name}}!"
    variables := map[string]interface{}{
        "name": "Test",
    }

    result, err := agent.Process(template, variables)

    assert.NoError(t, err)
    assert.Contains(t, result.Content, "Test")
    assert.Contains(t, result.VariablesUsed, "name")
}

func TestParseUserInputs(t *testing.T) {
    agent := mf.NewAgent(mf.Config{})

    template := "?[%{{choice}}Yes|No]"
    inputs := agent.ParseUserInputs(template)

    assert.Len(t, inputs, 1)
    assert.Equal(t, "choice", inputs[0].Variable)
    assert.Equal(t, []string{"Yes", "No"}, inputs[0].Options)
}

func BenchmarkProcess(b *testing.B) {
    agent := mf.NewAgent(mf.Config{
        LLMProvider: "mock",
    })

    template := "Hello {{name}}!"
    variables := map[string]interface{}{"name": "Benchmark"}

    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        agent.Process(template, variables)
    }
}
```

### 集成测试

```go
func TestHTTPEndpoint(t *testing.T) {
    agent := mf.NewAgent(mf.Config{
        LLMProvider: "mock",
    })

    handler := mf.NewHTTPHandler(agent)
    server := httptest.NewServer(handler)
    defer server.Close()

    reqBody := `{
        "template": "Hello {{name}}!",
        "variables": {"name": "World"}
    }`

    resp, err := http.Post(
        server.URL+"/process",
        "application/json",
        strings.NewReader(reqBody),
    )

    assert.NoError(t, err)
    assert.Equal(t, 200, resp.StatusCode)

    var result mf.Result
    json.NewDecoder(resp.Body).Decode(&result)
    assert.Contains(t, result.Content, "World")
}
```

## 部署

### Docker

```dockerfile
FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/

COPY --from=builder /app/server .

EXPOSE 8080
CMD ["./server"]
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: markdownflow-agent
spec:
  replicas: 3
  selector:
    matchLabels:
      app: markdownflow-agent
  template:
    metadata:
      labels:
        app: markdownflow-agent
    spec:
      containers:
        - name: agent
          image: markdownflow-agent:latest
          ports:
            - containerPort: 8080
          env:
            - name: MARKDOWNFLOW_API_KEY
              valueFrom:
                secretKeyRef:
                  name: markdownflow-secrets
                  key: api-key
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "256Mi"
              cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: markdownflow-service
spec:
  selector:
    app: markdownflow-agent
  ports:
    - port: 80
      targetPort: 8080
  type: LoadBalancer
```

## 监控

### Prometheus 指标

```go
import (
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promhttp"
)

var (
    requestsTotal = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "markdownflow_requests_total",
            Help: "Total number of requests",
        },
        []string{"status"},
    )

    requestDuration = prometheus.NewHistogramVec(
        prometheus.HistogramOpts{
            Name: "markdownflow_request_duration_seconds",
            Help: "Request duration in seconds",
        },
        []string{"endpoint"},
    )
)

func init() {
    prometheus.MustRegister(requestsTotal)
    prometheus.MustRegister(requestDuration)
}

func instrumentedHandler(agent *mf.Agent) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        timer := prometheus.NewTimer(requestDuration.WithLabelValues("/process"))
        defer timer.ObserveDuration()

        // 处理请求...

        requestsTotal.WithLabelValues("success").Inc()
    }
}

func main() {
    http.Handle("/metrics", promhttp.Handler())
    // ... 服务器的其他部分
}
```

### 结构化日志

```go
import (
    "go.uber.org/zap"
)

func setupLogging() *zap.Logger {
    logger, _ := zap.NewProduction()
    return logger
}

func processWithLogging(agent *mf.Agent, logger *zap.Logger) {
    logger.Info("Processing template",
        zap.Int("variableCount", len(variables)),
        zap.String("provider", agent.Config.LLMProvider),
    )

    start := time.Now()
    result, err := agent.Process(template, variables)

    if err != nil {
        logger.Error("Processing failed",
            zap.Error(err),
            zap.Duration("duration", time.Since(start)),
        )
    } else {
        logger.Info("Processing complete",
            zap.Duration("duration", time.Since(start)),
            zap.Int("contentLength", len(result.Content)),
        )
    }
}
```

## 链接

- [GitHub 仓库](https://github.com/ai-shifu/markdown-flow-agent-go)
- [Go 包](https://pkg.go.dev/github.com/ai-shifu/markdown-flow-agent-go)
- [API 文档](https://markdownflow.ai/docs/api/go)
- [问题跟踪](https://github.com/ai-shifu/markdown-flow-agent-go/issues)
