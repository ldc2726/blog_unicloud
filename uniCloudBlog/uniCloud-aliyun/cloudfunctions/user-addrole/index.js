const uniID = require('uni-id')
const reqFormat = require('req-format')
exports.main = async function(event,context) {
	event = await reqFormat(event)
	const {role_id,role_name,comment,permission} = event.body
	const res = await uniID.addRole({
		roleID:role_id,
		roleName:role_name,
		comment,
		permission
	})
	return res;
}
