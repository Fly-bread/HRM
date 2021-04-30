<template>
    <div>
        <el-dialog :title="title" :visible="showEditDialog" @close="btnCancel">
            <el-form>
                <el-form-item label="姓名" label-width="80px">
                    <span class="abc">{{temp.username}}</span>
                </el-form-item>
                <el-form-item label="工号" label-width="80px">
                    <span>{{temp.worknumber}}</span>
                </el-form-item>
                <el-form-item label="KPI指标" label-width="80px">
                    <el-tree
                    :props="props"
                    :load="loadNode"
                    lazy
                    show-checkbox
                    :render-content="renderContent"
                    >
                    </el-tree>
                </el-form-item>
                <el-form-item label="KPI指数" label-width="80px">
                    <el-input v-model='temp.kpiNum' type="number"/>
                </el-form-item>                                                
            </el-form>    

            <el-row slot="footer">
                <el-button
                size="small"
                type="primary"
                @click="btnOk"
                >确定</el-button>
                <el-button
                size="small"
                @click="btnCancel"
                >取消</el-button>
            </el-row>


        </el-dialog>
    </div>
</template>


<script>
export default {
    props:{
        showEditDialog:false,
        title:'',

        temp:{},
        sizeForm:{},
    },

    data(){
        return{
          props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
            },
          count: 1
        }
    },


    methods:{
        btnCancel(){
            this.$emit('update:showEditDialog', false)
        },
        btnOk(){
            this.sizeForm.kpi = this.temp.kpi
            this.sizeForm.kpiNum = this.temp.kpiNum
            this.$emit('update:showEditDialog', false)            
        },

      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: '请展开以查看数据' }]);
        }

        if (node.data.name === '请展开以查看数据') {
          var data = [{
              name: 'leaf',
              leaf: true
            }, {
              name: 'leaf',
              leaf: true
            }];
          resolve(data)
        } 
        else{
            resolve([])
        }


        
      },

        //用于显示内容
      renderContent(h, {node, data}){
          return(
              <span>啊啊啊</span>
          )
      }
    }

}
</script>


<style>
.abc{
  margin-left: 30px;
}
</style>