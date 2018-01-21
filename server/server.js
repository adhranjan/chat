const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')


const {generateMessage,generateLocationMessage} = require('./util/message')
const publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var io = socketIO(server)


io.on('connection',(socket)=>{
  socket.emit('newMessage',generateMessage('Admin','Welcome to chat'))
  socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joint'))

  socket.on('locationShared',(location)=>{
    socket.broadcast.emit('newLocationMessage',generateLocationMessage('User',location.latitude,location.longitude))
  })

  socket.on('createMessage',(message,callback)=>{ // event when i get message
      io.emit('newMessage',generateMessage(message.from,message.text))
      // callback("this is from server")
  })

  socket.on('disconnect',()=>{
    socket.broadcast.emit('newMessage',generateMessage('Admin','A User left the conversation'))
  })
})


app.use(express.static(publicPath))

server.listen(port,()=>{
  console.log(`Listening at port ${port}`)
})
