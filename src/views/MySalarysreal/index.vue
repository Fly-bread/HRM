<template>
  <div class="dashboard-container">
    <div class="app-container">

      <el-card>
          <img src="@/assets/common/img.jpeg"  class="imgApple">
          <b class="font36px">实发工资表</b>

          <el-form>
              <el-form-item label="选择月份" label-width="100px" >
                <div class="flex">
                  <el-date-picker type="month" value-format="yyyy-MM" v-model="month" @change="changeMonth"/>
                  <div class="btn">
                    <el-button
                    type="primary"
                    :disabled ="!checkPermission('salarysreal-add')"
                    :title="showPermission('salarysreal-add')"
                    @click="showAddData"
                    >添加数据</el-button>    
                  </div>
                </div>              
              </el-form-item>              
          </el-form>
      </el-card>

      <el-card class="hr-block">
        <el-table :data="list" style="width: 100%" :row-class-name="rowClassName">
          <el-table-column type="index" label="序号" />

          <el-table-column prop="username" label="姓名" >
              <template slot-scope="scope">
                <el-button type="text" size="small"  @click="$router.push(`/salarys/details/${scope.row.id}`)" >{{scope.row.username}}</el-button>
              </template>
          </el-table-column>

          <el-table-column prop="worknumber" width="100px" label="工号"  />
        

          <el-table-column prop="salaryNorm" width="100px"  label="标准工资" >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="showVirtualSalary(scope.row,scope.row.num)"   >{{scope.row.salaryNorm}}</el-button>
              </template>
          </el-table-column>

          <el-table-column prop="attendanceAll" width="100px"  label="考勤天数" >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="showVirtualSalary(scope.row,scope.row.num)"   >{{scope.row.attendanceAll}}</el-button>
              </template>
          </el-table-column>    

          <el-table-column prop="attendanceReal" width="100px"  label="实到天数" />  
         <el-table-column prop="phoneCompensation" width="100px"  label="话补" />
         <el-table-column prop="reduceFromAttendance" width="100px"  label="缺勤扣款" />
         <el-table-column prop="reduceFromOther" width="100px"  label="其它扣款" />
         <el-table-column prop="salaryShould" width="100px"  label="应发工资" />

          <el-table-column prop="providentBase" width="100px"  label="公积金基数">
              <template slot-scope="scope">
                <el-button type="text" size="small"  @click="$router.push(`/social_securitys/detail/${scope.row.id}`)" >{{scope.row.providentBase}}</el-button>
              </template>
          </el-table-column>

         <el-table-column prop="pensionPersonal" width="100px"  label="个人养老" /> 
         <el-table-column prop="unemploymentPersonal"  width="100px" label="个人失业" /> 
         <el-table-column prop="medicalPersonal" width="100px"  label="个人医疗" /> 
         <el-table-column prop="medicalLarge"  width="100px" label="大额医疗" /> 
         <el-table-column prop="providentPersonal" width="100px"  label="个人公积金" /> 
         <el-table-column prop="totalPersonal" width="100px"  label="个人小计" /> 
         <el-table-column prop="salaryBeforeTax" width="100px"  label="税前工资" /> 
          <el-table-column prop="tax"  width="120px" label="代扣个人所得税">
              <template slot-scope="scope">
                <el-button type="text" size="small"  @click="$router.push(`/social_securitys/detail/${scope.row.id}`)" >{{scope.row.tax}}</el-button>
              </template>
          </el-table-column>
          <el-table-column prop="award"  width="100px" label="奖金" />
         <el-table-column prop="salaryReal" width="100px"  label="实发工资" /> 

         <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button type="text"  
              @click="showLookData(scope.row)" 
              :disabled="!checkPermission('salarysreal-look')"
              :title="showPermission('salarysreal-look')"
              >查看</el-button>
              <el-button type="text"  
              @click="showEditData(scope.row)" 
              :disabled="!checkPermission('salarysreal-edit')"
              :title="showPermission('salarysreal-edit')"
              >编辑</el-button>
              <el-button type="text"  
              @click="showDeleteData(scope.row)" 
              :disabled="!checkPermission('salarysreal-delete')"
              :title="showPermission('salarysreal-delete')"
              >删除</el-button>
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



      <tax
        :title="Taxtitle"
        :show-tax-dialog.sync="showTaxDialog"
      />


      <real-salary
        :title="RealSalarytitle"
        :show-real-salary-dialog.sync="showRealSalaryDialog"
      />


      <add-edit
        ref="tempAddEdit"
        :show-add-edit-dialog.sync ="showAddEditDialog"
      />
        
    </div>
  </div>
</template>
<script>
import AddEdit from './temp/addEdit'

import { getSalarysrealList, deleteSalaryreal } from '@/api/salarysReal'
import EmployeeData from '@/api/constant/employees'
import ChangeSalary from './components/change-salary'
import FixedSalary from './components/fixed-salary'
import VirtualSalary from './components/virtualSalary'
import ReduceSalary from './components/reduce-salary'
import Award from './components/award'
import Tax from './components/tax'
import RealSalary from './components/realSalary'
import { Message } from 'element-ui'

