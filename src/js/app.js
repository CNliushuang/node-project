var app = {
  init:function(){
    let _this = this;
    console.log("app init"),
    _this.getTaskList();
  },
  getTaskList:function(){
    let url = '/ftask/api/v3/task/filter.json?start=0&limit=30&sort=%7B%22plan_end_date%22%3A1%7D&id=3&status=WAITING&status=RUNNING&status=WAITING_AGREE&status=POST_PONE&comp_id=DbazTRK72RF1Beiqxx6SSQ&token=9c7d7e017c923f68da6009c29d031bcb&plat=web&build=999999'
    httpAgent(url,'GET',{},(data) => {
      console.log(data)
    })
 
  }
}


app.init();
