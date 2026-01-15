# ===========================
# 1) Dependencies Stage
# ===========================
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm install


# ===========================
# 2) Build Stage
# ===========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ✅ Build Next.js
RUN npm run build


# ===========================
# 3) Production Stage
# ===========================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# ✅ Copy build output
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
