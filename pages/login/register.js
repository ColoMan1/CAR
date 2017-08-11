// pages/login/register.js
const SpanCode = require('../../config').SpanCode
var setTime = ''  //定时器变量定义
var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hide:false,  //底部协议点击icon是否显示
    passWord:"",    //密码
    phoneNumber:"",  //手机号码
    code:"获取验证码",
    keyShow: true,  //切换显示button里面的text内容
    code_time:12,   //验证码发送秒数
    disabTf:false  //按钮是否禁用
  },
  
  time1() { //定时器递减函数
    var that1 = this
    if (that1.data.code_time <= 10 && that1.data.code_time >= 1){ //判断倒计时是个位数时在前面补加一个0
      that1.setData({
        code_time: '0'+(that1.data.code_time - 1)   //小括号里面的内容或者运算会被看做是一个整体，里面是运算的话解析完就直接是运算结果
      })
    } else if (that1.data.code_time == 0) { //判断倒计时为0
      that1.setData({
        keyShow: true,  //切换显示button里面的text内容
        code: "重新发送",  //将获取验证码  改为  重新发送
        disabTf: false,   // 按钮禁用  改为  按钮可点击
        code_time: that1.data.code_time - 1  //倒计时
      })
      clearInterval(this.setTime)
    } else if (!that1.data.code_time == 0) {  //判断倒计时不为0
      that1.setData({
        disabTf: true, // 按钮禁用  防止用户重复点击发送验证码
        code_time: that1.data.code_time - 1  //倒计时
      })
    }
    // else {
    //   that1.setData({
    //     code_time: that1.data.code_time - 1
    //   })
    // }
    return
  },
  codeTime:function(){  //发送验证码按钮点击事件
    var that = this
    if (this.data.phoneNumber === "") { //验证手机号码是否为空
      wx.showToast({
        title: '请填写手机号码',
        image:'../../img/叉.png'
      })
    } else if (!myreg.test(this.data.phoneNumber)){  //利用正则验证码手机号码是否规范
      console.log(this.data.phoneNumber)
      wx.showToast({
        title: '请填写正确的手机号码',
        image: '../../img/叉.png'
      })
    }else{
      this.setData({
        keyShow: false, //切换显示button里面的text内容
        code_time: 12   //重置倒计时
      })
      this.setTime = setInterval(function () {  //倒计时定时器
        that.time1()//这里必须要把递减的逻辑写成一个函数封装出去  不能直接用this.setData
      }, 1000)
    }
    wx.request({
      url: SpanCode,
      data: {
        Type: 1,
        PhoneNumber: this.data.phoneNumber
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  clickTap1:function(){ //底部协议点击事件
    this.setData({
        hide:true
    })
  }, 
    inputBlurPhone:function(res){  //手机号码录入
        this.data.phoneNumber = res.detail.value
    },
    inputBlurPass: function (res) { //密码录入
        this.data.passWord = res.detail.value
    },
    registerNavto:function(){ //点击注册按钮事件
        if (this.data.phoneNumber === "" || this.data.passWord === "") {
            wx.showModal({
                title: '提示',
                content: '手机号或者密码不能为空'
            })
        } else if( !this.data.hide ){
            wx.showModal({
                title: '提示',
                content: '《软件服务及订票协议》'
            })
        }else {
            wx.setStorage({  //将注册的手机号和密码储存起来
                key: "info",
                data:{
                    passWord: this.data.passWord,
                    phoneNumber: this.data.phoneNumber
                },
                success:function(){ //储存成功后跳转到登录页面
                    wx.navigateTo({
                        url: 'login'
                    })
                }
            })
        }  
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     phoneNumber:18755696101
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