<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">

      <el-card>
        <div>
          <img src="@/assets/common/img.jpeg" class = 'appleImg' width="100" height="100"  alt>
          <b >当月审批记录</b>
        </div>

      </el-card>      
      
      
      
      <el-card class="hr-block">
        <el-table :data="list" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}"  >
          <!-- <el-table-column type="selection" width="30" /> -->
          <el-table-column type="index" width="80" label="序号" />

          <el-table-column prop="appUsername" label="申请人">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click="$router.push(`/approvals/details/${scope.row.appUserid}`)" >{{scope.row.appUsername}}</el-button>
            </template>
          </el-table-column>      

          <el-table-column prop="appType" label="审批类型" sortable />
          

          <el-table-column prop="appWorknumber" label="申请人工号"  />
          <el-table-column prop="verUsername" label="当前审批人"  />
          <el-table-column prop="verWorknumber" label="审批人工号"  />
          <el-table-column label="审批发起时间" sortable prop="appDate">
            <template slot-scope="scope">
              <span>{{ scope.row.appDate | formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="appState" label="审批状态" sortable :sort-method="sortByState">
            <template slot-scope="scope">
              <b v-if='scope.row.appState=="审批中"' id='state_ing'>{{ scope.row.appState}}</b>
              <b v-if='scope.row.appState=="同意"' id='state_accept'>{{ scope.row.appState}}</b>
              <b v-if='scope.row.appState=="拒绝"' id='state_refuse'>{{ scope.row.appState}}</b>
              <b v-if='scope.row.appState=="撤销"' id='state_revoke'>{{ scope.row.appState}}</b>
            </template>            
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
import Check from './components/check'
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


    }
  },
  created() {
    //this.getApprovalList()

    this.listAll = this.$store.state.appRelaxTb

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

#state_ing{
  color:lightslategray;
  font-size: 18px;
}

#state_accept{
  color:limegreen;
  font-size: 18px;
}
#state_refuse{
  color:red;
  font-size: 18px;
}
#state_revoke{
  color:tan;
  font-size: 18px;
}


</style>


