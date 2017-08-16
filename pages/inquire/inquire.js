const inquireClasses = require('../../config').inquireClasses  //接口js引入
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbar:["全部班次","已发车","未发车"],
    currentTab:1,   //顶部tab切换索引
    topShow:true,   //数据没加载完成前block的显示判断
    classes:[],     //这里数据用数组保存
    showIndex:0,    //数据分页
    bottomShow:true, //上拉加载时显示正在加载
    offTime: true,    //截单未截单判断显示
    resData1:[]
  },
  //顶部tab点击切换
  navbarTap: function (e) {
    this.setData({
      currentTab: e.target.dataset.idx
    })
  },
  //对请求数据函数进行封装
  requestShu: function (showIndex) {
    var that = this
    wx.request({
      url: inquireClasses,
      data: {
        page: showIndex,
        pageSize: 5
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      dataType: "json",
      success: function (res) {
        // var showData = function(){
        //   for (var i in res.data.data.pageDate) {
        //     res.data.data.pageDate[i].carTime = res.data.data.pageDate[i].cutOffTime.substring(11, 16) //自定义一个carTime值来接收截取后的时间值
        //     res.data.data.pageDate[i].startTime = res.data.data.pageDate[i].startCarTime.substring(11, 16) //自定义一个startTime值来接收发车截取后的时间值
        //   }
        //   that.setData({
        //     topShow: false,
        //     classes: that.data.classes.concat(res.data.data.pageDate),//让后面刷新的数据用数组concat方法加在原有数据的末尾
        //     showIndex: that.data.showIndex + 1
        //   })
        // }
        console.log(res.data.data.pageDate)
        if (res.data.data.pageDate.length > 0) {
          if (res.data.data.pageDate[i].cutOffStatus) {//判断截单状态
            console.log(res.data.data.pageDate)
            showData()
            that.setData({
              offTime: true
            })
          }else{
            showData()
            that.setData({
              offTime: false
            })
          }
        }
         else {
          that.setData({
            bottomShow: false
          })
        }
      }
    })
  },
  //滚动条触底事件
  scrolltolower:function(e){
    this.requestShu(this.data.showIndex)//对请求数据函数进行调用
    // this.setData({
    //   bottomShow:true
    // })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestShu(this.data.showIndex)//对请求数据函数进行调用
  }
})