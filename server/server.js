const port = process.env.port || 3000

const path = require('path')
const publicPath = path.join(__dirname,'../public')


var express = require('express')

app = express()



app.use(express.static(publicPath))


app.listen(port,()=>{
  console.log(`Listening at port ${port}`)
})
