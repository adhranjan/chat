var generateMessage = function(from, text){
  return{
    from,
    text,
    createdAt:new Date().getTime()
  }
}

var generateLocationMessage = function(from,latitide,longitude){
  return{
    from,
    url:`http://www.google.com/maps?q=${latitide},${longitude}`,
    createdAt:new Date().getTime()
  }
}

module.exports = {generateMessage,generateLocationMessage};
