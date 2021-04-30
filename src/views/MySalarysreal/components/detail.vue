<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <div>
          <img src="@/assets/common/img.jpeg" class = 'appleImg' width="100" height="100"  alt>
          <b >{{username + '的工资记录'}}</b>
        </div>

        <div>
          <el-form>
            <el-form-item label="选择月份" class = 'selectMonth_L'>
              <!-- showData是一选择月份，就向后端发送请求，要展示该月数据。
              本页面是写死的数据，所以不好展示 -->
              <el-date-picker v-model="selectMonth" type="month" value-format="yyyy-MM"  placeholder="选择月" @change ='showData(selectMonth)'/>
            </el-form-item>
          </el-form>
        </div> 

      </el-card>

      <el-card class="hr-block">
        <el-table :data="list" style="width: 100%" :row-class-name="rowClassName">
          <el-table-column type="index" label="序号" min-width='5' />
          <el-table-column prop="username" label="姓名" min-width="9.5" />
          <el-table-column prop="mobile" label="手机" min-width="9.5" />
          <el-table-column prop="workNumber" label="工号" min-width="9.5" />
          <el-table-column prop="formOfEmployment" :formatter="formatEmployment" min-width="9.5" label="聘用形式"/>

          <el-table-column prop="virtualSalary" min-width="9.5" label="工资基数" >>
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="showVirtualSalary(scope.row,scope.row.num)"   >{{scope.row.virtualSalary}}</el-button>
              </template>
          </el-table-column>

          <el-table-column prop="reduceSalary" min-width="9.5" label="本月扣除工资">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="showReduceSalary(scope.row)">{{scope.row.reduceSalary}}</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="award" min-width="9.5" label="本月奖金">
              <template slot-scope="scope">
                <el-button type="text" size="small"  @click="showAward(scope.row)" >{{scope.row.award}}</el-button>
              </template>
          </el-table-column>

          <el-table-column prop="tax" min-width="9.5" label="缴税">
              <template slot-scope="scope">
                <el-button type="text" size="small"   @click="showTax(scope.row)" >{{scope.row.tax}}</el-button>
              </template>
          </el-table-column>

          <el-table-column prop="social" min-width="9.5" label="社保缴费">
              <template slot-scope="scope">
                <el-button type="text" size="small"  @click="$router.push(`/social_securitys/detail/${scope.row.id}`)" >{{scope.row.social}}</el-button>
              </template>
          </el-table-column>

          <el-table-column  min-width="9.5" label="实发金额">
              <template slot-scope="scope">
                <el-tag type="text" size="small" >{{showRealSalary(scope.row)}}</el-tag>
              </template>            
          </el-table-column>

        </el-table>

        <!--页数-->
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

      <!--点击出来的弹框-->
      <virtual-salary 
        :title="VirtualSalarytitle"
        :show-virtual-salary-dialog.sync="showVirtualSalaryDialog"
        :base-salary ="baseSalary"
        salary-of-last ='123'
      />
      <reduce-salary
        :title="ReduceSalarytitle"
        :show-reduce-salary-dialog.sync="showReduceSalaryDialog"
      />

      <award
        :title="Awardtitle"
        :show-award-dialog.sync="showAwardDialog"
      />

      <tax
        :title="Taxtitle"
        :show-tax-dialog.sync="showTaxDialog"
      />


      <real-salary
        :title="RealSalarytitle"
        :show-real-salary-dialog.sync="showRealSalaryDialog"
      />



        
    </div>
  </div>
</template>
<script>


import { getSalarysbaseList, getTips, getSalaryDetail, getCompanySetting } from '@/api/salarys'
import EmployeeData from '@/api/constant/employees'
import { getDepartments } from '@/api/departments'
import ChangeSalary from '../components/change-salary'
import FixedSalary from '../components/fixed-salary'
import VirtualSalary from '../components/virtualSalary'
import ReduceSalary from '../components/reduce-salary'
import Award from '../components/award'
import Tax from '../components/tax'
import RealSalary from '../components/realSalary'

