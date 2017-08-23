// pages/login/login.js
var app = getApp()
const Login = require('../../config').Login  //接口js引入
var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; //手机号码验证正则
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide: false,     //底部icon协议显示隐藏
    phone:"",        //取注册完手机号码
    pass: "",        //取注册完手机密码
    userInfo:"",      //用户登录授权
    HPcar_id:""
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
  var that = this
    wx.request({
      url: Login,
      data: {
        username: that.data.phone,
        password: that.data.pass
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        weChartID: that.data.HPcar_id
      },
      success: function (res) {
        console.log(res)
      },
      fail:function(res){
        console.log(this.data.phone)
        console.log(res)
      }
    })
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
   // app.getUserInfo()
      var that =this
      // wx.getStorage({  //取出存储的手机号和密码
      //     key: 'HPcar_id',
      //     success: function (res) {
      //       console.log(res.data)
      //       that.setData({
      //         pass: res.data.passWord,
      //         phone: res.data.phoneNumber
      //       })
      //     }
      // }),

      //var weChartID = wx.getStorageSync('HPcar_id')
    // wx.getStorage({
    //   key: 'HPcar',
    //   success: function (res) {
    //     that.setData({
    //       HPcar_id: res.data
    //     })
    //   },
    //   fail:function(res) {
    //     console.log(res)
    //   }
    // })
  }
})