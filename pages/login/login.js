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
  loginNavto: function () {  //验证
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
      wx.getStorage({  //取出存储的手机号和密码
          key: 'info',
          success: function (res) {
              console.log(res.data)
              that.setData({
                  pass: res.data.passWord,
                  phone: res.data.phoneNumber
                })
          }
      })
  }
})