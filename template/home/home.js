
let currentPage={};//当前页面
let musicBox={};//需要滑动的音乐盒子
let pageInfo={};//页面数据
let indexInit=0;
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


function getMusicBox() {
  let self=currentPage;
  let query = wx.createSelectorQuery();
  query.select("#musicBox").boundingClientRect();
  query.selectViewport().scrollOffset();
  query.exec(function (res) {
  self.setData({
    'gesture.height': res[0].height
  })
    res[0].top       // #the-id节点的上边界坐标
    res[1].scrollTop // 显示区域的竖直滚动位置
  })
}

function setMusicBoxY(y) {
  
   y=this.data.gesture.index*this.data.gesture.height+y;
  const Animation = wx.createAnimation({ duration: 0 })
  Animation.translateY(y).step();
  this.setData({
    'pageInfo.animationData': Animation.export()
  })
}
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
    'gesture.direction':0,
    'gesture.index': (currentPage.data.gesture && currentPage.data.gesture.index) ? currentPage.data.gesture.index : indexInit,
  });
},

/**
 * 滑动中
 * @param {object} e
 */
  musicTouchmove(e) {
    const self = currentPage;
    move.call(self,e); 
  },
  musicTouchend(e) {
    const self = currentPage;
    let index = self.data.gesture.index + self.data.gesture.direction;
    resetTranlateY.call(self,index);
    self.setData({
      'gesture.direction': 0,
      'gesture.index':index
    });
  },
  audioPlay() {
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
}

/**
 * 注册事件至当前页面
 * @param {array} events 需要注册的事件
 */
function bindFunctionToPage(events) {
  if (!events || !events.length) return;

  this.audioCtx =wx.createAudioContext('myAudio')
  
  events.forEach(item => {
    this[item] = conf[item].bind(this);
  });
}

export default (config={})=>{
  currentPage=getCurrentPage();
  //getMusicBox()
  currentPage.setData({
    'pageInfo.src': "https://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46"
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
