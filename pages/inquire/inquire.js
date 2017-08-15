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
    bottomShow:true //上拉加载时显示正在加载
    // classes:[{
    //     star: "平湖经济开发区",
    //     end: "江苏南京",
    //     times: "17:30发车"
    //   },{
    //       star: "阿拉伯",
    //       end: "杭州",
    //       times: "16:23发车"
    //   },{
    //       star: "安徽",
    //       end: "杭州",
    //       times: "18:35发车"
    //   },
    // ]
  },
  //顶部tab点击切换
  navbarTap: function (e) {
    this.setData({
      currentTab: e.target.dataset.idx
    })
  },
  //对请求数据函数进行封装
  // requestShu: function (showIndex) {
  //   var that = this
  //   wx.request({
  //     url: inquireClasses,
  //     data: {
  //       page: showIndex,
  //       pageSize: 2
  //     },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     dataType: "json",
  //     success: function (res) { 
  //       for (var i in res.data.data.pageDate){
  //         console.log(res.data.data.pageDate[i].sites)
  //         for (var k in res.data.data.pageDate[i].sites) {
  //           console.log(res.data.data.pageDate[i].sites[k].name)
  //           // that.setData({
  //           //   topShow: false,
  //           //   classes: that.data.classes.concat(res.data.data.pageDate[i].sites[k].name),
  //           //   showIndex: that.data.showIndex + 1
  //           // })
  //           if (res.data.data.pageDate.length > 0) {
  //             that.setData({
  //               topShow: false,
  //               classes: that.data.classes.concat(res.data.data.pageDate[i].sites[k].name),//让后面刷新的数据用数组concat方法加在原有数据的末尾
  //               showIndex: that.data.showIndex + 1
  //             })
  //           } else {
  //             that.setData({
  //               bottomShow: false
  //             })
  //           }
  //         }
  //       }
        
  //     }
  //   })
  requestShu: function (showIndex) {
    var that = this
    wx.request({
      url: 'http://123.157.241.146:9018/api/Product/GetProductList',
      data: {
        CurrentPageIndex: showIndex,
        PageSize: 5,
        Useage: 2,
        CategoryGuids: ['6531DD37-49AB-4151-8F53-A6FE00E69683']
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.Data.PageData)
        if (res.data.Data.PageData.length > 0) {
          that.setData({
            topShow: false,
            classes: that.data.classes.concat(res.data.Data.PageData),//让后面刷新的数据用数组concat方法加在原有数据的末尾
            showIndex: that.data.showIndex + 1
          })
        } else {
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