<template>
    <div>
        <el-dialog  :visible="showAddEditDialog" :title="`${showTitle}` + '记录'" @close="btnCancel">
            <el-form :model="formData">
                <el-form-item label="姓名" label-width="130px">
                    <b class="font18px">{{formData.username}}</b>
                </el-form-item>
                <el-form-item label-width="130px" label="工号">
                    <b class="font18px">{{formData.worknumber}}</b>
                </el-form-item>
                <el-form-item label="日期" label-width="130px" prop="date">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="date"/>
                </el-form-item>
                <el-form-item label="原因" label-width="130px">
                    <el-input type="textarea" :rows="3" v-model="formData.reason"/>
                </el-form-item>

                <el-form-item label="扣除金额" label-width="130px" v-if="type.indexOf('扣薪') != -1">
                    <el-input type="number" v-model="formData.reduceNum"/>
                </el-form-item>
                <el-form-item label="奖励金额" label-width="130px" v-if="type.indexOf('奖励') != -1">
                    <el-input type="number" v-model="formData.awardNum"/>
                </el-form-item>                
            
            </el-form>

            <el-row slot="footer">
                <el-button
                type="primary"
                @click="changeData"
                >确定</el-button>
                <el-button
                @click="btnCancel"
                >取消</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>


<script>

export default {
    props:{
        showAddEditDialog:false,
        
    },

    data(){
        return{
            type:'',
            formData:{
                userid:'',
                date:'2021-03-12',
                reason:'',
                reduceNum:0,
                id:'',
            },
            date:'',//为了方便默认设置
            
        }
    },

    created(){
        if(this.type.indexOf('奖励') != -1){
            this.formData = {
                userid:'',
                date:'2021-03-12',
                reason:'',
                awardNum:0,
                id:'',
            }
        }
        else if(this.type.indexOf('扣薪') != -1){
            this.formData = {
                userid:'',
                date:'2021-03-12',
                reason:'',
                reduceNum:0,
                id:'',
            }
        }
        
    },    

    methods:{
        btnCancel(){
            this.$emit('update:showAddEditDialog', false)
        },
        changeData(){
            if(this.type == '添加扣薪记录'){

                this.$confirm('即将添加数据，是否继续？', '提示',{
                    cancelButtonClass:"cancelButton",
                    cancelButtonText:'取消',
                    confirmButtonText:'确定',

                    type:'warning'
                }).then(() => {
                    let id = new Date().getTime() + this.formData.userid
                    this.formData.id = id
                    //设置日期
                    this.formData.date = this.date
                    //更新数据库的数据
                    this.$store.state.reduceFromOther.push(this.formData)

                    //更新html中表的数据
                    this.$parent.changeData()
                    

                    this.$message({
                        type:'success',
                        message:'已成功添加数据'
                    })
                }).catch(() => {
                    this.$message({
                        type:'info',
                        message:'已取消添加'
                    })
                })
                //设置本条记录的id

            }
            else if(this.type == '编辑扣薪记录'){
                this.$confirm('即将修改数据，是否继续', '提示', {
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    cancelButtonClass:'cancelButton',

                    type:'warning'
                }).then(() => {
                    for(let item of this.$store.state.reduceFromOther){
                        if(item.id == this.formData.id){
                            //item = this.formData//这个item是临时变量，不能用赋值来更改
                            item.reduceNum = this.formData.reduceNum
                            item.reason =this.formData.reason
                            item.date = this.formData.date
                            
                            this.$parent.changeData()
                            break
                        }
                    }
                    this.$message({
                        type:'success',
                        message:'成功修改数据'
                    })
                }).catch(() =>{
                    this.$message({
                        type:'info',
                        message:'已取消修改'
                    })
                })


            }
            else if(this.type == '添加奖励'){                
                    this.$confirm('即将添加数据，是否继续？', '提示',{
                    cancelButtonClass:"cancelButton",
                    cancelButtonText:'取消',
                    confirmButtonText:'确定',

                    type:'warning'
                }).then(() => {
                    let id = new Date().getTime() + this.formData.userid
                    this.formData.id = id
                    //设置日期
                    this.formData.date = this.date
                    //更新数据库的数据
                    this.$store.state.awardsTb.push(this.formData)

                    //更新html中表的数据
                    this.$parent.changeData()
                    

                    this.$message({
                        type:'success',
                        message:'已成功添加数据'
                    })
                }).catch((error) => {
                    console.log(error)
                    this.$message({
                        type:'info',
                        message:'已取消添加'
                    })
                })

                
                //设置本条记录的id
            
        }
            else if(this.type == '编辑奖励'){                
                    this.$confirm('即将添加数据，是否继续？', '提示',{
                    cancelButtonClass:"cancelButton",
                    cancelButtonText:'取消',
                    confirmButtonText:'确定',

                    type:'warning'
                }).then(() => {
                    for(let item of this.$store.state.awardsTb){
                        if(item.id == this.formData.id){
                            //item = this.formData//这个item是临时变量，不能用赋值来更改
                            item.awardNum = this.formData.awardNum
                            item.reason =this.formData.reason
                            item.date = this.formData.date
                            
                            this.$parent.changeData()
                            break
                        }
                    }
                    this.$message({
                        type:'success',
                        message:'成功修改数据'
                    })
                }).catch(() =>{
                    this.$message({
                        type:'info',
                        message:'已取消添加'
                    })
                })

                
                //设置本条记录的id
            
        }        

            
            this.$emit('update:showAddEditDialog', false)
        },




    },



    computed:{
        showTitle(){
            return this.type
        },

    }
}
</script>


<style>
.font18px{
    font-size: 18px;
}
</style>