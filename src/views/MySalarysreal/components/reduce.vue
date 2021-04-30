<template>
    <div class="container">
        <el-card>
            <img src='@/assets/common/img.jpeg' class="imgApple">
            <b id="font12px">{{formData.username + '的工资扣除记录'}}</b>

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
                <div class="barright">
                    <el-button type="primary" @click="showAddEdit()"
                    >添加记录</el-button>
                </div>
            </div>


            <el-table :data="reduceFromOther">
                <el-table-column type="index"  label="序号" width="80px"/>
                <el-table-column label="姓名" prop="username"/>
                <el-table-column label="工号" prop="worknumber"/>
                <el-table-column label="扣除日期" prop="date"/>
                <el-table-column label="原因" prop="reason"/>
                <el-table-column label="扣除金额" prop="reduceNum"/>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        type="text"
                        @click="showAddEdit(scope.row)"
                        >编辑</el-button>
                        <el-button
                        type="text"
                        @click="showDelete(scope.row)"
                        >删除</el-button>                                                
                    </template>
                </el-table-column>
            </el-table> 
            <div class="foot">
                <b  id="tb1total">{{'共计:' + total.tb1Total}}</b>      
            </div>  
        </el-card>

         

        <el-card>
            <img src='@/assets/common/img.jpeg' class="smallImg">
            <b class="smallFont">考勤扣除记录</b>     

            <el-table :data="reduceFromAttendance">
                <el-table-column type="index"  label="序号" width="80px"/>
                <el-table-column label="姓名" prop="username"/>
                <el-table-column label="工号" prop="worknumber"/>
                <el-table-column label="扣除日期" prop="date"/>
                <el-table-column label="类型" prop="reason"/>
                <el-table-column label="扣除金额" prop="reduceNum"/>
            </el-table>   

            <b class="foot">{{'共计:' + total.tb2Total}}</b> 
            <b class="foot" id="all">{{'总计:'+ total.total}}</b>
        </el-card>

        <add-edit
            ref ="addEdit"
            :show-add-edit-dialog.sync="showAddEditDialog"
        />             
    </div>
</template>

<script>
import { parse } from 'path-to-regexp'
import AddEdit from './addedit'

export default {

    components:{AddEdit},

    data(){
        return{
            showAddEditDialog:false,

            
            
            month:'',
            reduceFromOther:[],
            reduceFromAttendance:[],

            userid:this.$route.params.userid,
            formData:{},
            total:{
                tb1Total:0,
                tb2Total:0,
                tbAllTotol:0
            }

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
            this.changeTotal()

        },

        showAddEdit(row){
            if(!row){
                this.$refs.addEdit.type = '添加扣薪记录'
                this.$refs.addEdit.formData = JSON.parse(JSON.stringify(this.formData))
                this.$refs.addEdit.date = this.setDate()

                this.showAddEditDialog = true
            }
            else{
                this.$refs.addEdit.type = '编辑扣薪记录'
                this.$refs.addEdit.formData = JSON.parse(JSON.stringify(row))
                this.$refs.addEdit.date = row.date
                this.showAddEditDialog = true
            }
        },

        showDelete(row){
                this.$confirm('此操作将永久删除该文件，是否继续？','提示',{
                    cancelButtonClass: "cancelButton",
                    cancelButtonText:'取消',
                    confirmButtonText:'确定',
                    type:'warning'
                }).then(()=>{
            //await this.getPermissionList() // 重新获取页面数据
                let list = this.$store.state.reduceFromOther
                for(let i in list){
                    if(list[i].id == row.id){
                        list.splice(i, 1)
                        break
                    }
                }
                this.changeData()
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
                }).catch(() =>
                    {
                        this.$message({
                        type:'info',
                        message:'已取消删除'
                        }
                    )}
                )
            
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

        //修改表的显示内容
        changeTb(){
            this.reduceFromOther = []
            this.reduceFromAttendance = []
            //起始日期为一月10号
            let beginDate = this.month + '-10'
            let tempStr = this.month.split('-')
            let tempMonth = this.typeToNumber(tempStr[1])+1<10 ? '0' +(this.typeToNumber(tempStr[1])+1):this.typeToNumber(tempStr[1])+1
            //结束日期为下月9号
            let endDate = tempStr[0] + '-' + tempMonth + '-09'
            for(let item of this.$store.state.reduceFromOther){
                if( beginDate< item.date &&  item.date <= endDate){
                    if(this.userid == item.userid){
                    this.reduceFromOther.push(item)
                    }
                }
            }

            for(let item of this.$store.state.reduceFromAttendance){
                if( beginDate< item.date &&  item.date <= endDate){
                    if(this.userid == item.userid){
                    this.reduceFromAttendance.push(item)
                    }
                }
            }              
        },
        
        changeTotal(){
            this.total.tb1Total = 0 
            this.total.tb2Total = 0 
            this.total.total = 0 
            for(let item of this.reduceFromOther){
                item.reduceNum = this.typeToNumber(item.reduceNum)
                this.total.tb1Total += item.reduceNum
            }
            for(let item of this.reduceFromAttendance){
                item.reduceNum = this.typeToNumber(item.reduceNum)
                this.total.tb2Total += item.reduceNum                
            }
            this.total.total = this.total.tb1Total + this.total.tb2Total     



            this.changeASTb()   //改变实发工资表的数据
                    
   
        },

        changeASTb(){
            //关键变量，决定本次修改的数据放入哪个月的实发工资记录
            let month = this.month
            let AStb = this.$store.state.AS2021Tb
            for(let item of AStb){
                if(item.userid == this.formData.userid && item.month == month){
                    item.reduceAll = this.total.total
                    item.reduceFA = this.total.tb2Total     
                    item.reduceFO = this.total.tb1Total
                    break
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