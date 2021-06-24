// middleware/auth.js
// const userCloud = uniCloud.init({
//   provider: 'aliyun',
//   spaceId: 'e2ad8936-ff0a-4d4b-9e17-565fcce00ac0',
//   clientSecret: 'F+ykPRgEl2sqiibwatIKdg=='
// });
const uniID = require("uni-id");
module.exports = (options) => {
	// 初始化 uniID 配置
	uniID.init(options);
	// 返回中间件函数
	return async function auth(ctx, next) {
		if (!ctx.event.body) {
			ctx.event['body'] = JSON.stringify(ctx.event)
		}
		ctx.event.body = JSON.parse(ctx.event.body)
		// 校验 token
		const auth = await uniID.getUserInfoByToken(ctx.event.body.token);
		if (auth.code) {
			// 校验失败，抛出错误信息
			throw {
				code: auth.code,
				message: auth.message
			};
		}
		ctx.auth = auth; // 设置当前请求的 auth 对象
		ctx.data = ctx.event.body
		ctx.validate = function(object){//校验函数
			for(let i in object ){
				if(typeof(ctx.data[i]) !== object[i]['type']) {
					throw {
						code: 400,
						message: i+' '+"字段类型应为"+ object[i]['type']+'，而实际传输为:'+typeof(ctx.data[i])
					}
					return;
				}
			}
		}
		await next(); // 执行后续中间件
	};
};
