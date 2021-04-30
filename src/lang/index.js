// 多语言初始化文件
import Vue from 'vue' // 引入vue
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
// element 的语言包
import elementEN from 'element-ui/lib/locale/lang/en'
import elementZH from 'element-ui/lib/locale/lang/zh-CN'
// 引入常规的语言包
import customEN from './en'
import customZH from './zh'

Vue.use(VueI18n) // 全局注册i18n

// 实例化i18n
export default new VueI18n({
  // 选项 locale  设置当前的语言类型  该值是随便起的
  // en zh ja sp zh  zh-hk  zh
  // locale需要进行缓存
  locale: Cookies.get('locale') || 'en', // 当前的语言类型
  // 需要语言包 有几种语言就需要几种语言包
  messages: {
    // 这里放语言包
    zh: {
      // 中文
      ...elementZH,
      ...customZH
    },
    en: {
      // 英文
      ...elementEN,
      ...customEN
    }
  }
})
