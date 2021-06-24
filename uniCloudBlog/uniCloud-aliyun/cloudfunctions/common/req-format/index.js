module.exports = async function(event,isTestToken = false,uniID) {
	// 公用模块用法请参考 https://uniapp.dcloud.io/uniCloud/cf-common
	if(!event.body){
		event['body'] = JSON.stringify(event)
	}
	event.body = JSON.parse(event.body)
	if(isTestToken && uniID){
		const res = await uniID.getUserInfoByToken(event.body.token)
		event.user = res
		if(event.user.code){
			return event
		}
		if(event.user.role.includes('1')){
			return event
		}
		if(event.user.status==1){
			return {
				"code": 403,
				"msg": "当前账户已经禁用，请联系管理员",
				"message": "当前账户已经禁用，请联系管理员"
			}
		}
		if(event.user.status==2){
			return {
				"code": 403,
				"msg": "当前账户处于审核中，请联系管理员",
				"message": "当前账户处于审核中，请联系管理员"
			}
		}
		if(event.user.status==3){
			return {
				"code": 403,
				"msg": "当前账户处于审核拒绝，请联系管理员",
				"message": "当前账户处于审核拒绝，请联系管理员"
			}
		}
		return {
			"code": 401,
			"msg": "权限不足",
			"message": "权限不足"
		}
	}else{
		return event;
	}
	
	
}
