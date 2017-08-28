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
        price: [],                                                //显示价格
        price1: [],                                              //储存价格
        priIndex: [0, 0],                                    //班次选择时判断是否选择了第二列
        one: [],                                                  //储存今天或者明天用于循环显示
        two: [],                                                  //储存所有发车站点用于循环显示
        two1: "",                                               //储存当前选择的发车站点用于界面显示
        three: [],                                               //储存所有终点站用于循环显示
        three1: '',                                             //储存当前选择的发车站点用于界面显示
        value: [0, 0, 0],                                    //piker组件显示索引
        values: [0, 0, 0],                                  //用于与e.detail.value(piker组件当前选择索引)做比较判断当前改变的是哪一列
        bayCarTime: "请先选择站点",       //储存界面显示乘车时间
        sendSiteId: "",                                    //请求参数终点站id
        dataId: "",                                            //请求参数出发站id
        classData: [],                                       //储存所有班次用于循环显示
        classDataShow: "请先选择站点", //储存当前选择班次用于界面显示
        message: [],                                        //储存”班次选择字“符串    班次选择第一列提示
        animationData: {},                             //站点选择动画
        animaData: {}                                      //班次选择动画
    },
//消失动画封装
    animat: function () {  
        var that = this
        var animation = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease',
        })
        that.animation = animation
        //让其高度变为0
        animation.height(0 + 'rpx').step()
    },
//显示动画封装
    animatXs: function () {  
        var that = this
        var animation = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease',
        })
        that.animation = animation
        //让其高度变为0
        animation.height(1232 + 'rpx').step()
    },
 //选择站点点击事件
    open: function () { 
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
//站点选择change事件
    bindChange: function (e) {
        var val = e.detail.value;       
        var t = this.data.values;
        if (val[0] != t[0]) {       //判断是否改变了第一列
            const two = [];
            const three = [];
            val[1] = 0;
            for (let i = 0; i < gatherData[val[0]].data.length; i++) {
                two.push(gatherData[val[0]].data[i].name)      //将所有出发站放入数组
            };
            for (let i = 0; i < gatherData[val[0]].data[val[1]].endSite.length; i++) {
                three.push(gatherData[val[0]].data[val[1]].endSite[i].name)     //将所有出终点站放入数组
            };
            this.setData({
                two1: gatherData[val[0]].data[val[1]].name,              //界面上显示的用户当前选择的出发站
                two: two,
                three1: gatherData[val[0]].data[val[1]].endSite[val[2]].name,           //界面上显示的用户当前选择的终点站
                three: three,
                values: val,
                value: [val[0], 0, 0]
            });
        }
        if (val[1] != t[1]) {       //判断是否改变了第二列
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
        if (val[2] != t[2]) {           //判断是否改变了第三列
            console.log('three no');
            this.setData({
                three1: gatherData[val[0]].data[val[1]].endSite[val[2]].name,
                values: val
            })
        };
        //当触发change事件时记录当前选择的出发站和终点站的id以及乘车时间
        this.setData({
            endSiteId: gatherData[val[0]].data[val[1]].endSite[val[2]].id,
            dataId: gatherData[val[0]].data[val[1]].id,
            bayCarTime: gatherData[val[0]].date
        });

        init++;   //如果用户触发了选择站点的change事件init就不是0   用于解决用户不做任何选择时界面显示的bug
    },
    //选择站点确认按钮
    queren: function () {
        //选择站点页面隐藏
        var that = this
        that.animat()
        that.setData({
            animationData: that.animation.export()
        });
        //选择班次页面显示
        that.animatXs()
        that.setData({
            animaData: that.animation.export()
        })
        if (gatherData.length == 1) {   //判断今天是否已全部截单   今天截单后value[0]一直是0   下面的请求参数就会出错this.data.value[0]
            that.setData({
                value: [1, 0, 0]
            })
        }
        if (init == 0) { //判断用户是否触发了选择站点的change事件   用于解决用户不做任何选择时界面显示的bug
            that.setData({
                dataId: gatherData[0].data[0].id,
                endSiteId: gatherData[0].data[0].endSite[0].id,
                bayCarTime: gatherData[0].date
            })
        }
        //获取乘车班次
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
                var classArr = []
                var messArr = []
                var priceArr = []
                for (var i = 0; i < res.data.data.data.length; i++) {
                    classArr.push(res.data.data.data[i].startTime)  //把所有对应的班次加入数组
                }
                for (var i = 0; i < res.data.data.data.length; i++) {
                    priceArr.push(res.data.data.data[i].price)  //把所有对应的班次的价格加入数组
                }
                messArr.push(res.data.data.message)    //把用于提醒用户的班次选择字符串加入数组(班次选择)
                that.setData({
                    classData: classArr,
                    message: messArr,
                    price1: priceArr
                })
                if (res.data.data.data.length == 1) {   //判断班次数量
                    that.setData({
                        price: that.data.price1[0],
                        classDataShow: that.data.classData[0]
                    })
                }
             }
        })
    },
    //班次选择change事件
    classChange: function (e) {
        var that = this
        var val = e.detail.value
        var t = that.data.priIndex;
        if (val[1] != t[1]) {
            that.setData({
                price: that.data.price1[val[1]],
                classDataShow: that.data.classData[val[1]]
            })
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
                'Cookie': 'weChartID=d18f941b72fa464fba6f34b29018fd76'
            },
            success: function (res) {
                console.log(res.data.data)
                gatherData = res.data.data

                const one = [];
                const two = [];
                const three = [];
                if (gatherData.length == 1) {      //今天全部截单给用户提示
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
                    two1: gatherData[0].data[0].name,
                    three1: gatherData[0].data[0].endSite[0].name
                })

            }
        })
    }
})


