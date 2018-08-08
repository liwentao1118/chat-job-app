import React from 'react'
import {Grid, List} from 'antd-mobile'

class AvaterSelector extends React.Component {
    constructor() {
        super()
        this.state = ({})
    }

    render() {
        const avaterList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,tamus,koala,lemur,pig,tiger,whale,zebra'.split(',')
            .map(v => ({
                icon: require(`../img/${v}.png`),
                text: v
            }))
        const gridHeader = this.state.text ? (
            <div><span>已经选择头像</span><img style={{width: 20}} src={this.state.icon} alt=""/></div>) : '请选择头像'
        return (

            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid
                        data={avaterList}
                        onClick={elm => {
                            this.setState(elm)
                            this.props.selectAvater(elm.text)
                        }}
                        columnNum={5}/>
                </List>
            </div>
        )
    }
}

export default AvaterSelector