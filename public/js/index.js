var socket = io();
socket.on('connect',function(){
  console.log("connected")
//   socket.emit('newMessage',{
//     'from':'adh.ranjan@gmail.com',
//     'text':'hello word',
//     'createdAt':new Date()
//   })
})

socket.on('disconnect',function(){
  console.log("Disconnected from server")
})

socket.on('newMessage',function(email){
  console.log("we have new email",email)
})
