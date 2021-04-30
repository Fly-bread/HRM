<template>
    <div>
        <el-dialog  :visible="showAddEditDialog" :title="`${showTitle}` + '记录'" @close="btnCancel">
            <el-form :model="formData">
                <el-form-item label="月份" label-width="130px" prop="month">
                    <div class="mgleft50px">
                        <el-date-picker type="month" value-format="yyyy-MM" :readonly="dateState" v-model="month" @focus="cantChangeDate"/>
                    </div>
                </el-form-item>

                <el-form-item label="姓名" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type != '添加'">{{formData.username}}</b>
                        <el-input  v-else v-model="formData.username"/>
                    </div>
                </el-form-item>
                <el-form-item label-width="130px" label="工号">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type != '添加'">{{formData.worknumber}}</b>
                        <el-input  v-else v-model="formData.worknumber"/>
                    </div>
                </el-form-item>


                <el-form-item label="标准工资" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.salaryNorm}}</b>
                        <el-input type="number" v-else  v-model="formData.salaryNorm" />
                    </div>
                </el-form-item>
                <el-form-item label="考勤天数" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.attendanceAll}}</b>
                        <el-input type="number" v-else  v-model="formData.attendanceAll"/>
                    </div>
                </el-form-item>
                <el-form-item label="实到天数" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.attendanceReal}}</b>
                        <el-input type="number" v-else v-model="formData.attendanceReal"/>
                    </div>
                </el-form-item>
                <el-form-item label="话补" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.phoneCompensation}}</b>
                        <el-input type="number" v-else v-model="formData.phoneCompensation"/>
                    </div>
                </el-form-item>

                <el-form-item label="缺勤扣款" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.reduceFromAttendance}}</b>
                        <el-input type="number" v-else  v-model="formData.reduceFromAttendance"/>
                    </div>
                </el-form-item>
                <el-form-item label="其它扣款" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.reduceFromOther}}</b>
                        <el-input type="number" v-else v-model="formData.reduceFromOther"/>
                    </div>
                </el-form-item>
                <el-form-item label="应发工资" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.salaryShould}}</b>
                        <el-input type="number" v-else v-model="formData.salaryShould"/>
                    </div>
                </el-form-item>
                <el-form-item label="社保基数" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.socialBase}}</b>
                        <el-input type="number" v-else v-model="formData.socialBase"/>
                    </div>
                </el-form-item>
                <el-form-item label="公积金基数" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.providentBase}}</b>
                        <el-input type="number" v-else v-model="formData.providentBase"/>
                    </div>
                </el-form-item>
                <el-form-item label="个人养老" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.pensionPersonal}}</b>
                        <el-input type="number" v-else v-model="formData.pensionPersonal"/>
                    </div>
                </el-form-item>
                <el-form-item label="个人失业" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.unemploymentPersonal}}</b>
                        <el-input type="number" v-else v-model="formData.unemploymentPersonal"/>
                    </div>
                </el-form-item>
                <el-form-item label="个人医疗" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.medicalPersonal}}</b>
                        <el-input type="number" v-else v-model="formData.medicalPersonal"/>
                    </div>
                </el-form-item>
                <el-form-item label="大额医疗" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.medicalLarge}}</b>
                        <el-input type="number" v-else v-model="formData.medicalLarge"/>
                    </div>
                </el-form-item>    
                <el-form-item label="个人公积金" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.providentPersonal}}</b>
                        <el-input type="number" v-else v-model="formData.providentPersonal"/>
                    </div>
                </el-form-item>  
                <el-form-item label="个人小计" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.totalPersonal}}</b>
                        <el-input type="number" v-else v-model="formData.totalPersonal"/>
                    </div>
                </el-form-item>  
                <el-form-item label="税前工资" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.salaryBeforeTax}}</b>
                        <el-input type="number" v-else v-model="formData.salaryBeforeTax"/>
                    </div>
                </el-form-item>  
                <el-form-item label="代扣个人所得税" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.tax}}</b>
                        <el-input type="medicalLarge" v-else v-model="formData.tax"/>
                    </div>
                </el-form-item>  
                <el-form-item label="奖金" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.award}}</b>
                        <el-input type="medicalLarge" v-else v-model="formData.award"/>
                    </div>
                </el-form-item>     
                <el-form-item label="实发工资" label-width="130px">
                    <div class="mgleft50px">
                        <b class="font18px" v-if="type == '查看'">{{formData.salaryReal}}</b>
                        <el-input type="medicalLarge" v-else v-model="formData.salaryReal"/>
                    </div>
                </el-form-item>                                                                                                                                                                                                                                                                                                                        
            
            </el-form>

            <el-row slot="footer">
                <el-button
                type="primary"
                @click="changeDBData"
                >确定</el-button>
                <el-button
                @click="btnCancel"
                >取消</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>


