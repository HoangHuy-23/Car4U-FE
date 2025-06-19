# 1. Base image
FROM node:20-alpine AS base
WORKDIR /app

# 2. Cài dependencies
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# 3. Build production
FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# 4. Tạo image chạy production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Cài `serve` để chạy app
RUN npm install -g serve

# Copy các file cần thiết
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

# Cổng Next.js (default là 3000)
EXPOSE 3000

# Chạy app production
CMD ["npx", "next", "start"]
