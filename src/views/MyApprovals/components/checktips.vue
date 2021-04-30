<template>
    <div>
        <el-dialog width="600px" :title='title'  :visible="showCheckTipsDialog" @close="btnCancel">
            <span>{{info}}</span>
                <!-- 底部按钮 -->
            <el-row slot="footer" type="flex" justify="center" align="middle">
                <el-col>
                    <el-button
                    v-if='AOrR=="同意"'
                    type="primary"
                    size="small"
                    @click="btnAcceptSure"
                    >确认</el-button>
                    <el-button
                    v-if='AOrR=="拒绝"'
                    type="primary"
                    size="small"
                    @click="btnRefuseSure"
                    >确认</el-button>        
                    <el-button
                    v-if='AOrR=="撤销"'
                    type="warning"
                    size="small"
                    @click="btnRevokeSure"
                    >确认</el-button>                          


                    <el-button size="small" 
                        type="danger"
                        @click="btnCancel"
                    >取消</el-button>
                </el-col>
            </el-row>
        </el-dialog >

        <el-dialog class = "warn_Dia" :visible="showWarningDialog" @close="btnCloseWarning" title="警告" width="600px" >
            <b class="warn_b">假期数不够，无法同意申请</b>
        </el-dialog>
    </div>
</template>



<script>
export default {
    props:{
        showCheckTipsDialog:{
            type:Boolean,
            default:false
        },
        title:{
            type:String,
            default:''
        },
        sizeForm:{},
        showText:{
            type:String,
            default:''
        },
        AOrR:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            info:'',
            showWarningDialog:false
        }
    },

    updated(){
        if(this.AOrR=='撤销'){
            this.info = this.AOrR + "对" + this.sizeForm.appUsername + '的申请的处理？'
        }
        else{
            this.info = this.AOrR + this.sizeForm.appUsername + '的申请？'
        }
    },

    methods:{
        btnAcceptSure(){
            if(this.sizeForm.appCanCount - this.sizeForm.appLeaveCount >= 0){
            this.sizeForm.appCanCount -=  this.sizeForm.appLeaveCount
            this.sizeForm.appState = '同意'
            this.$emit('update:showCheckTipsDialog', false)
            }
            else{
                this.showWarningDialog = true
                this.$emit('update:showCheckTipsDialog', false)
            }
        },
        btnRefuseSure(){
            this.sizeForm.appState = '拒绝'
            this.$emit('update:showCheckTipsDialog', false)
        },   
        btnRevokeSure(){
            this.sizeForm.appCanCount = parseInt(this.sizeForm.appCanCount)
            this.sizeForm.appCanCount +=  parseInt(this.sizeForm.appLeaveCount)
            this.sizeForm.appState = '撤销'
            this.$emit('update:showCheckTipsDialog', false)
        },          

        btnCancel(){
            this.$emit('update:showCheckTipsDialog', false)
        },

        btnCloseWarning(){
            this.showWarningDialog = false
        }

    }

}


</script>

<style>

span{
    font-size: 18px;
}

.warn_b{
    font-size: 18px;
    color: red;
}
.warn_Dia .el-dialog__body{
    display: block;
    height: 300px;
}

</style>