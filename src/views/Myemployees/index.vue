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
          <!-- <el-button
            size="small"
            type="danger"
            @click="exportExcelData"
          >导出</el-button> -->
          <el-button
            size="small"
            type="primary"
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
            label="工号"
            sortable=""
            prop="worknumber"
          />          
          <el-table-column
            header-align="center"
            align="center"
            label="手机号"
            sortable=""
            prop="phone"
          />

          <el-table-column
            header-align="center"
            align="center"
            label="聘用形式"
            sortable=""
            prop="formalOrNot"
            
          />
          <el-table-column
            header-align="center"
            align="center"
            label="入职时间"
            sortable=""
            prop="entryDate"
          >
            <template slot-scope="{ row }">{{ row.entryDate | formatDate }}</template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="账号状态"
            sortable=""
            prop="state"
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
                :disabled="checkPermission('POINT-USER-ADD')"
                @click="xixixixi(row.id)"
              >查看</el-button>
              <el-button
                type="text"
                size="small"
              >转正</el-button>
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
                :disabled="checkPermission('point-user-delete')"
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
    <!-- <add-employee :show-dialog.sync="showDialog" @addEmployee='addEmployee'/> -->
    <!-- 分配角色弹窗 -->
    <!-- <assign-role
      ref="assignRole"
      :show-role-dialog.sync="showRoleDialog"
      :user-id="userid"
    /> -->
  </div>
</template>

<script>
import { getEmployeesList, removeEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
// import AddEmployee from './components/add-employee'
// import AssignRole from './components/assign-role'
import { formatDate } from '@/filters'
import { Message } from 'element-ui'
export default {
  components: {
    // AddEmployee,
    // AssignRole
  },
  data() {
    return {
      formData: {
        username: '',
        phone: '',
        formalOrNot: '',
        workNumber: '',
        entryDate: '',
      },

      loading: false,
      list: [
      ],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      showDialog: false, // 控制新增的弹窗
      showRoleDialog: false, // 角色弹窗
      userid: null,
    }
  },
  created() {
    this.getEmployeesList()
    // this.showPermission()
  },
  methods: {

    changePage(newPage) {
      this.page.page = newPage // 设置页码
      this.getEmployeesList() // 重新拉取数据
    },
    //这是定义函数
    async getEmployeesList() {
      let userid = this.$store.getters.userid
      let json = {
        userid:userid
      }
      this.loading = true // 数据请求回来之前显示loading
      const res = await getEmployeesList(json)
      if(res){
        const { total, rows } = res
        this.page.total = this.list.length // 赋值总条数
        this.page.total = total // 赋值总条数
        this.list = rows // 所有的列表数据
      }
      else{
        Message.error('没有权限查看用户表')
      }
      

      this.loading = false // 隐藏,有这个就是一直转

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
    // exportExcelData() {
    //   // 表头的对应关系
    //   const headers = {
    //     '姓名': 'username',
    //     '手机号': 'mobile',
    //     '入职如期': 'timeOfEntry',
    //     '聘用形式': 'formOfEmployment',
    //     '转正日期': 'correctionTime',
    //     '工号': 'workNumber',
    //   }

    //   // 使用懒加载
    //   import('@/vendor/Export2Excel').then(async excel => {
    //     const { rows } = await getEmployeesList({ page: 1, size: this.page.total })
    //     const data = this.formatJson(headers, rows)

    //     excel.export_json_to_excel({
    //       header: Object.keys(headers),
    //       data,
    //       filename: '员工信息表',
    //       autoWidth: true,
    //       bookType: 'xlsx'
    //     })
    //   })
    // },
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
    },

    addEmployee(username, workNumber, mobile){
      this.formData = {}  //必须得有这一步，这样新开一个空间，才能存入新数据，否则新数据全是一样的
      this.formData.username = username
      this.formData.workNumber = workNumber
      this.formData.mobile = mobile
      this.list.push(this.formData)
      this.getEmployeesList()
    },


  }
}

</script>

<style lang="less" scoped>
</style>
