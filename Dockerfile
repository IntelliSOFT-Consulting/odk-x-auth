FROM node:alpine
WORKDIR /usr/odk-x-auth

RUN npm install typescript yarn -g --force

COPY ui ui
WORKDIR ui
RUN yarn install
RUN yarn build

WORKDIR ../
COPY api api
WORKDIR api
RUN yarn install
RUN yarn build
EXPOSE 8080
CMD ["yarn", "start"]