export const musicEvent={
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
 
}
export const audioEvent={
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
}
export default ()=>{
  return Object.assign(musicEvent,audioEvent)
}