var app = {
  default:{
    user_id:"28723",
    user:null,
    comp:null
  },
  init:function(){
    window.publicData = {};
    let _this = this;
    console.log("app init"),
    // _this.getTaskList();
    _this.bindEvent();
    _this.getLoginInfo();
  },
  bindEvent:function(){
    var _this = this;
    $(function(){
      $('.tasks_list').unbind()
      .on('click','li',function(){
        var $this = $(this);
        var uuid = $this.attr('data-id');
        $this.addClass('active').siblings().removeClass('active');
        _this.getTaskDetail(uuid);

      })
    })
    
  },
  getLoginInfo:function(){
    let url = '/ftask/proxy/user/login_un_check.json';
    let param = {
      identify:this.default.user_id
    }
    httpAgent(url,'GET',param,(data) => {
      window.publicData.token = data.token;
      window.publicData.comp_id = data.user.comp_id;
      this.default.user = data.user;
      this.default.comp = data.comp;
      this.getTaskList();
    })
  },
  getTaskList:function(){
    template.helper('timesToDate',timesToDate);
    let url = '/ftask/api/v3/task/filter.json?start=0&limit=30&sort=%7B%22plan_end_date%22%3A1%7D&id=3&status=WAITING&status=RUNNING&status=WAITING_AGREE&status=POST_PONE'
    httpAgent(url,'GET',{},(data) => {
      console.log(data)
      $('.tasks_list').html('');
      var html = template('test', data);
      $('.tasks_list').html(html);
    })
 
  },
  getTaskDetail(uuid){
      let url = '/ftask/api/v3/task/detail/'+uuid+'.json'
      httpAgent(url,'GET',{},(data) => {
        console.log(data)
        
      })



  }
}


app.init();
