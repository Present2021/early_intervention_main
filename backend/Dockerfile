FROM node:20-slim

WORKDIR /app

COPY ./package*.json ./
RUN npm ci
COPY . .

RUN groupadd -g 10001 app && \
   useradd -u 10000 -g app app && \
   chown -R app:app /app
USER app:app

CMD ["npm", "start"]
