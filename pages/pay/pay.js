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
    orderNumber:"",
    timeStamp:"",
    nonceStr:"",
    packageWx:"",
    paySign:""
  },
  affirmPay:function(){
    var that = this;
    wx.requestPayment({
      'timeStamp': this.data.timeStamp,
      'nonceStr': this.data.nonceStr,
      'package': this.data.packageWx,
      'signType': 'MD5',
      'paySign': this.data.paySign,
      success: function (res) {
        console.log(res)
        wx.reLaunch({
          url: "../pay_success/pay_success?price=" + that.data.price + "&dataDate=" + that.data.classDataShow + "&dataTime=" + that.data.bayCarTime
        })
      },
      fail: function (res) {
        console.log(res)
        wx.reLaunch({
          url: "../pay_success/pay_defeated" 
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
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
        orderNumber: that.data.orderNumber
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Cookie': 'weChartID=' + wx.getStorageSync('HPcar')
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          packageWx: res.data.data.package,
          paySign: res.data.data.paySign
        })
      }
    })
  }
})