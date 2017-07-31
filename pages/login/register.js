// pages/login/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  hide:false,
  passWord:"",
  phoneNumber:""
  },
    clickTap1:function(){
        this.setData({
            hide:true
        })
  }, 
    inputBlurPhone:function(res){
        this.data.phoneNumber = res.detail.value
    },
    inputBlurPass: function (res) {
        this.data.passWord = res.detail.value
    },
    registerNavto:function(){
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
            wx.setStorage({
                key: "info",
                data:{
                    passWord: this.data.passWord,
                    phoneNumber: this.data.phoneNumber
                },
                success:function(){
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