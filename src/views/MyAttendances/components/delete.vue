<template>
    <el-dialog :title="title" :visible="showDeleteDialog" @close="btnCancel">
        <span>{{"确定删除" + sizeForm.username + "的考勤记录吗？"}}</span>

        <el-row slot = "footer">
            <el-col>
                <el-button
                type="danger"
                size="small"
                @click="btnOk"
                >确定</el-button>
                <el-button
                size="small"
                @click="btnCancel"
                >取消</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>


<script>

export default {
    props:{
        title:'',
        showDeleteDialog:false,
        sizeForm:{},
        del_index:-1
    },

    methods:{
        btnCancel(){
            this.$emit("update:showDeleteDialog", false)
        },
        btnOk(){
            this.$emit("delete")
            this.$emit("update:showDeleteDialog", false)
        }
    }
}

</script>


<style>

</style>