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
                wx.setStorageSync('HPcar', res.data.data.weChartID)
                console.log(res.data)
                if (res.data.data.userID) {
                  wx.setStorageSync('jianzb_uid', res.data.data.userID)
                } else {
                  wx.setStorageSync('jianzb_uid', 0)
                }
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
  showError:function (str){
    wx.showToast({
      title: str,
      image: '../../img/x.png'
    })
  },
  countdown: function (that) {
    var second = that.data.second
    if (second == 0) {
      that.setData({
        second: "Time Out..."
      });
      return;
    }
    var time = setTimeout(function () {
      that.setData({
        second: second - 1
      });
      countdown(that);
    }
      , 1000)
  },
  globalData: {
    userInfo: null
  }
})
