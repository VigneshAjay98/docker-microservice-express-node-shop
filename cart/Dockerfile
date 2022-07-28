FROM node

WORKDIR /var/www/shop-cart

COPY package*.json ./

RUN npm install && npm i -g nodemon

COPY . .

USER node

EXPOSE 14002

CMD [ "npm", "run", "prod" ]