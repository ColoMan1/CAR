var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    price: app.globalData.price,
    city_car_left: ["上海浦东", "香港", "澳大利亚", "安徽"],
    city_car_leftIndex: 0,
    city_car_right: ["上海浦东", "香港", "澳大利亚", "安徽"],
    city_car_rightIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '确认支付'
    })
    if (options.code){
      this.setData({
        city_car_leftIndex: options.code,
        city_car_rightIndex: options.id,
        time: options.timea
      })
      console.log(options.code)
      console.log(options.id)
      console.log(options.timea)
    }
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