// pages/userDetail/userDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let userId=options.id;//从路由拿到用户id
      
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
    this.getMusicBox()
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

  },

  getMusicBox() {
    let _this=this;
    let query = wx.createSelectorQuery();
    query.select("#userBanner").boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec(function (res) {
        _this.setData({
          'bannerHeight': res[0].width*9/16
        })
      })
  }
})