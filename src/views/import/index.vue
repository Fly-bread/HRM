<template>
  <upload-excel :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  data() {
    return {
      type: this.$route.query.type
    }
  },
  methods: {
    async success({ header, results }) {
      if (this.type === 'user') {
        // 由于返回的数据的key不是英语,所以需要对返回的数据进行处理
        const userRelations = {
          '入职日期': 'timeOfEntry',
          '手机号': 'mobile',
          '姓名': 'username',
          '转正日期': 'correctionTime',
          '工号': 'workNumber'
        }
        const arr = []
        // 遍历所有返回的数据
        results.forEach(item => {
          // 换成中文
          const userInfo = {}
          Object.keys(item).forEach(key => {
            // key 是当前的中文名 , 找到对应的英文名字
            if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
              // 必须要下面这段代码才能入库,写就对了
              userInfo[userRelations[key]] = new Date(this.formData(item[key], '/'))
              return
            }
            userInfo[userRelations[key]] = item[key]
          })
          // 将数据英文名添加进数组
          arr.push(userInfo)
        })
        await importEmployee(arr)
        this.$message({
          type: 'success',
          message: '文件导入成功'
        })
      }
      this.$router.back() // 导入成功返回上一页
    },
    formData(number, format) {
      const time = new Date((number - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
