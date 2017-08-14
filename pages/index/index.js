//index.js
//获取应用实例

var app = getApp()
//var common = require('../data/data.js')
Page({
  data : {
    date:"点击选择",
    accounts: ["微信支付", "财付通支付", "支付宝支付"],
    accountIndex: 0,
    city_car_left: ["上海浦东", "香港", "澳大利亚", "安徽"],
    city_car_leftIndex: 0,
    city_car_right: ["上海浦东", "香港", "澳大利亚", "安徽"],
    city_car_rightIndex: 1,
    price: app.globalData.price,
    time:"点击选择时间"
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
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  onLoad: function () {

  }
})

 
