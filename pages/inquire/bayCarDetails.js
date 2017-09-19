const classDetails = require('../../config').classDetails  //接口js引入
Page({

  /**
   * 页面的初始数据
   */
  data: {
      topShowClass:'',
      startSite: "上海浦东",
      endSite: "安徽",
      orderNumbers: false,
      orderNumber:'',
      orderPay: true,
      driverPhone:true,
      visH:'visH'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.classId){
      var that = this
      wx.request({
        url: classDetails,
        data: {
          "classesId": options.classId, //2215,//10
          "userId": wx.getStorageSync('jianzb_uid')
        },
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'Cookie': 'weChartID=' + wx.getStorageSync('HPcar')
        },
        dataType: "json",
        success: function (res) {
          console.log(res.data)
          if (res.data.status && !res.data.data.isCancel){
            var orderDetail = [];
            //是否发车
            if (res.data.data.started){

              console.log('classesId：' + options.classId)
              console.log('已发车：' + res.data.data.started)
              orderDetail['started'] = true;
              orderDetail['topShowClass'] = "本班次已经出发";
            }else{
              console.log('classesId：' + options.classId)
              console.log('未发车：' + res.data.data.started)
              orderDetail['started'] = false;
              orderDetail['topShowClass'] = "司机已整装待";
            }

            //是否截单
            if (res.data.data.isCutOff) {
              console.log('已截单：' + res.data.data.isCutOff)
              orderDetail['isCutOff'] = !true;
            } else {
              console.log('未截单：' + res.data.data.isCutOff)
              orderDetail['isCutOff'] = !false;
            }

            //是否购票
            if (res.data.data.orderNumber!==null) {
              console.log('已购票：' + res.data.data.orderNumber)
              orderDetail['orderNumbers'] = true;
              orderDetail['orderPay'] = false;
            } else {
              console.log('未购票：' + res.data.data.orderNumber)
              orderDetail['orderNumbers'] = false;
              orderDetail['orderPay'] = true;
              orderDetail['driverPhone'] = !orderDetail['isCutOff'];
              orderDetail['topShowClass'] = "请及时购买车票";
            }

            //宽度判断
            if (res.data.data.sites.length > 5){
              orderDetail['length'] = 4;
            }else{
              orderDetail['length'] = res.data.data.sites.length;
            }



            //添加属性
            var arr = [];
            if (res.data.data.sites){
              
              for(var i=0;i<res.data.data.sites.length;i++){

                arr[i] = res.data.data.sites[i];
                arr[i]['tomew'] = 100 / orderDetail['length'];
                arr[i]['tomew'] = arr[i]['tomew'].toFixed(2)
                if(i>0){
                  arr[i]['tome'] = 'background-position-x: 50%;';
                  arr[i]['tomes'] = 'center';
                }else{
                  arr[i]['tomes'] = 'left';
                }
                if (i == (res.data.data.sites.length-1)){
                  arr[i]['tome'] = 'background-position-x: 100%;';
                  arr[i]['tomes'] = 'right';
                }
                if (orderDetail['started'] && res.data.data.arriveId && res.data.data.sites[i].id == res.data.data.arriveId){
                  arr[i]['visH'] = '';
                  arr[i]['ids'] = 'demo' + res.data.data.arriveId;
                }else{
                  arr[i]['visH'] = 'visH';
                  arr[i]['ids'] = 'demo' + res.data.data.sites[i].id;
                }
                

              }
              
            }else{
              console.log('数组为空');
            }
            console.log(arr);
            that.setData({
              endSite: res.data.data.endSite,
              startSite: res.data.data.startSite,
              carId: res.data.data.busNo + "    " + res.data.data.capacity + "座大巴",
              driver: res.data.data.driver,
              orderNumbers: orderDetail['orderNumbers'],
              orderNumber: res.data.data.orderNumber,
              orderPay: orderDetail['orderPay'],
              isCutOff: orderDetail['isCutOff'],
              driverPhone: orderDetail['driverPhone'],
              classes: arr,
              topShowClass: orderDetail['topShowClass'],
            })            
          }else{
            wx.reLaunch({  //关闭所有页面，打开到应用内的某个页面
              url: '../index/index'
            })
          }
        }
      })

    }



    // var that = this
    // if (!options.startCarStatus?true:false){
    //   that.setData({
    //     topShowClass:"司机已整装待"
    //   })
    //   if (!options.cutOffStatus ? false : true){
    //     that.setData({
    //       topShowClass: "请及时购买车票"
    //     })
    //   }
    // }else{
    //   console.log(options.startCarStatus)      
    //   that.setData({
    //     topShowClass: "本班次已经出发"
    //   })
    // }




  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
})