const {
	Controller
} = require('uni-cloud-router')
const reqformat = require('./../utils/reqformat.js')
module.exports = class MsgController extends Controller {
	async addAuth() { //添加留言
		const {
			ctx,
			service
		} = this;
		const data = reqformat(ctx.event)
		return this.service.msg.addAuth({...data.body,...{ip:ctx.context.CLIENTIP}})
	}
	async getListAuth() { //获取留言列表
		const {
			ctx,
			service
		} = this;
		const data = reqformat(ctx.event)
		return this.service.msg.getListAuth(data.body)
	}
	async remove(){//删除留言
		const {
			ctx,
			service
		} = this;
		//校验参数
		ctx.validate({
			id:{
				type:"string"
			}
		});
		const author = ctx.auth.uid;
		const post = Object.assign(ctx.data, {
			userid: author
		});
		return this.service.msg.remove(post)
	}
}
