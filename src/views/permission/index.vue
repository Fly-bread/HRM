<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template slot="after">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="addPermission('0', 1)"
          >添加菜单</el-button>
        </template>
      </page-tools>
      <el-card>
        <!-- 权限列表 -->
        <el-table :data="list" border="" row-key="id">
          <el-table-column
            align="center"
            label="菜单名称"
            prop="name"
          />
          <el-table-column
            align="center"
            label="权限标识"
            prop="code"
          />
          <el-table-column
            align="center"
            label="描述"
            prop="description"
          />
          <el-table-column align="center" label="操作">
            <template slot-scope="{ row }">
              <el-button
                v-if="row.type === 1"
                type="text"
                @click="addPermission(row.id, 2)"
              >添加</el-button>
              <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
              <el-button type="text" @click="removePermission(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <permission-dialog
      ref="prmFormData"
      :show-dialog.sync="showDialog"
      :get-permission-list="getPermissionList"
    />
  </div>
</template>

<script>
import { getPermissionList, removePermission, getPermissionDetail } from '@/api/permission'
import { transListToTreeData } from '@/utils'
import PermissionDialog from './components/permissionDialog'
export default {
  components: {
    PermissionDialog
  },
  data() {
    return {
      list: [],
      showDialog: false
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取数据并渲染到表格
    async getPermissionList() {
      this.list = transListToTreeData(await getPermissionList(), '0')
    },

    // 删除
    async removePermission(id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await removePermission(id)
        await this.getPermissionList() // 重新获取页面数据
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (error) {
        console.log(error)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    addPermission(pid, type) {
      this.$refs.prmFormData.formData.pid = pid
      this.$refs.prmFormData.formData.type = type
      console.log(this.$refs.prmFormData.formData.id)
      // console.log(this.$refs.prmFormData.formData.pid)
      // console.log(this.$refs.prmFormData.formData.type)
      this.showDialog = true
    },
    async editPermission(id) {
      this.$refs.prmFormData.formData = await getPermissionDetail(id)
      console.log(this.$refs.prmFormData.formData.id)
      this.showDialog = true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
