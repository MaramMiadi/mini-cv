FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY package*.json ./

RUN npm ci --omit=dev \
    && npm cache clean --force

COPY prisma ./prisma

RUN npx prisma generate

COPY src ./src

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nodejs \
    && chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
