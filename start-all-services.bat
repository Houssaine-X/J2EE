@echo off
echo ========================================
echo Starting Catalogue Microservices
echo ========================================
echo.

echo [1/4] Starting Eureka Server (Port 8761)...
start "Eureka Server" cmd /k "cd eureka-server && mvn spring-boot:run"
echo Waiting 30 seconds for Eureka Server to start...
timeout /t 30 /nobreak >nul
echo.

echo [2/4] Starting Category Service (Port 8081)...
start "Category Service" cmd /k "cd category-service && mvn spring-boot:run"
echo Waiting 20 seconds...
timeout /t 20 /nobreak >nul
echo.

echo [3/4] Starting Product Service (Port 8082)...
start "Product Service" cmd /k "cd product-service && mvn spring-boot:run"
echo Waiting 20 seconds...
timeout /t 20 /nobreak >nul
echo.

echo [4/4] Starting Order Service (Port 8083)...
start "Order Service" cmd /k "cd order-service && mvn spring-boot:run"
echo.

echo ========================================
echo All services are starting!
echo ========================================
echo.
echo Eureka Dashboard: http://localhost:8761
echo Category Service: http://localhost:8081/actuator/health
echo Product Service:  http://localhost:8082/actuator/health
echo Order Service:    http://localhost:8083/actuator/health
echo.
echo Please wait 1-2 minutes for all services to fully start
echo and register with Eureka.
echo.
pause

