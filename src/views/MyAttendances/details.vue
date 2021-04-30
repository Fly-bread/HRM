<template>
    <div>
      <el-card>
          <div>
            <img src="@/assets/common/img.jpeg" class = 'appleImg' alt>
            <b class="title_B">{{username}}的考勤记录</b>
          </div>

          <div>
            <el-form>
                <el-form-item label="选择月份" >              
                    <el-date-picker v-model="selectMonth"  type="month" value-format="yyyy-MM"  placeholder="选择月" @change="showData" />
                    <el-button
                        id = "add_Btn"
                        size="small"
                        type="primary"
                        @click="showAdd"
                    >新增记录</el-button>            
                </el-form-item>
            </el-form>
          </div>
        

      </el-card> 

      <el-card class="hr-block">
          <el-table :data="list" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}"  >
              <el-table-column type="index" width="80" label="序号" />
              <el-table-column prop="username" label="姓名" sortable />
              <el-table-column prop="Worknumber" label="工号" sortable  />
              <el-table-column prop="date" label="异常日期" sortable  />

              <el-table-column prop="type" label="异常类型" sortable  >
                <template slot-scope="scope">
                <b v-if='scope.row.type=="旷工"' id='absent'>{{ scope.row.type}}</b>
                <b v-if='scope.row.type=="请假"' id='askForLeave'>{{ scope.row.type}}</b>
                </template>            
             </el-table-column>    

            <el-table-column             
            header-align="center"
            align="center"
            label="操作"
            fixed="right"
            width="280"
            >
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
                        @click="showDelete(scope.row, scope.$index)"
                    >删除</el-button>
                </template>
            </el-table-column>

          </el-table>
      </el-card>

      <edit
        :title="Edittitle"
        :show-edit-dialog.sync ='showEditDialog'
        :sizeForm.sync='sizeForm'
        :temp='edit_temp'
      />

      <delete
        :title="Deletetitle"
        :show-delete-dialog.sync="showDeleteDialog"
        :sizeForm.sync="sizeForm"
        @delete="deleteFromChild"
      />

      <add
       :title="Addtitle"
       :show-add-dialog.sync="showAddDialog"
       :list="list"
       :sizeForm="add_temp"
      />
    </div>
</template>


<script>
import Edit from './components/edit'
import Delete from './components/delete'
import Add from './components/add'

export default {
    components: {Edit, Delete, Add},
    data(){
        return{
            showEditDialog:false,
            Edittitle:'',
            sizeForm:{},
            edit_temp:{},

            showDeleteDialog:false,
            Deletetitle:"",
            del_index:-1,

            showAddDialog:false,
            Addtitle:'',
            add_prime:{},//供添加临时使用
            add_temp:{},//供添加临时使用

            listAll:[],
            list:[],
            id:'',
            username:'',
            selectMonth:'',
        }
    },

    created(){
    this.listAll = [{
        username:'史莱姆',
        Id:'987',
        Worknumber:'12345',

        date:'2021-04-01',
        type:'请假',
      },   
      
      {
        username:'暴龙哥',
        Id:'123',
        Worknumber:'12355',

        date:'2021-04-01',
        type:'旷工',
      },  
      {
        username:'史莱姆',
        Id:'987',
        Worknumber:'12345',

        date:'2021-04-03',
        type:'请假',
      },      
      {
        username:'史莱姆',
        Id:'987',
        Worknumber:'12345',

        date:'2021-04-06',
        type:'旷工',
      },           
    ]

    this.id = this.$route.params.id
    //找到用户名
    for(var item of this.listAll){
      if(item.Id == this.id){
        this.username = item.username
        this.add_prime.username = item.username
        this.add_prime.Worknumber = item.Worknumber
        this.add_prime.date = this.formatDate()
        //this.add_prime = JSON.parse(JSON.stringify(this.add_prime))
        break
      }
    }

    let temp = item.date.split('-')
    this.selectMonth = temp[0] + '-' + temp[1]
    this.showData()

    //一开始就要给sizeForm赋值，方便传给add组件

    },
    methods:{
        formatDate(){
            let nowDate = new Date();
            let year = nowDate.getFullYear();
            let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1): nowDate.getMonth() + 1;
            let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
            let dateStr = year + "-" + month + "-" + day;          
            return dateStr  
        },
        showData(){      
            this.list = []
            for(var item of this.listAll){
                if(this.id == item.Id){
                var temp = item.date.split('-')
                var Month = temp[0] + '-' + temp[1]
                    if(this.selectMonth == Month){
                    this.list.push(item)
                    }
                }
            }
        },

        showEdit(row){
            this.sizeForm = row
            this.edit_temp = JSON.parse(JSON.stringify(row))
            this.Edittitle = '修改' + this.username + '的考勤记录'
            this.showEditDialog=true

        },
        showDelete(row, index){
            this.sizeForm = row
            this.showDeleteDialog = true
            this.del_index = index
            this.Deletetitle = '删除' + this.username + '的考勤记录'
        },
        deleteFromChild(){
            // 当心，只能正序删除，否则会出错
            // 正序指和list一样的序列，而非其它序列
            // 用key值来标识删除
            this.list.splice(this.del_index, 1)
        },

        showAdd(){         
            this.add_temp = JSON.parse(JSON.stringify(this.add_prime))
            this.showAddDialog =true
            this.Addtitle = "新增" + this.username + "的考勤记录"
        }
    }



}
</script>

<style scoped>
.appleImg{
    vertical-align: middle;
    width: 100px;
    height: 100px;
}

.title_B{
    font-size: 36px;
}

#add_Btn{
    font-size: 18px;
    float: right;
}

#absent{
    color: red;
    font-size: 18px;
    margin-left: 9px;
}
#askForLeave{
    color: tan;
    font-size: 18px;
    margin-left: 9px;
}

.operate{
    font-size: 16px;
}


</style>

