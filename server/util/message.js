var moment = require('moment')
var generateMessage = function(from, text){
  return{
    from,
    text,
    createdAt:moment().valueOf()
  }
}

var generateLocationMessage = function(from,latitide,longitude){
  return{
    from,
    url:`http://www.google.com/maps?q=${latitide},${longitude}`,
    createdAt:moment().valueOf()
  }
}

module.exports = {generateMessage,generateLocationMessage};
