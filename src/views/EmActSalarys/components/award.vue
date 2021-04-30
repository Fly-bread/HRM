<template>
    <div class="container">
        <el-card>
            <img src='@/assets/common/img.jpeg' class="imgApple">
            <b id="font12px">{{formData.username + '的工资奖励记录'}}</b>

            <el-form>
                <el-form-item label="选择月份" label-width="130px">
                    <el-date-picker type="month" value-format="yyyy-MM" v-model="month" @change="changeData"/>
                </el-form-item> 
            </el-form>
        </el-card>

        <el-card>
            <div class="bar">
                <div class="barleft">
                    <img src='@/assets/common/img.jpeg' class="smallImg">
                    <b class="smallFont">其它扣除记录</b> 
                </div>
            </div>


            <el-table :data="list">
                <el-table-column type="index"  label="序号" width="80px"/>
                <el-table-column label="奖励日期" prop="date"/>
                <el-table-column label="奖励原因" prop="reason"/>
                <el-table-column label="奖励金额" prop="awardNum"/>
            </el-table> 
            <div class="foot">
                <b  id="tb1total">{{'共计:' + total}}</b>      
            </div>  
        </el-card>

         
    </div>
</template>

<script>

export default {


    data(){
        return{
           month:'',
            list:[],

            userid:this.$route.params.userid,   //用于在数据库中找到用户信息
            username:'',
            formData:{},    //存储用户信息
            total:0

        }
    },

    created(){
        this.month = this.getMonth()
        this.changeData()
        
        for(let item of this.$store.state.userInfoTb){
            if(item.userid == this.userid){
                this.formData = item
                break
            }
        }
     
    },

    methods:{
        getMonth(){
            var nowDate = new Date();
            var year = nowDate.getFullYear();
            var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
            : nowDate.getMonth() + 1;
            var monthStr = year + "-" + month;     
            return  monthStr    
        },

        formMonth(date){
            let temp = date.split('-')
            let month = temp[0] + '-' + temp[1]
            return month
        },

        changeData(){
            this.changeTb()
        },



        setDate(){
            var nowDate = new Date();
            var year = nowDate.getFullYear();
            var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
            : nowDate.getMonth() + 1;
            var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
            .getDate();
            var dateStr = year + "-" + month + "-" + day;
            return dateStr
        }, 
        typeToNumber(data){
            if(typeof data == 'string'){
                return parseFloat(data)
            }
            else if(typeof data == 'number'){
                return data
            }
            else{
                this.$alert('数据类型错误', '错误', {})
            }
        },

        changeTb(){
            this.list = []
            this.total = 0
            //起始日期为一月10号
            let beginDate = this.month + '-10'
            let tempStr = this.month.split('-')
            let tempMonth = this.typeToNumber(tempStr[1])+1<10 ? '0' +(this.typeToNumber(tempStr[1])+1):this.typeToNumber(tempStr[1])+1
            //结束日期为下月9号
            let endDate = tempStr[0] + '-' + tempMonth + '-09'
            for(let item of this.$store.state.awardsTb){
                if( beginDate< item.date &&  item.date <= endDate){
                    if(this.userid == item.userid){
                    this.list.push(item)
                    this.total += item.awardNum
                    }
                }
            } 
        },
        
    }


    
}
</script>


<style scoped>
.imgApple{
    height: 100px;
    width: 100px;
    vertical-align: middle;
}
#font12px{
    font-size: 36px;
}

.el-form-item__label{
    font-size: 18px;
}
.el-form-item__content{
    font-size: 18px;
}



/* table上方的一栏 */
.bar{
    display: flex;
    justify-content: space-between
}
.bar .el-button{
    margin-right: 100px;
}

.smallImg{
    height: 50px;
    width: 50px;
    vertical-align: middle;
}
.smallFont{
    font-size: 20px;
}

.foot{
    font-size: 18px;
    position: relative;
    left: 1500px;
    display: block;
    margin-top: 30px;
}

#all{
    margin-top: 20px;
}


.cancelButton{
  float: right;
  margin-left: 20px;    
}



</style>