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