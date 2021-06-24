const uniID = require('uni-id')
const reqFormat = require('req-format')
exports.main = async function(event,context) {
	event = await reqFormat(event)
    const {
        username,
        password
    } = event.body
    // username、password验证是否合法的逻辑
    const res = await uniID.login({
        username,
        password,
		queryField: ['username', 'email', 'mobile']
    })
	console.log(res,'+++++')
	if(res.code){
		return res;
	}
	if(res.userInfo.status==1){
		return {
			"code": 403,
			"msg": "当前账户已经禁用，请联系管理员",
			"message": "当前账户已经禁用，请联系管理员"
		}
	}
	if(res.userInfo.status==2){
		return {
			"code": 403,
			"msg": "当前账户处于审核中，请联系管理员",
			"message": "当前账户处于审核中，请联系管理员"
		}
	}
	if(res.userInfo.status==3){
		return {
			"code": 403,
			"msg": "当前账户处于审核拒绝，请联系管理员",
			"message": "当前账户处于审核拒绝，请联系管理员"
		}
	}
    return res
}