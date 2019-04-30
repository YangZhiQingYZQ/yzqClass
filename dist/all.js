var HandlerBrowser = (function () {
    //判断网页运行环境
    var u = navigator.userAgent,
        BrowseType = {
            ie: 'Trident', //IE内核
            webKit: 'AppleWebKit', //苹果、谷歌内核
            presto: 'Presto', //opera内核
            mobile: 'Mobile', //是否为移动终端
            iPhone: 'iPhone', //是否为iPhone或者QQHD浏览器
            iPad: 'iPad', //是否iPad
            webApp: 'Safari', //是否web应该程序，没有头部与底部
            weixin: 'MicroMessenger', //是否微信
            qq: 'QQBrowser', //是否QQ浏览器
            mobile_qq: 'MQQBrowser', //是否是手机QQ浏览器
            uc: 'UCBrowser', //是否是uc浏览器
            baidu: 'Baidu', //是否是百度浏览器
            firefox: 'Firefox', //是否是火狐浏览器
            lieBao: 'lieBao', //是否是猎豹浏览器
            sogou: 'sogou', //是否是搜狗手机浏览器
        }
    return function () {
        this.result = {}; //缓存的结果变量  
        this.isBrowse = function (key) { //判断网页所处环境,并缓存结果
            if (!this.result.hasOwnProperty(key) && BrowseType[key]) {
                this.result[key] = u.indexOf(BrowseType[key]) > -1;
            } else {
                throw new Error("没有" + key + "这个判断属性");
            }
            return this;
        }
        this.addBrowseType = function (key, val) { //新增网页判断环境
            BrowseType[key] = val;
            return this;
        };
        this.addResult = function (callBack) { //新增网页判断结果，非常规判断
            callBack.call(this, u);
            return this;
        }
    }
})();
console.log("b")
console.log("d")
console.log("c")
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
var HandlerUrl = function () {
    var urlfn = {
        /**
         * 
         * @param {Boolean} type 是否进行整个URL的转码，默认不转 
         */
        getQuery: function (type) {
            console.log(type);
            var query = {},
                search = window.location.search,
                queryStr = type ? decodeURIComponent(search).substr(1) : search.substr(1);
            if (queryStr) {
                var queryArr = queryStr.split("&"),
                    _queryArr = [],
                    len = queryArr.length;
                do {
                    len--;
                    _queryArr = queryArr[len].split("=");
                    query[_queryArr[0]] = decodeURIComponent(_queryArr[1])
                } while (len > 0)
                return query;
            } else {
                return null;
            }
        },
        /**
         * 
         * @param {Objeck} data //参数对象
         * @param {String} data.url //跳转的链接
         * @param {Objeck} data.params //跳转需要携带的参数
         */
        joinUrl: function (data) {
            var params = data.params,
                key, query = "?";
            for (key in params) {
                query += key + "=" + params[key] + "&";
            }
            return data.url + query.substring(0, query.length - 1);
        }
    }
    return function (type, data) {
        return urlfn[type](data);
    }
}
console.log(HandlerUrl()("joinUrl", {
    url: "xxx.html",
    params: {
        aa: "a",
        bb: "bb"
    }
}));
/**
 * 寄生组合式继承函数
 * @param {Function} subClass 
 * @param {Function} superClass 
 * @param {Object||Array} obj 
 */
function inheritProtorype(subClass, superClass, obj) {
    function F() {};
    F.prototype = superClass.prototype;
    var p = new F(),
        toString = Object.prototype.toString;
    if (obj) {
        var type = toString.call(obj);
        if (type == "[object Array]") {
            var i = obj.length;
            for (; i >= 0; i--) {
                for (j in obj[i]) {
                    p[j] = obj[i][j]
                }
            }
        } else {
            for (j in obj) {
                p[j] = obj[j];
            }
        }
    }
    p.constructor = subClass;
    subClass.prototype = p;
}