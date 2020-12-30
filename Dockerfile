FROM node:12.13.0

LABEL version="1.0"
LABEL description="This is the base docker image for the Tweet Sentiment Analysis frontend react app."
LABEL maintainer = ["ansariymahdi@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]