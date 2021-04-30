<template>
    <div>
        <el-dialog title="新增KPI数据" :visible="showAddDialog" @close="btnCancel">
            <el-form>
                <el-form-item label="姓名" label-width="80px">
                    <el-input v-model="sizeForm.username"/>
                </el-form-item>   
                <el-form-item label="工号" label-width="80px">
                    <el-input type="number" v-model="sizeForm.worknumber"/>
                </el-form-item>   
                <el-form-item label="kpi指标" label-width="80px">
                    <el-input v-model="sizeForm.kpi"/>
                </el-form-item>   
                <el-form-item label="kpi指数" label-width="80px">
                    <el-input type="number" v-model="sizeForm.kpiNum" />
                </el-form-item>                                   
            </el-form>

            <el-row slot="footer">
                <el-button
                size="small"
                type="primary"
                @click="btnOk"
                >确定</el-button>
                <el-button
                size="small"
                @click="btnCancel"
                >取消</el-button>                
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props:{
        showAddDialog:false,
        list:'',
    },

    data(){
        return{
            sizeForm:{},
            temp:{}
        }
    },


    methods:{
        btnCancel(){
            this.$emit('update:showAddDialog', false)
        },
        btnOk(){
            this.temp = JSON.parse(JSON.stringify(this.sizeForm))
            this.list.push(this.temp)
            this.sizeForm = {}
            this.$emit('update:showAddDialog', false)
            
        },

    }
}
</script>


<style>
.el-button{
    font-size: 18px;
}
</style>