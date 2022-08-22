FROM node:alpine
WORKDIR /usr/odk-x-auth
COPY package.json .
RUN npm install typescript yarn -g --force
RUN yarn install
COPY api .
RUN yarn build
EXPOSE 8080
CMD ["node", "./build/index.js"]