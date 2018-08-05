import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import Login from "../../container/login/login";
import {loaddata} from "../../redux/user.redux";
import {connect } from 'react-redux'


@withRouter
@connect(
    null,
    {loaddata}
)
class Authroute extends React.Component{

    //是否登录
    //现在的URL地址   如果是login页面是不需要跳转的
    //用户的身份是牛人还是boss
    //用户是否完善了信息(选择头像 个人简介)


    componentDidMount(){
        const publicList = ['/login','/register']
        const pathName  = this.props.location.pathname
        if (publicList.indexOf(pathName)>-1){
            return null
        }
        axios.get('/user/info').then(res=>{
            if (res.status==200){
               if (res.data.code==0){
                   //有登录信息
             this.props.loaddata(res.data.data)
                   console.log(res.data.data)
               } else{
                   //没登录信息
                   this.props.history.push('/login')
               }
            }
        })
    }
    render(){
        return null
    }
}
export default Authroute