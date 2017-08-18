//index.js
const choseSite = require('../../config').choseSite  //接口js引入
const choseClasse = require('../../config').choseClasse  //接口js引入
const inquireClasses = require('../../config').inquireClasses  //接口js引入
const classDetails = require('../../config').classDetails  //接口js引入
const createOrder = require('../../config').createOrder  //接口js引入
const carPay = require('../../config').carPay  //接口js引入
const queryTrip = require('../../config').queryTrip  //接口js引入
var app = getApp()
//var common = require('../data/data.js')
Page({
  data : {
    date:"点击选择",
    city_car_left: ["上海浦东", "香港", "澳大利亚", "安徽"],
    city_car_leftIndex: 0,
    city_car_right: ["上海浦东", "香港", "澳大利亚", "安徽"],
    city_car_rightIndex: 1,
    price: app.globalData.price,
    multiArray: [['上海浦东', '浙江平湖'], ['今天', '明天'], ['杭州滨江', '浙江温州','江南皮革厂']],
    multiIndex: [0, 0, 0]
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['今天', '明天'];
            data.multiArray[2] = ['杭州滨江', '浙江温州', '江南皮革厂'];
            break;
          case 1:
            data.multiArray[1] = ['今天', '明天'];
            data.multiArray[2] = ['浙江台州', '安徽黄山'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['杭州滨江', '浙江温州', '江南皮革厂', '安徽皮革厂', '四川皮革厂'];
                break;
              case 1:
                data.multiArray[2] = ['湖北皮革厂', '浙江温州', '江南皮革厂', '安徽皮革厂', '四川皮革厂'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['云南丽江', '浙江温州', '江南皮革厂', '安徽皮革厂', '四川皮革厂'];
                break;
              case 1:
                data.multiArray[2] = ['香港', '浙江温州', '江南皮革厂', '安徽皮革厂', '四川皮革厂'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
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
  onLoad: function () {
    var that = this
    var value1 = wx.getStorageSync('HPcar')
    
    wx.request({
      url: queryTrip,
      data: {
        "page": 0,		  //第几页从0开始
        "pageSize": 5,                  //每页几个
        "finishStatus": 1                //1表示我的行程0表示我的预约
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Cookie':'weChartID=dfa42e18f3174c27a3986f964afe4c14'
      },
      success: function (res) {
        console.log(res.data)
      },
      fail:function(res) { 
        console.log(res)
      }
    })
  }
})

 
