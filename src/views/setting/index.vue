<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- element 标签页 -->
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row class="padding-el-row">
              <el-row>
                <el-button type="primary" size="small" icon="el-icon-plus" @click="addRole">新增角色</el-button>
              </el-row>
              <!-- 展示数据表格 -->
              <el-table v-loading="loading" :data="list" border>
                <el-table-column
                  header-align="center"
                  align="center"
                  label="序号"
                  width="120"
                  type="index"
                />
                <el-table-column
                  header-align="center"
                  align="center"
                  prop="name"
                  label="角色名称"
                  width="120"
                />
                <el-table-column label="描述" header-align="center" prop="description" />
                <el-table-column label="操作" header-align="center" align="center">
                  <template slot-scope="{ row }">
                    <el-button
                      size="small"
                      type="success"
                      @click="assignPerm(row.id)"
                    >分配权限</el-button>
                    <el-button
                      size="small"
                      type="primary"
                      @click="editRole(row.id)"
                    >{{ $t("table.edit") }}</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="removeRole(row.id)"
                    >{{ $t("table.delete") }}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center">
              <el-pagination
                layout="prev,pager,next"
                :total="page.total"
                :page-size="page.pagesize"
                :current-page="page.page"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <!-- 公司信息 -->
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form ref="formData" :model="roleForm" :rules="rules" label-width="100px" style="margin-top: 20px">
              <el-form-item label="公司名称" prop="name">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 放置一个弹层组件  编辑 新增 -->
    <el-dialog title="编辑弹层" :visible="showDialog" @close="btnCancel">
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="roleForm.name"
            style="width: 600px"
          />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" style="width: 600px" />
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col>
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 分配权限弹出层 -->
    <permission
      ref="permission"
      :role-id="roleId"
      :perm-data="permData"
      :show-perm-dialog.sync="showPermDialog"
    />
  </div>
</template>

<script>
import Permission from './components/Permission'
import { getRoleList, getCompanyInfo, removeRole, updataRole, getRoleDetails, addRole } from '@/api/setting'
import { mapGetters } from 'vuex'
import { transListToTreeData } from '@/utils'
import { getPermissionList } from '@/api/permission'
export default {
  components: {
    Permission
  },
  data() {
    return {
      loading: false, // loading 加载 默认不显示
      list: [], // 角色数据
      page: {
        // 分页数据
        page: 1,
        pagesize: 3,
        total: 0 // 总条数
      },
      formData: {},
      roleForm: {},
      showDialog: false,
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      showPermDialog: false, // 权限弹出层
      permData: [],
      roleId: null
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList() // 渲染角色数据
    this.getCompanyInfo() // 渲染公司数据
  },
  methods: {
    // 获取角色数据
    async getRoleList() {
      // 获取数据前 loading 加载
      this.loading = true
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    // 获取公司信息
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    // 点击页签数据动态变化
    changePage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    // 删除角色
    removeRole(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeRole(id)
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getRoleList() // 渲染角色数据
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑角色
    async editRole(id) {
      console.log(this.formData.id)
      this.showDialog = true
      this.roleForm = await getRoleDetails(id)
    },
    // 点击确定提交编辑和新增
    btnOK() {
      this.$refs.roleForm.validate(async isOK => {
        if (isOK) {
          // 编辑弹框要兼容新增  判断formData有没有id可以判断时编辑或新增
          if (this.roleForm.id) {
            // 编辑
            await updataRole(this.roleForm)
          } else {
            // 新增
            await addRole(this.roleForm)
          }
          this.showDialog = false // 隐藏弹窗
          this.getRoleList() // 重新获取数据
        }
      })
    },
    // 取消按钮
    btnCancel() {
      this.roleForm = {} // 清空数据重置 input
      this.$refs.roleForm.resetFields() // 重置form表单校验
      this.showDialog = false // 点击取消隐藏弹窗
    },
    // 新增角色
    addRole() {
      console.log(this.formData.id)
      this.showDialog = true
    },
    async getPermissionList() { // 获取树形数据
      this.permData = transListToTreeData(await getPermissionList({ enVisible: '1' }), '0')
    },
    // 点击分配权限
    async assignPerm(id) {
      this.roleId = id // 记录点击的角色id
      this.getPermissionList() // 获取所有的权限数据
      const { permIds } = await getRoleDetails(id) // permIds就是角色所拥有的权限的点
      this.$refs.permission.selectCheck = permIds
      this.showPermDialog = true // 显示弹窗
    }
  }
}
</script>

<style lang="less" scoped>
</style>

<style>
/* 修改 element-ui 部分样式 */

.el-tabs__item {
  font-size: 18px;
}

.padding-el-row {
  padding: 30px;
}

.el-table {
  margin-top: 15px;
}

.el-table th {
  background-color: #fafafa;
  height: 60px;
}

.el-alert {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
}

.el-form-item {
  margin-bottom: 15px;
  margin-right: 40px;
}
</style>
