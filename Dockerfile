FROM node:18-alpine

RUN mkdir -p /home

COPY . /home

WORKDIR /home

RUN npm install

CMD ["npm", "start"]