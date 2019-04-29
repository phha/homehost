FROM node:alpine

USER node
WORKDIR /home/node

COPY --chown=node:node . .
RUN npm install

EXPOSE 5000
CMD [ "yarn", "start" ]