export default {
  name: 'UsersTableIndex',
  components: {
     ChangeSalary, 
     FixedSalary ,
     VirtualSalary,
     Award,
     Tax,
     RealSalary,
     AddEdit
  },
  data() {
    return {
      showAddEditDialog:false,


      month:'',
      list: [],

      VirtualSalarytitle: '',
      showVirtualSalaryDialog: false,
      baseSalary:'1111',
      showAwardDialog:false,
      Awardtitle:'',
      showTaxDialog:false,
      Taxtitle:'',
      showSocialDialog:false,
      Socialtitle:'',
      showRealSalaryDialog:false,
      RealSalarytitle:'',


      selectMonth:'',


      seeState: '',
      topLabel: '转正',
      approvalsType: EmployeeData.hireType,
      approvalsState: EmployeeData.workingState,
      department: [],
      subsidyScheme: [],
      
      departments: [],
      loading: false,
      page: {
        total: 0,
        page: 1,
        pageSize: 10
      },
      tips: {},
      yearMonth: '',
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
    this.month = this.getDateYM()
    this.getSalarysrealList() // 获取工资
    //this.getDepartments() // 获取组织
    //写死数据

      //数据写死
      this.list = []
      // this.selectMonth = ''



  },
  methods: {
    // 对聘用形式进行文本显示
    formatEmployment(row) {
      const data = this.approvalsType.find(item => item.id === row.formOfEmployment.toString())
      return data ? data.value : '未知'
    },



    //组件绑定
    changeMonth(){
      this.getSalarysrealList()
    },

    //换页
    changePage(newPage) {
      this.page.page = newPage
      this.getSalarysrealList()
    },    
    showAddData(){
      this.showAddEditDialog = true
      this.$refs.tempAddEdit.type = '添加'
      this.$refs.tempAddEdit.month = this.getDateYM()
      //如果是增加数据，则可以修改月份
      this.$refs.tempAddEdit.dateState = false
    },
    tempFunc(){

    },
    showEditData(row){
      this.showAddEditDialog = true
      this.$refs.tempAddEdit.type = '编辑'
      this.$refs.tempAddEdit.formData = JSON.parse(JSON.stringify(row))
      this.$refs.tempAddEdit.month = row.month
      //如果是修改数据，则不能修改月份
      this.$refs.tempAddEdit.dateState = true
    },

    showLookData(row){
      this.showAddEditDialog = true
      this.$refs.tempAddEdit.type = '查看'
      this.$refs.tempAddEdit.formData = JSON.parse(JSON.stringify(row))
      this.$refs.tempAddEdit.month = row.month
      //如果是修改数据，则不能修改月份
      this.$refs.tempAddEdit.dateState = true      
    },

    showDeleteData(row){
      this.$confirm('即将删除数据，是否继续？', '提示', {
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        cancelButtonClass:'cancelButton',
        type:'warning'
      }).then(async () => {
        let AdminUserid = this.$store.getters.userid
        let json = {
          'AdminUserid':AdminUserid,
          'worknumber':row.worknumber,
          'username':row.username,
          'month':row.month
        }
        let result = await deleteSalaryreal(json)
        this.showResult(result)
      }).catch((error) =>{
        console.log(error)
          this.$message({
              type:'info',
              message:'已取消修改'
          })        
      })
    },





    //组件的展示函数
    showResult(result){
      if(result == 'id有误，无法根据id找到管理员'){
          Message.error('id有误，无法根据id找到管理员')
      }
      else if(result == '没有权限删除实发工资列表'){
          Message.error('没有权限删除实发工资列表')
      }
      else if(result == '工号有误，无法根据工号找到用户'){
          Message.error('工号有误，无法根据工号找到用户')
      }
      else if(result == '员工姓名有误，请重新输入'){
          Message.error('员工姓名有误，请重新输入')
      }
      else if(result == '数据不存在，无法删除'){
          Message.error('数据不存在，无法删除')
      }    
      else if(result == '成功删除记录'){
          this.getSalarysrealList()
          Message.success('成功删除记录')
      } 
      else if(result == '删除记录失败'){
          Message.error('删除记录失败')
      }   
    },









    //数据显示
    async  getSalarysrealList() {
      let userid = this.$store.getters.userid
      let month = this.month
      let json = {
        userid:userid,
        month:month
      }
      this.loading = true
      const temp = await getSalarysrealList(json)
      if(temp){
        const { rows, total } = temp
        this.list = rows
        this.page.total = total
        this.loading = false
      }
      else{
        Message.error('没有权限查看实发工资表')
      }

    },




    //得到临时变量的函数
    //得到当前日期
    getDateYM(){
      let str = new Date()
      let year = str.getFullYear()
      let month = str.getMonth()+1<10 ? '0' + (str.getMonth()+1) : (str.getMonth()+1)
      return year + '-' + month
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

    routerToReduce(row){
      this.$router.push({
        //path:`/actSalarys/reduce/${row.id}`,
        name:'actSalarysReduce',
        params:{
          userid:row.id,
          username:row.username
        }
      })
    },

    routerToAward(row){
      this.$router.push({
        name:'actSalarysAward',
        params:{
          userid:row.id,
          username:row.username
        }
      })
    },


    showTax(row){
      this.showTaxDialog = true
      this.Taxtitle = row.username + '的缴税记录'
    },


    // showRealSalary(row){
    //   this.showRealSalaryDialog = true
    //   this.RealSalarytitle = row.username + '的工资记录'
    // },





    rowClassName({row, rowIndex}){
      row.num = rowIndex
    }
  }
}
</script>


<style scoped>
.imgApple{
  width:100px;
  height: 100px;
  vertical-align: middle;
}

.font36px{
  font-size: 36px;
}

.flex{
  display: flex;
  justify-content: space-between;
}

.btn{
  margin-right: 30px;
}
</style>


<style>
.cancelButton{
  float: right;
  margin-right: 20px;
}
</style>