<script>
import {addSalaryreal, editSalaryreal} from '@/api/salarysReal'
import { Message } from 'element-ui'


export default {
    props:{
        showAddEditDialog:false,
        
    },

    data(){
        return{
            type:'',
            month:'',//为了方便默认设置
            formData:{},

            dateState:false
            
            
        }
    },

    created(){
        if(this.type.indexOf('添加') != -1){
            this.formData = {}

        }

        
    },    

    methods:{
        btnCancel(){
            this.$emit('update:showAddEditDialog', false)
        },


        //组件绑定
        changeDBData(){
            let AdminUserid = this.$store.getters.userid
            if(this.type == '添加'){
                this.addDBData(AdminUserid)
            }
            else if(this.type == '编辑'){
                this.editDBData(AdminUserid)
            }
            this.$emit('update:showAddEditDialog', false)
        },
        cantChangeDate(){
            if(this.type != '添加'){
                Message.error(this.type + '状态下不能修改日期')
            }
        },




        //组件的弹窗更新数据库
        addDBData(AdminUserid){
                this.$confirm('即将添加数据，是否继续？', '提示',{
                    cancelButtonClass:"cancelButton",
                    cancelButtonText:'取消',
                    confirmButtonText:'确定',

                    type:'warning'
                }).then(async () => {
                    //设置日期
                    this.formData.month = this.month
                    this.formData.AdminUserid = AdminUserid
                    //更新数据库的数据
                    let result = await addSalaryreal(this.formData)
                    this.showResult(result)
                }).catch((error) => {
                    console.log(error)
                    this.$message({
                        type:'info',
                        message:'已取消添加'
                    })
                })
                //设置本条记录的id
        },
        editDBData(AdminUserid){
                this.$confirm('即将修改数据，是否继续', '提示', {
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    cancelButtonClass:'cancelButton',

                    type:'warning'
                }).then(async () => {
                    this.formData.AdminUserid = AdminUserid
                    //更新数据库的数据
                    let result = await editSalaryreal(this.formData)
                    this.showResult(result)
                }).catch(() =>{
                    this.$message({
                        type:'info',
                        message:'已取消修改'
                    })
                })            
        },




        //函数的弹出框
        showResult(result){
            if(result == 'id有误，无法根据id找到管理员'){
                Message.error('id有误，无法根据id找到管理员')
            }
            else if(result == '没有权限增加实发工资列表'){
                Message.error('没有权限增加实发工资列表')
            }
            else if(result == '工号有误，无法根据工号找到用户'){
                Message.error('工号有误，无法根据工号找到用户')
            }
            else if(result == '员工姓名有误，请重新输入'){
                Message.error('员工姓名有误，请重新输入')
            }
            else if(result == '记录已存在，不可重复添加'){
                Message.error('记录已存在，不可重复添加')
            }    
            else if(result == '成功添加记录'){
                this.$parent.getSalarysrealList()
                Message.success('成功添加记录')
                this.formData = {}  //这样清空添加框，防止之后还要删除数据
            } 
            else if(result == '添加记录失败'){
                Message.error('添加记录失败')
            }                


            else if(result == '没有权限修改实发工资列表'){
                Message.error('没有权限修改实发工资列表')
            }
            else if(result == '数据不存在，无法修改'){
                Message.error('数据不存在，无法修改')
            }    
            else if(result == '修改记录失败'){
                Message.error('修改记录失败')
            } 


            else if(result == '成功修改记录'){
                this.$parent.getSalarysrealList()
                Message.success('成功修改记录')    
                this.formData = {}  //这样清空添加框，防止之后还要删除数据           
            }                                                
                     
        }




    },



    computed:{
        showTitle(){
            return this.type
        },

    }
}
</script>


<style scoped>
.font18px{
    font-size: 18px;
}

.mgleft50px{
    margin-left: 50px;
}
</style>

<style>
.cancelButton{
    float: right;
    margin-right: 20px;
}
</style>>