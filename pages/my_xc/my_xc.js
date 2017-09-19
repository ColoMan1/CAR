const queryTrip = require('../../config').queryTrip  //分布查询我的预约和行程

Page({

     /**
      * 页面的初始数据
      */
     data: {
          topShow: true,   //数据没加载完成前block的显示判断
          classes: [],     //这里数据用数组保存
          showIndex: 0,    //数据分页
          bottomShow: true, //上拉加载时显示正在加载
          bottomShowElse: false
     },
     requestShu: function (showIndex) {
          var that = this
          wx.request({
               url: queryTrip,
               data: {
                    "page": 0,		  //第几页从0开始
                    "pageSize": 5,                  //每页几个
                    "finishStatus": 1               //1表示我的行程0表示我的预约
               },
               method: 'POST',
               header: {
                    'content-type': 'application/json',
                    //    'Cookie': 'weChartID=' + wx.getStorageSync('HPcar')
                    'Cookie': 'weChartID=147197f1f71240d098daa61ec5d8dc29'
               },
               dataType: "json",
               success: function (res) {
                    console.log(res.data)
                    if (res.data.data.pageDate.length > 0) {  //判断有无数据
                         for (var i in res.data.data.pageDate) {
                              res.data.data.pageDate[i].carTime = res.data.data.pageDate[i].cutOffTime.substring(11, 16) //自定义一个carTime值来接收截取后的时间值
                              res.data.data.pageDate[i].startTime = res.data.data.pageDate[i].startCarTime.substring(11, 16) //自定义一个startTime值来接收发车截取后的时间值
                         }
                         that.setData({
                              topShow: false,
                              //classes: that.data.classes.concat(res.data.data.pageDate),//让后面刷新的数据用数组concat方法加在原有数据的末尾
                              classes: res.data.data.pageDate,//让后面刷新的数据用数组concat方法加在原有数据的末尾
                              // showIndex: that.data.showIndex + 1,  //请求页数每次加1
                              bottomShow: false
                         })
                    } else {
                         that.setData({
                              bottomShowElse: true
                         })
                         var aba = setTimeout(function () {
                              that.setData({
                                   bottomShowElse: false
                              })
                         }, 2000)
                    }
               }
          })
     },
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          this.requestShu()
     }
})