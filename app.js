const CodeToOpenId = require('./config').CodeToOpenId
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (cod) {
          if (cod.code) {
            wx.request({
              url: CodeToOpenId,
              data: {
                code: cod.code
              },
              success: function (res) {
                console.log(res.data)
                wx.setStorageSync('jianzb_id', res.data.weChartId)
               // console.log(res.data.Data.Oper)
                // if (res.data.Data.Oper) {
                //   wx.setStorageSync('jianzb_uid', res.data.Data.Oper.Id)
                // } else {
                //   wx.setStorageSync('jianzb_uid', 0)
                // }
              },
              fail: function (res) {
                console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
                wx.showToast({
                  title: '登陆超时,正在重新登陆',
                  icon: "loading",
                  duration: 8000
                })
                wx.redirectTo({
                  url: 'index?fail=1'
                })
              }
            })
          }
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    price:"387"
  }
})
