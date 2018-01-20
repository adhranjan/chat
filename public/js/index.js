jQuery('#message-form').on('submit',function(event){
  event.preventDefault()
  socket.emit('createMessage',{
    from:"User",
    text:jQuery('[name=message]').val()
  },function(acknolowdgement){
    console.log(acknolowdgement)
  })
})

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

socket.on('newMessage',function(message){
  var li = jQuery('<li></li>')
  li.text(`${message.from}:${message.text}`);
  jQuery('#messages').append(li)
})
