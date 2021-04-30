<template>
    <div>
        <el-card>
            <img src="@/assets/common/img.jpeg" class = 'appleImg' width="100" height="100"  alt>
            <b>{{username + "的KPI考核表"}}</b>
            

            <el-table :data="list">
                <el-table-column type="index" width="80" label="序号" />
                <el-table-column label="日期" prop="date" sortable>       
                </el-table-column>                
                <el-table-column label="姓名" prop="username">       
                </el-table-column>
                <el-table-column label="工号" prop="worknumber">
                </el-table-column>                
                <el-table-column label="KPI指标" prop="kpi">
                </el-table-column>
                <el-table-column label="KPI指数" prop="kpiNum" sortable>
                </el-table-column>  
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            class="operate"
                            @click="showEdit(scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            size="small"
                            class="operate"
                        >删除</el-button>
                    </template>                    
                </el-table-column> 
                                                             

            
            </el-table>
        </el-card>

        <edit
            :title="Edittitle"
            :show-edit-dialog.sync="showEditDialog"
            :sizeForm.sync="sizeForm"
            :temp="edit_temp"
        />

        <add
            :show-add-dialog.sync="showAddDialog"
            :list="list"
        />
    </div>
</template>

<script>
import Edit from './components/edit'
import Add from './components/add'

export default {
    components:{Edit, Add},

    data(){
        return{
            showEditDialog:false,
            Edittitle:'',
            edit_temp:{},

            showAddDialog:false,

            sizeForm:{},
            listAll:[],
            list:[],
            year:'',
            id:'',
            username:'',
        }
    },

    created(){
        this.listAll=[{
            username:'史莱姆',
            worknumber:'12345',
            id:'987',
            kpi:'dfdafdfdf',
            kpiNum:'15',

            date:'2021'
        },
        {
            username:'史莱姆',
            worknumber:'12345',
            id:'987',
            kpi:'dfdafdfdf',
            kpiNum:'15',

            date:'2022'
        },
        {
            username:'史莱姆',
            worknumber:'12345',
            id:'987',
            kpi:'dfdafdfdf',
            kpiNum:'15',

            date:'2023'
        },
        {
            username:'暴龙哥',
            worknumber:'12355',
            id:'123',
            kpi:'4545',
            kpiNum:'145455',

            date:'2021'
        },        
        ]

        this.id = this.$route.params.id
        for(var item of this.listAll){
            if(item.id == this.id){
                this.list.push(item)
                this.username = item.username
            }
        }
    },

    methods:{
        showEdit(row){
            this.sizeForm = row
            this.edit_temp = JSON.parse(JSON.stringify(row))
            this.showEditDialog=true
            this.Edittitle = '修改' + row.username + '的数据'
        },
        showAdd(){
            this.showAddDialog = true
        }
    }

}
</script>

<style>
.appleImg{
    vertical-align: middle;
}

b{
    font-size:36px
}

/* 设置表项字体大小 */
.el-table__row{
    font-size: 18px;
}
.el-table__row button{
    font-size: 18px;
}


.add_btn{
    float:right;
    font-size: 18px;
    margin-top: 100px;
    margin-bottom: 30px;
    margin-right: 30px;
}


</style>