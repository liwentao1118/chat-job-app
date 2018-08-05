const express =require('express')
const Router = express.Router()
const model= require('./model')
const User = model.getModel('user')
const utils  = require('utility')


Router.get('/list',async(req,res)=>{
   let userList = await User.find();
   res.json(userList)
})
Router.post('/login',async(req,res)=>{
    const {user,pwd} = req.body
    let result = await User.findOne({user,pwd:md5Pwd(pwd)},{'pwd':0});
    if (!result){
        res.json({code:1,msg:'用户名或者密码错误'})
    }
    res.json({code:0,data:result})
})
Router.post('/register',async(req,res)=>{
    console.log(req.body)
    const{user,pwd,type} = req.body
    let eUser = await User.find({user});
    console.log(eUser)
    if (eUser.length>0){
        res.json({code:1,msg:'用户名重复'})
    }
    let result = await User.create({user,pwd:md5Pwd(pwd),type});
     res.json({code:0})
    console.log(result)
})
Router.get('/info',(req,res)=>{
      res.json({code:1})
})

function md5Pwd(pwd){
    let salt = 'liwentao_chatapp_makeis_good!@#~~'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports=Router