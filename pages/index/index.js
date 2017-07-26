//index.js
//获取应用实例

var app = getApp()
//var common = require('../data/data.js')
Page({
  data : {
    date:"点击以选择",
    accounts: ["微信支付", "财付通支付", "支付宝支付"],
    accountIndex: 0,
    city_car_left: app.globalData.city_car_left,
    city_car_leftIndex: app.globalData.city_car_leftIndex,
    city_car_right: app.globalData.city_car_right,
    city_car_rightIndex: app.globalData.city_car_rightIndex,
    price: app.globalData.price
  },

  
  //事件处理函数
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindCitycarChange_left: function (e) {
    this.setData({
      city_car_leftIndex: e.detail.value
    })
  }, 
  bindCitycarChange_right: function (e) {
    this.setData({
      city_car_rightIndex: e.detail.value
    })
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
    console.log(e.detail)
  },


  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})

module.exports = {
  city_car_left: city_car_left,
  city_car_leftIndex: city_car_leftIndex,
  city_car_right: city_car_right,
  city_car_rightIndex: city_car_rightIndex
};
