console.log("b")
console.log("d")
console.log("c")
function HandlerUrl() {
    this.query = function () {
        var query = {},
            queryStr = window.location.search.substr(1);
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
        }else{
            return null;
        }
    }
}
console.log("我执行了")