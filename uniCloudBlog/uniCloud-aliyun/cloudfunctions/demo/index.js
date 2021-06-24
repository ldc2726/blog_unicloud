'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const $ = db.command.aggregate
	let res = await db.collection('uni-id-users')
	.aggregate()
	.project({formatDate: $.dateToString({date: new Date('$register_date'),format: '%Y-%m-%d'})})
	.end()
	//返回数据给客户端
	return res
};
