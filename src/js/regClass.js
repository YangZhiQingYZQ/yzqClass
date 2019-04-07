function HandlerReg() {
	this.mobile = /^1[3456789]\d{9}$/; //手机号
	this.pwd = /[\d\w]{6,20}/; //密码
	this.code = /^\d{4}$/; //图片验证码&短信验证码均为4位数字
	this.name = /^[\u4e00-\u9fa5]{2,4}$/; //名字（汉字）
	this.msgCode = /^\d{6}$/; //手机验证码
	this.idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证
	this.email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //邮箱
	this.bankNo = /^([1-9]{1})(\d{15}|\d{18})$/; //银行卡
	this.telPhone = /^\d{3,4}\-?\d{7,8}((\-?\d{6})|\d{0})$/; //住宅电话
	this.monthSalary = /^[1-9]\d*$/; //月收入;
}
HandlerReg.prototype = {
	isVerify : function(type,val){
		return this[type].test(val);
	}
}
var reg = new HandlerReg().isVerify("code","112")
console.log(reg);