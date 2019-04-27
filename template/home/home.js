
let currentPage={};//当前页面
let musicBox={};//需要滑动的音乐盒子
let pageInfo={};//页面数据
let indexInit=0;
import confFn from './event.js';  
/**
 * 获取当前页面实例
 */
function getCurrentPage() {
  const pages = getCurrentPages();
  const last = pages.length - 1;
  return pages[last];
}


/**
 * 上滑
 * @param {object} e 事件对象
 * @returns {boolean} 布尔值
 */
export function isUpSlide(e) {
  const { startX, startY } = this.data.gesture;
  if (this.slideLock) {
    const t = e.touches[0];
    const deltaX = t.clientX - startX;
    const deltaY = t.clientY - startY;
    if (deltaY < -60 && deltaX < 20 && deltaX > -20) {
      this.slideLock = false;
      return true;
    } else {
      return false;
    }
  }
}
/**
 * 下滑
 * @param {object} e 事件对象
 * @returns {boolean} 布尔值
 */
export function isDownSlide(e) {
  const { startX, startY } = this.data.gesture;
  if (this.slideLock) {
    const t = e.touches[0];
    const deltaX = t.clientX - startX;
    const deltaY = t.clientY - startY;
    if (deltaY > 60 && deltaX < 20 && deltaX > -20) {
      this.slideLock = false;
      return true;
    } else {
      return false;
    }
  }
}
/**
 * 左滑
 * @param {object} e 事件对象
 * @returns {boolean} 布尔值
 */
export function isLeftSlide(e) {
  const { startX, startY } = this.data.gesture;
  if (this.slideLock) {
    const t = e.touches[0];
    const deltaX = t.clientX - startX;
    const deltaY = t.clientY - startY;
    if (deltaX < -60 && deltaY < 20 && deltaY > -20) {
      this.slideLock = false;
      return true;
    } else {
      return false;
    }
  }
}
/**
 * 右滑
 * @param {object} e 事件对象
 * @returns {boolean} 布尔值
 */
export function isRightSlide(e) {
  const { startX, startY } = this.data.gesture;
  if (this.slideLock) {
    const t = e.touches[0];
    const deltaX = t.clientX - startX;
    const deltaY = t.clientY - startY;

    if (deltaX > 60 && deltaY < 20 && deltaY > -20) {
      this.slideLock = false;
      return true;
    } else {
      return false;
    }
  }
}

//获取音乐视图的高度
function getMusicBox() {
  let self=currentPage;
  let query = wx.createSelectorQuery();
  query.select("#musicBox").boundingClientRect();
  query.selectViewport().scrollOffset();
  query.exec(function (res) {
    self.setData({
      'gesture.height': res[0].height
    })
  })
}

//滑动中改变音乐盒子的Y值
function setMusicBoxY(y) {
   y=this.data.gesture.index*this.data.gesture.height+y;
  const Animation = wx.createAnimation({ duration: 0 })
  Animation.translateY(y).step();
  this.setData({
    'pageInfo.animationData': Animation.export()
  })
}
//滑动中的事件要执行的方法
function move(e){
  const { startX, startY } = this.data.gesture;
    const t = e.touches[0];
    const deltaX = t.clientX - startX;
    const deltaY = t.clientY - startY;
  if (Math.abs(deltaY)>400/2){
    if (deltaY < 0) { this.setData({ "gesture.direction": -1 }) }
    if (deltaY > 0) { this.setData({ "gesture.direction": 1 }) }
  }
  setMusicBoxY.call(currentPage, deltaY)
}
//滑动结束重置音乐盒子的Y值
function resetTranlateY(index){
  const Animation = wx.createAnimation({})
  let height=this.data.gesture.height;
  Animation.translateY(index * height).step();
  this.setData({
    'pageInfo.animationData': Animation.export()
  })
}

let conf={
  //滑动开始 
  musicTouchstart(e) {
    const t = e.touches[0];
    const startX = t.clientX;
    const startY = t.clientY;
    getMusicBox()

    currentPage.setData({
      'gesture.startX': startX,
      'gesture.startY': startY,
      'gesture.direction': 0,
      'gesture.index': (currentPage.data.gesture && currentPage.data.gesture.index) ? currentPage.data.gesture.index : indexInit,
    });
  },

  /**
   * 滑动中
   * @param {object} e
   */
  musicTouchmove(e) {
    const self = currentPage;
    move.call(self, e);
  },
  musicTouchend(e) {
    const self = currentPage;
    let index = self.data.gesture.index + self.data.gesture.direction;
    resetTranlateY.call(self, index);
    self.setData({
      'gesture.direction': 0,
      'gesture.index': index
    });
  },
  audioPlay() {
    console.log(this);
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
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
  }
};

/**
 * 注册事件至当前页面
 * @param {array} events 需要注册的事件
 */
function bindFunctionToPage(events) {
  if (!events || !events.length) return;

  this.audioCtx = wx.createInnerAudioContext('myAudio')
  this.audioCtx.autoplay=true;
  this.audioCtx.onCanplay(()=>{console.log("可以播放")})
  events.forEach(item => {
    this[item] = conf[item].bind(this);
  });
}

export default (config={})=>{
  currentPage=getCurrentPage();
  //getMusicBox()
  currentPage.setData({
    'pageInfo.src': "https://s320.xiami.net/887/887/4425/53889_1516768398156.mp3?ccode=xiami_web_web&expire=86400&duration=432&psid=5c6069f59e45c81267697f9ec1f40e55&ups_client_netip=124.65.148.182&ups_ts=1556357713&ups_userid=0&utid=2NXRFGKhAi4CAXxBlLYZt4va&vid=53889&fn=53889_1516768398156.mp3&vkey=B13050589ccd4b2dd8999c17a57d075bd"
  })
  const events = [
    'musicTouchstart',
    'musicTouchmove',
    'musicTouchend',
    'audioPlay',
    'audioPause',
    'audio14',
    'audioStart',
    'funplay',
    'funpause',
    'funtimeupdate',
    'funended',
    'funerror'
  ];
  bindFunctionToPage.call(currentPage, events);


}
