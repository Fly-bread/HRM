<template>
    <div>
        <el-dialog :visible='showApplyForRelaxDialog' title="申请休假" @close="btnCancel">
            <el-form 
            ref='formData'
            :model = "formData"
            :rules="rules"
            >
                <el-form-item label="请假类型" label-width="130px" prop="appRelaxType">
                    <el-select v-model="formData.appRelaxType" placeholder="请选择休假类型">
                        <el-option
                            v-for="item in RelaxTypeOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" label-width="130px" prop="appRelaxStartDate">
                    <el-date-picker type="date" value-format="yyyy-MM-dd"  v-model="formData.appRelaxStartDate"/>
                </el-form-item>
                <el-form-item label="结束时间" label-width="130px" prop="appRelaxEndDate">
                    <el-date-picker type="date" value-format="yyyy-MM-dd"  v-model="formData.appRelaxEndDate"/>
                </el-form-item>
                <el-form-item label="请假天数" label-width="130px" prop="appRelaxNum">
                    <el-input  v-model="formData.appRelaxNum"/>
                </el-form-item>
                <el-form-item label="申请理由" label-width="130px" prop="appDetail">
                    <el-input 
                        type="textarea"
                        :rows="3"
                        v-model="formData.appDetail" />
                </el-form-item>                                                                
            </el-form>

            <el-row slot="footer">
                <el-button
                    type="primary"
                    @click="btnOk"
                >确认</el-button>
                <el-button
                    @click="btnCancel"
                >取消</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>


<script>
const RelaxTypeOptions = ['年假', '病假', '事假']

export default {
    props:{
        showApplyForRelaxDialog:false,
    },

    data(){
        const validAppRelaxEndDate = (rule, value, callback) =>{
            let appRelaxStartDate = this.formData.appRelaxStartDate
            if(value < appRelaxStartDate){
                callback(new Error('结束日期必须大于开始日期'))
            }
            else{
                callback()
            }
        }

        const validAppRelaxNum = (rule, value, callback) =>{
            value = parseFloat(value)
            if(value % 0.5 != 0 ){
                callback(new Error('请假只能以半天为单位'))
            }
            else{
                callback()
            }
        }

        return{
            RelaxTypeOptions:RelaxTypeOptions,

            formData:{},

            rules:{
                appRelaxType:[
                    { required:true, message:'请假类型不能为空', trigger:'change'}
                ],
                appRelaxEndDate:[
                    { required:true,message:'结束时间不能为空',trigger:'change'},
                    { validator:validAppRelaxEndDate, message:'结束日期不能小于开始日期'}],
                appRelaxNum:[
                    { required:true, message:'请假天数不能为空', trigger:'blur'},
                    { pattern: /^[0-9]+(\.?[0-9]+)?$/, message: '请假天数只能是数字' },
                    {validator:validAppRelaxNum, message:'请假只能以半天为单位'},]

            }
        }
    },

    methods:{

        test(){

        },


        //组件代码
        btnCancel(){
            this.$emit('update:showApplyForRelaxDialog', false)
        },
        btnOk(){
            //this.$refs.formData.validate() 这样的方式，后面的代码会直接执行
            this.$refs.formData.validate((valid) => {
                if(valid){
                    this.confirmSubmit()
                }
                else{
                    this.$message({
                        type:'error',
                        message:'信息有误，请重新填写'
                    })
                }
            })
            

            
        },


        //组件的消息提示
        confirmSubmit(){
            this.$confirm('是否继续确定请假？', '提示', {
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                cancelButtonClass:'cancelButton',
                type:'warning'
            }).then(() => {
                this.$emit('update:showApplyForRelaxDialog', false)
                this.saveDataInApprelaxTb()
                this.$parent.changeTb()
                this.$message({
                    type:'success',
                    message:'已成功提交请求'
                })
            }).catch(() => {
                this.$message({
                    type:'info',
                    message:'已取消'
                })
            })            
        },



        //信息保存函数
        //把内容保存到申请表中
        saveDataInApprelaxTb(){
            let appRelaxTb = this.$store.state.appRelaxTb
            let appUser = this.$store.state.LoginInfo  //需要提交的一定是当前登录用户
            let sendData = JSON.parse(JSON.stringify(this.formData))
            let todayYMD = this.$parent.getTodayYMD()
            let appId = new Date().getTime() + appUser.userid
            sendData.appId = appId

            sendData.appUsername = appUser.username
            sendData.appUserid = appUser.userid
            sendData.appWorknumber = appUser.worknumber
            
            sendData.appType = '请假'

            sendData.verUsername = ''
            sendData.verUserid = ''
            sendData.verWorknumber = ''
            sendData.verDetail = ''

            sendData.appDate = todayYMD
            sendData.appState = '审批中'

            appRelaxTb.push(sendData)       
        }
    }
}
</script>

<style>
.cancelButton{
    float: right;
    margin-left: 20px;
}
</style>