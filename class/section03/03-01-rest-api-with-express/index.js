// 옛날 방식에 코드 common.js 방식
// const express = require('express')

// 현대 방식 module 방식
import express from "express"

const app = express()

// endpoint 는 / 으로 api 를 하나 만들어놓은거임
app.get('/', function (req, res) {
  res.send('Hello World aksdhjkaljdik')
}) // 여기 함수는 middleware 함수 

app.listen(4000)
// 얘가 켜지고 기다리는거임 