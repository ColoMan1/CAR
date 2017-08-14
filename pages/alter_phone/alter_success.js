// pages/alter_phone/alter_success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  comback:function(){
    wx.reLaunch({
      url: '../login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  }
})