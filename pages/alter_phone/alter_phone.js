const SpanCode = require('../../config').SpanCode;
const alertPhone = require('../../config').alertPhone;
var app = getApp()
Page({
  data: {
    second:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  bindform:function(e){
    console.log(e)
    console.log(e.currentTarget.dataset)
    var that = this;
    if (e.detail.value.phone){
      if (e.detail.value.code){
        wx.request({
          url: alertPhone,
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
                url: '../index/index'
              })
            } else {
              wx.showToast({
                title: res.data.message,
                image: '../../img/x.png'
              })
            }
          }
        })
      }else{
        //发送验证码
        wx.request({
          url: SpanCode,
          data: {
            "phoneNumber": e.detail.value.phone,
            "type": 5
          },
          method: "POST",
          header: {
            'content-type': 'application/json',
            'Cookie': 'weChartID=' + wx.getStorageSync('HPcar')
          },
          success: function (res) {
            if (res.data.status){
              that.setData({
                second: false
              })
            }else{
              wx.showToast({
                title: res.data.message,
                image: '../../img/x.png'
              })
            }
          }
        })
      }

    }else{
     
      wx.showToast({
        title: '请填写手机号！',
        image: '../../img/x.png'
      })
    }
    //console.log('第一个input里面的内容', e.detail.value.input,'第二个input里面的内容', e.detail.value.input1)
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