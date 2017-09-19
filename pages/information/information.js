const userDetail = require('../../config').userDetail;  
const userUpdate = require('../../config').userUpdate; 
const uploadImage = require('../../config').uploadImage;  
Page({
  data: {
    imageList:[],
    files1: [], 
    files2: [],
    files3:[],
    image:"",
    hide1: "",
    hide2: "",
    hide3:"",
    timeS: null,
    timeX: null,
    submitBox:false,
    certificateUrl:'',
    identityUrl1: '',
    identityUrl2: '',
    logoUrl:''
  },
  bindTimeChange: function (e) {
    if (e.currentTarget.dataset.type =="timeS"){
      this.setData({
        timeS: e.detail.value,
        submitBox: true
      })
    } else if (e.currentTarget.dataset.type == "timeX"){
      this.setData({
        timeX: e.detail.value,
        submitBox: true
      })
    } 
  },
  uploadImageFn: function (tempFile,state) {   //图片上传函数
    var that = this;
    wx.uploadFile({
      url: uploadImage,
      filePath: tempFile[0],
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      success: function (res) {
        console.log(res)
        if (state == 'logoUrl') {
          that.setData({
            logoUrl: res.data,
            submitBox: true
          })
        } else if (state == 'certificateUrl') {
          that.setData({
            certificateUrl: res.data,
            submitBox: true
          })
        } else if (state == 'identityUrl1') {
          that.setData({
            identityUrl1: res.data,
            submitBox: true
          })
        } else if (state == 'identityUrl2') {
          that.setData({
            identityUrl2: res.data,
            
          })
        }
      },
      fail: function (e) {
        return false;
      }
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res, failSome) {
        var tempFilePaths = res.tempFilePaths
        that.uploadImageFn(tempFilePaths, e.currentTarget.dataset.type)
        if (e.currentTarget.dataset.type == 'logoUrl') {
          that.setData({
            imageList: that.data.imageList.concat(res.tempFilePaths),
            image: true
          });
        } else if (e.currentTarget.dataset.type == 'certificateUrl') {
          that.setData({
            files1: that.data.files1.concat(res.tempFilePaths),
            hide1: true
          });
        } else if (e.currentTarget.dataset.type == 'identityUrl1') {
          that.setData({
            files2: that.data.files2.concat(res.tempFilePaths),
            hide2: true
          });
        } else if (e.currentTarget.dataset.type == 'identityUrl2') {
          that.setData({
            files3: that.data.files3.concat(res.tempFilePaths),
            hide3: true
          });
        }
      }
    })
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: userDetail,
      data: {
        "userID": wx.getStorageSync('jianzb_uid')
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Cookie': 'weChartID=' + wx.getStorageSync('HPcar')
      },
      dataType: "json",
      success: function (res) {
        console.log(res.data)
        that.setData({
          realName: res.data.data.realName,
          logoUrl: res.data.data.logoUrl,
          timeS: res.data.data.onDutyTime,
          timeX: res.data.data.offDutyTime, 
          identityNumber:res.data.data.identityNumber,
          company: res.data.data.company,
          certificateUrl: res.data.data.certificateUrl,
          identityUrl1: res.data.data.identityUrl1,
          identityUrl2: res.data.data.identityUrl2,
        })
      }
    })
  },
  onchangeValue: function (e){
    var that = this
    if (!that.data.submitBox){
      that.setData({
        submitBox: true
      })
    }
  },
  submitForm: function(e){
    console.log(e.detail)
    wx.request({
      url: userUpdate,
      data: {
        "realName": e.detail.value.realName ? e.detail.value.realName:null,
        "identityNumber": e.detail.value.identityNumber ? e.detail.value.identityNumber : null,
        "identityUrl1": e.detail.value.identityUrl1 ? e.detail.value.identityUrl1 : null,
        "identityUrl2": e.detail.value.identityUrl2 ? e.detail.value.identityUrl2 : null,
        "company": e.detail.value.company ? e.detail.value.company : null,
        "logoUrl": e.detail.value.logoUrl ? e.detail.value.logoUrl : null,
        "onDutyTime": e.detail.value.onDutyTime ? e.detail.value.onDutyTime : null,
        "offDutyTime": e.detail.value.offDutyTime ? e.detail.value.offDutyTime : null,
        "certificateUrl": e.detail.value.certificateUrl ? e.detail.value.certificateUrl : null
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Cookie': 'weChartID=' + wx.getStorageSync('HPcar')
      },
      dataType: "json",
      success: function (res) {
        console.log(res.data)
        if (res.data.status){

        }else{
          wx.showToast({
            title: '服务区忙请稍后再试！',
            image: '../../img/x.png'
          })
        }
        // that.setData({
        //   realName: res.data.data.realName,
        //   logoUrl: res.data.data.logoUrl,
        // })
      }
    })
  }
})