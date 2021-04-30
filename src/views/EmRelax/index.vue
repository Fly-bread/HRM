<template>
    <div>
        <el-card>
            <img src='@/assets/common/img.jpeg' class="imgApple">
            <b class="font36px">休假表</b>
            <el-form>
                <el-form-item label="选择月份" label-width="100px" v-if="DPtype=='month'">
                    <div class="bar">
                        <div class="barleft">
                            <el-date-picker type="month" value-format="yyyy-MM" v-model="month" @change="changeData"/>
                            <el-button type="primary" @click="changeDPType">切换</el-button>
                        </div>
                        <div class="barright">
                            <el-button
                            type="primary"
                            >申请休假</el-button>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="选择年份" label-width="100px" v-if="DPtype=='year'">
                    <div class="bar">
                        <div class="barleft">
                            <el-date-picker type="year" value-format="yyyy" v-model="year"  @change="changeData"/>
                            <el-button type="primary" @click="changeDPType">切换</el-button>
                        </div>
                        <div class="barright">
                            <el-button
                            type="primary"
                            @click="showApplyForRelax"
                            >申请休假</el-button>
                        </div>
                    </div>
                </el-form-item>                
            </el-form> 
        </el-card>

            <el-table :data="list">
                <el-table-column label="序号" type="index" width="80px"/>
                <el-table-column label="休假开始日期" prop='startDate' sortable=""/>
                <el-table-column label="休假结束日期" prop="endDate"/>
                <el-table-column label="休假天数" prop="relaxNum"/>
                <el-table-column label="休息类型" prop="type" sortable :sort-method="sortByType">
                    <template slot-scope="scope">
                        <b class="fontred" v-if="scope.row.type == '年假'">{{scope.row.type}}</b>
                        <b class="fontgreen" v-else>{{scope.row.type}}</b>
                    </template>
                </el-table-column>

            </el-table>  
            <div class="foot">
                <b>{{'总休假日期:' + total.relaxAll}}</b>
                <b>{{'已休假日期:' + total.relaxed}}</b>
                <b>{{'剩余休假日期:' + total.relaxRemain}}</b>
            </div>   

        <el-card>

        </el-card>


        <apply-for-relax
            :show-apply-for-relax-dialog.sync="showApplyForRelaxDialog"
        />
    </div>
</template>


<script>
import ApplyForRelax from './components/applyForRelax'

export default {
    components:{ApplyForRelax},

    data(){
        return{
            showApplyForRelaxDialog:false,
            DPtype:'year',

            userid:'987',

            year:'',
            month:'',

            list:[],
            total:{
                relaxAll:0,
                relaxed:0,
                relaxRemain:0
            }
        }
    },

    created(){
        this.year = this.getYear()
        this.month = this.getMonth()
        this.changeData()
    },


    methods:{
        showApplyForRelax(){
            this.showApplyForRelaxDialog = true
        },

        changeDPType(){
            if(this.DPtype == 'year'){
                this.DPtype = 'month'
                
            }else{
                this.DPtype = 'year'
                
            }
            this.changeData()
        },

        changeData(){
            this.changeTb()   //改变表中的数据
            this.changeTotal()
            
            
        },

        changeTb(){
            let listAll = this.$store.state.relaxDetail2021
            this.list = []

            if(this.DPtype == 'year'){
                
                for(let item of listAll){

                    if(item.userid == this.userid && this.formatYear(item.startDate) == this.year){
                        this.list.push(item)
                    }
                
                }
            }
            else if(this.DPtype == 'month'){
                
                for(let item of listAll){
                    if(item.userid == this.userid && this.formatMonth(item.startDate) == this.month){
                        this.list.push(item)
                    }
                }
            }
        },

        //改变总的数据
        changeTotal(){

            this.getRelaxed()
            this.getRelaxAll()  //获得总休假天数
            this.total.relaxRemain = this.total.relaxAll - this.total.relaxed
        },

        formatYear(date){
            return date.split('-')[0]
        },
        formatMonth(date){
            let temp = date.split('-')
            return temp[0] + '-' + temp[1]
        },

        getYear(){
            return new Date().getFullYear().toString()
        },
        getMonth(){
            let temp = new Date()
            let year = temp.getFullYear()
            let month = temp.getMonth() + 1 <10 ? '0' + (temp.getMonth() + 1 ) : temp.getMonth()+1
            return year + '-' + month
        },
        getDate(){
            let temp = new Date()
            let year = temp.getFullYear()
            let month = temp.getMonth() + 1 <10 ? '0' + (temp.getMonth() + 1 ) : temp.getMonth()+1
            let date = temp.getDate()  <10 ? '0' + (temp.getDate() ) : temp.getDate()
            return year + '-' + month + '-' + date           
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
                return 0
            }
        },

        getRelaxAll(){
            let nowYear = this.getYear()
            let nowMonth = this.getMonth()  
            let nowDate = this.getDate()               
            let userInfoTb = this.$store.state.userInfoTb
            for(let item of userInfoTb){
                if(item.userid == this.userid){
                    //因为这个变量要供外面使用，所以用var
                    var entryYear = this.formatYear(item.entryDate)
                    var entryMonth = this.formatMonth(item.entryDate)
                    var entryDate = item.entryDate
                    break
                }
            }

            //今年入职,则从入职日期开始算
            if(entryYear == nowYear){
                //入职了近乎几个月
                var DMonth = nowMonth.split('-')[1] -  entryMonth.split('-')[1] 
                let DDate = nowDate.split('-')[2] -  entryDate.split('-')[2] 
                //如果差值小于10天，则视为来了一个月
                if(DDate > 10){
                    DMonth -= 1
                }
                 
            }
            //往年入职，则从今年1月1号开始算
            else{
                var DMonth = nowMonth.split('-')[1]
            }
            this.total.relaxAll = DMonth * 0.5            
        },
        getRelaxed(){
            this.total.relaxed = 0

            let nowYear = this.getYear()        
            let listAll = this.$store.state.relaxDetail2021
            
            for(let item of listAll){
                if(item.userid == this.userid && this.formatYear(item.startDate) == nowYear){
                    if(item.type == '年假'){
                        this.total.relaxed += this.typeToNumber(item.relaxNum)
                    }
                }
            }             
        },

        sortByType(row1, row2){
            let a = 0
            let b = 0
            if(row1.type == '年假'){
                a = 2
            }
            if(row2.type == '年假'){
                b = 2
            }  
            //因为优先以年假作为排序标准，所以日期的权重较低，只能加1
            if(row1.startDate > row2.startDate){
                a = a+1
            }
            else if(row2.startDate > row1.startDate){
                b = b+1                
            }
            return b-a            

        }

    },

    computed:{
        
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

.el-form-item__label{
    font-size: 18px;
}

.bar{
    display: flex;
    justify-content: space-between;
}
.barright{
    margin-right: 60px;
}



.fontred{
    color: red;
}

.fontgreen{
    color: green;
}




.foot{
    position: relative;
    left:1400px;
    border-width: 0px;
}
.foot b{
    display: block;
    font-size: 18px;
    margin-top: 30px;
}
</style>