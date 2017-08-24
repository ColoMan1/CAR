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
    data: {
        price: app.globalData.price,
        one: [],
        one1: "",
        two: [],
        two1: "",
        three: [],
        three1: '',
        value: [0, 0, 0],
        values: [0, 0, 0],
        bayCarTime: "请先选择班次",
        sendSiteId:"",
        dataId:"",
        dayName:""
    },
    //事件处理函数
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
        console.log(this.data.endSiteId)
        console.log(this.data.dataId)
        console.log(this.data.dayName)
    },
    bindChange: function (e) {
        var val = e.detail.value
        var t = this.data.values;
        // this.setData({
        //     bayCarTime: gatherData[val[0]].data[val[1]].createTime
        // })
        console.log(val)
        if (val[0] != t[0]) {
            const two = [];
            const three = [];
            val[1] = 0;
            for (let i = 0; i < gatherData[val[0]].data.length; i++) {
                two.push(gatherData[val[0]].data[i].name)
            }
            for (let i = 0; i < gatherData[val[0]].data[val[1]].endSite.length; i++) {
                three.push(gatherData[val[0]].data[val[1]].endSite[i].name)
            }
            this.setData({
                two1: gatherData[val[0]].data[val[1]].name,
                two: two,
                three1: gatherData[val[0]].data[val[1]].endSite[val[2]].name,
                three: three,
                values: val,
                value: [val[0], 0, 0]
            })
        }
        if (val[1] != t[1]) {
            const arr = [];

            for (let i = 0; i < gatherData[val[0]].data[val[1]].endSite.length; i++) {
                arr.push(gatherData[val[0]].data[val[1]].endSite[i].name)
            }
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
            })
        }

        if (val[2] != t[2]) {
            console.log('three no');
            this.setData({
                three1: gatherData[val[0]].data[val[1]].endSite[val[2]].name,
                values: val
            })
        }
        console.log(gatherData[val[0]].data[val[1]].endSite[val[2]].id)
        console.log(gatherData[val[0]].data[val[1]].id)
        console.log(gatherData[val[0]].name)
        this.setData({
            endSiteId: gatherData[val[0]].data[val[1]].endSite[val[2]].id,
            dataId: gatherData[val[0]].data[val[1]].id,
            dayName: gatherData[val[0]].name
        })
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


