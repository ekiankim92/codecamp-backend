# 1. 운영체제 및 프로그램 설치하기 (하나하나 입력하는 방법)
# FROM ubuntu:22.04

# 내 컴퓨터가 아닌, 우분투 컴퓨터에 깔리는거임
# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn

# 1. 운영체제 및 프로그램 설치하기 (이미 리눅스, node, npm, yarn 까지 모두 깔려있는 컴퓨터)
FROM node:16 

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기 
COPY ./index.js /index.js

# 3. 도커 안에서 index.js 실행시키기. RUN 과 CMD 명령어가 있음. 
# RUN 은 실행을 하고 이미지로 같이 저장됨. CMD 는 실행을 하고 CMD 만 빠짐. 고로 CMD 는 어떤 프로그램을 실행시킬때 씀. 
# RUN 는 저장되고 CMD 는 저장이 안됨
# CMD 는 마지막에 한번밖에 실행이 안됨. RUN 는 중복으로 쓸수 있음 
CMD node index.js