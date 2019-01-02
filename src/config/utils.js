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

