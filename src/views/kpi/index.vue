<template>
    <div>
        <el-card>
            <img src="@/assets/common/img.jpeg" class = 'appleImg' width="100" height="100"  alt>
            <b>KPI考核表</b>
            <el-button
            type="primary"
            size="small"
            class = 'add_btn'
            @click="showAdd"
            >新增数据</el-button>
            <el-table :data="list">
                <el-table-column type="index" width="80" label="序号" />
                <el-table-column label="姓名" prop="username">
                    <template slot-scope="scope">
                        <el-button type="text" size="small"  @click="$router.push(`/kpi/details/${scope.row.id}`)" >{{scope.row.username}}</el-button>
                    </template>                    
                </el-table-column>
                <el-table-column label="工号" prop="worknumber">
                </el-table-column>                
                <el-table-column label="KPI指标" prop="kpi">
                </el-table-column>
                <el-table-column label="KPI指数" prop="kpiNum">
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
            ref="child_add"
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
        ]

        for(var item of this.listAll){
            if(item.date == new Date().getFullYear()){
                this.list.push(item)
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
            //this.$refs.child_add.clean()
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
    margin-right: 90px;
}


</style>