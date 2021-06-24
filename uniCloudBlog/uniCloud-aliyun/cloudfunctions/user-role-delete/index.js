const uniID = require('uni-id')
const reqFormat = require('req-format')
exports.main = async (event, context) => {
	event = await reqFormat(event,true,uniID)
	if(event.user.code){
		return event.user
	}
	const {role_id} = event.body; 
	const res = await uniID.deleteRole({
		roleID:role_id,
	})
	//返回数据给客户端
	return res
};
