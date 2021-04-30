<template>
    <div>
  <el-dialog width="750px" :title='title'  :visible="showCheckDialog" @close="btnCancel" >
    <div class="container">
    <div class="left">

      <el-form :data="sizeForm"   size="mini" class = 'limit_C'>
        <el-form-item label="姓名" prop="appUsername" label-width="130px" >{{sizeForm.appUsername}}
        </el-form-item>

        <el-form-item label="工号" prop="appWorknumber"  label-width="130px" >{{sizeForm.appWorknumber}}
        </el-form-item>

        <el-form-item label="类型" prop="appType" label-width="130px" >{{sizeForm.appType}}
        </el-form-item>

        <el-form-item label="申请时间" prop="appDate"  label-width="130px" >{{sizeForm.appDate}}
        </el-form-item>    

        <el-form-item label="请假类型" prop="appLeavetype" label-width="130px" v-if="sizeForm.appType == '请假'">{{sizeForm.appLeavetype}}
        </el-form-item>
        <el-form-item label="请假开始日期" prop="appLeavedate" label-width="130px" v-if="sizeForm.appType == '请假'">{{sizeForm.appLeavedate}}
        </el-form-item>
        <el-form-item label="请假结束日期" prop="appBackdate" label-width="130px" v-if="sizeForm.appType == '请假'">{{sizeForm.appBackdate}}
        </el-form-item>

        <el-form-item label="剩余请假天数" prop="appCanCount" label-width="130px" v-if="sizeForm.appType == '请假'">{{sizeForm.appCanCount}}
        </el-form-item>  

        <el-form-item label="当前请假天数" prop="appLeaveCount" label-width="130px" v-if="sizeForm.appType == '请假'">{{sizeForm.appLeaveCount}}
        </el-form-item> 
      </el-form>
    </div>


    <div class="right">
      <el-form :data="sizeForm"   size="mini" class = 'limit_C'>
        <el-form-item class = 'detail_FI' prop="appDetail" label="申请详情" label-width="130px" >
          <el-input   class = 'detail_Input'   type="textarea" :rows="4"    v-model="sizeForm.appDetail" :disabled= "true"/>
        </el-form-item>

        <el-form-item class = 'detail_FI' prop="verDetail" label="审批人回复" label-width="130px" >
          <el-input 
          class = 'detail_Input' 
          v-if='sizeForm.appState == "审批中"'   
          type="textarea" 
          :rows="4" 
          height='100px'  
          v-model="sizeForm.verDetail" />
          <el-input 
          class = 'detail_Input' 
          v-else   

          type="textarea" 
          :rows="4" 
          height='100px'  
          v-model="sizeForm.verDetail"
          :disabled ='true'   
          />
        </el-form-item>
      </el-form> 
    </div>
    </div>



    <!-- 底部按钮 -->
    <el-row slot="footer" type="flex" justify="center" align="middle">
      <el-col>
        <el-button v-if='sizeForm.appState == "审批中"'
          type="primary"
          size="small"
          @click="btnAccept"
        >同意申请</el-button>
        <el-button size="small"  v-if='sizeForm.appState == "审批中"'
            type="danger"
            @click="btnRefuse"
        >拒绝申请</el-button>

<!-- 只有同意才能撤销，因为同意才需要添加
  如果是拒绝，撤销没有意义
 -->
        <el-button size="small"  v-if='sizeForm.appState == "同意"'
            type="warning"
            @click="btnRevoke"
        >撤销</el-button>

        <el-button
         type="info"
         size="small"
         @click="btnCancel"
        >关闭窗口</el-button>
      </el-col>
    </el-row>

  </el-dialog>


  <check-tips
    :title="CheckTipstitle"
    :show-check-tips-dialog.sync="showCheckTipsDialog"
    :sizeForm.sync='sizeForm'
    :AOrR='AOrR'
  />
  </div>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import CheckTips from './checktips'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showCheckDialog: {
      type: Boolean,
      default: false
    },
    title:{
      type: String,
      default: ''   
    },


    //sizeForm用于表示格式的数据
    sizeForm:{}
    // userid: {
    //   type: String,
    //   default: null
    // }
  },
  components: {CheckTips},
  data() {
    //   data先暂时写死
    return{
        //还是加上[],以免产生不必要的错误
        showCheckTipsDialog:false,      
        CheckTipstitle:'',
        AOrR:'',
    }
  },
    created(){
        console.log(this.sizeForm)
    },

  methods: {
    // 获取角色列表
    async getRoleList() {
      const { rows } = await getRoleList()
      this.list = rows
    },
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },


    
    btnRefuse() {
      // 清空数据
      //console.log(this.timeOfLast)  console.log是最后输出，所以是关闭窗口后输出，故无法获得值
        this.CheckTipstitle = this.sizeForm.appUsername + '的申请'
        this.AOrR = '拒绝'
        this.showCheckTipsDialog = true
    },

    btnAccept(){
        
        
        this.CheckTipstitle = this.sizeForm.appUsername + '的申请'
        this.AOrR = '同意'
        this.showCheckTipsDialog = true
        //this.$emit('update:showCheckDialog', false)
    },

    btnCancel(){     
        this.$emit('update:showCheckDialog', false)
    },

    btnRevoke(){
        
        this.CheckTipstitle = this.sizeForm.appUsername + '的申请'
        this.AOrR = '撤销'
        this.showCheckTipsDialog = true        
    }






  }
}
</script>

<style>
.container{
  display: flex;
}




.limit_C .el-form-item{
    width: 300px;
}

.limit_C .detail_FI{
    width: 400px;
}

.detail_Input{
    font-size: 18px;
}

.el-input{
    font-size: 18px;
    width: 98%;
}

/* 设置显示信息的字体 */
.el-form-item__content{
  font-size: 18px;
}




</style>
