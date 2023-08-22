FROM node:16 

# 캐쉬된 공간에서 제일 먼저 가져오게끔 설계. 왜냐면 코드만 바뀌었을뿐 다운로드가 된게 아니기 때문
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /myfolder/
RUN yarn install

COPY . /myfolder/

CMD yarn start:dev