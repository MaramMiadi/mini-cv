FROM node:22-alpine

RUN apk upgrade --no-cache

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY package*.json ./

RUN npm ci --omit=dev \
    && npm cache clean --force

COPY prisma ./prisma

RUN npx prisma generate

# Remove npm and npx from the production image
RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/bin/npm \
    /usr/local/bin/npx

COPY src ./src

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nodejs \
    && chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
