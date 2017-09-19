const SpanCode = require('../../config').SpanCode;
const alertPassword = require('../../config').alertPassword;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindform: function (e){
    var that = this;
    if (e.detail.value.phone) {
      if (e.detail.value.code) {
        wx.request({
          url: alertPassword,
          data: {
            "phoneNumber": e.detail.value.phone,
            "validate": e.detail.value.code
          },
          method: "POST",
          header: {
            'content-type': 'application/json',
            'Cookie': 'weChartID=' + wx.getStorageSync('HPcar')
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.status) {
              wx.reLaunch({
                url: '../alter_password/new_password'
              })
            } else {
              wx.showToast({
                title: res.data.message,
                image: '../../img/x.png'
              })
            }
          }
        })
      } else {
        //发送验证码
        wx.request({
          url: SpanCode,
          data: {
            "phoneNumber": e.detail.value.phone,
            "type": 3
          },
          method: "POST",
          header: {
            'content-type': 'application/json',
            'Cookie': 'weChartID=' + wx.getStorageSync('HPcar')
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.status) {
              that.setData({
                second:false
              })

            } else {
              wx.showToast({
                title: res.data.message,
                image: '../../img/x.png'
              })
            }
          }
        })
      }

    } else {

      wx.showToast({
        title: '请填写手机号！',
        image: '../../img/x.png'
      })
    }
  }
})