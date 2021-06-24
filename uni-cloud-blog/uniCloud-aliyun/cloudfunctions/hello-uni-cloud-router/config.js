const auth = require("./middleware/auth.js"); // 引入 auth 中间件
// config.js
module.exports = {
	debug: true, // 调试模式时，将返回 stack 错误堆栈
	baseDir: __dirname, // 必选，应用根目录
	middleware: [
		[
			//数组格式，第一个元素为中间件，第二个元素为中间件生效规则配置
			auth({
				"passwordSecret": "passwordSecret-demo",
				"tokenSecret": "tokenSecret-demo",
				"tokenExpiresIn": 72000, 
				"passwordErrorLimit": 6, 
				"passwordErrorRetryTime": 3600
			}), // 注册中间件
			{
				enable: true,
				ignore: /\Auth$/
			}, // 配置当前中间件生效规则，该规则表示以`/login`结尾的路由不会执行 auth 中间件校验 token
		],
	], // 自定义中间件
}
