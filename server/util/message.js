var moment = require('moment')
var generateMessage = function(from, text,messageId){
  return{
    from,
    text,
    messageId,
    createdAt:moment().valueOf()
  }
}

var generateLocationMessage = function(from,latitide,longitude,messageId){
  return{
    from,
    messageId,
    url:`http://www.google.com/maps?q=${latitide},${longitude}`,
    createdAt:moment().valueOf()
  }
}

module.exports = {generateMessage,generateLocationMessage};
