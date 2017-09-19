// pages/pay_success/pay_defeated.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  binComeBack:function(){
    wx.reLaunch({
      url: "../index/index"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  }
})