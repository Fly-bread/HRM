<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">

      <el-card>
        <div>
          <img src="@/assets/common/img.jpeg" class = 'appleImg' width="100" height="100"  alt>
          <b >当月考勤记录</b>
        </div>

      </el-card>      
      
      
      
      <el-card class="hr-block">
        <el-table :data="list" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}"  >
          <!-- <el-table-column type="selection" width="30" /> -->
          <el-table-column type="index" width="80" label="序号" />
          <el-table-column prop="Username" label="姓名" sortable>
            <template slot-scope="scope">
              <!-- 待改 -->
              <el-button type="text" size="small"  @click="$router.push(`/attendances/details/${scope.row.Id}`)" >{{scope.row.Username}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="Worknumber" label="工号" sortable :sort-method="sortByWorkNum" />

          <el-table-column prop="attendenceState" label="考勤状态" sortable :sort-method="sortByState">
            <template slot-scope="scope">
              <b v-if='scope.row.attendenceState=="全勤"' id='state_all'>{{ scope.row.attendenceState}}</b>
              <b v-if='scope.row.attendenceState=="缺勤"' id='state_lack'>{{ scope.row.attendenceState}}</b>
              <b v-if='scope.row.attendenceState=="旷工"' id='state_refuse'>{{ scope.row.attendenceState}}</b>
              <b v-if='scope.row.attendenceState=="请假"' id='state_leave'>{{ scope.row.attendenceState}}</b>
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
import Check from '../MyApprovals/components/check'
// import ApprovalPageTool from './components/approval-tool'

export default {
  name: 'SocialTableIndex',
  components: {Check},
  data() {
    return {
      showCheckDialog:false,
      Checktitle:'',
      sizeForm:{},

      list: [],
      listAll:[],
      loading: false,
      page: {
        page: 1,
        total: 0,
        pageSize: 10
      },
      appNum:0,


    }
  },
  created() {
    //this.getApprovalList()

    this.listAll = [{
        Username:'史莱姆',
        Id:'987',
        Worknumber:'12345',

        attendenceState:'全勤',

        appDate:'2021-04-12'
      },   
      
      {
        Username:'暴龙哥',
        Id:'123',
        Worknumber:'12355',

        attendenceState:'缺勤',

        appDate:'2021-04-12'
      },  
    ]

    var dateNow = new Date()
    var monthNow = dateNow.getMonth() + 1
    var yearNow = dateNow.getFullYear()

    
    
    for(var item of this.listAll){
      let {year,month} = this.getYearandMonth(item.appDate)
      if(year == yearNow && month == monthNow)
          this.list.push(item)
    }
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


    changePage(newPage) {
      this.page.newPage = newPage
      this.getApprovalList()
    },

    getYearandMonth(date){
      let year = date.split('-')[0]
      let month = date.split('-')[1]
      return {year,month}
    },

    showCheck(row, index){
      this.showCheckDialog = true
      this.Checktitle = row.appUsername + '的申请详情'
      this.sizeForm = row
    },

 soltHandle(column) {
     let fieldName = column.prop;
     let sortingType = column.order;
     let tableData = this.list;
     let approvaling = []
     tableData.map((item) => {
         if (item.appState == "审批中") {
             approvaling.push(item)
         }    
     });
      
     if (sortingType == "ascending") {
         //正序
         tableData = tableData.sort((a, b) => b[fieldName] - a[fieldName]);
        //  // 删除table中的平均和总计

         for(var index in tableData){
           console.log(index + "       " + tableData[index].appUsername)
             if (tableData[index].appState == "审批中") {
               console.log(index + " aaaaa " + tableData[index].appUsername)
                 tableData.splice(index, 1);
                 console.log(index + " bbbbb " + tableData[index].appUsername)
             }
         }
         this.list.unshift(...approvaling);
         console.log(tableData)
     } else if (sortingType == "descending") {
         // 倒序
         tableData = tableData.sort((a, b) => a[fieldName] - b[fieldName]);
         for(var index in tableData){
             if (tableData[index].appState == "审批中") {
               console.log(index + "   "+ tableData[index].appUsername)
                 tableData.splice(index, 1);
                 index = index + 1
             }
         }
         this.list.unshift(...approvaling);
     }
 },

 sortByState(a,b){
//   //  var tableData = this.list
//   //  var avgData;
//   //    tableData.map((item) => {
//   //        if (item.appWorknumber == "9542") {
//   //            tableData = item;
//   //        }
         
//   //    }),

//   //   tableData.forEach((item, index) => {
//   //       if (item.appWorknumber == "9542") {
//   //           tableData.splice(index, 1);
//   //       }
//   //       return item;
//   //   })

//   //   tableData.unshift(avgData)
    let a_state = 0
    let b_state = 0
  if(a.appState == '审批中'){
    a_state = 1
  }
  if(b.appState == '审批中'){
    b_state = 1
  }  
  return b_state-a_state

 },


 sortByWorkNum(a,b){
   return a.appWorknumber-b.appWorknumber
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



.showBefore_C{
  display: block;
}

#state_ing{
  color:lightslategray;
  font-size: 18px;
}

#state_all{
  color:limegreen;
  font-size: 18px;
}
#state_lack{
  color:red;
  font-size: 18px;
}
#state_revoke{
  color:tan;
  font-size: 18px;
}


</style>


