<template>
    <div>
        <el-card>
            <div class="top">
                <div class="topleft">
                    <img class="imgApple" src='@/assets/common/img.jpeg'>
                    <b class="font36px">用户申请表</b>
                    
                    <el-form>
                        <el-form-item label="选择月份" label-width="100px" v-if="dateType == 'month'">
                            <el-date-picker type="month" value-format="yyyy-MM" v-model="month" @change="changeTb"/>
                            <el-button
                            type="primary"
                            @click='changeDateType'
                            >切换</el-button>
                        </el-form-item>
                        <el-form-item label="选择年份" label-width="100px" v-if="dateType == 'year'">
                            <el-date-picker type="year" value-format="yyyy" v-model="year" @change="changeTb"/>
                            <el-button
                            type="primary"
                            @click='changeDateType'
                            >切换</el-button>                    
                        </el-form-item>                
                    </el-form>    
                </div>

                <div class="topright">
                    <div class="applyforrelax">
                        <el-button
                        type="primary"
                        @click="showApplyForRelax"
                        >申请休假</el-button>
                    </div>
                    <div class="applyforleave">
                        <el-button
                        type="primary"
                        @click="showApplyForLeave"
                        >申请离职</el-button>
                    </div>
                </div>
            </div>
        </el-card>

        <el-card>

            <div class="checkboxline1">
                <el-radio class="font18px" v-model="appType" label="请假" @change="handleApptypeChange()">请假</el-radio>
                <el-radio class="font18px" v-model="appType" label="离职" @change="handleApptypeChange()">离职</el-radio>
                <el-radio class="font18px" v-model="appType" label="无选中" @change="handleApptypeChange()">无选中</el-radio>
            </div>  



            <div class="checkboxline1">
                <el-checkbox-group v-model="checkedState">
                    <el-checkbox class="font18px" v-for ="state in states" :label="state" :key="state" @change="handleCheckedStatesChange()"
                    >{{state}}</el-checkbox>
                    
                    </el-checkbox-group>
                <div class="selectall">
                    <el-checkbox class="font18px" :indeterminate="stateIsIndeterminate" v-model="statecheckAll" @change="handleStatesCheckAllChange">全选</el-checkbox>
                </div>
            </div>      


            <el-table :data="list" v-if="appType == '请假'">
                <el-table-column type="index" width="80px" label="序号"/>
                <el-table-column label="申请类型" prop="appType"/>
                <el-table-column label="申请时间" prop = "appDate"/>
                <el-table-column label="请假类型" prop="appRelaxType"/>
                <el-table-column label="休假开始时间" prop="appRelaxStartDate"/>
                <el-table-column label="休假结束时间" prop="appRelaxEndDate"/>
                <el-table-column label="申请理由" prop="appDetail"/>
                <el-table-column label="管理员回复" prop="verDetail"/>
                <el-table-column label="审批状态" prop="appState"/>
                <el-table-column label="操作">
                    <template slot-scope="{row}">
                        <el-button
                        type="text"
                        v-if="row.appState == '审批中'"
                        @click="cancelApply(row)"
                        >取消申请</el-button>   
                        <el-button
                        type="text"
                        v-if="row.appState == '通过'"
                        @click="revokeApply(row)"
                        >撤销</el-button>                                               
                    </template>
                </el-table-column>
            </el-table>

            <el-table :data="list" v-if="appType == '离职'">
                <el-table-column type="index" width="80px" label="序号"/>
                <el-table-column label="申请类型" prop="appType"/>
                <el-table-column label="申请时间" prop = "appDate"/>
                <el-table-column label="离职时间" prop = "appLeaveDate"/>
                <el-table-column label="申请理由" prop="appDetail"/>
                <el-table-column label="管理员回复" prop="verDetail"/>                
                <el-table-column label="审批状态" prop="appState"/>
                <el-table-column label="操作">
                    <template slot-scope="{row}">
                        <el-button
                        type="text"
                        v-if="row.appState == '审批中'"
                        @click="cancelApply(row)"
                        >取消申请</el-button>    
                        <el-button
                        type="text"
                        v-if="row.appState == '通过'"
                        @click="revokeApply(row)"
                        >撤销</el-button>                                              
                    </template>
                </el-table-column>
                <!--                         v-if="scope.row.appState=='审批中'" -->
            </el-table>            
        </el-card>

        <apply-for-relax
            ref = 'ApplyForRelax'
            :show-apply-for-relax-dialog.sync ="showApplyForRelaxDialog"
        />
        <apply-for-leave
            ref = 'ApplyForLeave'
            :show-apply-for-leave-dialog.sync ="showApplyForLeaveDialog"
        />

        
    </div>
