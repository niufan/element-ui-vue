
let Utils = {};

// 类型判断
let types = 'Undefined,Object,Null,Boolean,Number,Date,String,RegExp,Array,Function'.split(',');
function getType() {
    return Object.prototype.toString.call(this).slice(8, -1);
}
for (let i = 0, l = types.length; i < l; i++) {
    Utils['is' + types[i]] = (function(type) {
        return (value) => getType.call(value) === type;
    })(types[i]);
}
Utils.isEmpty = function(value) {
  return Utils['isUndefined'](value) || Utils['isNull'](value)
      || (Utils['isString'](value) && value.trim() === '')
      || (Utils['isArray'](value) && value.length <= 0)
    ;
};

/**
 * 日期格式化
 * @param date 日期，默认为当前时间
 * @param pattern 格式，默认yyyy-MM-dd HH:mm:ss.S
 * @returns {string} 格式后的日期字符串
 */
Utils.format = function(date = new Date(), pattern = 'yyyy-MM-dd HH:mm:ss.S') {
    let o = {
        "M+" : date.getMonth()+1,                        // 月份
        "d+" : date.getDate(),                           // 日
        "H+" : date.getHours(),                          // 小时 24小时
        "h+" : date.getHours() % 12,                     // 小时 12小时
        "m+" : date.getMinutes(),                        // 分
        "s+" : date.getSeconds(),                        // 秒
        "q+" : Math.floor((date.getMonth() + 3) / 3),   // 季度
        "S"  : date.getMilliseconds()                    // 毫秒
    };
    if(/(y+)/.test(pattern))
        pattern = pattern.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(let k in o) {
        if(new RegExp("("+ k +")").test(pattern)) {
            pattern = pattern.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return pattern;
};

export {Utils};