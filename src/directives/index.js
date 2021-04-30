// 写自定义文件的文件

// 显示图片的自定义指令
export const iamgeError = {
  inserted(dom, options) {
    // 图片异常处理
    dom.onerror = function() {
      // 监听图片 img 的错误事件,一旦图片加载失败就会进入这个函数

      // 加载失败 , 赋值默认图片
      dom.src = options.value
    }
  }
}
