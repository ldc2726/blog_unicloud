'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('opendb-blog-articles')
	const res = await collection.limit(10).get() 
	console.log('event : ', event)
	console.log('collection',collection)
	console.log('res',res)
	//返回数据给客户端
	return res
};
