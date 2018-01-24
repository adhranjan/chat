const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')


const {generateMessage,generateLocationMessage} = require('./util/message')
const {isRealString} = require('./util/validation')
const {Users,Rooms} = require('./util/users')

const publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()
var rooms = new Rooms()

io.on('connection',(socket)=>{
  socket.on('join',(params,callback)=>{
      if(!isRealString(params.name) || !isRealString(params.room)){
        return callback("Name and Room are Required")
      }
      params.room = params.room.toLowerCase().trim();
      params.name = params.name.charAt(0).toUpperCase() + params.name.slice(1);
      socket.join(params.room)
      users.removeUser(socket.id) // remove the previous room they are in
      users.addUser(socket.id, params.name, params.room) // add them in given room
      rooms.addRoom(params.room)//add room to room list
      io.to(params.room).emit('updateUserList',users.getUserList(params.room))

      //io.emit('To every connected user') => for only in given join io.to('given room').emit
      //socket.broadcast.emit('To every connected user except who created event') => for only in given join socket.broadcast.to('given room').emit
      //socket.emit => to specif user so we dont need room thing here

      socket.emit('newMessage',generateMessage('Admin','Welcome to chat','welcome__chat'))
      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joint`,'user__joint'))

      callback()
  })

  socket.on('locationShared',(location,callback)=>{
    // console.log(location)
    var user = users.getUser(socket.id)
    if(user){
      io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,location.latitude,location.longitude,location.messageId))
    }
    callback()
  })

  socket.on('createMessage',(message,callback)=>{ // event when i get message
    var user = users.getUser(socket.id)
      if(user && isRealString(message.text)){
        io.to(user.room).emit('newMessage',generateMessage(user.name,message.text,message.messageId))
      }
    //  io.emit('newMessage',generateMessage(message.from,message.text))
      // callback("this is from server")
      callback()
  })

  socket.on('creatingMessage',(message,callback)=>{
    var user = users.getUser(socket.id)
      if(user){
          var typingObject = generateMessage(user.name,message.text,message.messageId);
          typingObject.text = typingObject.text
          socket.broadcast.to(user.room).emit('newMessageTyping',typingObject)
      }
    // console.log(user)
  })

  socket.on('getActiveClass',(callback)=>{
      callback(rooms.getAllActiveRoom())
  })

  socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id)
    if(user){
      rooms.removeRoom(users.users,user.room)
      io.to(user.room).emit('updateUserList',users.getUserList(user.room))
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`,'user__left'))
    }
  })
})


app.use(express.static(publicPath))

server.listen(port,()=>{
  console.log(`Listening at port ${port}`)
})
