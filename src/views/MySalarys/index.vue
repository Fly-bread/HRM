<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 条件筛选 -->
      <el-card class="hr-block">
        <el-form label-width="120px">
          <el-form-item label="聘用形式:">
            <!-- <el-checkbox-group v-model="formData.approvalsTypeChecks">
              <el-checkbox
                v-for="item in approvalsType"
                :key="item.id"
                :label="item.id"
                @change="changeParams"
              >{{ item.value }}</el-checkbox> -->
            <el-radio v-model="formalOrNotState" label="正式" @change="changeParams">正式</el-radio>
            <el-radio v-model="formalOrNotState" label="非正式" @change="changeParams">非正式</el-radio>
            <el-radio v-model="formalOrNotState" label="未知" @change="changeParams">未知</el-radio>
            <el-radio v-model="formalOrNotState" label="所有" @change="changeParams">所有</el-radio>
          </el-form-item>
        </el-form>
      </el-card>
      
      <el-card class="hr-block">
        <el-table :data="list" style="width: 100%">
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="username" label="姓名" width="100" />
          <el-table-column prop="phone" label="手机" width="130" />
          <el-table-column prop="worknumber" label="工号" width="100" />
          <el-table-column prop="formalOrNot"  width="100" label="聘用形式" />

          <el-table-column prop="lastSalaryDate" width="250" label="前工资设定时间" sortable>
          </el-table-column>

          <el-table-column prop="lastSalaryBase" width="130" label="前工资基数"  :disabled ='true'>
          </el-table-column>      

          <el-table-column prop="nowSalaryDate" width="250px" label="现工资设定时间" sortable>
          </el-table-column>

          <el-table-column prop="nowSalaryBase" width="130" label="现工资基数"  :disabled ='true'>
          </el-table-column>      
          <el-table-column label="操作" width="260">
            <template slot-scope="scope" style>
              <el-button
                v-if="scope.row.nowSalaryBase > 0 "
                size="mini"
                type="primary"
                @click="changeSalary('ChangeSalary',scope.row.id)"
              >调薪</el-button>
              <el-button
                v-else
                size="mini"
                type="danger"
                @click="fixedSalary('FixedSalary',scope.row.id)"
              >定薪</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" style="height: 50px" align="middle">
          <el-pagination
            background
            layout="prev,pager,next"
            :total="page.total"
            :current-page="page.page"
            :page-size="page.pageSize"
            @current-change="changePage"
          />

        </el-row>
      </el-card>
      <!--查看弹框-->
      <el-dialog :title="topLabel" :visible.sync="centerDialogVisible" width="50%" left>
        <!-- 传入数据 -->
        <component 
          :is="currentComponent" 
          :user-salary="selectedSalaryInfo" 
          :user-id="selectUserId" 
          @success="getSalarysbaseList" 
          @onDialogCancel="centerDialogVisible=false" 
          @setNew='setNewData'/>
        <!-- <ChangeSalary v-if="seeState == 'changeSalary'" :user-salary="selectedSalaryInfo" :user-id="selectUserId" @onDialogCancel="centerDialogVisible=false" /> -->
        <!-- <FixedSalary v-if="seeState == 'fixedSalary'" /> -->
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getSalarysbaseList, getTips, getSalaryDetail, getCompanySetting } from '@/api/salarys'
import EmployeeData from '@/api/constant/employees'
import { getDepartments } from '@/api/departments'
import ChangeSalary from './components/change-salary'
import FixedSalary from './components/fixed-salary'
import { Message } from 'element-ui'
export default {
  name: 'UsersTableIndex',
  components: { ChangeSalary, FixedSalary },
  data() {
    return {
      formalOrNotState:'',

      listAll:[],
      list:[],

      seeState: '',
      centerDialogVisible: false,
      topLabel: '转正',
      approvalsType: EmployeeData.hireType,
      approvalsState: EmployeeData.workingState,
      department: [],
      subsidyScheme: [],
      list: [],
      listAll:[],
      departments: [],
      loading: false,
      page: {
        total: 0,
        page: 1,
        pageSize: 10
      },
      tips: {},
      yearMonth: '',
      formData: {
        approvalsTypeChecks: [],
        approvalsStateChecks: [],
        departmentChecks: []
      },
      selectedSalaryInfo: {},
      selectUserId: null,
      currentComponent: ''

    }
  },
  computed: {
    tipsInfo() {
      // return `本月${this.tips.dateRange}：入职 ${this.tips.worksCount} 离职 ${this.tips.leavesCount} 调薪 ${this.tips.adjustCount} 未定薪 ${this.tips.unGradingCount}`
      return `本月0：入职 0 离职 0 调薪 0 未定薪 0`
    }
  },
  created() {
    this.getSalarysbaseList() // 获取工资
    // this.getDepartments() // 获取组织
      this.page.total = 2
  },
  methods: {
    // 对聘用形式进行文本显示
    // 这是员工那一栏的展示，不是选项框那一栏的展示
    // formatEmployment(row) {
    //   const data = this.approvalsType.find(item => item.id === row.formOfEmployment.toString())
    //   return data ? data.value : '未知'
    // },
    

    //组件绑定函数
    changeParams() {
      this.page.page = 1 // 重置第一页
      this.showTb() // 重新拉取工资数据
    },
    
    

    //组件子函数
    showTb(){
      this.list = []
      if(this.formalOrNotState != '所有'){
        for(var item of this.listAll)
          if(item.formalOrNot == this.formalOrNotState){
            this.list.push(item)
          }
      }
      else{
        this.list = this.listAll
      }
    },







    //显示数据
    async  getSalarysbaseList() {
      //这是报表
      // const data = await getCompanySetting()
      // this.yearMonth = data.dataMonth
      let userid = this.$store.getters.userid
      let json = {
        userid:userid
      }
      this.loading = true
      const temp = await getSalarysbaseList(json)
      if(temp){
          const {rows, total} = temp
          this.listAll = rows
          this.page.total = total
      }
      else{
          Message.error('没有权限查看基础工资表')
      }

      this.loading = false

    },
    // 获取组织列表
    async  getDepartments() {
      const { depts } = await getDepartments()
      this.departments = depts
    },
    async getTips() {
      const { tipsRes } = await getTips()
      this.tips = tipsRes
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getSalarysbaseList()
    },
    async  changeSalary(key, userid) {
      this.topLabel = '调薪'
      this.currentComponent = key
      this.centerDialogVisible = true
      this.selectUserId = userid
      //this.selectedSalaryInfo = await getSalaryDetail(userid)
      for(var item of this.listAll){
        if(item.id == userid){
          this.selectedSalaryInfo = item.salaryOfNew
          break
        }
      }
    },
    fixedSalary(key) {
      this.topLabel = '定薪'
      this.currentComponent = key
      this.centerDialogVisible = true
    },
    // 查询参数发生变化


    setNewData(salaryOfNewSet){
      for(var item of this.listAll){
        if(item.id == this.selectUserId){
          item.salaryOfLast = item.salaryOfNew
          item.salaryOfNew = salaryOfNewSet
          item.timeOfLast = item.timeOfNew
          item.timeOfNew = new Date()
        }
      }
    }
  }
}
</script>
