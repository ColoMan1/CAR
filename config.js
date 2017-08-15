var host = "phrcztc.chnai.com"

var config = {
  host,

  hostHttps: `https://${host}`,

  // 登录地址，用于建立会话
  Login: `https://${host}/Api/UserApi/Login`,

  // 测试的请求地址，用于测试会话
  requestUrl: `https://${host}/testRequest`,

  // 用code换取openId
  CodeToOpenId: `https://${host}/weChart/vote`,

  // 测试的信道服务接口
  tunnelUrl: `https://${host}/tunnel`,

  // 生成支付订单的接口
  paymentUrl: `https://${host}/payment`,

  // 发送模板消息接口
  templateMessageUrl: `https://${host}/templateMessage`,

  // 上传文件接口
  uploadFileUrl: `https://${host}/upload`,

  // 下载示例图片接口
  downloadExampleUrl: `https://${host}/static/weapp.jpg`,

  ValidVerCode: `https://${host}/Api/UserApi/ValidVerCode`,
  Register: `https://${host}/Api/UserApi/Register`,
  SendVerCode: `https://${host}/Api/UserApi/SendVerCode`,
  RetrieveCommend: `https://${host}/Api/OrderApi/RetrieveCommend`,
  DischargeBinding: `https://${host}/Api/UserApi/DischargeBinding`,
  RetrieveAccount: `https://${host}/Api/UserApi/RetrieveAccount`,
  GetProductAndCert: `https://${host}/Api/OrderApi/GetProductAndCert`,
  RetrieveCertification: `https://${host}/Api/OrderApi/RetrieveCertification`,


  //发送验证码
  SpanCode: `https://${host}/user/validate`,
  //查询已发车班次
  inquireClasses: `https://${host}/classes/list`

};

module.exports = config