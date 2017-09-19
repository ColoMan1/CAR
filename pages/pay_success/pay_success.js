// pages/pay_success/pay_success.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: "",
    bayCarTime:"",
    classDataShow:""
  },
  comBack:function(){
    wx.reLaunch({
      url: "../index/index"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      price: options.price,
      bayCarTime: options.dataTime,
      classDataShow: options.dataDate
    })
  }
})