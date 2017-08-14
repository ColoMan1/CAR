// pages/login/login.js
var app = getApp()
var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; //手机号码验证正则
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide: false,     //底部icon协议显示隐藏
    phone:"",        //取注册完手机号码
    pass: "",        //取注册完手机密码
    userInfo:""      //用户登录授权
  },
  clickTap: function () {  //底部icon协议点击显示隐藏
    this.setData({
      hide:true
    })
  },
  loginBlur1: function (res) {  //手机号码input改变事件
      this.data.phone = res.detail.value
  },
  loginBlur2: function (res) {  //密码input改变事件
      this.data.pass = res.detail.value
  },
  loginNavto: function () {  //点击登录按钮验证
      if (this.data.phone === "" || this.data.pass === "") {
          wx.showModal({
              title: '提示',
              content: '手机号或者密码不能为空'
          })
      } else if ( !myreg.test(this.data.phone) ){
        wx.showToast({
          title: '请填写正确的手机号码',
          image: '../../img/x.png'
        })
      } else{
        wx.reLaunch({  //关闭所有页面，打开到应用内的某个页面
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
      }),
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo
        })
      })
  }
})