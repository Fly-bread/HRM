<template>
    <div>
        <el-card>
            <img src='@/assets/common/img.jpeg' class='imgApple'>
            <b class="font36px">用户实发工资表</b>

            <el-form>
                <el-form-item label="选择月份" label-width="100px" v-if="dateType == 'month'">
                    <el-date-picker type="month" value-format="yyyy-MM" v-model="month" @change="changeData"/>
                    <el-button
                    type="primary"
                    @click='changeDateType'
                    >切换</el-button>
                </el-form-item>
                <el-form-item label="选择年份" label-width="100px" v-if="dateType == 'year'">
                    <el-date-picker type="year" value-format="yyyy" v-model="year" @change="changeData"/>
                    <el-button
                    type="primary"
                    @click='changeDateType'
                    >切换</el-button>
                </el-form-item>                
            </el-form>
        </el-card>

        <el-card>
            <el-table :data="list">
                <el-table-column label="序号" type="index" width="80px"/>
                <el-table-column label="月份" prop="month" v-if="dateType == 'year'" sortable/>
                <el-table-column label="工资基数" prop="salaryBase"/>

                <el-table-column label="扣除工资" prop="reduceAll">
                    <template slot-scope="scope">
                        <el-button 
                        type="text"
                        @click="routeToReduce"
                        >{{scope.row.reduceAll}}</el-button>
                    </template>
                </el-table-column>  

                <el-table-column label="奖金" prop="awardAll">
                    <template slot-scope="scope">
                        <el-button 
                        type="text"
                        @click="routeToAward"
                        >{{scope.row.awardAll}}</el-button>
                    </template>
                </el-table-column>            

                <el-table-column label="缴税" prop="tax">
                    <template slot-scope="scope">
                        <el-button type="text">{{scope.row.tax}}</el-button>
                    </template>
                </el-table-column> 

                <el-table-column label="社保缴费" prop="social">
                    <template slot-scope="scope">
                        <el-button type="text">{{scope.row.social}}</el-button>
                    </template>
                </el-table-column> 

                <el-table-column label="实发金额" prop="salaryFinal">
                    <template slot-scope="scope">
                        <el-button type="text">{{scope.row.salaryFinal}}</el-button>
                    </template>
                </el-table-column>                     
                
            </el-table>
        </el-card>

    </div>
</template>

<script>
export default {
    data(){
        return{
            dateType:'month',
            year:'',
            month:'',
            list:[],

            userid:'987',
            item:[],
            
            SBData:{},  //用户的工资基数备份，来自salaryBases
            formData:{}
        }
    },

    created(){
        this.month = this.getNowMonth()
        this.year = new Date().getFullYear().toString()
        //this.saveNewASData()  频繁create，频繁存储 ，这个函数实际上应该管理员来做
        this.changeData()
    },

    methods:{
        //组件数据显示函数
        changeData(){
            this.list = []
            if(this.dateType == 'month'){
                for(let item of this.$store.state.AS2021Tb){
                    if(item.id ==this.id && item.month == this.month){
                        console.log(item)
                        this.list.push(item)
                    }
                }  
            }    
            else if(this.dateType == 'year'){
                for(let item of this.$store.state.AS2021Tb){
                    let year = item.month.split('-')[0]
                    if(item.id ==this.id && year == this.year){
                        console.log(item)
                        this.list.push(item)
                    }
                }                 
            }
        },

        changeDateType(){
            if(this.dateType == 'month'){
                this.dateType = 'year'
            }
            else if(this.dateType == 'year'){
                this.dateType = 'month'
            }
            this.changeData()
        },

        typeToNumber(data){
            if(typeof data == 'string'){
                return parseFloat(data)
            }
            else if(typeof data == 'number'){
                return data
            }
            else{
                alert('数据有误')
                return null
            }
        },



        //组件事件函数
        routeToReduce(){
            this.$router.push({
                name:'emActSalarysReduce',
                params:{
                    userid:this.userid
                }
            })
        },

        routeToAward(){
            this.$router.push({
                name:'emActSalarysAward',
                params:{
                    userid:this.userid
                }
            })
        },        




        //提供值的函数
        //常用日历函数
        getNowDate(){
            let temp = new Date()
            let year = temp.getFullYear()
            let month = temp.getMonth()+1<10 ? '0' + (temp.getMonth()+1) : temp.getMonth()+1
            let date = temp.getDate()<10 ? '0'+temp.getDate() : temp.getDate()
            return year + '-' +month +'-' + date
        },
        getNowMonth(){
            let temp = new Date()
            let year = temp.getFullYear()
            let month = temp.getMonth()+1<10 ? '0' + (temp.getMonth()+1) : temp.getMonth()+1
            return year + '-' +month           
        },

        //得到发工资的日期
        getSalaryDateFun(){
            let getSalaryDate
            let nowDate = this.getNowDate()
            let nowStr = nowDate.split('-')
            let temp = this.typeToNumber(nowStr[2]) //今天的日期
            if(temp < 10){
                getSalaryDate = nowDate
            }
            else{
                let monthN = this.typeToNumber(nowStr[1])+1<10 ? '0'+(this.typeToNumber(nowStr[1]) + 1) : (this.typeToNumber(nowStr[1]) + 1)
                getSalaryDate = nowStr[0] + '-' + monthN + '-10'
            }
            return getSalaryDate

        },

        //得到salaryBase，基础工资
        getSBDataFun(){
            for(let item of this.$store.state.salaryBases){
                if(item.userid == this.userid){
                    this.SBData = item
                    var Str = item.lastSalaryDate.split('-')
                    console.log(this.SBData)
                    break
                }
            }  
            let monthN = this.typeToNumber(Str[1])+1<10 ? '0'+(this.typeToNumber(Str[1]) + 1) : (this.typeToNumber(Str[1]) + 1)
            return  Str[0] + '-' + monthN + '-' + Str[2]         
        },










        //不用的函数
        saveNewASData(){
            let getSalaryDate = this.getSalaryDateFun() //最近发工资的日子
            let waitDate = this.getSBDataFun()  //上次生效日期
            this.formData = {
                userid:this.userid,
                
                reduceAll:0,
                reduceFA:0,
                reduceFO:0,
                awardAll:0,
                tax:0,
                social:0,
                salaryFinal:0,
                month:'2021-04'
            }
            if(getSalaryDate > waitDate){
                this.formData.salaryBase = this.SBData.nowSalaryBase
            }
            else{

            }
            this.$store.state.AS2021Tb.push(this.formData)           
        },        
    }
    
}
</script>



<style scoped>
.imgApple{
    width: 100px;
    height: 100px;
    vertical-align: middle;
}

.font36px{
    font-size: 36px;
}

</style>