# Services Startup Guide

## ✅ Currently Running Services:
- ✅ Config Server (8888)
- ✅ Eureka Server (8761)
- ✅ Payment Service (8084)
- ✅ Order Service (8085)

## ❌ Missing Services (NEED TO START):
- ❌ **API Gateway (8080)** - CRITICAL! Frontend cannot work without this
- ❌ **Product Service (8081)** - CRITICAL! Frontend needs this for product data
- ❌ User Service (8083) - Optional for now

## 🚀 Steps to Start Missing Services in IntelliJ:

### 1. Rebuild API Gateway (IMPORTANT!)
We added CORS configuration, so you MUST rebuild:
1. In IntelliJ, right-click on `api-gateway` module
2. Select **Build → Rebuild Module 'api-gateway'**
3. Wait for the build to complete

### 2. Start API Gateway
1. Find `ApiGatewayApplication.java` in: `api-gateway/src/main/java/com/catalogue/gateway/`
2. Right-click → **Run 'ApiGatewayApplication'**
3. Wait until you see: "Started ApiGatewayApplication" in the console
4. Verify it's running on **port 8080**

### 3. Start Product Service
1. Find `ProductServiceApplication.java` in: `product-service/src/main/java/com/catalogue/product/`
2. Right-click → **Run 'ProductServiceApplication'**
3. Wait until you see: "Started ProductServiceApplication" in the console
4. Verify it's running on **port 8081**

### 4. (Optional) Start User Service
1. Find `UserServiceApplication.java` in: `user-service/src/main/java/com/catalogue/user/`
2. Right-click → **Run 'UserServiceApplication'**
3. Verify it's running on **port 8083**

## 🧪 Verify All Services Are Running:

Open your browser and check:
- Eureka Dashboard: http://localhost:8761
  - You should see all services registered

## 🌐 Test the Frontend:

1. Frontend is already running on: **http://localhost:4200**
2. Open in your browser
3. You should see:
   - Header with navigation
   - Product list with items from the database
   - No CORS errors in browser console (F12)

## 🐛 If You See CORS Errors:

1. Make sure you **rebuilt the API Gateway** after adding CorsConfig.java
2. **Restart the API Gateway** completely
3. Check browser console (F12) for specific error messages

## 📊 Backend Test URLs:

Once all services are running, test these URLs in your browser:
- http://localhost:8080/api/products (via API Gateway - with CORS)
- http://localhost:8081/api/products (direct Product Service - no CORS)
- http://localhost:8761 (Eureka Dashboard)

## ⚡ Quick Check Command (PowerShell):

```powershell
Get-NetTCPConnection -State Listen | Where-Object {$_.LocalPort -in @(8080, 8081, 8083, 8084, 8085, 8761, 8888)} | Select-Object LocalPort, State | Sort-Object LocalPort
```

You should see:
- 8080 (API Gateway)
- 8081 (Product Service)
- 8083 (User Service - optional)
- 8084 (Payment Service)
- 8085 (Order Service)
- 8761 (Eureka)
- 8888 (Config Server)

## 🎯 What Should Happen After Starting Everything:

1. Go to http://localhost:4200
2. You should see a beautiful e-commerce interface with:
   - A navigation header
   - Product cards showing products from your database
   - Stock status badges (In Stock, Low Stock, Out of Stock)
   - Prices formatted in EUR
   - Search functionality

If you still see a blank page:
1. Open browser DevTools (F12)
2. Check the Console tab for errors
3. Check the Network tab to see if API calls are being made

