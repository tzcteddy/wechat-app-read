
let currentPage={};//当前页面
let musicBox={};//需要滑动的音乐盒子
let pageInfo={};//页面数据
let indexInit=0;
let musicData =  [
  {
    song_name: "测试",
    src: "http://img02.tuke88.com/newpreview_music/08/99/75/5c8994d61bd3178463.mp3",
    cover_image: "https://hbimg.huabanimg.com/aab55062a2b240c160536eaf0dabc1858a6e950b10312-bYZSdR_fw658"
  },
  {
    song_name:"重庆时间",
    src:"http://111.202.98.143/amobile.music.tc.qq.com/C400002SoON91eX8z3.m4a?guid=9429749972&vkey=D356EA1340B3A8E35A8ECE2BE9F4B7C236A24CD256CAC05C9FB127C8ECD7F980EAEF592EE8A7639AFD221C5C2D4061AEC04E0F0C8FA516A7&uin=0&fromtag=66",
    cover_image:"https://hbimg.huabanimg.com/716780614db25dfd47dc3781595d77dfdebd4b171dbcf-La1rjv_fw658"
      },
  {
    song_name: "爱你大理",
    src: "http://111.202.98.143/amobile.music.tc.qq.com/C400001Zd32g3JDKWQ.m4a?guid=9429749972&vkey=6FB9EB02FCC88D7AF10184DD0074B23CDA84943650777A51FDE7E4C69B177001ACA1619937DB99B9A945E42C05DE618A44DCF7592E0BED56&uin=0&fromtag=66",
    cover_image: "https://hbimg.huabanimg.com/7bebd034af56d6b28147984a36366b8b4428a40dc1d2a-hKGzAt_fw658"
      },
  {
    song_name:"赵小雷",
    src:"http://111.202.85.142/amobile.music.tc.qq.com/C400003R4eS904eQjQ.m4a?guid=9429749972&vkey=B24DCC56991C0EEA82CD1B55FF2EDD5EEEE9442782C3470D4F875572E870226AC1F304E1DA6B44DD6FCC75AFEE41F383CD7C6D3DDCBF337D&uin=0&fromtag=66",
    cover_image: "https://hbimg.huabanimg.com/3c10dd5a263cc2540248247e38e5c536e0a77b44d88f7-l2oh3A_fw658"
      }
]
let curMusicIndex=0;//当前播放的音乐列表的位置
let curMusic=[];
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
  
   y=this.data.gesture.index*this.data.gesture.height*-1+y;
  const Animation = wx.createAnimation({ duration: 0,delay:0 })
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
  if (Math.abs(deltaY)>this.data.gesture.height/2){
    if (deltaY < 0) { this.setData({ "gesture.direction": -1 }) }
    if (deltaY >= 0) { this.setData({ "gesture.direction": 1 }) }
  }
  setMusicBoxY.call(currentPage, deltaY)
}

function setCurMusic(index) {
  index = index || 0;
  let self = this;
  this.audioCtx = this.audioCtx || wx.createInnerAudioContext();
  this.audioCtx.src = this.data.pageInfo.musicData[index].src;
  this.audioCtx.autoplay = true;
  this.audioCtx.onEnded(function () {  
    
  })
  this.setData({
    "pageInfo.isPlay": true
  })
  this.audioCtx.onCanplay(() => { console.log("可以播放") })
}
function resetTranlateY(index){
  const Animation = wx.createAnimation({})
  let height=this.data.gesture.height;
  Animation.translateY(index * height * -1).step();
  this.setData({
    'pageInfo.animationData': Animation.export()
  })
  if(this.data.gesture.direction!==0){
   setCurMusic.call(this,index);
  }
}

let evenConf={
  
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
    'gesture.index': (currentPage.data.gesture && currentPage.data.gesture.index) ?     currentPage.data.gesture.index : indexInit,
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
    let index = self.data.gesture.index + self.data.gesture.direction*(-1);
    resetTranlateY.call(self,index);
    self.setData({
      'gesture.direction': 0,
      'gesture.index':index
    });
  },
  audioPlay() {
    this.audioCtx.play();
    this.setData({
      "pageInfo.isPlay":true
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
  }
}

/**
 * 注册事件至当前页面
 * @param {array} events 需要注册的事件
 */
function bindFunctionToPage(events) {
  if (!events || !events.length) return;
  this.setData({
    "pageInfo.musicData": musicData
  })
  setCurMusic.call(currentPage)
  events.forEach(item => {
    this[item] = evenConf[item].bind(this);
  });
}

export default (config={})=>{
  currentPage=getCurrentPage();
  //getMusicBox()
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
