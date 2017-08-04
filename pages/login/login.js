// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide:false,
    phone:"",
    pass:""
  },
  clickTap:function(){
    this.setData({
      hide:true
    })
  },
  loginBlur1: function (res) {
      this.data.phone = res.detail.value
  },
  loginBlur2: function (res) {
      this.data.pass = res.detail.value
  },
  loginNavto: function () {
      if (this.data.phone === "" || this.data.pass === "") {
          wx.showModal({
              title: '提示',
              content: '手机号或者密码不能为空'
          })
      }else{
        wx.redirectTo({
              url: '../index/index'
          })
      }  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that =this
      wx.getStorage({
          key: 'info',
          success: function (res) {
              console.log(res.data)
              that.setData({
                  pass: res.data.passWord,
                  phone: res.data.phoneNumber
                })
          }
      })
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