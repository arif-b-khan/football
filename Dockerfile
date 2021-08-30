#### Stage 1 build the node application
FROM node:latest as node
LABEL key="Arif Khan"
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install --quiet
COPY . .
RUN npm run build

#### stage 2 
FROM node:latest as server
WORKDIR /app
COPY --from=node /build/dist ./dist
COPY --from=node /build/node_modules ./node_modules
COPY --from=node /build/package.json .
COPY --from=node /build/.env .