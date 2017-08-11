Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar:["全部班次","已发车","未发车"],
    currentTab:1,   //顶部tab切换索引
    topShow:true,   //数据没加载完成前block的显示判断
    classes:[],     //这里数据用数组保存
    showIndex:1,    //数据分页
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log(1234)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})