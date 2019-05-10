// components/music/music.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    musicData: [
      {
        song_name: "测试",
        src: "http://img02.tuke88.com/newpreview_music/08/99/75/5c8994d61bd3178463.mp3",
        cover_image: "https://hbimg.huabanimg.com/aab55062a2b240c160536eaf0dabc1858a6e950b10312-bYZSdR_fw658"
      },
      {
        song_name: "重庆时间",
        src: "http://111.202.98.143/amobile.music.tc.qq.com/C400002SoON91eX8z3.m4a?guid=9429749972&vkey=D356EA1340B3A8E35A8ECE2BE9F4B7C236A24CD256CAC05C9FB127C8ECD7F980EAEF592EE8A7639AFD221C5C2D4061AEC04E0F0C8FA516A7&uin=0&fromtag=66",
        cover_image: "https://hbimg.huabanimg.com/716780614db25dfd47dc3781595d77dfdebd4b171dbcf-La1rjv_fw658"
      },
      {
        song_name: "爱你大理",
        src: "http://111.202.98.143/amobile.music.tc.qq.com/C400001Zd32g3JDKWQ.m4a?guid=9429749972&vkey=6FB9EB02FCC88D7AF10184DD0074B23CDA84943650777A51FDE7E4C69B177001ACA1619937DB99B9A945E42C05DE618A44DCF7592E0BED56&uin=0&fromtag=66",
        cover_image: "https://hbimg.huabanimg.com/7bebd034af56d6b28147984a36366b8b4428a40dc1d2a-hKGzAt_fw658"
      },
      {
        song_name: "赵小雷",
        src: "http://111.202.85.142/amobile.music.tc.qq.com/C400003R4eS904eQjQ.m4a?guid=9429749972&vkey=B24DCC56991C0EEA82CD1B55FF2EDD5EEEE9442782C3470D4F875572E870226AC1F304E1DA6B44DD6FCC75AFEE41F383CD7C6D3DDCBF337D&uin=0&fromtag=66",
        cover_image: "https://hbimg.huabanimg.com/3c10dd5a263cc2540248247e38e5c536e0a77b44d88f7-l2oh3A_fw658"
      }
    ],
    pageInfo:{},
    indexInit:0,
    gesture:{},
  },
  ready(){
   // this.getMusicBox();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取当前页面
    getCurrentPage() {
      const pages = getCurrentPages();
      const last = pages.length - 1;
      return pages[last];
    },
    //获取音乐视图的高度
     getMusicBox() {
       let self=this;
      let query = wx.createSelectorQuery();
       query.select("#musicBoxx").boundingClientRect();
      query.selectViewport().scrollOffset();
       query.exec(function (res) {
         self.setData({
           'gesture.height': 341
         })
       })
    },

    //滑动开始 
    musicTouchstart(e) {
      const t = e.touches[0];
      const startX = t.clientX;
      const startY = t.clientY;
      this.getMusicBox()
      let index = (this.data.gesture && this.data.gesture.index) ? this.data.gesture.index : this.data.indexInit;
      this.setData({
        'gesture.startX': startX,
        'gesture.startY': startY,
        'gesture.direction': 0,
        'gesture.index': index
      });
    },

    /**
     * 滑动中
     * @param {object} e
     */
    musicTouchmove(e) {
      const self = this;
      this.move.call(self, e);
    },
    musicTouchend(e) {
      const self = this;
      let index = self.data.gesture.index + self.data.gesture.direction * (-1);
      this.resetTranlateY.call(self, index);
      self.setData({
        'gesture.direction': 0,
        'gesture.index': index
      });
    },
    audioPlay() {
      this.audioCtx.play();
      this.setData({
        "pageInfo.isPlay": true
      })
    },
    audioPause: function () {
      this.audioCtx.pause();
      this.setData({
        "pageInfo.isPlay": false
      })
    },
    audio14: function () {
      this.audioCtx.seek(14)
    },
    audioStart: function () {
      this.audioCtx.seek(0)
    },
    funplay: function () {
      console.log("audio play");
    },
    funpause: function () {
      console.log("audio pause");
    },
    funtimeupdate: function (u) {
      console.log(u.detail.currentTime);
      console.log(u.detail.duration);
    },
    funended: function () {
      console.log("audio end");
    },
    funerror: function (u) {
      console.log(u.detail.errMsg);
    },
    setMusicBoxY(y) {
      y = this.data.gesture.index * this.data.gesture.height * -1 + y;
      const Animation = wx.createAnimation({ duration: 0, delay: 0 })
      Animation.translateY(y).step();
      this.setData({
        'pageInfo.animationData': Animation.export()
      })
    },
    move(e) {
      const { startX, startY } = this.data.gesture;
      const t = e.touches[0];
      const deltaX = t.clientX - startX;
      const deltaY = t.clientY - startY;
      if (Math.abs(deltaY) > this.data.gesture.height / 2) {
        if (deltaY < 0) { this.setData({ "gesture.direction": -1 }) }
        if (deltaY >= 0) { this.setData({ "gesture.direction": 1 }) }
      }
      this.setMusicBoxY(deltaY)
    },
    setCurMusic(index) {
      index = index || 0;
      let self = this;
      this.audioCtx = this.audioCtx || wx.createInnerAudioContext();
      this.audioCtx.src = this.data.pageInfo.musicData[index].src;
      this.audioCtx.autoplay = true;
      this.audioCtx.onEnded(function () {
        self.setData({
          "pageInfo.isPlay": false
        })
      })
      this.setData({
        "pageInfo.isPlay": true
      })
      this.audioCtx.onCanplay(() => { console.log("可以播放") })
    },
    resetTranlateY(index) {
      const Animation = wx.createAnimation({})
      let height = this.data.gesture.height;
      Animation.translateY(index * height * -1).step();
      this.setData({
        'pageInfo.animationData': Animation.export()
      })
      if (this.data.gesture.direction !== 0) {
        this.setCurMusic.call(this, index);
      }
    }
  }
})
