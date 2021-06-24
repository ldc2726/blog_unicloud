module.exports = async function(...fnArr) {
	if ({}.toString.call(fnArr[0]) === '[object Array]') {
		fnArr = fnArr[0];
	}
	const fnNum = fnArr.length;
	let promiseArr = [];
	let resultArr = {};
	for (let i = 0; i < fnNum; i++) {
		promiseArr.push(fnArr[i]());
	}
	for (let i = 0; i < fnNum; i++) {
		resultArr = {...resultArr,...await promiseArr[i]}
	}
	return resultArr;
}
