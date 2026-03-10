# Build stage
FROM oven/bun:latest AS build
WORKDIR /app

# install deps
COPY package.json bun.lock* ./
RUN bun install

# copy source + config (config needed for typegen/build)
COPY tsconfig.json ./
COPY src ./src
COPY config ./config
COPY config.pkl ./config.pkl

RUN bun run build

# runtime stage
FROM oven/bun:latest
WORKDIR /app

# copy built assets
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# bake default config into the image (overridden by volume mount)
COPY --from=build /app/config ./config
COPY --from=build /app/config.pkl ./config.pkl

EXPOSE 3000
CMD ["bun", "run", "dist/index.js"]