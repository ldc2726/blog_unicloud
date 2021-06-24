const uniID = require('uni-id')
const reqFormat = require('req-format')
exports.main = async (event, context) => {
	event = await reqFormat(event,true,uniID)
	if(event.user.code){
		return event.user
	}
	const {roleList,_id} = event.body; 
	const res = await uniID.bindRole({
		uid:_id,
		roleList,
		reset:true
	})
	//返回数据给客户端
	return res
};
