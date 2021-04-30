<template>
    <div>
        <el-card>
            <img src="@/assets/common/img.jpeg" class="imgApple">
            <b class="font36px">考勤记录</b>

            <el-form>
                <el-form-item class="font18px" label="选择月份" label-width="100px">
                    <div class="bar">
                        <el-date-picker type="month" value-format="yyyy-MM" v-model="month" @change="changeData"/>
                        <div class="barright">
                            <el-button type="primary" @click="routerTo">所有记录</el-button>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>


        <el-card>
            <el-table :data="list">
                <el-table-column label="序号" type="index" width="80px"/>
                <el-table-column label="异常日期" prop="date"/>
                <el-table-column label="异常类型" prop="type"/>
            </el-table>            
        </el-card>
    </div>
</template>

<script>
export default {

    data(){
        return{
            month:'',
            list:[],
            userid:'987'
        }
    },

    created(){
        this.month = this.getMonth()
        this.changeData()
    },

    methods:{
        changeData(){
            this.list = []

            if('987' == this.userid)   //模拟用户登录
            for(let item of this.$store.state.emAttendance){
                if(this.formatMonth(item.date) == this.month){
                    this.list.push(item)
                }
            }
        },

        getMonth(){
            let temp = new Date()
            let year = temp.getFullYear()
            let month = temp.getMonth()+1<10 ? '0' + (temp.getMonth()+1) : temp.getMonth() + 1
            return year + '-' + month
        },
        formatMonth(date){
            let temp = date.split('-')
            return temp[0] + '-' + temp[1]
        },

        routerTo(){
            this.$router.push({
                name:'emAttendanceDetails',
            })
        }
    }
    
}
</script>


<style scoped>
.imgApple{
    vertical-align: middle;
    width: 100px;
    height: 100px;
}

.bar{
    display: flex;
    justify-content: space-between;
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