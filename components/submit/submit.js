Component({
    data:{
      emojiFlag: false,//emoji键盘标志位
      moreFlag: false, // 更多功能标志
    },
    methods:{
 /**
  * emoji组件回调
  */
      emojiCLick(e) {
        let val = e.detail
        // 单击删除按钮，，删除emoji
        if (val == '[删除]') {
          let lastIndex = this.data.inputValue.lastIndexOf('[')
          if (lastIndex != -1) {
            this.setData({
              inputValue: this.data.inputValue.slice(0, lastIndex)
            })
          }
          return
        }
        if (val[0] == '[') { // emoji
          this.setData({
            inputValue: this.data.inputValue + val
          })
        } else {//大图
          this.sendBigEmoji(val)
        }
      },
      /**
       * emoji点击发送
       */
      emojiSend(e) {
        let val = this.data.inputValue
        this.sendRequest(val)
        this.setData({
          emojiFlag: false
        })
      },
      /**
 * 切换出emoji键盘
 */
      toggleEmoji() {
        this.setData({
          sendType: 0,
          // focusFlag: this.data.emojiFlag ? true : false,
          emojiFlag: !this.data.emojiFlag,
          moreFlag: false
        })
      },
      /**
 * 切出更多
 */
      toggleMore() {
        this.setData({
          moreFlag: !this.data.moreFlag,
          emojiFlag: false,
          focusFlag: false
        })
      },
    }
})