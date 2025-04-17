# ใช้ User ที่ไม่ใช่ root เพื่อความปลอดภัย
FROM node:22-alpine

WORKDIR /app

# Copy เฉพาะไฟล์ที่จำเป็นสำหรับการติดตั้ง dependencies
COPY package.json package-lock.json ./

# ติดตั้ง dependencies แบบ Production (ไม่รวม devDependencies)
RUN npm ci --only=production --legacy-peer-deps

# Copy ไฟล์โปรเจกต์ (ใช้ .dockerignore เพื่อยกเว้นไฟล์ไม่จำเป็น)
COPY . .

# Build สำหรับ Production (ถ้าใช้ Framework เช่น React, Vue)
RUN npm run build

# ใช้ Static Server สำหรับ Production (แทนการรัน dev server)
RUN npm install -g serve

# เปิดพอร์ต
EXPOSE 5173

# รัน App ด้วย User ที่ไม่ใช่ root
USER node
CMD ["serve", "-s", "dist", "-l", "5173"]
