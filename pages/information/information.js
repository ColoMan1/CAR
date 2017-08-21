// pages/information/information.js
const uploadImage = require('../../config').uploadImage  //接口js引入
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files1: [], //这里设成数组是为了储存多张图片，wxhtml也做成了循环，但这里只需一张图，所以下面封装的函数里面把数组的concat（）方法去掉了
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
    uploadImageFn: function (tempFile) {   //图片上传函数
        wx.uploadFile({
          url: uploadImage,
          filePath: tempFile[0],
          name: 'file',
          header: { "Content-Type": "multipart/form-data" },
            success: function (res) {
                console.log(res)
            },
            fail: function (e) {
                sonsole.log(e)
            }
        })
   },
  chooseImage1: function (e){
    var that = this;
    wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res, failSome) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
                files1: that.data.files1.concat(res.tempFilePaths)  //用于存多张
            });
            var tempFilePaths = res.tempFilePaths
            that.setData({
                hide1: true
            });
            that.uploadImageFn(tempFilePaths)
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
              var tempFilePaths1 = res.tempFilePaths
              that.uploadImageFn(tempFilePaths1)
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
              var tempFilePaths2 = res.tempFilePaths
              that.uploadImageFn(tempFilePaths2)
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

  }
})