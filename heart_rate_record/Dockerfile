FROM node:latest
COPY . /heart_rate_record
WORKDIR /heart_rate_record
RUN yarn install --production
EXPOSE 8000
CMD ["yarn", "start"]