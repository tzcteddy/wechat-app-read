const app=getApp();
Page({
  data:{
    avatar:"",
    userNickName:"",
    gender:"",
    country:""
  },
  onLoad: function () {
    if (app.globalData.userInfo) {//初始获取的 APP.JS
      this.getUserInfoCb();
    } 
  },
 
  onShow(){
    

  },
  onReady(){
   
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
        hasUserInfo:true
      })
    }
  }
})