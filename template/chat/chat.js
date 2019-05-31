let currentPage={};//当前页面
let app=getApp();
let eventConfig={
  toUserDetail(event){
      var userId=event.currentTarget.dataset.id;
      wx.navigateTo({
        url: "/pages/userDetail/userDetail?id="+userId,
      })
  }
}
function getCurrentPage() {
  const pages = getCurrentPages();
  const last = pages.length - 1;
  return pages[last];
}
/**
 * 注册事件至当前页面
 * @param {array} events 需要注册的事件
 */
function bindFunctionToPage(events) {
  if (!events || !events.length) return;
  events.forEach(item => {
    this[item] = eventConfig[item].bind(this);
  });
}

export default (config = {}) => {
  currentPage = getCurrentPage();
  //getMusicBox()
  const events = [
    "toUserDetail"
  ];
  bindFunctionToPage.call(currentPage, events);

}