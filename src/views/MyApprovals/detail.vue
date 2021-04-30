<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">

      <el-card>
        <div>
          <img src="@/assets/common/img.jpeg" class = 'appleImg' width="100" height="100"  alt>
          <b >{{this.appUsername + "的审批记录"}}</b>
        </div>

        <div>
          <el-form>
            <el-form-item label="选择月份" >
              <!-- showData是一选择月份，就向后端发送请求，要展示该月数据。
              本页面是写死的数据，所以不好展示 -->
              <el-date-picker v-model="selectMonth" type="month" value-format="yyyy-MM"  placeholder="选择月" @change="showData"/>
            </el-form-item>
          </el-form>
        </div> 

      </el-card>      
      
      
      
      <el-card class="hr-block">
        <el-table :data="list" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column type="index" width="80" label="序号" />
          <el-table-column prop="appNum" label="审批号" sortable />
          <el-table-column prop="appType" label="审批类型" sortable />
          <el-table-column prop="appUsername" label="申请人" sortable />
          <el-table-column prop="appWorknumber" label="申请人工号" sortable />
          <el-table-column prop="verUsername" label="当前审批人" sortable />
          <el-table-column prop="appWorknumber" label="审批人工号" sortable />
          <el-table-column label="审批发起时间" sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.appDate | formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="appState" label="审批状态" sortable>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="showCheck(scope.row,scope.row.num)">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" align="middle" justify="center" style="height: 60px">
          <el-pagination
            :total="page.total"
            :page-size="page.pagesize"
            layout="prev, pager, next"
            @current-change="changePage"
          />
        </el-row>
      </el-card>

      <check
        :title="Checktitle"
        :show-check-dialog.sync="showCheckDialog"
        :sizeForm.sync="sizeForm"
      />
    </div>
  </div>
</template>

<script>
import { getApprovalList } from '@/api/approvals'
import Check from './components/check'
// import ApprovalPageTool from './components/approval-tool'

export default {
  name: 'SocialTableIndex',
  components: {Check},
  data() {
    return {
      showCheckDialog:false,
      Checktitle:'',

      list: [],
      listAll:[],
      loading: false,
      page: {
        page: 1,
        total: 0,
        pageSize: 10
      },
      selectMonth:'',
      sizeForm: {},
      appUsername:'',
    }
  },
  created() {
    //this.getApprovalList()

    this.listAll = [{
        appNum:"24512" + "_1",
        appType:'请假',
        appUsername:'史莱姆',
        appId:'987',
        appWorknumber:'12345',

        verUsername:'笑川',
        verId:'931',
        verWorknumber:'24512',

        appDate:'2021-03-11',
        appState:'审批中',

        appLeavetype:'',
        appLeavedate:'2021-03-21',
        appBackdate:'2021-03-26',
        appDetail:'回家过年',
        verDetail:''
      },
      {
        appNum:1,
        appType:'',
        appUsername:'暴龙哥',
        appId:'123',
        appWorknumber:'12455',

        verUsername:'包桑',
        verId:'901',
        verWorknumber:'874512',

        appDate:'2021-04-25',
        appState:'审批中',

        appLeavetype:'',
        appLeavedate:'2021-03-21',
        appBackdate:'2021-03-26',
        appDetail:'回家过年',
        verDetail:''        
      },
      {
        appNum:'874512' + '_1',
        appType:'',
        appUsername:'德邦',
        appId:'1212',
        appWorknumber:'19955',

        verUsername:'包桑',
        verId:'901',
        verWorknumber:'874512',

        appDate:'2021-02-25',
        appState:'审批中',

        appLeavetype:'',
        appLeavedate:'',
        appBackdate:'',
        appDetail:'回家过年',
        verDetail:''  
      }
    ]

    this.sizeForm.appId = this.$route.params.id
    //找到用户名
    for(var item of this.listAll){
      if(item.appId == this.sizeForm.appId){
        this.appUsername = item.appUsername
        console.log(this.appUsername)
        break
      }
    }
    this.selectMonth = this.formatMonth()

  },

  methods: {
    // 初始化数据
    async  getApprovalList() {
      this.loading = true
      const { rows, total } = await getApprovalList({ year: 2018, ...this.page })
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    toDetail(obj) {
      var name = obj.processName
      switch (name) {
        case '工资':
          this.$router.push({ path: '/approvals/salaryApproval/' + obj.processId })
          break
        case '入职':
          this.$router.push({ path: '/approvals/enterApproval/' + obj.processId })
          break
        case '请假':
          this.$router.push({ path: '/approvals/leaveApproval/' + obj.processId })
          break
        case '离职':
          this.$router.push({ path: '/approvals/quitApproval/' + obj.processId })
          break
        case '加班':
          this.$router.push({ path: '/approvals/overtimeApproval/' + obj.processId })
      }
    },

    changePage(newPage) {
      this.page.newPage = newPage
      this.getApprovalList()
    },

    getYearandMonth(date){
      let year = date.split('-')[0]
      let month = date.split('-')[1]
      return {year,month}
    },

    // showData(){
    // var date = this.getYearandMonth(this.selectMonth)
    // var yearSelect = date.year
    // var monthSelect = date.month
    // this.list = []
    // for(var item of this.listAll){
    //   let {year,month} = this.getYearandMonth(item.appDate)
    //   if(year == yearSelect && month == monthSelect)
    //       this.list.push(item)
    // }
    // }
    showData(selectMonth){
    this.list = []
    for(var item of this.listAll){
      if(this.sizeForm.appId == item.appId){
      var temp = item.appDate.split('-')
      var appMonth = temp[0] + '-' + temp[1]
        if(selectMonth == appMonth){
          this.list.push(item)
        }
      }
    }
    },

    showCheck(row, index){
      this.showCheckDialog = true
      this.Checktitle = row.appUsername + '的申请详情'
      this.sizeForm = row
    },

    formatMonth(){
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1): nowDate.getMonth() + 1;
        let MonthStr = year + "-" + month         
        return MonthStr  
    },
	
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

.showBefore_C{
  display: block;
}



</style>