export default {
  name: 'UsersTableIndex',
  components: {
     ChangeSalary, 
     FixedSalary ,
     VirtualSalary,
     ReduceSalary,
     Award,
     Tax,
     RealSalary,
  },
  data() {
    return {
      VirtualSalarytitle: '',
      showVirtualSalaryDialog: false,
      baseSalary:'1111',
      showReduceSalaryDialog:false,
      ReduceSalarytitle:'',
      showAwardDialog:false,
      Awardtitle:'',
      showTaxDialog:false,
      Taxtitle:'',
      showSocialDialog:false,
      Socialtitle:'',
      showRealSalaryDialog:false,
      RealSalarytitle:'',

      selectMonth:'',
      username:'',

      sizeForm: {},
      list:[],
      listAll:[],

      seeState: '',
      topLabel: '转正',
      approvalsType: EmployeeData.hireType,
      approvalsState: EmployeeData.workingState,
      department: [],
      subsidyScheme: [],
      list: [],
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
      currentComponent: '',

      
    }
  },
  computed: {
    tipsInfo() {
      // return `本月${this.tips.dateRange}：入职 ${this.tips.worksCount} 离职 ${this.tips.leavesCount} 调薪 ${this.tips.adjustCount} 未定薪 ${this.tips.unGradingCount}`
      return `本月0：入职 0 离职 0 调薪 0 未定薪 0`
    }
  },
  created() {
    //this.getSalarysbaseList() // 获取工资
    //this.getDepartments() // 获取组织

    //写死数据

      //数据写死
      this.listAll = [{
        username:'史莱姆',
        id:'987',
        mobile:'13054124514',
        workNumber:'12345',
        workType:'前端',
        formOfEmployment:'正式',
        virtualSalary:5000,
        reduceSalary:500,
        award:400,
        tax:100,
        social:100,
        realSalary:0,
        date:'2021-03'
      },
      {
        username:'史莱姆',
        id:'987',
        mobile:'13054124514',
        workNumber:'12345',
        workType:'前端',
        formOfEmployment:'正式',
        virtualSalary:6000,
        reduceSalary:500,
        award:400,
        tax:100,
        social:100,
        realSalary:0,
        date:'2021-02'
      },     

      {
        username:'暴龙哥',
        id:'123',
        mobile:'13054124114',
        workNumber:'94574',
        workType:'后端',
        formOfEmployment:'非正式',
        virtualSalary:5400,
        reduceSalary:510,
        award:40,
        tax:10,
        social:1000,
        realSalary:0,
        date:'2020-03'
      },
      {
        username:'暴龙哥',
        id:'123',
        mobile:'13054124114',
        workNumber:'94574',
        workType:'后端',
        formOfEmployment:'非正式',
        virtualSalary:5500,
        reduceSalary:510,
        award:40,
        tax:10,
        social:1000,
        realSalary:0,
        date:'2020-04'
      },
      ]
      // this.selectMonth = ''
      this.sizeForm.id = this.$route.params.id
      //找到用户名
      for(var item of this.listAll){
        if(item.id == this.sizeForm.id){
          this.username = item.username
          break
        }
      }



  },
  methods: {
    // 对聘用形式进行文本显示
    formatEmployment(row) {
      const data = this.approvalsType.find(item => item.id === row.formOfEmployment.toString())
      return data ? data.value : '未知'
    },
    async  getSalarysbaseList() {
      const data = await getCompanySetting()
      this.yearMonth = data.dataMonth
      this.loading = true
      const { rows, total } = await getSalarysbaseList({ ...this.page, ... this.formData })
      this.list = rows
      this.page.total = total
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
    // 查询参数发生变化
    changeParams() {
      // this.page.page = 1 // 重置第一页
      // this.getSalarysbaseList() // 重新拉取工资数据



    },

    showRealSalary(row){
      return row.virtualSalary - row.reduceSalary + row.award-row.tax - row.social
    },

    showVirtualSalary(row, index){
      this.showVirtualSalaryDialog = true
      this.VirtualSalarytitle = row.username + '的工资基数'
    },

    showReduceSalary(row){
      this.showReduceSalaryDialog = true
      this.ReduceSalarytitle = row.username + '的工资扣除记录'
    },
    showAward(row){
      this.showAwardDialog = true
      this.Awardtitle = row.username + '的奖金记录'
    },
    showTax(row){
      this.showTaxDialog = true
      this.Taxtitle = row.username + '的缴税记录'
    },

    // showRealSalary(row){
    //   this.showRealSalaryDialog = true
    //   this.RealSalarytitle = row.username + '的工资记录'
    // },



    showData(month){
      this.list = []
      for(var item of this.listAll){
        if(item.id == this.sizeForm.id)
          if(item.date == month){
            this.list.push(item)
          }
        
      }
    },


    rowClassName({row, rowIndex}){
      row.num = rowIndex
    }
  }
}
</script>

<style>
.appleImg{
  vertical-align:middle
}

b{
  font-size:36px;
  margin-top:1000px
}

.selectMonth_L{
  margin-left: 25px;
}

.selectMonth_L .el-form-item__label{
  font-size: 20px;
}



</style>
