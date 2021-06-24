const {
	Controller
} = require('uni-cloud-router')
module.exports = class HelloController extends Controller {
	async sayHelloAuth() {
		return this.service.hello.sayHelloAuth()
	}

}
