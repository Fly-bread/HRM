<template>
  <el-dialog :title="title" :visible="showRealSalaryDialog" @close="btnCancel" >

    <el-form  label-width="500px" size="mini">
      <el-form-item label="姓名" prop="username" label-width="130px" >
        <el-input  type="string" style="width:38%"    v-model="username"/>
      </el-form-item>

      <el-form-item label="工号"  label-width="130px" >
        <el-input  type="number" style="width:38%"    v-model="worknum"/>
      </el-form-item>

      <el-form-item label="工资基数" label-width="130px" >
        <el-input  type="number" style="width:38%"    v-model="salary"/>
      </el-form-item>

      <el-form-item label="本月扣除工资" label-width="130px" >
        <el-input  type="number" style="width:38%"   v-model="rate"/>
      </el-form-item>

      <el-form-item label="本月奖金"  label-width="130px" >
        <el-input  type="number" style="width:38%"    v-model="tax"/>
      </el-form-item>   

      <el-form-item label="缴税"  label-width="130px" >
        <el-input  type="number" style="width:38%"    v-model="tax"/>
      </el-form-item>   

      <el-form-item label="社保缴费" label-width="130px" >
        <el-input  type="number" style="width:38%"    v-model="tax"/>
      </el-form-item>  

    </el-form>               


  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRealSalaryDialog: {
      type: Boolean,
      default: false
    },
    title:{
      type: String,
      default: '工资记录'
    },
    // userid: {
    //   type: String,
    //   default: null
    // }
  },
  data() {
    //   data先暂时写死
    return{
        //还是加上[],以免产生不必要的错误
            username:'a',
            worknum:'12',
            salary:'4140',
            rate:'0.14',
            tax:'54'
    }
  },

    created(){
        this.tax = parseFloat(this.salary) * parseFloat(this.rate)
    },

  methods: {
    // 获取角色列表
    async getRoleList() {
      const { rows } = await getRoleList()
      this.list = rows
    },
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },


    
    btnCancel() {
      // 清空数据
      //console.log(this.timeOfLast)  console.log是最后输出，所以是关闭窗口后输出，故无法获得值
      this.$emit('update:showRealSalaryDialog', false)
    },





  }
}
</script>

<style>


</style>
