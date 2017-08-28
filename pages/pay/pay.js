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
    bayCarTime: ""
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
    this.setData({
      two1: options.carStart,
      three1: options.carEnd,
      classDataShow: options.dataDate,
      bayCarTime: options.dataTime,
      price: options.price
    })
  }
})