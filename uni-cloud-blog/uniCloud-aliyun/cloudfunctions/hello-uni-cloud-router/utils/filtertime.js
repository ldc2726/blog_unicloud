
// 时间戳转为正常时间的公共方法，当然你也可以加上小时、分、秒
module.exports = function filterTime(time) {
  const date = new Date(time)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1 
  const D = isAddZero(date.getDate())
  const HH = isAddZero(date.getHours()) // 小时
  const MM = isAddZero(date.getMinutes()) // 分钟
  const SS = isAddZero(date.getMinutes()) // 秒
  return `${Y}-${M}-${D} ${HH}:${MM}:${SS}`
}
 
// 下边这个方法是判断时间是否小于10，小于10 前边加0，更加规范一些，看自己需求
function isAddZero(time) {
    let str = ''
    str = time < 10 ? '0' + time : time.toString()
    return str
}