
let currentPage={};
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

let conf={
  
 //滑动开始 
musicTouchstart(e) {
  const t = e.touches[0];
  const startX = t.clientX;
  const startY = t.clientY;
  currentPage.slideLock = true; // 滑动事件加锁
  currentPage.setData({
    'gesture.startX': startX,
    'gesture.startY': startY
  });
},

/**
 * 滑动中
 * @param {object} e
 */
  musicTouchmove(e) {
    const self = currentPage;
    if (isLeftSlide.call(self, e)) {
      self.setData({
        'calendar.leftSwipe': 1
      });
      
    }
    if (isRightSlide.call(self, e)) {
      self.setData({
        'calendar.rightSwipe': 1
      });
      
    }
  
  },
  musicTouchend(e) {
    const self = currentPage;
    self.setData({
      'calendar.leftSwipe': 0,
      'calendar.rightSwipe': 0
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
  currentPage.setData({
    src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46"
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
