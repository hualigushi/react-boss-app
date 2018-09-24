
import React from 'react'
import {connect} from 'react-redux' 
import {List,Badge} from 'antd-mobile'
import { createSelector } from 'reselect'


const selector1 = createSelector(
  [
		state=>state.user,
		state=>state.chat
  ],
  (user,chat)=>{
		const msgGroup = {}
		chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || []
			msgGroup[v.chatid].push(v)
		})
		const getLast = arr=>[arr.length-1]
		// 按时间排序
		const chatList = Object.values(msgGroup).sort((a,b)=>{
			const a_last = getLast(a).create_time
			const b_last = getLast(b).create_time
			return b_last - a_last
		})
		return {user,chatList,users:chat.users}
  }
)
@connect(
	// state=>state
	state=>selector1(state)
)
class Msg extends React.PureComponent{
	getLast(arr){
		return arr[arr.length-1]
	}
	render(){
		const Item = List.Item
		const Brief = Item.Brief
		const userid = this.props.user._id
		const userinfo = this.props.users

		return (
			<div>
				{this.props.chatList.map(v=>{
					const lastItem = this.getLast(v)
					const targetId = v[0].from===userid?v[0].to:v[0].from
					const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
					if (!userinfo[targetId]) {
						return null
					}
					return (
						<List key={lastItem._id}>
							<Item
								extra={<Badge text={unreadNum}></Badge>}
								thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
								arrow="horizontal"
								onClick={()=>{
									this.props.history.push(`/chat/${targetId}`)
								}}
							>
								{lastItem.content}
								<Brief>{userinfo[targetId].name}</Brief>
															
							</Item>
						</List>
					)
				})}	
			</div>
		)
	}
}
export default Msg









