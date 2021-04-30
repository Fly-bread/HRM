<template>
    <div>
        <el-dialog :visible="showApplyForRelaxDialog" title="申请休假" @close="btnCancel">
        
        </el-dialog>
    </div>
</template>

<script>
export default {
    props:{
        showApplyForRelaxDialog:false
    },

    data(){
        return{

        }
    },

    methods:{
        btnCancel(){
            this.$emit('update:showApplyForRelaxDialog', false)
        }
    }
    
}
</script>


<style>

</style>