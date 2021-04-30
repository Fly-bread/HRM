<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width: 100%">
    <el-col>
      <!-- 此时 data 应该换成 treeNode-->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单的提示文字 -->
          <el-dropdown @command="operateDepts">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <!-- 编辑部门和删除部门只会在子节点上显示 -->
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="remove">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { removeDepartments } from '@/api/departments'
export default {
  // 定义props
  props: {
    treeNode: {
      type: Object, // 对象的类型
      required: true // 要求父组件调用时必须要传一个 treeNode 属性,否则报错
    },
    isRoot: { // 控制组件显示与影藏
      type: Boolean,
      default: false // 因为节点用的多 所以默认值给false
    }
  },
  methods: {
    operateDepts(type) {
      if (type === 'add') {
        // 添加部门
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        // 编辑部门
        this.$emit('editDepts', this.treeNode)
      } else if (type === 'remove') {
        // 删除部门
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          // 这里会返回promise对象,可以继续点then
        }).then(() => removeDepartments(this.treeNode.id)).then(() => {
          // 删除成功了才会进入这里
          this.$emit('removeDepts')
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
}
</script>

<style >
.user-dropdown {
  position: absolute !important;
  top: 38px !important;
  left: 1304px !important;
  z-index: 2001;
}
</style>

