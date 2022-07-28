FROM node

WORKDIR /var/www/shop-orders

COPY package*.json ./

RUN npm install && npm i -g nodemon

COPY . .

EXPOSE 14003

CMD [ "nodemon", "./src/index.js" ]