import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {Button, InputItem, NavBar,TextareaItem} from 'antd-mobile'
import {connect} from 'react-redux'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {update} from '../../redux/user.redux'

@connect(
    state => state.user,
    {update}
)
class BossInfo extends Component {
    constructor (props) {
        super(props)
        this.state = {
            'title':'',
            'company':'',
            'money':'',
            'desc':'',
            'avatar':''        
        }
    }
    
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }

    render () {
        const redirect = this.props.redirectTo
        const path = this.props.location.pathname
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null}
                <NavBar mode="dark">BOSS完善信息页面</NavBar>
                <AvatarSelector selectAvatar={imgname => {
                    this.setState({ avatar: imgname })
                }} />
                <InputItem onChange={v => this.onChange('title', v)}>
                招聘职位
                </InputItem>
                <InputItem onChange={v => this.onChange('comany', v)}>
                公司名称
                </InputItem>
                <InputItem onChange={v => this.onChange('money', v)}>
                职位薪资
                </InputItem>
                <TextareaItem onChange={v => this.onChange('desc', v)} row={3} autoHeight title="职位要求" />
                <Button type="primary" onClick={() => {
                    this.props.update(this.state)
                }}>
                保存
                </Button>
            </div>
        )
    }
}

export default BossInfo