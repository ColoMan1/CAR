//index.js
const choseSite = require('../../config').choseSite  //选择站点
const choseClasse = require('../../config').choseClasse  //选择下单的班次
const inquireClasses = require('../../config').inquireClasses  //查询已发车班次
const classDetails = require('../../config').classDetails  //班次详情
const createOrder = require('../../config').createOrder  //生成订单路线
const carPay = require('../../config').carPay  //微信调用付款
const queryTrip = require('../../config').queryTrip  //分布查询我的预约和行程
var app = getApp()
var gatherData = '';
Page({
  data : {
    date:"点击选择",
    LeftArray: [['今天','明天'],[]],
    LeftIndex: [0,0],
    city_car_right: ["上海浦东", "香港", "澳大利亚", "安徽"],
    city_car_rightIndex: 1,
    price: app.globalData.price,
    condition:false,
    one: [],
    one1: "",
    two: [],
    two1: "",
    three: [],
    three1: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
  },
  //事件处理函数
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
    //这里写了一个动画，让其高度变为满屏
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.height(1232 + 'rpx').step()
    this.setData({
      animationData: animation.export()
    })

  },
  //取消按钮
  quxiao: function () {
    　　　　//这里也是动画，然其高度变为0
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation
    animation.height(0 + 'rpx').step()
    this.setData({
      animationData: animation.export()
    });
    　　　　//取消不传值，这里就把jieguo 的值赋值为{}
    this.setData({
      jieguo: {}
    });
    console.log(this.data.jieguo);
  },
  //确认按钮
  queren: function () {
    　　　//一样是动画，级联选择页消失，效果和取消一样
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.height(0 + 'rpx').step()
    this.setData({
      animationData: animation.export()
    });
  },
  bindChange:function(e){
    var val = e.detail.value
    var t = this.data.values;
    console.log(gatherData)

    if (val[1] != t[1]) {
      console.log('two no');
      const three = [];

      for (let i = 0; i < gatherData[val[1]].endSite.length; i++) {
        three.push(gatherData[val[1]].endSite[i].name)
      }
      console.log(val[1])
      this.setData({
        two1: this.data.two[val[1]],
        three1: gatherData[val[1]].endSite[val[2]].name,
        three: three,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('three no');
      this.setData({
        three1: this.data.three[val[2]],
        values: val
      })
      return;
    }
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: choseSite,
      data: {

      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Cookie':'weChartID=d18f941b72fa464fba6f34b29018fd76'
      },
      success: function (res) {
        console.log(res.data.data.tomorrow)  
        gatherData = res.data.data.tomorrow

        const one = [];
        const two = [];
        const three = [];

        for (let i = 0; i < gatherData.length; i++) {
          two.push(gatherData[i].name);
        }
        for (let i = 0; i < gatherData[0].endSite.length; i++) {
          three.push(gatherData[0].endSite[i].name);
        }
        console.log(three)
        that.setData({
          one:one,
          two:two,
          three:three,
          one1: gatherData[0].name,
          two1: gatherData[0].name,
          three1: gatherData[0].endSite[0].name   //每列的第一个值
        })
      }
    })
  }
})

 
