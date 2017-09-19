const inquireClasses = require('../../config').inquireClasses  //接口js引入
Page({
     /**
      * 页面的初始数据
      */
     data: {
          navbar: ["全部班次", "已发车", "未发车"],
          currentTab: 0,   //顶部tab切换索引
          topShow: true,   //数据没加载完成前block的显示判断
          classes: [],     //这里数据用数组保存
          classesYfc: [],     //这里数据用数组保存
          classesWfc: [],     //这里数据用数组保存
          showIndexQ: 0,    //数据分页
          showIndexF: 0,    //数据分页
          showIndexW: 0,    //数据分页
          bottomShow: true, //上拉加载时显示正在加载
          bottomShowElse: false, //上拉加载没有数据时的显示
          blockShow: true //数据为空时判断显示
     },
     tapFn:function(){
          if (this.data.currentTab == 0) {
               this.requestShu(this.data.showIndexQ)//对请求数据函数进行调用               
          } else if (this.data.currentTab == 1) {
               this.requestShu(this.data.showIndexF)
          } else {
               this.requestShu(this.data.showIndexW)
          }
     },
     //顶部tab点击切换
     navbarTap: function (e) {
          this.setData({
               currentTab: e.target.dataset.idx
          })
          this.tapFn()
     },
     //对请求数据函数进行封装
     requestShu: function (showIndex) {
          var that = this
          wx.request({
               url: inquireClasses,
               data: {
                    "page": showIndex,
                    "pageSize": 5,
                    "type": that.data.currentTab        //0所有班次   1已发车    2未发车的班次
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
                    wx.stopPullDownRefresh() //数据加载完成停止下拉刷新动作
                   // that.data.classes.length = 0;   //清空储存班次的数组   要不然下面的concat方法会一直往数组里叠加不同请求的班次
                    if (that.data.currentTab == 0){    //全部班次
                         if (res.data.data.pageDate.length > 0) {  //判断有无数据
                              for (var i in res.data.data.pageDate) {
                                   res.data.data.pageDate[i].carTime = res.data.data.pageDate[i].cutOffTime.substring(11, 16) //自定义一个carTime值来接收截取后的时间值
                                   res.data.data.pageDate[i].startTime = res.data.data.pageDate[i].startCarTime.substring(11, 16) //自定义一个startTime值来接收发车截取后的时间值
                              }
                              that.setData({
                                   topShow: false,
                                   classes: that.data.classes.concat(res.data.data.pageDate),//让后面刷新的数据用数组concat方法加在原有数据的末尾
                                   //classes:res.data.data.pageDate,
                                   showIndexQ: that.data.showIndexQ + 1,  //请求页数每次加1
                                   bottomShow: false,
                                   blockShow: true
                              })
                              console.log(res.data.data.pageDate.length)
                         } else if (that.data.showIndexQ >= 1) {  //index每拉一次都会++  这里避免出现下一页没有数据的话上一页的数据也不会显示
                              for (var i in res.data.data.pageDate) {
                                   res.data.data.pageDate[i].carTime = res.data.data.pageDate[i].cutOffTime.substring(11, 16) //自定义一个carTime值来接收截取后的时间值
                                   res.data.data.pageDate[i].startTime = res.data.data.pageDate[i].startCarTime.substring(11, 16) //自定义一个startTime值来接收发车截取后的时间值
                              }
                              that.setData({
                                   topShow: false,
                                   classes: that.data.classes.concat(res.data.data.pageDate),//让后面刷新的数据用数组concat方法加在原有数据的末尾
                                   //classes:res.data.data.pageDate,
                                   showIndexQ: that.data.showIndexQ + 1,  //请求页数每次加1
                                   bottomShow: false,
                                   blockShow: true
                              })
                         }else {
                              that.setData({
                                   bottomShowElse: true,
                                   blockShow: false
                              })
                              var aba = setTimeout(function () {   //让暂无数据2秒后消失
                                   that.setData({
                                        bottomShowElse: false
                                   })
                              }, 5000)
                         }
                    };
                    if (that.data.currentTab == 1) {    //已发车
                         if (res.data.data.pageDate.length > 0) {  //判断有无数据
                              for (var i in res.data.data.pageDate) {
                                   res.data.data.pageDate[i].carTime = res.data.data.pageDate[i].cutOffTime.substring(11, 16) //自定义一个carTime值来接收截取后的时间值
                                   res.data.data.pageDate[i].startTime = res.data.data.pageDate[i].startCarTime.substring(11, 16) //自定义一个startTime值来接收发车截取后的时间值
                              }
                              that.setData({
                                   topShow: false,
                                   classesYfc: that.data.classesYfc.concat(res.data.data.pageDate),//让后面刷新的数据用数组concat方法加在原有数据的末尾
                                   //classes:res.data.data.pageDate,
                                   showIndexF: that.data.showIndexF + 1,  //请求页数每次加1
                                   bottomShow: false,
                                   blockShow: true
                              })
                              console.log(res.data.data.pageDate.length)
                         } else if (that.data.showIndexF >= 1) {  //index每拉一次都会++  这里避免出现下一页没有数据的话上一页的数据也不会显示
                              for (var i in res.data.data.pageDate) {
                                   res.data.data.pageDate[i].carTime = res.data.data.pageDate[i].cutOffTime.substring(11, 16) //自定义一个carTime值来接收截取后的时间值
                                   res.data.data.pageDate[i].startTime = res.data.data.pageDate[i].startCarTime.substring(11, 16) //自定义一个startTime值来接收发车截取后的时间值
                              }
                              that.setData({
                                   topShow: false,
                                   classesYfc: that.data.classesYfc.concat(res.data.data.pageDate),//让后面刷新的数据用数组concat方法加在原有数据的末尾
                                   //classes:res.data.data.pageDate,
                                   showIndexF: that.data.showIndexF + 1,  //请求页数每次加1
                                   bottomShow: false,
                                   blockShow: true
                              })
                         } else {
                              that.setData({
                                   bottomShowElse: true,
                                   blockShow: false
                              })
                              var aba = setTimeout(function () {   //让暂无数据2秒后消失
                                   that.setData({
                                        bottomShowElse: false
                                   })
                              }, 3000)
                         }
                    };
                    if (that.data.currentTab == 2) {    //未发车
                         if (res.data.data.pageDate.length > 0) {  //判断有无数据
                              for (var i in res.data.data.pageDate) {
                                   res.data.data.pageDate[i].carTime = res.data.data.pageDate[i].cutOffTime.substring(11, 16) //自定义一个carTime值来接收截取后的时间值
                                   res.data.data.pageDate[i].startTime = res.data.data.pageDate[i].startCarTime.substring(11, 16) //自定义一个startTime值来接收发车截取后的时间值
                              }
                              that.setData({
                                   topShow: false,
                                   classesWfc: that.data.classesWfc.concat(res.data.data.pageDate),//让后面刷新的数据用数组concat方法加在原有数据的末尾
                                   //classes:res.data.data.pageDate,
                                   showIndexW: that.data.showIndexW + 1,  //请求页数每次加1
                                   bottomShow: false,
                                   blockShow: true
                              })
                              console.log(res.data.data.pageDate.length)
                         } else if (that.data.showIndexW >= 1) {  //index每拉一次都会++  这里避免出现下一页没有数据的话上一页的数据也不会显示
                              for (var i in res.data.data.pageDate) {
                                   res.data.data.pageDate[i].carTime = res.data.data.pageDate[i].cutOffTime.substring(11, 16) //自定义一个carTime值来接收截取后的时间值
                                   res.data.data.pageDate[i].startTime = res.data.data.pageDate[i].startCarTime.substring(11, 16) //自定义一个startTime值来接收发车截取后的时间值
                              }
                              that.setData({
                                   topShow: false,
                                   classesWfc: that.data.classesWfc.concat(res.data.data.pageDate),//让后面刷新的数据用数组concat方法加在原有数据的末尾
                                   //classes:res.data.data.pageDate,
                                   showIndexW: that.data.showIndexW + 1,  //请求页数每次加1
                                   bottomShow: false,
                                   blockShow: true
                              })
                         }else {
                              that.setData({
                                   bottomShowElse: true,
                                   blockShow: false
                              })
                              var aba = setTimeout(function () {   //让暂无数据2秒后消失
                                   that.setData({
                                        bottomShowElse: false
                                   })
                              }, 3000)
                         }
                    };
               }
          })
     },
     //scroll-view滚动条触底事件
     scrolltolower: function (e) {
          //this.requestShu(this.data.showIndex)//对请求数据函数进行调用
          console.log("触发scroll")
          this.tapFn()
     },
     //页面上拉触底事件的处理函数
     onReachBottom: function (e) {
          //this.requestShu(this.data.showIndex)//对请求数据函数进行调用
          console.log("触发页面上拉触底事件")
     },
     //下拉监听事件
     onPullDownRefresh: function (e) {
          console.log("触发下拉监听事件")
          this.tapFn()
     },
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          this.requestShu(this.data.showIndexQ)//对请求数据函数进行调用
     }
})