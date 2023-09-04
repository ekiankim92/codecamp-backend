# 운영체제 설치
FROM node:16


# 소스코드 수정해도 캐시 깨지지 않도록 yarn install 먼저 수행
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfloder/
WORKDIR /myfolder/
RUN yarn install

COPY . /myfolder/

# 도커 내에서 index.js 실행
CMD yarn start:dev