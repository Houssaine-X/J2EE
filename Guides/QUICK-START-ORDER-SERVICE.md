# Quick Startup Checklist

## Before Starting Services

✅ **Config Server must be running** (port 8888)
✅ **Eureka Server must be running** (port 8761)

## Start Order Service

1. Make sure Config Server is running first
2. Start order-service from IntelliJ or command line
3. Watch the logs for these SUCCESS indicators:

```
✅ Fetching config from server at: http://localhost:8888
✅ Located environment: name=order-service, profiles=[default]
✅ Tomcat initialized with port 8083 (http)
✅ Started OrderServiceApplication in X.XXX seconds
```

## If You Still See Port 8080 Error

### Option 1: Check Config Server is Running
```bash
# Visit: http://localhost:8888/order-service/default
# Should return JSON with server.port=8083
```

### Option 2: Check Run Configuration in IntelliJ
1. Go to Run → Edit Configurations
2. Select "OrderServiceApplication"
3. Check "Environment variables" - make sure there's no PORT or SERVER_PORT override
4. Check "Program arguments" - make sure there's no --server.port=8080

### Option 3: Kill Process Using Port 8080
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill it (replace PID with actual process ID)
taskkill /F /PID <PID>
```

### Option 4: Temporarily Change Port
If you need a quick fix, edit:
`order-service/src/main/resources/application.properties`

Change:
```properties
server.port=8083
```

To:
```properties
server.port=8084  # Or any free port
```

## Correct Port Assignments

| Service         | Port |
|-----------------|------|
| Config Server   | 8888 |
| Eureka Server   | 8761 |
| Category Service| 8081 |
| Product Service | 8082 |
| Order Service   | 8083 |
| API Gateway     | 8080 |

## Start Order

1. Config Server (8888) - REQUIRED FIRST
2. Eureka Server (8761) - REQUIRED SECOND
3. Order Service (8083) ← Should work now!
4. Other services...

## Verify Success

```bash
# Check order-service is registered in Eureka
# Visit: http://localhost:8761
# Should see ORDER-SERVICE in the list

# Check order-service health
# Visit: http://localhost:8083/actuator/health
# Should return: {"status":"UP"}
```

## Still Having Issues?

Check the logs for:
- ❌ "Connection refused" to localhost:8888 → Config Server not running
- ❌ "Address already in use" → Another process using the port
- ❌ "Config server not found" → Bootstrap config issue

## Date Created
November 25, 2025

