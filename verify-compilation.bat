@echo off
echo ========================================
echo Verifying All Services Compile
echo ========================================
echo.
echo This script will verify that all microservices
echo compile successfully with Maven.
echo.

echo [1/4] Compiling Eureka Server...
cd eureka-server
call mvn clean compile -DskipTests -q
if %ERRORLEVEL% EQU 0 (
    echo ✅ Eureka Server - BUILD SUCCESS
) else (
    echo ❌ Eureka Server - BUILD FAILED
)
cd ..
echo.

echo [2/4] Compiling Category Service...
cd category-service
call mvn clean compile -DskipTests -q
if %ERRORLEVEL% EQU 0 (
    echo ✅ Category Service - BUILD SUCCESS
) else (
    echo ❌ Category Service - BUILD FAILED
)
cd ..
echo.

echo [3/4] Compiling Product Service...
cd product-service
call mvn clean compile -DskipTests -q
if %ERRORLEVEL% EQU 0 (
    echo ✅ Product Service - BUILD SUCCESS
) else (
    echo ❌ Product Service - BUILD FAILED
)
cd ..
echo.

echo [4/4] Compiling Order Service...
cd order-service
call mvn clean compile -DskipTests -q
if %ERRORLEVEL% EQU 0 (
    echo ✅ Order Service - BUILD SUCCESS
) else (
    echo ❌ Order Service - BUILD FAILED
)
cd ..
echo.

echo ========================================
echo Verification Complete!
echo ========================================
echo.
echo If all services show BUILD SUCCESS, your
echo project is correctly configured.
echo.
echo Next Step: Fix IDE recognition
echo - Open: IDE-SETUP-GUIDE.md
echo - Quick Fix: Reload Maven Projects in your IDE
echo.
pause

