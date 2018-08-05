const express =require('express')
const Router = express.Router()
const model= require('./model')
const User = model.getModel('user')


Router.get('/list',async(req,res)=>{
   let userList = await User.find();
   res.json(userList)
})
Router.post('/register',async(req,res)=>{
    console.log(req.body)
    const{user,pwd,type} = req.body
    let eUser = await User.find({user});
    console.log(eUser)
    if (eUser.length>0){
        res.json({code:1,msg:'用户名重复'})
    }
    let result = await User.create({user,pwd,type});
     res.json({code:0})
    console.log(result)
})
Router.get('/info',(req,res)=>{
      res.json({code:1})
})

module.exports=Router