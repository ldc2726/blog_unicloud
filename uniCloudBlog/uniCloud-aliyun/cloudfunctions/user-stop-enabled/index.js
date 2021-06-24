const uniID = require('uni-id')
const reqFormat = require('req-format')
const db = uniCloud.database()
exports.main = async (event, context) => {
	event = await reqFormat(event,true,uniID)
	if(event.user.code){
		return event.user
	}
	const collection = db.collection('uni-id-users');
	const {status,_id} = event.body; 
	const res = await collection.where({
		_id:_id
	}).update({
		status:status
	})
	
	return res
};
