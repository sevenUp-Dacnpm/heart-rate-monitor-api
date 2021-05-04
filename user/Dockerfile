FROM node:latest
COPY . /user
WORKDIR /user
RUN yarn install --production
EXPOSE 8000
CMD ["yarn", "start"]