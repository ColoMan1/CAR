var host = "phrcztc.chnai.com"

var config = {
  host,

  hostHttps: `https://${host}`,

  // 登录地址，用于建立会话
  Login: `https://${host}/user/login`,

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

  // 上传图片接口
  uploadFileUrl: `https://${host}/file/file`,

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
  inquireClasses: `https://${host}/classes/list`,
  //用户注册
  userInfoLogin: `https://${host}/user/insert`,
  //选择站点
  choseSite: `https://${host}/weChart/choose`,
  //选择下单的班次
  choseClasse: `https://${host}/classes/getClasses`,
  //班次详情
  classDetails: `https://${host}/classes/minute`,
  //生成订单路线
  createOrder: `https://${host}/order/insert`,
  //微信调用付款
  carPay: `https://${host}/order/weChartPay`,
  //分布查询我的预约和行程
  queryTrip: `https://${host}/order/getOrder`,
  //图片上传给服务器
  uploadImage: `https://${host}/file/file`,
};

module.exports = config