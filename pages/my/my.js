const userDetail = require('../../config').userDetail  //接口js引入
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'匿名',
    realname:'匿名',
    logoUrl:'',
    auditFlag:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var auditFlagStr = ['未认证', '审认证','已认证'];
    var that = this
    console.log(wx.getStorageSync('jianzb_uid'))
    if (wx.getStorageSync('jianzb_uid')){
      wx.request({
        url: userDetail,
        data: {
          "userID": wx.getStorageSync('jianzb_uid')
        },
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'Cookie': 'weChartID=' + wx.getStorageSync('HPcar')
        },
        dataType: "json",
        success: function (res) {
          //console.log(res.data.data.realName)
          that.setData({
            username: res.data.data.username,
            realName: res.data.data.realName,
            logoUrl: res.data.data.logoUrl,
            auditFlag: auditFlagStr[res.data.data.auditFlag]
          })

        }
      })
    }else{
      wx.reLaunch({  //关闭所有页面，打开到应用内的某个页面
        url: '../login/login'
      })
    }
    

  }
})