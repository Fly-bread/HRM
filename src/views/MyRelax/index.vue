<template>
    <div>
        <el-card>
            <img src='@/assets/common/img.jpeg' width="100" height="100" class='appleImg'>
            <b>休假表</b>

            <el-form>
                <el-form-item label="选择年份">
                    <el-date-picker type="year" value-format="yyyy" v-model='selectYear' @change="showData"/>
                </el-form-item>
            </el-form>

            <el-table :data="list">
                <el-table-column type="index" width="80px" label="序号"/>
                <el-table-column label="姓名" prop="username">
                    <template slot-scope="scope">
                        <el-button type='text' size="small" @click="routerTo(scope.row)">{{scope.row.username}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="工号" prop="worknumber"/>
                <el-table-column label="总休假量" prop="relaxAll"/>
                <el-table-column label="已休假" prop="relaxed"/>
                <el-table-column label="剩余休假" prop="relaxRemain"/>
            
            </el-table>
        </el-card>
    </div>
</template>


<script>
export default {
    data(){
        return{
            listAll:[],
            list:[],
            selectYear:'',

        }
    },

    created(){
        this.listAll = [
        {
            username:'史莱姆',
            worknumber:'12345',
            id:'987',
            relaxAll:10,
            relaxed:3,
            relaxRemain:null,

            date:'2021'

        },
        {
            username:'暴龙哥',
            worknumber:'12355',
            id:'123',
            relaxAll:15,
            relaxed:6,
            relaxRemain:null,
            date:'2021'

        },
        {
            username:'阿飞',
            worknumber:'145478755',
            id:'154523',
            relaxAll:15,
            relaxed:6,
            relaxRemain:null,
            date:'2020'

        }          
        ]

        //计算每个人的剩余休假日
        this.calRelaxRemain
        this.selectYear = new Date().getFullYear().toString()

        for(var item of this.listAll){
            if(item.date == this.selectYear)
            {
                this.list.push(item)
            }
        }
    },

    computed:{
        calRelaxRemain(){
            return this.listAll.map(obj => {
                obj.relaxRemain = obj.relaxAll-obj.relaxed
                return obj 
            })
        }
    },

    methods:{
        showData(){
            this.list = []
            for(var item of this.listAll){
                if(item.date == this.selectYear){
                    this.list.push(item)
                }
            }
        },

        routerTo(row){
            //$router.push(`/relax/details/${scope.row.id}`)
            this.$router.push({
                name:'relaxDetails',
                params:{
                    id:row.id,
                    username:row.username
                }
            }
            )
        }
    }

}
</script>


<style scoped>
.appleImg{
    vertical-align: middle;
}
b{
    font-size: 36px;
}

/* 设置表项字体大小 */
.el-table__row{
    font-size: 18px;
}
.el-table__row button{
    font-size: 18px;
}

</style>