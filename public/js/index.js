jQuery('#message-form').on('submit',function(event){
  textField = jQuery('[name=message]');
  event.preventDefault()
  socket.emit('createMessage',{
    from:"User",
    text:textField.val()
  },function(acknolowdgement){
    console.log(acknolowdgement)
  })
  textField.val('')
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
    var template = jQuery('#message-template').html()
    var html = Mustache.render(template,{
      from:message.from,
      createdAt:moment(message.createdAt).format('h:mm a'),
      text:message.text
    })
    jQuery('#messages').append(html)
})

socket.on('newLocationMessage',function(message){
  var template = jQuery('#location-message-template').html()
  var html = Mustache.render(template,{
    from:message.from,
    createdAt:moment(message.createdAt).format('h:mm a'),
    url:message.url
  })
  jQuery('#messages').append(html)
})



var locator = jQuery('#locator');
locator.on('click',function(){
  if(!navigator.geolocation){
    return alert('Your browser doesnot support Location')
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('locationShared',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    })
  },function(){
    alert('Unable to fecth')
  })
})
