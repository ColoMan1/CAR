// pages/alter_password/new_password.js
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
  navTo_newpass_success: function () {
     wx.navigateTo({
        url: 'new_password_success',
     })
  }
})