<template>
  <el-dialog
    :title="`${showText}权限点`"
    :visible="showDialog"
    @close="btnCancel"
  >
    <el-form
      ref="perForm"
      :model="formData"
      :rules="rules"
      label-width="120"
      style="margin-left: 55px;"
    >
      <el-form-item label="权限名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width:80%"
        />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input
          v-model="formData.code"
          style="width:80%"
        />
      </el-form-item>
      <el-form-item style="margin-left: 10px;" label="权限描述">
        <el-input
          v-model="formData.description"
          style="width:80%"
        />
      </el-form-item>
      <el-form-item style="margin-left: 10px;" label="开启权限">
        <el-switch
          v-model="formData.enVisible"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>

    </el-form>
    <el-row
      slot="footer"
      type="flex"
      justify="center"
    >
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
import { updataPermission, addPermission } from '@/api/permission'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    getPermissionList: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      formData: {
        name: '', // 菜单名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型
        pid: '', // 树形结构的pid
        enVisible: '0' // 权限开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  methods: {
    // 删除
    removePermission() {},

    // 确认保存
    async btnOK() {
      try {
        await this.$refs.perForm.validate()
        if (this.formData.id) {
          await updataPermission(this.formData)
        } else {
          await addPermission(this.formData)
        }
        await this.$message({
          type: 'success',
          message: `${this.showText}保存成功`
        })
        await this.$emit('update:showDialog', false)
        if (this.getPermissionList) {
          await this.getPermissionList() // 重新获取数据渲染页面
          this.formData = {} // 清空输入框
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 取消
    btnCancel() {
      this.$emit('update:showDialog', false)
      this.formData = {}
      this.$refs.perForm.resetFields()
    }
  }
}
</script>

<style>

</style>
