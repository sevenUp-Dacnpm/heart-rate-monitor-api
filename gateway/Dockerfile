FROM node:latest
COPY . /gateway
WORKDIR /gateway
RUN yarn install --production
EXPOSE 8000
CMD ["yarn", "start"]