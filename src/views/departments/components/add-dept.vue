<template>
  <!-- 新增部门的弹窗 -->
  <el-dialog title="新增部门" :visible="showDialog" @close="btnCancel">
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail, updataDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 部门名称校验重复
    const checkNameRepeat = async(rule, value, callback) => {
      // 先获取最新的组合结构数据,以便不会出错 以最新的数据为准
      const { depts } = await getDepartments()
      // depts 是获取到所有部门的数据,但是我们不需要全部的数据
      // 部门名称校验重复 需要支持两种规则 新增 / 编辑
      let isRepeat = false // 默认值 false
      if (this.formData.id) {
        // 判读 如果formData有id 就是编辑
        isRepeat = false // 编辑不需要验证重复性
      } else {
        // 没有就是新增
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      // 得出结果 callback
      isRepeat ? callback(new Error(`当前部门中已经存在${value}的部门了`)) : callback()
    }

    // 校验部门编码是否重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // 一样的先要获取最先的组织架构数据
      const { depts } = await getDepartments()
      // 这里会加一个value不能为空,因为有些部门有可能没有code
      // 同样的校验部门编码是否重复也需要支持两种 新增和编辑
      let isRepeat = false
      // 判断跟 校验 name 一样
      if (this.formData.id) {
        // 编辑: 编辑的时候编码已经没必要去修改
        isRepeat = depts.some(item => item.id !== this.formData.id && item.code === value && value)
      } else {
        // 新增
        isRepeat = depts.some(item => item.code === value && value)
      }
      isRepeat ? callback(new Error(`部门编码重复`)) : callback()
    }

    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理员
        introduce: '' // 部门介绍
      },
      peoples: [],
      // 校验规则
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '部门名称要求输入1-50个字符', trigger: 'blur' }, { validator: checkNameRepeat, trigger: 'blur' }],

        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '部门编码要求输入1-50个字符', trigger: 'blur' }, { validator: checkCodeRepeat, trigger: 'blur' }],

        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],

        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }, { min: 1, max: 300, message: '部门介绍要求输入1-300个字符' }]
      }
    }
  },

  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    btnOK() {
      this.$refs.deptForm.validate(async isOK => {
        if (isOK) {
          // 点击确定的时候要判断当前是在新增还是编辑
          if (this.formData.id) {
            // 编辑 : 调用编辑的接口
            await updataDepartments(this.formData)
          } else {
            // 新增
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
          }
          this.$emit('anewInit') // 通知父组件更新数据
          this.$emit('update:showDialog', false) // 关闭操作
        }
      })
    },
    btnCancel() {
      // 将数据还原(清空input)
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理员
        introduce: '' // 部门介绍
      }
      // 重置校验
      this.$refs.deptForm.resetFields()
      // 关闭操作
      this.$emit('update:showDialog', false)
    },
    // 获取部门详情
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>

<style>

</style>
