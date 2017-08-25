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
var init = 0;  // 用来判断用户是否触发了选择站点的change事件
Page({
  data: {
    price: [],
    price1: [],
    priIndex: [0, 0],
    one: [],
    one1: "",
    two: [],
    two1: "",
    three: [],
    three1: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    indexV: "",
    bayCarTime: "请先选择站点",
    sendSiteId: "",
    dataId: "",
    dayName: "",
    classData: "请先选择站点",
    message: [],
    animationData: {},
    animaData: {}
  },
  animat: function () {  //消失动画封装
    var that = this
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    that.animation = animation
    //这里也是动画，然其高度变为0
    animation.height(0 + 'rpx').step()
  },
  animatXs: function () {  //显示动画封装
    var that = this
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    that.animation = animation
    //这里也是动画，然其高度变为0
    animation.height(1232 + 'rpx').step()
  },
  open: function () {  //选择站点点击事件
    //这里写了一个动画，让其高度变为满屏
    var that = this
    that.animatXs()
    that.setData({
      animationData: that.animation.export()
    })
  },
  //选择站点取消按钮
  quxiao: function () {
    var that = this
    that.animat()
    that.setData({
      animationData: that.animation.export()
      //animationData: animation.export()   在animation前面加了一个this要不然封装会报错
    });
  },


  //选择班次取消按钮
  tapLeft: function () {
    var that = this
    that.animat()
    that.setData({
      animaData: that.animation.export()
    });
  },
  //选择班次确认按钮
  tapRight: function () {
    //一样是动画，级联选择页消失，效果和取消一样
    var that = this
    that.animat()
    that.setData({
      animaData: that.animation.export()
    });
  },
  bindChange: function (e) {
    var val = e.detail.value;
    var t = this.data.values;
    if (val[0] != t[0]) {
      const two = [];
      const three = [];
      val[1] = 0;
      for (let i = 0; i < gatherData[val[0]].data.length; i++) {
        two.push(gatherData[val[0]].data[i].name)
      };
      for (let i = 0; i < gatherData[val[0]].data[val[1]].endSite.length; i++) {
        three.push(gatherData[val[0]].data[val[1]].endSite[i].name)
      };
      this.setData({
        two1: gatherData[val[0]].data[val[1]].name,
        two: two,
        three1: gatherData[val[0]].data[val[1]].endSite[val[2]].name,
        three: three,
        values: val,
        value: [val[0], 0, 0]
      });
    }
    if (val[1] != t[1]) {
      const arr = [];

      for (let i = 0; i < gatherData[val[0]].data[val[1]].endSite.length; i++) {
        arr.push(gatherData[val[0]].data[val[1]].endSite[i].name)
      };
      this.setData({
        two1: this.data.two[val[1]],
        three1: gatherData[val[0]].data[val[1]].endSite[0].name,
        //gatherData[val[1]].endSite[val[2]].name这是之前错误的写法，纠结了半天问题在于之前错误的写法endSite[val[2]]如果用户第一次
        // 选择了出发站中第二个或者更靠后的终点站然后又重新选择了一个出发站，但这个出发站只有一个终点站，但此时endSite[val[2]]保存
        // 的还是上次选择的index顺序，就会出现name    undefined的错误，直接改成endSite[0]后每次重新赋值时都是从第一个开始，
        // 就是index从0开始
        three: arr,
        values: val,
        value: [val[0], val[1], 0]
      });
    };

    if (val[2] != t[2]) {
      console.log('three no');
      this.setData({
        three1: gatherData[val[0]].data[val[1]].endSite[val[2]].name,
        values: val
      })
    };
    this.setData({
      endSiteId: gatherData[val[0]].data[val[1]].endSite[val[2]].id,
      dataId: gatherData[val[0]].data[val[1]].id,
      dayName: gatherData[val[0]].name,
      bayCarTime: gatherData[val[0]].date
    });

    init++;   //如果用户触发了选择站点的change事件init就不是0
  },
  //选择站点确认按钮
  queren: function () {
    var that = this
    //一样是动画，级联选择页消失，效果和取消一样
    that.animat()
    that.setData({
      animationData: that.animation.export()
    });
    //这里写了一个动画，让其高度变为满屏
    var that = this
    that.animatXs()
    that.setData({
      animaData: that.animation.export()
    })
    if (gatherData.length == 1) {   //判断今天是否已全部截单   今天截单后value[0]一直是0   下面的请求参数就会出错this.data.value[0]
      that.setData({
        value: [1, 0, 0]
      })
    }
    if (init == 0) { //判断用户是否触发了选择站点的change事件
      console.log(gatherData[0].data[0].id)
      console.log(gatherData[0].data[0].endSite[0].id)
      that.setData({
        dataId: gatherData[0].data[0].id,
        endSiteId: gatherData[0].data[0].endSite[0].id,
        bayCarTime: gatherData[0].date
      })
    }
    wx.request({
      url: choseClasse,
      data: {
        "startSite": this.data.dataId,
        "endSite": this.data.endSiteId,
        "date": this.data.value[0]    //注意今天全部截单的情况   全部截单后value[0]会一直是0
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Cookie': 'weChartID=d18f941b72fa464fba6f34b29018fd76'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data == null) {
          that.setData({
            classData: res.data.message
          })
        } else {
          var classArr = []
          var messArr = []
          var priceArr = []
          for (var i = 0; i < res.data.data.data.length; i++) {
            classArr.push(res.data.data.data[i].startTime)  //把所有对应的班次加入数组
          }
          for (var i = 0; i < res.data.data.data.length; i++) {
            priceArr.push(res.data.data.data[i].price)  //把所有对应的班次的价格加入数组
          }
          messArr.push(res.data.data.message)    //把用于提醒用户的班次选择字符串加入数组
          console.log(classArr)
          console.log(that.data.indexV)
          that.setData({
            classData: classArr[that.data.indexV],
            message: messArr,
            price1: priceArr
          })
          if (res.data.data.data.length == 1) {
            that.setData({
              price: that.data.price1[0]
            })
          }
        }
      }
    })
  },
  classChange: function (e) {
    var that = this
    var val = e.detail.value
    var t = that.data.priIndex;
    console.log(val)
    console.log(that.data.price1)
    if (val[1] != t[1]) {
      that.setData({
        price: that.data.price1[val[1]],
        indexV: val[1]
      })
    }
    console.log(that.data.price)
    console.log(that.data.indexV)
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
        'Cookie': 'weChartID=d18f941b72fa464fba6f34b29018fd76'
      },
      success: function (res) {
        console.log(res.data.data)
        gatherData = res.data.data

        const one = [];
        const two = [];
        const three = [];
        if (gatherData.length == 1) {
          wx.showModal({
            title: '温馨提示',
            content: '今天所有班次已全部截单，明天的班次仍可下单',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        for (let i = 0; i < gatherData.length; i++) {
          one.push(gatherData[i].name);
        }
        for (let i = 0; i < gatherData[0].data.length; i++) {
          two.push(gatherData[0].data[i].name);    //取到所有初始化的出发站
        }
        for (let i = 0; i < gatherData[0].data[0].endSite.length; i++) {
          three.push(gatherData[0].data[0].endSite[i].name); //取到所有初始化的终点站
        }
        that.setData({
          one: one,
          two: two,
          three: three,
          one1: gatherData[0].name,
          two1: gatherData[0].data[0].name,
          three1: gatherData[0].data[0].endSite[0].name
        })

      }
    })
  }
})


