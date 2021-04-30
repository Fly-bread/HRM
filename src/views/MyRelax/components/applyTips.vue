<template>
    <div>
        <el-dialog :title="title" :visible="showApplyTipsDialog" @close='btnCancel'>
            <span>确定申请休假？</span>
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
        title:'',
        showApplyTipsDialog:false
    },

    methods:{
        btnCancel(){
            this.$emit('update:showApplyTipsDialog', false)
        },
        btnOk(){
            this.$parent.btnCancel()  
            this.$parent.sendData()
            this.$emit('update:showApplyTipsDialog', false)
        }
    }
}
</script>


<style>

</style>