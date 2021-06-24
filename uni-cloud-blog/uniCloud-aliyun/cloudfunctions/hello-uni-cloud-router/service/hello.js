const {
	Service
} = require('uni-cloud-router')
module.exports = class HelloService extends Service {
	sayHelloAuth() {
		return {
			data: 'welcome to uni-cloud-router!'
		}
	}
}
