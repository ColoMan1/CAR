// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files1: [],
    files2: [],
    files3:[],
    hide1: "",
    hide2: "",
    hide3:"",
    timeS: "未指定",
    timeX:"未指定"
  },
  bindTimeChanges: function (e) {
      this.setData({
          timeS: e.detail.value
      })
  },
  bindTimeChangex: function (e) {
      this.setData({
          timeX: e.detail.value
      })
  },
  chooseImage1: function (e) {
      var that = this;
      wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              that.setData({
                  files1: that.data.files1.concat(res.tempFilePaths)
              });
              that.setData({
                    hide1:true
              });
          }
      })
  },
  previewImage1: function (e) {
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files1 // 需要预览的图片http链接列表
      })
  },
  chooseImage2: function (e) {
      var that = this;
      wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              that.setData({
                  files2: that.data.files2.concat(res.tempFilePaths)
              });
              that.setData({
                  hide2: true
              });
          }
      })
  },
  previewImage2: function (e) {
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files2 // 需要预览的图片http链接列表
      })
  },
  chooseImage3: function (e) {
      var that = this;
      wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              that.setData({
                  files3: that.data.files3.concat(res.tempFilePaths)
              });
              that.setData({
                  hide3: true
              });
          }
      })
  },
  previewImage3: function (e) {
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files3 // 需要预览的图片http链接列表
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})