
export function getRedirectPath ({type,avater}){
//根据用户信息获取跳转路径
    //根据用户的type来决定不同的路径,typeboss  /boss
    let url  = (type==='boss')? '/boss':'/genius'
    if (!avater) {
        url+='info'
    }
    return url
}