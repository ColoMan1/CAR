Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar:["全部班次","已发车","未发车"],
    currentTab:1,
    classes:[{
        star: "平湖经济开发区",
        end: "江苏南京",
        times: "17:30发车"
      },{
          star: "阿拉伯",
          end: "杭州",
          times: "16:23发车"
      },{
          star: "安徽",
          end: "杭州",
          times: "18:35发车"
      },
    ]
  },
  navbarTap: function (e) {
    console.log(e)
    this.setData({
      currentTab: e.target.dataset.idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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