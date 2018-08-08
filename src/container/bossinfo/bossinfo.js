import React from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import AvaterSelector from "../../component/avater-selector/avater-selector";

class BossInfo extends React.Component{
    constructor (){
        super()
        this.state=({
            title:'',
            company:'',
            money:'',
            desc:'',
            avater:''
        })
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        return (
            <div>
                <NavBar mode="dark">Boss信息完善</NavBar>
                <AvaterSelector  selectAvater={(imgname)=>{
                    this.setState({
                        avater:imgname
                    })
                }}></AvaterSelector>
                <InputItem onChange={(v)=>this.handleChange('title',v)}>招聘职位</InputItem>
                <InputItem onChange={(v)=>this.handleChange('company',v)}>公司名称</InputItem>
                <InputItem onChange={(v)=>this.handleChange('money',v)}>职位薪资</InputItem>
                <TextareaItem
                    onChange={(v)=>this.handleChange('desc',v)}
                    row={3}
                    autoHeight
                    title='职位要求'
                ></TextareaItem>
                <Button type='primary'>保存</Button>
            </div>
        )
    }
}

export default BossInfo