<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :http-request="upload"
      :limit="1"
      :class="{disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
      <el-progress v-show="showPercent" class="el-progress" type="circle" :percentage="percent" />
    </el-upload>
    <el-dialog :visible.sync="showdialog">
      <img width="100%" :src="imgURl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDby4uLVj4OdeOr3Fc1LPDjz92e2Yv7qLz',
  SecretKey: 'dz64qKYWEkwue8PRxCDvTt2uiGaqtrc4'
})
export default {
  data() {
    return {
      fileList: [],
      showdialog: false, // 控制图片弹窗显示与隐藏
      imgURl: '', // 弹窗的img地址
      currentFileUid: '', // 记录当前上传的图片的id
      percent: 0,
      showPercent: false // 控制进度条显示
    }
  },
  computed: {
    // 设置一个计算属性, 判断是否已经上传完成了一张
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      // 这里应该弹出一个弹出层 , 弹出层显示图片的地址
      this.showdialog = true
      this.imgURl = file.url
    },
    // 点击删除的时候触发
    handleRemove(file, fileList) {
      //   console.log(file) // file 是点击删除的文件
      //   console.log(fileList)
      // 将原来的文件给排除掉了,剩下的就是最新的数组了
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    // 修改文件的时候触发
    // 此时可以用fileList 因为该方法会进来很多遍 不能每次都去push
    // fileList因为fileList参数是当前传进来的最新参数 我们只需要将其转化成数组即可 需要转化成一个新的数组
    // [] => [...fileList] [] => fileList.map()
    // 上传成功之后 还会进来 需要实现上传代码的逻辑 这里才会成功
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    // 上传文件前触发
    beforeUpload(file) {
      // 上传文件前的检查
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png'] // 定义个规定格式图片文件
      if (!types.includes(file.type)) {
        // 如果匹配到有其他格式的 直接return
        this.$message({
          type: 'error',
          message: '图片格式只支持:JPG、GIF、BMP、PNG'
        })
        return false
      }

      // 检查文件大小
      const maxSize = 5 * 1024 * 1024 // 5M
      if (file.size > maxSize) {
        this.$message({
          type: 'error',
          message: '图片大小不能超过 5M'
        })
        return false
      }

      // file.uid
      this.currentFileUid = file.uid // 记住当前的uid
      this.showPercent = true
      return true
    },
    upload(params) {
      if (params.file) {
        // 如果文件存在上传到腾讯云
        cos.putObject({
          // 配置
          Bucket: 'candy-1302944410', // 存储桶的位置
          Region: 'ap-guangzhou', // 存储桶所在地域 字段
          Key: params.file.name, // 文件名
          StorageClass: 'STANDARD', // 默认写死
          Body: params.file, // 将本地的文件赋值给腾讯云配置
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          if (!err && data.statusCode === 200) {
            // 认为上传成功
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                //   upload为true表示 该图片已经成功上传到服务器，地址已经是腾讯云的地址了  就不可以执行保存了
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            // 隐藏进度条
            this.showPercent = false
            this.percent = 0
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

<style>
.el-dialog__headerbtn {
    top: 8px;
}

.el-progress {
    position: absolute;
    top: 10px;
    left: 10px;
}

.disabled .el-upload--picture-card {
  display: none
}
</style>
