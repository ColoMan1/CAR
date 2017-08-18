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
    bottomShowElse: false
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
        console.log(res.data)
        // var showDataFn = function(){
        //   for (var i in res.data.data.pageDate) {
        //     res.data.data.pageDate[i].carTime = res.data.data.pageDate[i].cutOffTime.substring(11, 16) //自定义一个carTime值来接收截取后的时间值
        //     res.data.data.pageDate[i].startTime = res.data.data.pageDate[i].startCarTime.substring(11, 16) //自定义一个startTime值来接收发车截取后的时间值
        //   }
        //   that.setData({
        //     topShow: false,
        //     classes: that.data.classes.concat(res.data.data.pageDate),//让后面刷新的数据用数组concat方法加在原有数据的末尾
        //     showIndex: that.data.showIndex + 1  //请求页数每次加1
        //   })
        // }
        // if (res.data.data.pageDate.length > 0) {  //判断有无数据
        //   showDataFn()
        //   that.setData({
        //     bottomShow: false
        //   })
        // }
        //  else {
        //   that.setData({
        //     bottomShowElse:true
        //   })
        //   var aba = setTimeout(function(){
        //     that.setData({
        //       bottomShowElse: false
        //     })
        //   },2000)
        // }
      }
    })
  },
  //scroll-view滚动条触底事件
  scrolltolower:function(e){
    this.requestShu(this.data.showIndex)//对请求数据函数进行调用
  },
  //页面上拉触底事件的处理函数
  onReachBottom:function(e){
    this.requestShu(this.data.showIndex)//对请求数据函数进行调用
  },
  //下拉监听事件
  onPullDownRefresh:function(e){
    this.requestShu(this.data.showIndex)//对请求数据函数进行调用
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestShu(this.data.showIndex)//对请求数据函数进行调用
  }
})