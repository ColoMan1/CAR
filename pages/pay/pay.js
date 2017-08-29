const carPay = require('../../config').carPay  //微信调用付款
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    price: "",
    two1: "",
    three1: "",
    classDataShow: "",
    bayCarTime: "",
    orderNumber:""
  },
  affirmPay:function(){
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
        consol.log(res)
      },
      'fail': function (res) {
        consol.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      two1: options.carStart,
      three1: options.carEnd,
      classDataShow: options.dataDate,
      bayCarTime: options.dataTime,
      price: options.price,
      orderNumber: options.orderNumber
    })
    wx.request({
      url: carPay,
      data: {
        orderNumber: this.data.orderNumber
      },
      method: "POST",
      header: {
        'content-type':'application/x-www-from-urlencoded',
        'Cookie': 'weChartID=d18f941b72fa464fba6f34b29018fd76'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})