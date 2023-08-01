FROM node:16 

# RUN mkdir myfolder 아래에서 COPY 할때 자동으로 만들어주므로 굳이 필요 없음
# node_modules 노드 버전이 다 다르니 dockerignore 로 인해 node_modules 는 COPY 안하게끔 만듦
COPY . /myfolder/

# 커서 위치 myfolder 로 만들기
WORKDIR /myfolder/ 
RUN yarn install

CMD yarn start