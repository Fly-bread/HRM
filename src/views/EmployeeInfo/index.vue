<template>
    <div>
        <el-card>
            <img class ="imgApple" src="@/assets/common/img.jpeg">
            <b class="font36px">用户信息表</b>
         </el-card>

        <el-card>
            <div class="center">
                <el-form :model="formData" ref="UserFormdata" :rules="rules">
                    <el-form-item label="姓名" label-width="130px">
                        <b>{{formData.username}}</b>
                    </el-form-item>
                    <el-form-item label="工号" label-width="130px">
                        <b>{{formData.worknumber}}</b>
                    </el-form-item>

                    <el-form-item label="手机号" label-width="130px" prop="phone">
                        
                        <b class="text"
                        v-if="changePhoneState == false"
                        >{{formData.phone}}</b>
                        <div class="text" v-if="changePhoneState == true">
                            <el-input  v-model="formData.phone" @input="forceUpdate"/>
                        </div>
                        <el-button
                        v-if="changePhoneState == false"
                        @click="allowEditPhone"
                        >编辑</el-button>
                        <el-button
                        v-if="changePhoneState == true"
                        type="primary"
                        @click="changePhone"
                        >提交</el-button>     
                        <el-button
                        v-if="changePhoneState == true"
                        @click="forbidEditPhone"
                        >取消修改</el-button>                           
                    </el-form-item>



                    <el-form-item label="岗位" label-width="130px" prop='workType'>  
                        <b>{{formData.workType}}</b>
                    </el-form-item>                  
                    <el-form-item label="入职时间" label-width="130px" prop='entryDate'>
                        <b>{{formData.entryDate}}</b>
                    </el-form-item>
                    <el-form-item label="薪资" label-width="130px" prop='salary'>
                        <b class="text" v-if="showSalaryState == true">{{formData.salary}}</b>      
                        <b class="text" v-else></b> 

                        <el-button
                        v-if="showSalaryState == false"
                        @click="allowShowSalary"
                        >显示薪资</el-button>
                        <el-button
                        v-else
                        type="primary"
                        @click="allowShowSalary"
                        >隐藏薪资</el-button>                                            
                    </el-form-item>
                </el-form>
            </div>
         </el-card>
    </div>
</template>>

<script>
export default {

    data(){
        return{
            formData:{
                phone:''
            },

            changePhoneState:false,
            showSalaryState:false,

            rules:{
                phone:[
                    {required:true, message:'电话号码不能为空', trigger:'blur'},
                    {pattern:'^1[3-9]\\d{9}$', message:'电话号码只能是13位数字',}]
            },
        }
    },

    created(){
        this.showFormdata()
    },

    methods:{
        test(){
            let userid = this.$store.state.LoginInfo.userid
            let dataSource = this.$store.state.userInfoTb
            for(let item of dataSource){
                if(item.userid == userid)
                    console.log(item)
            }        
        },

        //显示数据函数
        showFormdata(){
            let formData = this.formData
            let item = this.getUserInfo()
            let salary = this.getSalary()

            //给formData添加用户信息
            for(let key of Object.keys(item)){
                formData[key] = item[key]
            }
            //给formData添加工资
            formData.salary = salary
        },



        //组件绑定函数
        //修改电话号
        allowEditPhone(){
            this.changePhoneState = !this.changePhoneState
        },
        changePhone(){
            this.$refs.UserFormdata.validate((valid) => {
                if(valid){
                    this.confirmChangePhone()
                }
                else{
                    this.$message({
                        type:'error',
                        message:'输入电话有误，请重新输入'
                    })
                }
            })
            

        },
        forbidEditPhone(){
            this.changePhoneState = !this.changePhoneState
        },

        //强制更新输入框中的值
        forceUpdate(){
            this.$forceUpdate()
        },
        //展示工资
        allowShowSalary(){
            this.showSalaryState = !this.showSalaryState
        },



        //组件弹出函数
        confirmChangePhone(){
            this.$confirm('即将修改电话号码，是否继续', '提示', {
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                cancelButtonClass:'cancelButton',
                type:'warning'
            }).then(() => {
                this.savePhone()
                this.changePhoneState = !this.changePhoneState
                //this.test()
                this.$message({
                    type:'success',
                    message:'成功修改电话号'
                })
            }).catch(() => {
                this.$message({
                    type:'info',
                    message:'取消修改电话号'
                })
            })            
        },



        //获取数据函数
        //获取用户信息
        getUserInfo(){
            let userid = this.$store.state.LoginInfo.userid
            let dataSource = this.$store.state.userInfoTb
            for(let item of dataSource){
                if(item.userid == userid)
                    return item
            }
        },

        //获取用户薪资
        getSalary(){
            let userid = this.$store.state.LoginInfo.userid
            let dataSource = this.$store.state.salaryBases
            for(let item of dataSource){
                if(item.userid == userid){
                    return item.nowSalaryBase
                }
            }
        },


        //保存数据
        //保存电话号码
        savePhone(){
            let newPhone = this.formData.phone
            let userid = this.$store.state.LoginInfo.userid
            let dataSource = this.$store.state.userInfoTb
            for(let item of dataSource){
                if(item.userid == userid)
                    item.phone = newPhone
            }            
        }
    }
    
}
</script>


<style scoped>
/* .center{
    width: 600px; height: 400px;   
    position: absolute; left: 50%; top: 50%;   
    margin-top: -200px;     高度的一半   
    margin-left: -300px;     宽度的一半 
} 
*/

.imgApple{
    vertical-align: middle;
    width: 100px;
    height: 100px;
}
.font36px{
    font-size: 36px;
}

.center{
    width: 600px; height: 400px;   
    position: absolute; left: 50%; top: 50%;  
    border: 1px solid red; 
    transform: translate(-50%, -50%);    /* 50%为自身尺寸的一半 */  
}

.text{
    display: inline-block;
    width: 130px;
}
/* 有时直接放在scoped也会有用 */
.el-button{
    width: 100px;
}

</style>


<style>
.cancelButton{
    float: right;
    margin-left: 20px;
}


</style>