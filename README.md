# 🚀 Catalogue Microservices - Quick Start

## ✅ Your Services Are Running!

All 4 microservices are operational on:
- **Eureka Server**: Port 8761
- **Category Service**: Port 8081  
- **Product Service**: Port 8082
- **Order Service**: Port 8083

---

## 🌐 View Your Data (Just click these links!)

### REST APIs - View as JSON in Browser:
- **All Categories**: http://localhost:8081/api/categories
- **All Products**: http://localhost:8082/api/products
- **All Orders**: http://localhost:8083/api/orders

### Service Discovery:
- **Eureka Dashboard**: http://localhost:8761

### H2 Database Consoles:
- **Category DB**: http://localhost:8081/h2-console
- **Product DB**: http://localhost:8082/h2-console
- **Order DB**: http://localhost:8083/h2-console

**H2 Login Settings:**
```
JDBC URL: jdbc:h2:mem:category_db  (or product_db, order_db)
Username: sa
Password: (leave empty)
```

---

## ⚠️ Why doesn't api-tester.html work?

The HTML file has **CORS (browser security) issues**. When you open HTML files directly, browsers block requests to localhost.

**Solution**: Use the direct browser links above instead! They work perfectly.

---

## 🧪 Create Test Data

Copy and paste these commands **ONE AT A TIME** in PowerShell:

### 1. Create a Category:
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/api/categories" -Method Post -Body '{"nom":"Electronics","description":"Electronic devices"}' -ContentType "application/json"
```

### 2. Create a Product (run category first!):
```powershell
Invoke-RestMethod -Uri "http://localhost:8082/api/products" -Method Post -Body '{"nom":"Laptop","description":"High-performance laptop","prix":999.99,"stockQuantity":10,"categoryId":1,"disponible":true}' -ContentType "application/json"
```

### 3. View the data:
Open in browser:
- http://localhost:8081/api/categories
- http://localhost:8082/api/products

---

## 📊 View Data in H2 Console

1. Go to: http://localhost:8081/h2-console
2. **Change JDBC URL** from `jdbc:h2:~/test` to `jdbc:h2:mem:category_db`
3. Username: `sa`
4. Password: (leave empty)
5. Click **Connect**
6. Run SQL: `SELECT * FROM CATEGORY;`

---

## 🔄 Start/Stop Services

### Start All Services:
```
start-all-services.bat
```

### Stop All Services:
Close the 4 CMD windows that opened

---

## 📝 Complete Documentation

- **QUICK-FIX-GUIDE.md** - Detailed troubleshooting
- **HELP.md** - Spring Boot documentation

---

## 🎯 Next Steps

1. ✅ Click the browser links above to view your APIs
2. ✅ Login to H2 Console to see database tables
3. ✅ Use PowerShell commands to create test data
4. ✅ Use Postman or browser for API testing (not the HTML file)

**Everything is working! Just use direct browser URLs instead of the HTML page.** 🎉

