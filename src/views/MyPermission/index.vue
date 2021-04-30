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
          >添加角色</el-button>
        </template>
      </page-tools>
      <el-card>
        <!-- 权限列表 -->
        <el-table :data="list" border="" row-key="id">
          <el-table-column
            align="center"
            label="角色名称"
            prop="name"
          />
          <el-table-column
            align="center"
            label="描述"
            prop="description"
          />
          <el-table-column align="center" label="操作">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                @click="showPermission(row.id, '查看')"
              >查看</el-button>
              <el-button type="text" @click="editPermission(row.id, '编辑')">编辑</el-button>
              <el-button type="text" @click="removePermission(row.id, '删除')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <permission-dialog
      
      :show-dialog.sync="showDialog"
      :get-permission-list="getPermissionList"
    />

    <add
      ref="prmFormData"
      :show-add-dialog.sync ="showAddDialog"
    />
  </div>
</template>

<script>
import { getPermissionList, removePermission, getPermissionDetail } from '@/api/permission'
import { transListToTreeData } from '@/utils'
import PermissionDialog from './components/permissionDialog'
import Add from './components/add'
export default {
  components: {
    PermissionDialog,
    Add
  },
  data() {
    return {
      showAddDialog:false,

      list: [],
      showDialog: false
    }
  },
  created() {
    this.getPermissionList()
    this.showUserInfo()
  },
  methods: {
    // 获取数据并渲染到表格
    async getPermissionList() {
      // this.list = transListToTreeData(await getPermissionList(), '0')
      this.list = this.$store.state.rolesAll

    },

    // 删除
    async removePermission(id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        //await removePermission(id)
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
    addPermission(type) {
      console.log(this.$refs.prmFormData.formData.id)
      this.$refs.prmFormData.type = type
      this.showAddDialog = true
    },
    async editPermission(id, type) {
      //this.$refs.prmFormData.formData = await getPermissionDetail(id)
      //this.$refs.prmFormData.formData.id = '1'这样给id，会两种界面都有
      //this.$refs.prmFormData.formData = await getPermissionDetail(id)
      for(var item of this.$store.state.rolesAll){
        if(item.id == id){
          this.$refs.prmFormData.formData = item
          this.$refs.prmFormData.showEditChecked()
          break
        }
      }
      this.$refs.prmFormData.type = type
      this.showAddDialog = true
    },

    showPermission(id, type){
      for(var item of this.$store.state.rolesAll){
        if(item.id == id){
          this.$refs.prmFormData.formData = item
          
          this.$refs.prmFormData.showEditChecked()
          break
        }
      }
      this.$refs.prmFormData.type = type
      console.log(this.$refs.prmFormData.type)
      this.showAddDialog = true
    },      
  
  }
}
</script>





<style>

.el-button{
  font-size: 18px;
}

</style>
