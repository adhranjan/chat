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
    var formattedDate = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>')
    li.text(`${message.from} ${formattedDate}: ${message.text}`);
    jQuery('#messages').append(li)
})

socket.on('newLocationMessage',function(message){
  var formattedDate = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>')
  var a = jQuery(`<a target ="_blank"> My Location ${formattedDate}</a>`)

  li.text(message.fromx);
  a.attr('href',message.url)
  li.append(a)
  jQuery('#messages').append(li)

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
