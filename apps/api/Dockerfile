# Builder stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY pnpm-*.yaml package*.json ./

COPY apps/api/package.json apps/api/package.json

RUN npm install -g pnpm 

RUN pnpm install --filter api --frozen-lockfile

COPY tsconfig.base.json ./

COPY apps/api ./apps/api

RUN pnpm --filter api run build

RUN pnpm --filter api deploy --legacy /app/deploy-api

# Production stage

FROM node:20-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/apps/api/dist ./dist

COPY --from=builder /app/deploy-api/node_modules ./node_modules

USER appuser

EXPOSE 4000

CMD ["node", "dist/main.js"]

