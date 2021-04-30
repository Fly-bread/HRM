// 该文件负责所有的公共的组件的全局注册
import PageTools from './PageTools'
import UploadExcel from './UploadExcel' // 导入Excel组件
import imageUpload from './imageUpload' // 图片上传组件
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
import LangSelect from './LangSelect'
import TagsView from './TagsView'

// 导出 注册
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('imageUpload', imageUpload)
    Vue.component('ScreenFull', ScreenFull)
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('LangSelect', LangSelect)
    Vue.component('TagsView', TagsView)
  }
}
