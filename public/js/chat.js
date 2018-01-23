function newMessageScroll(){
  //Selectors
  var messages = jQuery('#messages');
  var scrollHeight = messages.  prop('scrollHeight')
  messages.scrollTop(scrollHeight)
}


function scrollToBottom(){
  //Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last');
  //Heights
  var clientHeight = messages.prop('clientHeight')
  var scrollTop = messages.prop('scrollTop')
  var scrollHeight = messages.  prop('scrollHeight')
  var newMessageHeight = newMessage.innerHeight()
  var lastMessageHeight = newMessage.prev().innerHeight()

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight)
  //  messages.scrollTop(scrollHeight)
  }else{
    var new_message_alert_location = jQuery('#new_message_alert_location');
    new_message_alert_location.removeAttr('style')
    var template = jQuery('#alert-message-template').html()
    var html = Mustache.render(template)
    if(new_message_alert_location.children().length === 0){
      new_message_alert_location.append(html)
    }
    new_message_alert_location.fadeOut(5000, function(){
      $(this).children().remove()
    });
    }
}

jQuery('#message-form').on('submit',function(event){
  textField = jQuery('[name=message]');
  event.preventDefault()
  textValue = textField.val().trim()
  textValue1 = textField.val()
  if(textValue.length === 0){
    return false
  }
  socket.emit('createMessage',{
    from:"User",
    text:textValue
  },function(acknolowdgement){
    // console.log(acknolowdgement)
  })
  textField.val('')
})

var socket = io();
socket.on('connect',function(){
  var params = jQuery.deparam(window.location.search)
  socket.emit('join',params,function(err){
    if(err){
        alert(err)
        window.location.href = '/'
    }else{
        console.log("no Error")
    }
  })
})

socket.on('disconnect',function(){
  alert('Lost the internet. Trying to reconnect...')
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
    scrollToBottom()
})

socket.on('newLocationMessage',function(message){
  var template = jQuery('#location-message-template').html()
  var html = Mustache.render(template,{
    from:message.from,
    createdAt:moment(message.createdAt).format('h:mm a'),
    url:message.url
  })
  jQuery('#messages').append(html)
  scrollToBottom()
})

socket.on('updateUserList',function(users){
  jQuery('#users').html('')
  var ol = jQuery('<ol></ol>')
  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user))
  })
  jQuery('#users').append(ol)
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
