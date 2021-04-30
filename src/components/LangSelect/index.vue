<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <!-- 这里必须加一个div -->
    <div>
      <svg-icon
        style="color:#fff;font-size:20px"
        icon-class="language"
      />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        command="zh-CN"
        :disabled="'zh-CN'=== $i18n.locale"
      >中文</el-dropdown-item>
      <el-dropdown-item
        command="en"
        :disabled="'en'=== $i18n.locale"
      >英文</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  methods: {
    // 切换多语言
    changeLanguage(type) {
      // type 就是要设置的语言类型
      this.$i18n.locale = type
      Cookies.set('locale', type) // 写入缓存
      this.$message({
        type: 'success',
        message: `${this.$t('切换成功')}`
      })
    }
  }
}
</script>

<style>

</style>
