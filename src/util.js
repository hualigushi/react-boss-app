export function getRedirectPath({type,avatar}) {
    //根据用户信息返回跳转地址
    let url = (type==='boss')?'/boss':'/genius'
    if(!avatar){ // 有头像就说明信息已完善
        url+='info'
    }
    return url
}

export function getChatId(userId, targetId) {
    return [userId, targetId].sort().join('_')
}