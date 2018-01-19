var socket = io();
socket.on('connect',function(){
  console.log("connected")
  socket.emit('newEmail',{
    'from':'adh.ranjan@gmail.com',
    'text':'hello word',
    'createdAt':new Date()
  })
})

socket.on('disconnect',function(){
  console.log("Disconnected from server")
})

socket.on('newEmail',function(email){
  console.log("we have new email",email)
})
