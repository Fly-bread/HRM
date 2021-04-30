<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 顶部栏 -->
      <page-tools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <template slot="after">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import?type=user')"
          >导入</el-button>
          <el-button
            size="small"
            type="danger"
            @click="exportExcelData"
          >导出</el-button>
          <el-button
            size="small"
            type="primary"
            :disabled="!checkPermission('POINT-USER-ADD')"
            @click="showDialog = true"
          >新增员工</el-button>
        </template>
      </page-tools>
      <!-- 主体表格分页 -->
      <el-card>
        <el-table
          border=""
          :data="list"
        >
          <el-table-column
            label="序号"
            sortable=""
            type="index"
          />
          <el-table-column
            header-align="center"
            align="center"
            label="姓名"
            sortable=""
            prop="username"
          />
          <el-table-column
            header-align="center"
            align="center"
            label="手机号"
            sortable=""
            prop="mobile"
          />
          <el-table-column
            header-align="center"
            align="center"
            label="工号"
            sortable=""
            prop="workNumber"
          />
          <el-table-column
            header-align="center"
            align="center"
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column
            header-align="center"
            align="center"
            label="部门"
            sortable=""
            prop="departmentName"
          />
          <el-table-column
            header-align="center"
            align="center"
            label="入职时间"
            sortable=""
            prop="timeOfEntry"
          >
            <template slot-scope="{ row }">{{ row.timeOfEntry | formatDate }}</template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="账号状态"
            sortable=""
            prop="enableState"
          >
            <template slot-scope="{row}">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="操作"
            fixed="right"
            width="280"
          >
            <template slot-scope="{ row }">

              <el-button
                type="text"
                size="small"
                :disabled="!checkPermission('POINT-USER-ADD')"
                @click="xixixixi(row.id)"
              >查看</el-button>
              <el-button
                type="text"
                size="small"
              >转正</el-button>
              <el-button
                type="text"
                size="small"
              >调岗</el-button>
              <el-button
                type="text"
                size="small"
              >离职</el-button>
              <el-button
                type="text"
                size="small"
                @click="editRole(row.id)"
              >角色</el-button>
              <el-button
                type="text"
                size="small"
                :disabled="!checkPermission('POINT-USER-ADD')"
                @click="removeEmployee(row.id)"
              >删除</el-button>

            </template>
          </el-table-column>
        </el-table>
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev,pager,next"
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <add-employee :show-dialog.sync="showDialog" />
    <!-- 分配角色弹窗 -->
    <assign-role
      ref="assignRole"
      :show-role-dialog.sync="showRoleDialog"
      :user-id="userid"
    />
  </div>
</template>

<script>
import { getEmployeesList, removeEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee'
import AssignRole from './components/assign-role'
import { formatDate } from '@/filters'
export default {
  components: {
    AddEmployee,
    AssignRole
  },
  data() {
    return {
      loading: false,
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      showDialog: false, // 控制新增的弹窗
      showRoleDialog: false, // 角色弹窗
      userid: null
    }
  },
  created() {
    this.getEmployeesList()
  },
  methods: {

    changePage(newPage) {
      this.page.page = newPage // 设置页码
      this.getEmployeesList() // 重新拉取数据
    },
    //这是定义函数
    async getEmployeesList() {
      this.loading = true // 数据请求回来之前显示loading
      const { total, rows } = await getEmployeesList(this.page)
      this.page.total = total // 赋值总条数
      this.list = rows // 所有的列表数据
      this.loading = false // 隐藏
    },
    // 格式化聘用形式
    formatEmployment(rew, column, cellValue, index) {
      const list = EmployeeEnum.hireType // 获取枚举数组
      const obj = list.find(item => item.id === cellValue)
      return obj ? obj.value : '未知' // 返回数据
    },
    async removeEmployee(id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await removeEmployee(id) // 删除角色
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getEmployeesList() // 重新拉取数据,渲染页面
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    //保存为execl
    exportExcelData() {
      // 表头的对应关系
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职如期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }

      // 使用懒加载
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeesList({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows)

        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工信息表',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    formatJson(headers, rows) {
      // 首先要遍历数组
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            // 返回格式化之前的时间
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            var en = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return en ? en.value : '未知'
          }
          return item[headers[key]]
        })
      })
    },
    xixixixi(id) {
      this.$router.push(`/employees/detail/${id}`)
    },
    async editRole(id) {
      this.userid = id // props的传值是异步
      //console.log(id)
      await this.$refs.assignRole.getUserDetailById(id)
      this.showRoleDialog = true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
