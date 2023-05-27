FROM node:18-alpine
EXPOSE 8080
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
