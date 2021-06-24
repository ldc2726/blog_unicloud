	
//http请求和uni请求的兼容
module.exports = function(event){
	if(!event.body){
		event['body'] = JSON.stringify(event)
	}
	event.body = JSON.parse(event.body)
	return event;
}