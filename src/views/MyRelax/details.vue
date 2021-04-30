<template>
    <div>
        <el-card>
            <img src='@/assets/common/img.jpeg' class='appleImg' width="100px" height="100px" alt>
            <b>{{username + '的请假记录'}}</b>

            <el-form>
                <el-form-item label="选择年份" label-width="130px">
                    <el-date-picker type="year" value-format="yyyy" v-model="selectYear" @change="showData"/>   
                </el-form-item>
                <el-form-item label="总休假总量" label-width="130px">
                    <b class="relaxNum_b">{{relaxSLM.relaxAll}}</b>
                </el-form-item>
                <el-form-item label="已休假" label-width="130px">
                    <b class="relaxNum_b">{{relaxSLM.relaxed}}</b>
                </el-form-item>
                <el-form-item label="可休假" label-width="130px">
                    <div class="flex_div">
                        <b class="relaxNum_b">{{relaxSLM.relaxRemain}}</b>
                        <el-button
                        size="small"
                        type="primary"
                        id = "applyRelax_btn"
                        v-if='id=="987"'
                        @click="showApplyForRelax"
                        >申请休假</el-button>  
                    </div> 
                </el-form-item>
                                 
            </el-form>
        </el-card>

        <el-card>
            <el-table :data="list">
                <el-table-column type="index" label="序号" width="80px"/>
                <el-table-column label="姓名" prop="username"/>
                <el-table-column label="工号" prop="worknumber"/>  
                <el-table-column label="休假类型" prop="type"/>              
                <el-table-column label="休假申请日期" prop="appDate" sortable/>
                <el-table-column label="休假开始日期" prop="startDate" sortable/>
                <el-table-column label="休假结束日期" prop="endDate" sortable/>
                <el-table-column label="休假天数" prop="relaxNum" sortable/>
                <el-table-column label="休假原因" prop="appDetail" sortable/>
                <el-table-column label="管理员回复" prop="verDetail" sortable/>
            </el-table>

        </el-card>

        <apply-for-relax
            :title="ApplyForRelaxtitle"
            :show-apply-for-relax-dialog.sync ="showApplyForRelaxDialog"
        
        />
    </div>
</template>


<script>

import ApplyForRelax from './components/applyForRelax'

export default {
    components:{ApplyForRelax},

    data(){
        return {
            ApplyForRelaxtitle:'',
            showApplyForRelaxDialog:false,

            listAll:this.$store.state.relaxSLM,
            list:[],
            id:this.$route.params.id,
            selectYear:'',
            username:this.$route.params.username,
            relaxSLM:{},

        }
    },

    created(){
        this.selectYear = new Date().getFullYear().toString()

        this.showData()



    },

    methods:{
        getYear(obj){
            let temp = obj.startDate.split('-')
            return temp[0]
        },

        showApplyForRelax(){
            this.ApplyForRelaxtitle = '请假'
            this.showApplyForRelaxDialog = true
            
        },



        showData(){
            this.list=[]
            for(var item of this.listAll){
                if(this.id == item.id){
                    if(this.getYear(item) == this.selectYear){
                        this.list.push(item)
                    }
                }
            }    
            
            for(var item of this.$store.state.relaxListAll){
                if(item.id == this.id){
                    if(item.date == this.selectYear){
                    // this.relaxAll = item.relaxAll
                    // this.relaxed = item.relaxed
                    // this.relaxRemain = this.relaxAll - this.relaxed
                    this.relaxSLM = item
                    }

                }
            }
        },

    }
    
}
</script>


<style scoped>
.appleImg{
    vertical-align: middle;
}

b{
    font-size: 36px;
}

/* 设置表项字体大小 */
.el-table__row{
    font-size: 18px;
}
.el-table__row button{
    font-size: 18px;
}

.flex_div{
    display: flex;
    justify-content: space-between;
}

#applyRelax_btn{
    margin-right: 30px;
    font-size: 18px;
}

/* 设置选择年份那边的字体大小 */
.el-form-item__label{
    font-size: 18px;
}
.el-date-editor{
    font-size: 18px;
}

.relaxNum_b{
    margin-left: 30px;
}



</style>