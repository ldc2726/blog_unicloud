// 云函数register的代码
const uniID = require('uni-id')
const reqFormat = require('req-format')
exports.main = async function(event,context) {
	event = await reqFormat(event)
	const {
		username,
		password,
	} = event.body
    // username、password验证是否合法的逻辑
    const res = await uniID.register({
        username,
        password,
		role:["3"],
		status:2
    })
    return res
}