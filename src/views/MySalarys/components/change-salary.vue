<template>
  <div class="changeSalary">
    <div class="infoBox">
      <div class="logo"><img src="@/assets/common/img.jpeg" alt=""></div>
      <div class="info">
        <p>
          <span class="name">{{ user.username }}</span>
        </p>
        <p>
          <span>入职时间：</span>
          {{ user.timeOfEntry | formatDate }}
        </p>
      </div>
    </div>
    <div>
      <el-form :model="ruleForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="调整基本工资">
          <el-input v-model="userSalary" style="width: 220px;" :disabled="true" />
          <span class="Label">-></span>
          <el-input
            v-model="salaryOfNewSet"
            style="width: 220px;"
            placeholder="请输入调整后基本工资"
            type="number"
          />
        </el-form-item>

        <el-form-item label="调整幅度">
          <el-input v-model="computeChangeSize" style="width: 220px;" :disabled="true" />
        </el-form-item>
        <div class="buttones" style="text-align: center;margin-top: 40px;">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="onClose">关闭</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { changeSalary } from '@/api/salarys'

export default {
  name: 'UsersTableIndex',
  props: ['userSalary', 'userid'],

  data() {
    return {
      user: {},
      ruleForm: {
      },
      salaryOfNewSet:0,
      computeChangeTotal:0
    }
  },
  computed: {
    // computeCurrentTotal() {
    //   let base = 0
    //   if (this.userSalary.currentBasicSalary != null) {
    //     base = Number(this.userSalary.currentBasicSalary)
    //   }
    //   let post = 0
    //   if (this.userSalary.currentPostWage != null) {
    //     post = Number(this.userSalary.currentPostWage)
    //   }
    //   return base + post
    // },
    // computeChangeTotal() {
    //   let base = 0
    //   if (this.ruleForm.currentBasicSalary != null) {
    //     base = Number(this.ruleForm.currentBasicSalary)
    //   }
    //   let post = 0
    //   if (this.ruleForm.currentPostWage != null) {
    //     post = Number(this.ruleForm.currentPostWage)
    //   }
    //   return base + post
    // },
    computeChangeSize() {
      return this.salaryOfNewSet - this.userSalary
    }
  },
  created() {
    //this.getUserDetailById()
  },
  methods: {
    async  onSubmit() {
      // const sendData = this.ruleForm
      // sendData.userid = this.userid
      // await changeSalary(sendData)

      this.$message({ message: '保存成功', type: 'success' })
      //this.$emit('success')

      this.$emit('setNew', this.salaryOfNewSet);
      this.onClose()
    },
    onClose() {
      this.ruleForm = {}
      this.$emit('onDialogCancel')
    },
    async getUserDetailById() {
      //用id获得所有信息
      this.user = await getUserDetailById(this.userid)
      console.log(this.user)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../styles/variables.scss';
  .changeSalary{
    .infoBox{
      display: flex;
      border-bottom: solid 1px #ccc;
      margin-bottom: 20px;
      padding: 10px 0 20px 0;
      img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .logo{
        border:solid 1px #ccc;
        width: 102px;
        height: 102px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .info{
        p{
          line-height: 30px;
          .name{font-size: 16px;}
          span{
            font-weight: bold;
            display: inline-block;
            margin-right: 0px;
            margin-left: 10px;
          }
        }
      }
      .buttones{
        text-align: center;
      }
    }
    .Label{
      margin: 0 20px;
      color:#999;
    }
  }
</style>
