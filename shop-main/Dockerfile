FROM node

WORKDIR /var/www/shop-main

COPY package*.json ./

RUN npm install && npm i -g nodemon

COPY . .

EXPOSE 14001

CMD [ "npm", "run", "prod" ]


