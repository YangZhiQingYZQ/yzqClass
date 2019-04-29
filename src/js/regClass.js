var HandlerReg = function () {
	var resType = {
		mobile: /^1[3456789]\d{9}$/, //手机号
		pwd: /[\d\w]{6,20}/, //密码
		code: /^\d{4}$/, //图片验证码&短信验证码均为4位数字
		name: /^[\u4e00-\u9fa5]{2,4}$/, //名字（汉字）
		msgCode: /^\d{6}$/, //手机验证码
		idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //身份证
		email: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, //邮箱
		bankNo: /^([1-9]{1})(\d{15}|\d{18})$/, //银行卡
		telPhone: /^\d{3,4}\-?\d{7,8}((\-?\d{6})|\d{0})$/, //住宅电话
		monthSalary: /^[1-9]\d*$/, //月收入;
		name: /^[\u4e00-\u9fa5]{2,20}$/i, //姓名
		isNumber: /^[1-9][0-9]*$/i, //数字
		email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i, //邮箱
		money: /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/i, //金钱
	}
	var repformatting = {
		// 银行卡号 每四位 一个空格
		SpaceBankCode: function (val) {
			return (val + "").replace(/\s/g, '').replace(/(.{4})/g, "$1 ")
		},
		//银行卡号 显示四三位和后三位
		encryptBankCode: function (val) {
			return (val + "").replace(/^(.{4}).*(.{3})$/, "$1 **** **** *$2")
		},
		//手机号码 显示前三位和后三位
		phone:function(val){
			return (val + "").replace(/^(.{3}).*(.{3})$/, "$1*****$2")
		},
		// 更改姓名显示，只显示最后一个
		userName: function (val) {
			var strArr = val.split(""),
				len = strArr.length - 1,
				i = 0;
			for (; i < len; i++) {
				strArr[i] = strArr[i].replace(strArr[i], "*");
			}
			return strArr.join("");
		},
	}
	//验证方法
	function isVerify(type, val) {
		return resType[type].test(val);
	}
	//替换方法
	function replaceType(type, val) {
		return repformatting[type](val);
	}
	//暴露方法对象
	return {
		isVerify: isVerify,
		replaceType: replaceType
	}
};
console.log(HandlerReg().replaceType('encryptBankCode', '6228480078809886479'));