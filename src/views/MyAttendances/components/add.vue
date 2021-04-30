<template>
    <div>
        <el-dialog :visible="showAddDialog" :title="title" @close="btnCancel" width="400px">
            <el-form>
                <el-form-item label='姓名' label-width="80px">{{sizeForm.username}}
                </el-form-item>

                <el-form-item label="工号" label-width="80px">{{sizeForm.Worknumber}}
                </el-form-item>

                <el-form-item label="异常日期" label-width="80px">
                    <el-date-picker v-model="sizeForm.date" type="date" value-format="yyyy-MM-dd" style="width:90%"/>
                </el-form-item>

                <el-form-item label="异常类型" label-width="80px">
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
            </el-form>

            <el-row slot="footer">
                <el-button
                type="primary"
                size="small"
                @click="showAddTips"
                >确定</el-button>

                <el-button
                size="small"
                @click="btnCancel"
                >取消</el-button>            
            </el-row>
        </el-dialog>

        <add-tips
            :title="AddTipstitle"
            :show-add-tips-dialog.sync="showAddTipsDialog"
            :username="sizeForm.username"
            :showAddDialog.sync ="showAddDialog"
            :list="list"
            :sizeForm="sizeForm"
        />
    </div>
</template>


<script>
import AddTips from './addTips'

export default {
    components:{AddTips},
    props:{
        showAddDialog:{
            default:false
        },
        title:'',
        sizeForm:{},
        list:{
            type:Array,
            default:[]
        }
    },

    data(){
        return{
            showAddTipsDialog:false,
            AddTipstitle:'',

            date:'',
            options:[{
                value:'请假',
                label:'请假'
            },
            {
                value:'旷工',
                label:'旷工'
            },
            ],
            date:'',
        }
    },




    methods:{
        btnCancel(){
            // update:showAddDialog中间不能加空格
            this.$emit("update:showAddDialog", false)
        },
        showAddTips(){
            this.showAddTipsDialog = true
            this.AddTipstitle = '确认新增' + this.sizeForm.username + '的考勤记录吗？'
            //this.$emit("update:showAddDialog", false)
        }
    }
}
</script>


<style>

</style>
