# markdown-flow-agent-go

High-performance Go backend agent for processing MarkdownFlow templates. Designed for enterprise applications requiring extreme performance and low resource usage.

## Installation

```bash
go get github.com/ai-shifu/markdown-flow-agent-go
```

## Quick Start

```go
package main

import (
    "log"
    "net/http"

    mf "github.com/ai-shifu/markdown-flow-agent-go"
)

func main() {
    // Create agent with configuration
    agent := mf.NewAgent(mf.Config{
        LLMProvider: "openai",
        APIKey:      "your-api-key",
        Model:       "gpt-4",
    })

    // Create HTTP handler
    handler := mf.NewHTTPHandler(agent)

    // Start server
    log.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", handler))
}
```

## Configuration

### Basic Configuration

```go
config := mf.Config{
    // LLM Settings
    LLMProvider: "openai",     // or "anthropic", "local"
    APIKey:      "your-key",
    Model:       "gpt-4",

    // Processing Options
    Temperature:    0.7,
    MaxTokens:      2000,
    Timeout:        30 * time.Second,
    MaxConcurrency: 10,

    // Caching
    EnableCache: true,
    CacheTTL:    1 * time.Hour,

    // Safety
    EnableContentFilter: true,
    MaxRecursionDepth:   5,
}

agent := mf.NewAgent(config)
```

### Environment Variables

```bash
export MARKDOWNFLOW_LLM_PROVIDER=openai
export MARKDOWNFLOW_API_KEY=sk-...
export MARKDOWNFLOW_MODEL=gpt-4
export MARKDOWNFLOW_CACHE_ENABLED=true
export MARKDOWNFLOW_REDIS_URL=localhost:6379
```

```go
// Load from environment
agent := mf.NewAgentFromEnv()
```

## Core API

### Processing Templates

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

### Async Processing

```go
func asyncProcess(agent *mf.Agent) {
    // Process with callback
    agent.ProcessAsync(template, variables, func(result *mf.Result, err error) {
        if err != nil {
            log.Printf("Error: %v", err)
            return
        }
        fmt.Println("Processed:", result.Content)
    })

    // Process with channel
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

### Streaming

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

## HTTP Server

### Basic Server

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

### Gin Framework

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

### Echo Framework

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

## Advanced Features

### Batch Processing

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

### Caching

```go
// In-memory cache
cache := mf.NewInMemoryCache(mf.CacheConfig{
    MaxSize: 1000,
    TTL:     1 * time.Hour,
})

agent := mf.NewAgent(mf.Config{
    EnableCache: true,
    Cache:       cache,
})

// Redis cache
import "github.com/go-redis/redis/v8"

redisClient := redis.NewClient(&redis.Options{
    Addr: "localhost:6379",
})

cache := mf.NewRedisCache(redisClient)
agent.SetCache(cache)
```

### Middleware

```go
// Logging middleware
func loggingMiddleware(next mf.ProcessFunc) mf.ProcessFunc {
    return func(template string, variables map[string]interface{}) (*mf.Result, error) {
        start := time.Now()
        log.Printf("Processing template with %d variables", len(variables))

        result, err := next(template, variables)

        log.Printf("Processing took %v", time.Since(start))
        return result, err
    }
}

// Rate limiting middleware
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

// Apply middleware
agent.Use(loggingMiddleware)
agent.Use(rateLimitMiddleware(100))
```

### Custom Processors

```go
type CustomProcessor struct{}

func (p *CustomProcessor) CanProcess(template string) bool {
    return strings.Contains(template, "CUSTOM:")
}

func (p *CustomProcessor) Process(template string, variables map[string]interface{}) (*mf.Result, error) {
    // Custom processing logic
    return &mf.Result{
        Content: "Custom processed content",
        Metadata: map[string]interface{}{
            "processor": "custom",
        },
    }, nil
}

// Register custom processor
agent.RegisterProcessor(&CustomProcessor{})
```

## WebSocket Support

```go
package main

import (
    "github.com/gorilla/websocket"
    mf "github.com/ai-shifu/markdown-flow-agent-go"
)

var upgrader = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool {
        return true // Configure appropriately for production
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
                // Stream response
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
                // Regular response
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

## Performance Optimization

### Connection Pooling

```go
import (
    "net/http"
    "time"
)

// Configure HTTP client with connection pooling
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

### Worker Pool

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

    // Start workers
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

## Testing

### Unit Tests

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

### Integration Tests

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

## Deployment

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

## Monitoring

### Prometheus Metrics

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

        // Process request...

        requestsTotal.WithLabelValues("success").Inc()
    }
}

func main() {
    http.Handle("/metrics", promhttp.Handler())
    // ... rest of your server
}
```

### Structured Logging

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

## Links

- [GitHub Repository](https://github.com/ai-shifu/markdown-flow-agent-go)
- [Go Package](https://pkg.go.dev/github.com/ai-shifu/markdown-flow-agent-go)
- [API Documentation](https://markdownflow.ai/docs/api/go)
- [Issue Tracker](https://github.com/ai-shifu/markdown-flow-agent-go/issues)
