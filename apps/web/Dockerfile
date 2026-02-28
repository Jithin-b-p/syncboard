# Builder stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-*.yaml ./

COPY apps/web/package.json apps/web/package.json

RUN npm install -g pnpm

RUN pnpm install --filter web --frozen-lockfile

COPY tsconfig.base.json ./

COPY apps/web ./apps/web

WORKDIR /app/apps/web

RUN pnpm run build

RUN ls -la /app/apps/web/.next/standalone || echo "standalone folder missing"
RUN ls -la /app/apps/web/.next/standalone/node_modules || echo "node_modules missing"

# production stage
FROM node:20-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public 


USER appuser
EXPOSE 3000

CMD ["node", "apps/web/server.js"]