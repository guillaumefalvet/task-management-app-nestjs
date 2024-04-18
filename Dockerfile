FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN npm install
# Bundle app source
COPY . .

RUN sed -i 's/DB_HOST=localhost/DB_HOST=db/' .env
RUN sed -i 's/DB_PORT=5433/DB_PORT=5432/' .env

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]