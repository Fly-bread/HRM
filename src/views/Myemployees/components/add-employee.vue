<template>
  <!-- 新增弹窗 -->
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="addEmployee" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入姓名"
          style="width:83%"
        />
      </el-form-item>

      <el-form-item label="工号" prop="workNumber" >
        <el-input
          v-model="formData.workNumber"
          placeholder="请输入工号(只能由数字组成)"
          style="width:83%"
        />
      </el-form-item>

      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          placeholder="请输入手机号"
          style="width:83%"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          placeholder="请选择日期"
          style="width:83%"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfemployment">
        <el-select
          v-model="formData.formOfemployment"
          placeholder="请选择"
          style="width:83%"
        >
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>


      <el-form-item label="转正时间" prop="correctionTime" >
        <el-date-picker
          v-model="formData.correctionTime"
          placeholder="请选择日期"
          style="width:83%"
        />
      </el-form-item>
    </el-form>
    <!-- 底部按钮 -->
    <el-row slot="footer" type="flex" justify="center" align="middle">
      <el-col>
        <el-button
          type="primary"
          size="small"
          @click="btnOK"
        >确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
import EmployeeEnum from '@/api/constant/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      EmployeeEnum,
      formData: {
        username: '',
        mobile: '',
        formOfemployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      treeData: [],
      loading: false,
      showTree: false,
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 6, message: '请输入1-6位的用户名' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号只能以13开头，共11位' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '工号只能由数字组成' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getDepartments() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()
      // depts 只是数组,而我们要的是树形数据
      this.treeData = transListToTreeData(depts, '')
      this.loading = false
      console.log(depts)
    },

    selectNode(node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },
    async btnOK() {
      try {
        //向服务器请求...，然后服务器返回数据，前端验证一下，然后给...
        await this.$refs.addEmployee.validate() // 点击确定校验
        // // 新增员工
        // await addEmployee(this.formData)
        // 调用父组件的方法 $parent

        this.$emit('addEmployee', this.formData.username, this.formData.workNumber, this.formData.mobile)

        this.$parent.getEmployeesList() // 刷新数据
        this.$parent.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },

    btnCancel() {
      this.formData = { // 重置数据,清空input
        username: '',
        workNumber: '',
        mobile: '',
        formOfemployment: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }

      this.$refs.addEmployee.resetFields() // 重置校验
      this.$parent.showDialog = false
    },
  }
}
</script>

<style scoped>

</style>
