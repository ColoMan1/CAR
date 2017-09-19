const unbundling = require('../../config').unbundling;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  
  },
  loginOut:function (){
    wx.request({
      url: unbundling,
      data: {
        "weChartID": wx.getStorageSync('HPcar'),
        "userID": wx.getStorageSync('jianzb_uid')
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Cookie': 'weChartID=' + wx.getStorageSync('HPcar')
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.status){
          wx.setStorageSync('jianzb_uid', false)
          wx.reLaunch({  //关闭所有页面，打开到应用内的某个页面
            url: '../login/login'
          })
        }
      }
    })
  }
})