const httpAgent = function(url, requestType, param, successCb,erroCb){

  if(publicData.token && publicData.comp_id){
    if(url.indexOf('?') >= 0){
      url = url + '&token=' + publicData.token + '&comp_id=' + publicData.comp_id + '&plat=web&build=999999';
    }else{
      url = url + '?token=' + publicData.token + '&comp_id=' + publicData.comp_id + '&plat=web&build=999999';
    }
  }

  $.ajax({
    type: requestType,
    url: url,
    data: param,
    success: function(data) {
      if(data.result && data.result != 0){
        if(data.result == -10001){//token过期了
          // });
        }else if(data.result == -10100){//强制升级客户端
          
        }else{
          if(erroCb){
            erroCb(data);
          }
        }
      }else{
        successCb(data);
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      //alert("服务器内部错误，状态码：" + XMLHttpRequest.status + "，异常对象:" + errorThrown);
    }
  });

}

/*时间戳转换为日期格式*/
const timesToDate = function(tm, pattern){ //pattern示例：yyyy年MM月dd日 hh:mm:ss  yyyy-MM-dd hh:mm:ss
  if (tm == "" || tm == null || tm == undefined) {
    return '';
  }
  const date = new Date(parseInt(tm));
  if (pattern) {
    return datePattern(date, pattern);
  } else {
    return datePattern(date, 'yyyy-MM-dd HH:mm:ss');
  }
}

/*日期转换时间戳*/
const dateToTimes = function(date){
  date = date.substring(0, 19);
  date = date.replace(/-/g, '/');
  var timestamp = new Date(date).getTime();
  return timestamp;
}






const datePattern = function(date, fmt){
  const o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
    'H+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds() //毫秒
  };
  const week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d'
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + '']);
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}

