<template>
    <div>
        <el-card>
            <img src="@/assets/common/img.jpeg" class="imgApple">
            <b class="font36px">考勤记录</b>

            <el-form>
                <el-form-item class="font18px" label="选择年份" label-width="100px">
                    <div class="bar">
                        <el-date-picker type="year" value-format="yyyy" v-model="year" @change="changeData"/>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>


        <el-card>
            <el-table :data="list">
                <el-table-column label="序号" type="index" width="80px"/>
                <el-table-column label="异常日期" prop="date" sortable/>
                <el-table-column label="异常类型" prop="type" sortable/>
            </el-table>            
        </el-card>
    </div>
</template>

<script>
export default {

    data(){
        return{
            year:'',
            list:[],
            userid:'987'
        }
    },

    created(){
        this.year = this.getYear()
        this.changeData()
    },

    methods:{
        changeData(){
            this.list = []

            if('987' == this.userid)   //模拟用户登录
            for(let item of this.$store.state.emAttendance){
                if(this.formatYear(item.date) == this.year){
                    this.list.push(item)
                }
            }
        },

        getYear(){
            let temp = new Date()
            return temp.getFullYear().toString()
        },
        formatYear(date){
            let temp = date.split('-')
            return temp[0]
        },


    }
    
}
</script>


<style scoped>
.imgApple{
    vertical-align: middle;
    width: 100px;
    height: 100px;
}


.barright{
    margin-right: 60px;
}

.font36px{
    font-size: 36px;
}

.el-form-item__label{
    font-size: 18px;
}
</style>