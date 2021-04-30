<template>
    <el-dialog :title="title" :visible="showAddTipsDialog" @close ="btnCancel">
        <span class = "tips_span">{{'确定添加' + username + '的考勤记录吗？'}}</span>

        <el-row slot="footer">
            <el-button
            @click="btnOk"
            size="small"
            type="primary"
            >确定</el-button>
            <el-button
            size="small"
            @click="btnCancel"
            >取消</el-button>  
        </el-row>          
    </el-dialog>
</template>


<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        showAddTipsDialog:{
            type:Boolean,
            default:false
        },
        username:{
            type:String,
            default:''
        },


        list:{
            type:Array,
            default:[]
        },
        sizeForm:{
            type:Object,
            default:{}
        }
    },

    methods:{
        btnOk(){
            this.list.push(this.sizeForm)
            
            this.$emit('update:showAddTipsDialog', false)
            this.$parent.btnCancel()  
        },
        btnCancel(){
            this.$emit('update:showAddTipsDialog', false)
        }
    }
}
</script>



<style>
.tips_span{
    font-size: 18px;
}
</style>