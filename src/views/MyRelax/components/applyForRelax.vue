<template>
    <div>
        <el-dialog :title="title" :visible="showApplyForRelaxDialog" @close="btnCancel" id = "forMount">
            <el-form :rules="rules" ref="appForm"  :model="sizeForm">
                <el-form-item label="请假类型" label-width="130px" prop="type">
                    <el-select
                    v-model="sizeForm.type"
                    placeholder="请选择"
                    style="width:90%"
                    >
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" label-width="130px" prop="startDate">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="sizeForm.startDate"/>
                </el-form-item>
                <el-form-item label="结束时间" label-width="130px" prop="endDate">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="sizeForm.endDate"/>
                </el-form-item>
                <el-form-item label="申请天数" label-width="130px" prop="relaxNum">
                    <el-input type="number" v-model="sizeForm.relaxNum"/>
                </el-form-item>
                <el-form-item label="申请理由" label-width="130px">
                    <el-input 
                    class = 'detail_Input'   
                    type="textarea" 
                    :rows="4" 
                    height='100px'  
                    v-model="sizeForm.appDetail"
                    />
                </el-form-item>                             
            </el-form>

            <el-row slot="footer">
                <el-button
                size="small"
                type="primary"
                @click="showApplyTips('appForm')"
                >确定</el-button>
                <el-button
                size="small"
                @click="btnCancel"
                >取消</el-button>
            </el-row>



        </el-dialog>

        <apply-tips
            :title="ApplyTipstitle"
            :show-apply-tips-dialog.sync="showApplyTipsDialog"
        />



    </div>
</template>



<script>
import ApplyTips from './applyTips'
import Wrong from './wrong'

export default {
    components:{ApplyTips, Wrong},

    props:{
        title:'',
        showApplyForRelaxDialog:false,
    },

    data(){
        const validatePass = (rule, value, callback) =>{
            console.log('aaaaaa')
            if(value < this.sizeForm.startDate){
                callback(new Error('错误了啊'))
            }
            else{
                callback()
            }
        }
        return{
            showApplyTipsDialog:false,
            ApplyTipstitle:'',


            appForm:'',


            options:[{
                value:'病假',
                label:'病假'
            },
            {
                value:'事假',
                label:'事假'
            }
            ],

            sizeForm:{
                username:'史莱姆',
                worknumber:'12345',
                id:'987',
                type:'',
                startDate:'',
                endDate:'',
                appDate:"",
                relaxNum:0,
                appDetail:'',
                verDetail:'',
            },


            rules:{
                type:[
                    {required:true,    message: '选择不能为空', trigger:'change'}],
                relaxNum:[
                    {required:true, message:'请假天数不能为空', trigger:'blur'}],
                startDate:[{
                    required:true, message:'开始日期不能为空', trigger:'blur'}],
                endDate:[{
                    required:true, message:'结束日期不能为空', trigger:'blur'},
                    {validator:validatePass, message:'结束日期不能小于开始日期'}],
                
            }
        }
    },

    methods:{
        btnCancel(){
            this.$emit('update:showApplyForRelaxDialog',false)
        },

        showApplyTips(){
            this.$refs.appForm.validate((valid)=> {
                if(valid){
                    this.showApplyTipsDialog = true
                    this.ApplyTipstitle = '确定申请休假'
                }
                else{
                    this.$alert('信息填写有误，请重新填写请假信息', '错误', {
                    confirmButtonText: '确定',

                    });
                }
            })


        },

        sendData(){
            
            let date = this.getNewDate()
            let year = new Date().getFullYear().toString()
            for(var item of this.$store.state.relaxListAll){
                if(item.id == '987'){
                    if(item.date == year){                  
                        item.relaxed += parseFloat(this.sizeForm.relaxNum)
                        item.relaxRemain = item.relaxAll - item.relaxed
                    }
                }
            }
            this.sizeForm.appDate = date
            this.$store.state.relaxSLM.push(this.sizeForm)
            this.$parent.showData()

         
        },

        getNewDate(){
            var nowDate = new Date();
            var year = nowDate.getFullYear();
            var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
            : nowDate.getMonth() + 1;
            var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
            var dateStr = year + "-" + month + "-" + day;

            return dateStr
        }
    }
}
</script>


<style>
.detail_Input{
    font-size: 18px;
}

.el-button{
    font-size: 18px;
}

.el-message-box__message p{
    font-size: 18px;
}

</style>