</template>

<script>
import ApplyForRelax from './components/applyForRelax'
import ApplyForLeave from './components/applyForLeave'

const statesOptions = ['审批中', '通过', '拒绝', '撤销审批中', '已撤销', '取消申请']
const getSalaryDate = 10    //假设以10号为标准

export default {
    components:{ApplyForRelax, ApplyForLeave},
    data(){
        return{
            showApplyForRelaxDialog:false,
            showApplyForLeaveDialog:false,

            dateType:'month',
            month:'',
            year:'',

            states:statesOptions,   
            checkedState:[],
            stateIsIndeterminate:false,  //有选中但未全选
            statecheckAll:false,

            appType:'',



            list:[],
            listTemp:[]//当工具数组，不断更新，最后得到完整的数据
        }
    },

    created(){
        this.appType = '请假'//默认为请假
        this.month = '2021-04'
        this.year = '2021'
        this.changeTb()
        //this.test()
    },


    methods:{
        //数据测试
        test(){
            this.getDateBelongY('2021-01-03')
            this.getDateBelongY('2021-04-03')
            this.getDateBelongY('2021-02-03')
            this.getDateBelongY('2021-01-10')
            this.getDateBelongY('2021-01-09')
        },


        //改变数据
        changeDateType(){
            if(this.dateType == 'month'){
                this.dateType = 'year'
            }
            else if(this.dateType == 'year'){
                this.dateType = 'month'
            }
            this.changeTb()
        },

        changeTb(){
            this.list = this.getList()
        },



        //组件函数
        //value代表全选框自身的状态，true或者false
        handleCheckedStatesChange(){
            let checkedCount = this.checkedState.length;
            this.statecheckAll = checkedCount === this.states.length;
            this.stateIsIndeterminate = checkedCount > 0 && checkedCount < this.states.length;
            this.changeTb()
        },
        handleStatesCheckAllChange(val) {
            this.checkedState = val ? this.states : [];
            this.stateIsIndeterminate = false;
            this.changeTb()
        },   
        handleApptypeChange(){
            this.changeTb()
        },      
        showApplyForRelax(){
            let todayYMD = this.getTodayYMD()
            this.$refs.ApplyForRelax.formData = {
                appRelaxStartDate:todayYMD
            }
            this.showApplyForRelaxDialog =true
        },
        showApplyForLeave(){
            this.$refs.ApplyForLeave.formData = {}
            this.showApplyForLeaveDialog =true
        },
        //未来交给后台做，因为要更改数据
        cancelApply(row){
            if(row.appState == '审批中'){
                this.$confirm('是否取消申请', '提示', {
                    cancelButtonText:'取消',
                    cancelButtonClass:'cancelButton',
                    confirmButtonText:'确定',
                    type:'warning'
                }).then(() => {
                    let appId = row.appId
                    let appType = row.appType                  
                    let item = this.getItemByAppidAppType(appId, appType)
                    item.appState = '取消申请'
                    this.changeTb()
                    this.$message({
                        type:'success',
                        message:'成功取消申请',
                    })
                    //this.changeTb()
                }).catch((error) => {
                    console.log(error)
                    this.$message({
                        type:'info',
                        message:'已取消'
                    })
                })
            }
        },
        //未来交给后台做，因为要更改数据
        revokeApply(row){
            if(row.appState == '通过'){
                this.$confirm('是否请求撤销申请', '提示', {
                    cancelButtonText:'取消',
                    cancelButtonClass:'cancelButton',
                    confirmButtonText:'确定',
                    type:'warning'
                }).then(() => {
                    let appId = row.appId
                    let appType = row.appType                  
                    let item = this.getItemByAppidAppType(appId, appType)
                    item.appState = '撤销审批中'
                    this.changeTb()
                    this.$message({
                        type:'success',
                        message:'成功发送撤销请求',
                    })
                    //this.changeTb()
                }).catch((error) => {
                    console.log(error)
                    this.$message({
                        type:'info',
                        message:'已取消'
                    })
                })
            }            
        },





        
        


        //数据获取，获取表格数据,未来将转交给后台实现
        getList(){
            
            let listUnfilter
            if(this.appType == '请假'){
                listUnfilter = this.$store.state.appRelaxTb //尚未筛选的数据
            }
            else if(this.appType == '离职'){
                listUnfilter = this.$store.state.appLeaveTb //尚未筛选的数据
            }    
            //没有选中请假或离职，不显示 
            else{
                return []
            }    
              
            let listFilterByUserid = this.getListByFilterUserid(listUnfilter)
            let listFilterByDate = this.getListByFilterDate(listFilterByUserid)
            let listFilterByState = this.getListByFilterState(listFilterByDate)
            let listFilterByApptype = this.getListByFilterApptype(listFilterByState)
            return this.getFormatList(listFilterByApptype)          
        },


        getListByFilterUserid(listFilterStart){
            let appUserid = this.$store.state.LoginInfo.userid
            let listFilterByUserid = []
            for(let item of listFilterStart){
                if(item.appUserid == appUserid){
                    listFilterByUserid.push(item)
                }
            }
            return listFilterByUserid

        },

        //靠选择的日期为年份还是月份筛选程序
        getListByFilterDate(listFilterByUserid){
            let appType = this.appType  //当前选中请假，或者离职
            let dateType = this.dateType    //当前以月为单位，或者以年为单位显示数据
            let listFilterByDate = []
            if(appType == '请假'){
                //按月为单位读取数据
                if(dateType == 'month'){
                    let dateBelongYM
                    let month = this.month  //当前选择的日期
                    for(let item of listFilterByUserid){
                        dateBelongYM = this.getDateBelongYM(item.appRelaxStartDate)
                        if(dateBelongYM == month){
                            listFilterByDate.push(item)
                        }
                    }
                }
                else{
                    let dateBelongY
                    let year = this.year  //当前选择的年份                      
                    for(let item of listFilterByUserid){
                        dateBelongY = this.getDateBelongY(item.appRelaxStartDate)
                        if(dateBelongY == year){
                            listFilterByDate.push(item)
                        }
                    }
                }
            }
            else if(appType == '离职'){
                //按月为单位读取数据
                if(dateType == 'month'){
                    let dateBelongYM
                    let month = this.month  //当前选择的日期
                    for(let item of listFilterByUserid){
                        dateBelongYM = this.getDateBelongYM(item.appLeaveDate)
                        if(dateBelongYM == month){
                            listFilterByDate.push(item)
                        }
                    }
                }
                else{
                    let dateBelongY
                    let year = this.year  //当前选择的年份         
                    for(let item of listFilterByUserid){
                        dateBelongY = this.getDateBelongY(item.appLeaveDate) 
                        if(dateBelongY == year){
                            listFilterByDate.push(item)
                        }
                    }
                }
            }
            
            return listFilterByDate                       
        },
                            

        getListByFilterState(listFilterByDate){
            let listFilterByState = []
            let checkedState = this.checkedState       
            for(let item of listFilterByDate){
                if(checkedState.indexOf(item.appState) != -1){
                    listFilterByState.push(item)
                }
            }
            return listFilterByState
        },


        //靠请求类型筛选数据
        getListByFilterApptype(listFilterByState){
            let listFilterByApptype = []
            let appType = this.appType
            for(let item of listFilterByState){
                if(appType == item.appType){
                    listFilterByApptype.push(item)
                }
            } 
            return listFilterByApptype          
        },

        //得到数据合适的数组
        getFormatList(listFilterByApptype){
            let listFormated = []
            let appType = this.appType
            if(appType == '请假'){
                for(let item of listFilterByApptype){
                    listFormated.push({
                        appId:item.appId,

                        appType:item.appType,
                        appDate:item.appDate,
                        appRelaxType:item.appRelaxType,
                        appRelaxStartDate:item.appRelaxStartDate,
                        appRelaxEndDate:item.appRelaxEndDate,
                        appState:item.appState,
                        appDetail:item.appDetail,

                        verDetail:item.verDetail
                    })
                }
            }
            else if(appType == '离职'){
                for(let item of listFilterByApptype){
                    listFormated.push({
                        appId:item.appId,

                        appType:item.appType,
                        appDate:item.appDate,
                        appLeaveDate:item.appLeaveDate,
                        appState:item.appState,
                        appDetail:item.appDetail,

                        verDetail:item.verDetail                        
                    })
                }                
            }
            return listFormated
        },


        //靠id获得变量
        getItemByAppidAppType(appId, appType){
            let item
            let dataSource   //数据来源
            if(appType == '请假'){
                dataSource = this.$store.state.appRelaxTb
                for(item of dataSource){
                    if(item.appId == appId){
                        return item
                    }
                }
            }
            else if(appType == '离职'){
                dataSource = this.$store.state.appLeaveTb
                for(item of dataSource){
                    if(item.appId == appId){
                        return item
                    }
                }
            }            
        },



        //得到临时变量
        //得到当前日期的归属月份
        getDateBelongYM(date){
            let tempStr = date.split('-')
            let dateN = this.formatToNumber(tempStr[2]) //dataN为number类型
            let monthN = this.formatToNumber(tempStr[1])
            let yearN = tempStr[0]
            if(dateN >= getSalaryDate){
                monthN = this.formatMorD(monthN)
                return yearN + '-' + monthN
            }
            //当前日期应该属于上月记录
            else{
                monthN = monthN - 1
                //如果当前月份为1月，那么上个月是12月，必定不用在月份前加0
                if(monthN == 0){
                    monthN = 12
                    yearN = yearN - 1
                }
                //可能需要格式化日期
                else{
                    monthN = this.formatMorD(monthN)
                }
                return yearN + '-' + monthN
            }

        },
        getDateBelongY(date){
            let tempStr = date.split('-')
            let dateN = this.formatToNumber(tempStr[2]) //dataN为number类型
            let monthN = this.formatToNumber(tempStr[1])
            let yearN = tempStr[0]
            if(dateN >= getSalaryDate){
                return yearN.toString()
            }
            //当前日期应该属于上月记录
            else{
                monthN = monthN - 1
                //如果当前月份为1月，那么上个月是12月，必定不用在月份前加0
                if(monthN == 0){
                    monthN = 12
                    yearN = yearN - 1
                }
                return yearN.toString()
            }            
        },
        getTodayYMD(){
            let temp = new Date()
            let year = temp.getFullYear()
            let month = temp.getMonth()+1
            let date = temp.getDate()
            let todayYMD = year + '-' + this.formatMorD(month) + '-' + this.formatMorD(date)
            return todayYMD
        },




        //格式转化函数
        formatToNumber(data){
            if(typeof data == 'string'){
                return parseFloat(data)
            }
            else if(typeof data == 'number'){
                return data
            }
            else{
                alert('传入数据既不是字符，也不是数字')
                return 0
            }
        },
        //把日期或月份转换为标准格式
        //如果是1-9月，就加0，给01，02...，如果是10月以后，就不用加0
        //如果是1-9号，也同理
        formatMorD(date){
            if(typeof date == 'string' || typeof date == 'number'){
                let dateN = this.formatToNumber(date)
                return dateN<10 ? '0'+dateN : dateN
            }
        }
    }
    
}
</script>


<style>
/* vue的组件 */


.font18px .el-checkbox__label{
    font-size: 18px;
}
.font18px .el-radio__label{
    font-size: 18px;
}


.cancelButton{
    float: right;
    margin-left: 20px;
}


</style>




<style scoped>
/* css的组件 */

.top{
    display: flex;
    justify-content: space-between;
}
.topright{
    margin-right: 100px;
}
.applyforrelax{
    margin-top: 20px;
    margin-bottom: 30px;
}


.imgApple{
    width: 100px;
    height: 100px;
    vertical-align: middle;
}
.font36px{
    font-size: 36px;
}

.checkboxline1{
    display: flex;
    margin-bottom: 30px;
}
.selectall{
    margin-left: 30px;
}
</style>