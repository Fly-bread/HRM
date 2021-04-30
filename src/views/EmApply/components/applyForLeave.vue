<template>
    <div>
        <el-dialog :visible='showApplyForLeaveDialog' title="申请离职" @close="btnCancel">
            <el-form :model='formData' :rules="rules" ref="LeaveFormdata">
                <el-form-item label="离职时间" label-width="130px" prop="appLeaveDate">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="formData.appLeaveDate"/>
                </el-form-item>
                <el-form-item label-width="130px" label="离职原因" prop="appDetail">
                    <el-input
                     type="textarea"
                     :rows="3"
                     v-model="formData.appDetail"
                    />
                </el-form-item>
            </el-form> 

            <el-row slot="footer">
                <el-button
                type="primary"
                @click="btnOk"
                >确定</el-button>
                <el-button
                @click="btnCancel"
                >取消</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>


<script>
export default {
    props:{
        showApplyForLeaveDialog:false,
    },

    data(){
        return{
            formData:{},

            rules:{
                appLeaveDate:[
                    {required:true, message:'离职日期不能为空', trigger:'blur'}],
                appDetail:[
                    {required:true, message:'离职原因不能为空', trigger:'blur'}]
            }
        }
    },

    methods:{
        //组件函数
        btnCancel(){
            this.$emit('update:showApplyForLeaveDialog', false)
        },
        btnOk(){
            
            this.$refs.LeaveFormdata.validate((valid) => {
                if(valid){
                    this.confirmSumbit()
                }
                else{
                    this.$message({
                        type:'error',
                        message:'信息有误，请重新填写'
                    })
                }
            })

        },



        //组件产生的消息提示
        confirmSumbit(){
            this.$confirm('是否确定申请离职？', '提示', {
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                cancelButtonClass:'cancelButton',
                type:'warning'
            }).then(() =>{
                this.$emit('update:showApplyForLeaveDialog', false)
                this.saveDataInAppleaveTb()
                this.$parent.changeTb()
                this.$message({
                    type:'success',
                    message:'已成功提交请求'
                })
            }).catch(() =>{
                this.$message({
                    type:'info',
                    message:'已取消'
                })
            })
        },


        //信息保存函数
        //把内容保存到申请表中
        saveDataInAppleaveTb(){
            let appLeaveTb = this.$store.state.appLeaveTb
            let appUser = this.$store.state.LoginInfo  //需要提交的一定是当前登录用户
            let sendData = JSON.parse(JSON.stringify(this.formData))
            let todayYMD = this.$parent.getTodayYMD()
            let appId = new Date().getTime() + appUser.userid
            sendData.appId = appId

            sendData.appUsername = appUser.username
            sendData.appUserid = appUser.userid
            sendData.appWorknumber = appUser.worknumber
            
            sendData.appType = '离职'

            sendData.verUsername = ''
            sendData.verUserid = ''
            sendData.verWorknumber = ''
            sendData.verDetail = ''

            sendData.appDate = todayYMD
            sendData.appState = '审批中'

            appLeaveTb.push(sendData)   
        }
    }
}
</script>

<style>
.cancelButton{
    float:right;
    margin-left: 20px;
}
</style>