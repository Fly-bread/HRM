<template>
  <el-dialog :title="title" :visible="showVirtualSalaryDialog" @close="btnCancel" width="500px">
          <el-form    label-width="500px" size="mini">
            <el-form-item label="前工资设定时间" prop="timeOfLast" label-width="130px" :required="true">
              <el-date-picker type="date" value-format="yyyy-MM-dd" style="width:50%"  v-model="timeOfLast" :readonly ='true'/>
            </el-form-item>
      
            <el-form-item type ="text" label="前工资基数"  label-width="130px">
              <el-input  type="number" style="width:38%"  :placeholder='salaryOfLast' v-model="salaryOfLast_num" :readonly ='true'>（基数范围是3387 ~ 25401）
              </el-input>
            </el-form-item>
            <el-form-item label="工作天数" label-width="130px">
              <el-input  type="number" style="width:38%" v-model="daysOfLast_num" @input="computeBaseSalary" :readonly ='true'/>（基数范围是0 ~ 31）
            </el-form-item>

            <el-form-item/>    

            <el-form-item label="现工资设定时间"  label-width="130px" :required="true">
              <el-date-picker type="date" value-format="yyyy-MM-dd" style="width:50%"  v-model="timeOfNew" :readonly ='true'/>
            </el-form-item>
            <el-form-item label="现工资基数" prop="salaryOfNew" label-width="130px">
              <el-input  type="number" style="width:38%" :placeholder='salaryOfNew' v-model="salaryOfNew_num"  :readonly ='true'/>（基数范围是3387 ~ 25401）
            </el-form-item>          
            <el-form-item label="工作天数" label-width="130px">
              <el-input  type="number" style="width:38%" :placeholder='daysOfNew_num' v-model="daysOfNew_num" @input="computeBaseSalary" :readonly ='true'/>（基数范围是0 ~ 31）
            </el-form-item>  

            <el-form-item/>  
            <el-form-item/>  
            <el-form-item label="总工资基数"  label-width="130px" size ='medium' class='red-form-item' >
              <el-input  type="number" style="width:38%" :readonly="true" :placeholder="baseSalary_num" />
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
    showVirtualSalaryDialog: {
      type: Boolean,
      default: false
    },
    title:{
      type: String,
      default: '工资基数详情'
    },
    baseSalary:{
      type: String,
      default: '10'
    },
    salaryOfLast:{
      type: String,
      default: '10'
    },
    salaryOfNew:{
      type: String,
      default: '10'  
    },
    // userid: {
    //   type: String,
    //   default: null
    // }
  },
  data() {
    return{
      salaryOfLast_num:parseInt(this.salaryOfLast) + 100,
      daysOfLast_num:10,

      
      salaryOfNew_num:parseInt(this.salaryOfNew),
      daysOfNew_num:10,

      baseSalary_num: parseInt(this.baseSalary)
    }
  },
  created() {
    // this.getRoleList() // 获取角色列表
    this.timeOfLast = '2021-9-16',
    this.abc = false
    this.timeOfNew = '2021-10-16'
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
      this.$emit('update:showVirtualSalaryDialog', false)
    },
    showChange(value){
      console.log(value)
    },

    computeBaseSalary(){
      this.baseSalary_num = this.daysOfLast_num * this.salaryOfLast_num + this.daysOfNew_num * this.salaryOfNew_num
    }


  }
}
</script>

<style>
/* 要记得加空格，才表示子标签 */
.red-form-item .el-form-item__label{
  color:indianred;
  
}

.red-form-item{
  left: 200px;
  width: 500px;
}

</style>
