//index.js
//获取应用实例
const app = getApp()
import touch from '../../template/home/home';
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    hideLoginPop: !!wx.getStorageSync("userInfo"),
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
   
  },
  onLoad: function () {
   
    if (app.globalData.userInfo) {//初始获取的 APP.JS
     
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo;
        
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
        }
      })
      }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    })
    app.globalData.userInfo = e.detail.userInfo;
    this.onhideLoginPopFn()
  },
  onShow:function(){
    touch();
  },
  onShareAppMessage:function(){
    return {
      title:"读书吧",
      path:"www.baidu.com"
    }
  },
  onhideLoginPopFn:function(){
    this.setData({
      hideLoginPop:true
    })
  }
})
