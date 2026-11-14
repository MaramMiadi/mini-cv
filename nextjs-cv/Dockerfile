FROM node:22-alpine AS base

WORKDIR /app

# Add glibc compatibility for Next.js native SWC bindings
RUN apk add --no-cache libc6-compat

# Install dependencies
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

# Build the Next.js application
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image
FROM node:22-alpine AS runner

WORKDIR /app

# Update Alpine packages to receive security fixes
RUN apk upgrade --no-cache
# Remove npm and npx from the production image
RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/bin/npm \
    /usr/local/bin/npx

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

