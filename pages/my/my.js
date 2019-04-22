const app=getApp();
Page({
  data:{
    hasUserInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatar:"",
    userNickName:"",
    gender:"",
    country:""
  },
  onLoad: function () {
    if (app.globalData.userInfo) {//初始获取的 APP.JS
      this.getUserInfoCb();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res);
        app.globalData.userInfo=res.userInfo;
        this.getUserInfoCb();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.getUserInfoCb();
        }
      })
    }

  },
 
  onShow(){
    

  },
  onReady(){
   
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    })
      app.globalData.userInfo= e.detail.userInfo;
    this.getUserInfoCb()
  },
  getUserInfoCb(){
    let userInfo;
    userInfo = app.globalData.userInfo || wx.getStorageSync(userInfo);
    if (userInfo) {
      this.setData({
        avatar: userInfo.avatarUrl,
        userNickName: userInfo.nickName,
        gender: userInfo.gender,
        country: userInfo.country,
        hasUserInfo: true
      })
    }
  }
})