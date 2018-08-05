const express =require('express')
const userRouter =require('./user')
const cookieParset = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()
app.use(cookieParset())
app.use(bodyParser.json())
app.use('/user',userRouter)
//  app.get('/haha',function (req, res) {
//   res.send('<h2>hahaha</h2>')
// })

app.listen(9093,()=>{
    console.log('node server start at port 9093 ')
})
