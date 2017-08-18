// pages/inquire/bayCarDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      bayCarDetails_left: ["上海浦东", "香港", "澳大利亚", "安徽"],
      bayCarDetails_leftIndex: 0,
      bayCarDetails_right: ["上海浦东", "香港", "澳大利亚", "安徽"],
      bayCarDetails_rightIndex: 1,
      carId:"浙F 12345    42座大巴",
      driver:"王师傅",
      topShowClass:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (!options.startCarStatus?true:false){
      that.setData({
        topShowClass:"司机已整装待"
      })
      if (!options.cutOffStatus ? false : true){
        that.setData({
          topShowClass: "请及时购买车票"
        })
      }
    }else{
      console.log(options.startCarStatus)      
      that.setData({
        topShowClass: "本班次已经出发"
      })
    }
  }
})