const uniID = require('uni-id')
const reqFormat = require('req-format')
const asyncAll = require('async-all')
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command 
exports.main = async function(event,context) {
	event = await reqFormat(event,true,uniID)
	if(event.user.code){
		return event.user
	}
	const collection = db.collection('uni-id-users');
	const {page=1,size=10,role,username} = event.body;
	const query = async function(){
		const res = await collection
		.field({ 
			'username': true,
			"register_date":true,
			"register_ip":true,
			"last_login_date":true,
			"role":true,
			"status":true
		})
		.where({
			"username":username==""?dbCmd.neq(""):username,
			"role":role==""?dbCmd.neq(""):role
		})
		.skip((page-1)*size).limit(size).get();
		return res;
	}
	const total = async function(){
		return await collection
		.where({
			"username":username==""?dbCmd.neq(""):username,
			"role":role==""?dbCmd.neq(""):role
		})
		.count()
	}
	const result = await asyncAll(query,total);
	return result;
	
}

