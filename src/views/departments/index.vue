<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 卡片组件  页面基本布局 -->
      <el-card class="tree-card">
        <!-- 头部(公司名称) -->
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 主体 -->
          <tree-tools slot-scope="{ data }" :tree-node="data" @removeDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
        </el-tree>
      </el-card>
      <addDept ref="getDeptDetails" :show-dialog.sync="showDialog" :tree-node="node" @anewInit="getDepartments" />
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import addDept from './components/add-dept'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools,
    addDept
  },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [],
      company: {},
      showDialog: false, // 显示新增窗体
      node: null,
      loading: false
    }
  },
  created() {
    this.getDepartments() // 调用 methods 方法
  },
  methods: {
    async getDepartments() {
      this.loading = true // 获取数据之前显示loading
      const res = await getDepartments() // 调用 api 接口
      this.company = { name: res.companyName, manager: '负责人', id: '' }
      this.departs = transListToTreeData(res.depts, '')
      this.loading = false // 结束之后关闭
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true // 显示新增 / 编辑 组件
      this.node = node // 存储子组件传递数据
      // 父组件 调用子组件的方法
      this.$refs.getDeptDetails.getDepartDetail(node.id)
    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
