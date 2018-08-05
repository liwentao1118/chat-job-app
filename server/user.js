const express =require('express')
const Router = express.Router()
const model= require('./model')
const User = model.getModel('user')
const utils  = require('utility')
const _filter = {'pwd':0,'__v':0}


Router.get('/list',async(req,res)=>{
   let userList = await User.find();
   res.json(userList)
})
Router.post('/login',async(req,res)=>{
    const {user,pwd} = req.body
    let result = await User.findOne({user,pwd:md5Pwd(pwd)},_filter);
    if (!result){
        res.json({code:1,msg:'用户名或者密码错误'})
    }
    console.log(result)
    res.cookie('userid',result._id)
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
    if (result){
        const {user,type,_id} = result
        res.cookie('userid',_id)
        res.json({code:0,data:{user,type,_id}})
    }

    console.log(result)
})
Router.get('/info',async(req,res)=>{
    const {userid} = req.cookies
    if (!userid){
        res.json({code:1})
    }
    let result = await User.findOne({_id: userid},_filter);
    res.json({code:0,data:result})


})

function md5Pwd(pwd){
    let salt = 'liwentao_chatapp_makeis_good!@#~~'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports=Router