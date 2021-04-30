<template>
    <el-dialog width='500px' :title="title" :visible='showEditDialog' @close='btnCancel' >
        <el-form>
            <el-form-item  label="姓名" label-width="130px">
                <span>{{temp.username}}</span>
            </el-form-item>

            <el-form-item  label="工号" label-width="130px">
                <span>{{temp.Worknumber}}</span>
            </el-form-item>

            <!-- 日期也可以编辑 -->
            <el-form-item  label="异常日期" label-width="130px">
                <el-date-picker 
                v-model="temp.date"  
                type="date" 
                value-format="yyyy-MM-dd"  
                :placeholder="temp.date" 
                style="width:83%"/>
            </el-form-item>
            
            <!-- 此处应该是选择框 -->
            <el-form-item  label="异常类型" :placeholder="temp.type" label-width="130px">
                <el-select
                v-model="temp.type"
                placeholder="请选择"
                style="width:83%"
                >
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
                </el-select>
            </el-form-item>            

            <!-- 底部有确定按钮 -->


        </el-form>


        <el-row slot='footer' >
            <el-col>
                <el-button
                type='primary'
                size='small'
                @click='btnOk'
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
        showEditDialog:{
            type:Boolean,
            default:false
        },
        title:{
            type:String,
            default:''
        },
        sizeForm:{},
        temp:{}

    },

    data(){
        return{
            options:[{
                value:'请假',
                label:'请假'
            },
            {
                value:'旷工',
                label:'旷工'
            },
            ],
            

        }
    },



    methods:{
        btnCancel(){         
            this.$emit('update:showEditDialog', false)
        },

        btnOk(){
            this.sizeForm.type = this.temp.type
            this.sizeForm.date = this.temp.date
            this.$emit('update:showEditDialog', false)
        }
    }
}
</script>


<style>


</style>
