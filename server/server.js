const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')


const {generateMessage} = require('./util/message')
const publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var io = socketIO(server)


io.on('connection',(socket)=>{
  // console.log("new user")

  socket.emit('newMessage',generateMessage('Admin','Welcome to chat'))
  socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joint'))


  socket.on('createMessage',(message,callback)=>{ // event when i get message
      io.emit('newMessage',generateMessage(message.from,message.text))
      callback("this is from server")
  })

  socket.on('disconnect',()=>{
    console.log('a user left')
  })
})


app.use(express.static(publicPath))

server.listen(port,()=>{
  console.log(`Listening at port ${port}`)
})
