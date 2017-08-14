// pages/test/test.js
var wxbarcode = require('../../utils/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '1234567991234567'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.code)
    if (options.code){
      that.setData({
        code: options.code
      })
      wxbarcode.barcode('barcode', options.code ? options.code : that.data.code, 680, 200);
      wxbarcode.qrcode('qrcode', options.code ? options.code : that.data.code, 520, 520);
    }
    
  }
})