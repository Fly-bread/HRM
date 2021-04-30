<template>
  <el-dialog :title="title" :visible="showReduceSalaryDialog" @close="btnCancel" >
    <el-card class="hr-block">
        <el-table :data="list" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column type="selection" width="30" />
            <el-table-column type="index" width="80" label="序号" />
            <el-table-column prop="username" label="姓名"/>
            <el-table-column prop="worknum" label="工号"/>
                        <!-- 有插槽，那么没有prop也没关系 -->
            <el-table-column  label="日期" width="300px" sortable prop="date">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.date" type="date" value-format="yyyy-MM-dd" />
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型"/>
            <el-table-column prop="reduce_num" label="扣除金额" />
        </el-table>    
    </el-card>
    <el-form>
        <el-form-item label='合计'>
            <el-input style="width:38%" v-model="total"></el-input>
        </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showReduceSalaryDialog: {
      type: Boolean,
      default: false
    },
    title:{
      type: String,
      default: '工资扣除记录'
    },
    // userid: {
    //   type: String,
    //   default: null
    // }
  },
  data() {
    //   data先暂时写死
    return{
        list:[{
            username:'a',
            worknum:'12',
            date:'2021-03-09',
            type:'c',
            reduce_num:'54'
        },
        {
            username:'a',
            worknum:'1245',
            date:'2021-04-09',
            type:'c',
            reduce_num:'55'
        },

        {
            username:'a',
            worknum:'1245',
            date:'2001-12-09',
            type:'c',
            reduce_num:'100'
        },
        ],
        total:0,
    }
  },
  created() {
    for (var item of this.list){
        var {reduce_num} = item 
        // 不加parseInt会被当作字符串相加
        this.total += parseInt(reduce_num)
    }
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { rows } = await getRoleList()
      this.list = rows
    },
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },


    
    btnCancel() {
      // 清空数据
      //console.log(this.timeOfLast)  console.log是最后输出，所以是关闭窗口后输出，故无法获得值
      this.$emit('update:showReduceSalaryDialog', false)
    },


  }
}
</script>

<style>


</style>
