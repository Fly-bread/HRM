<template>
  <div>
    <el-dialog
      :visible="showAddDialog"
      :title="`${showText}权限点`"
      @close="btnCancel"
      width="1200px"
    >
      <div class="container">
        <div class="left_div">
          <el-form :model="formData" :rules="rules">
            <el-form-item label="角色名称" prop="name" label-width="130px">
              <el-input
                v-model="formData.name"
                :readonly="type == '查看'"
              ></el-input>
            </el-form-item>

            <el-form-item
              v-if="type != '查看'"
              label="角色权限"
              prop="permissions"
              label-width="130px"
            >
              <el-card>
                <!-- <el-dropdown v-for="(value, key) in  btnType" :key='value'> -->
                <el-dropdown v-for="item in checkOptions" :key="item.value">
                  <el-button class="el-dropdown-link"
                    >{{ item.name
                    }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-checkbox-group v-model="checked[item.value]">
                      <el-checkbox
                        class="select_ECB"
                        v-for="item_ECB in item.options"
                        :label="item_ECB.value"
                        :key="item_ECB.value"
                        :border="true"
                        @change="
                        handleCheckedItemChange(item.value, item_ECB.value)
                        "
                        >{{ item_ECB.name }}
                      </el-checkbox>

                    </el-checkbox-group>
                      <el-checkbox
                        class="selectAll_EC"
                        :indeterminate="isIndeterminate[item.value]"
                        v-model="checkAll[item.value]"
                        @change="
                          (value) => handleCheckAllChange(value, item.value)
                        "
                        :border="true"
                        >全选</el-checkbox
                      >                    
                  </el-dropdown-menu>
                </el-dropdown>
              </el-card>
            </el-form-item>

            <el-form-item
              label="角色描述"
              prop="description"
              label-width="130px"
            >
              <el-input
                type="textarea"
                :readonly="type == '查看'"
                :rows="4"
                v-model="formData.description"
              />
            </el-form-item>

            <el-form-item label="开启权限" prop="enVisible" label-width="130px">
              <el-switch
                v-if="type != '查看'"
                v-model="formData.enVisible"
                active-value="1"
                inactive-value="0"
              />
            </el-form-item>
          </el-form>
        </div>

        <div class="right_div">
          <el-card>
            <b>已选择</b>
            <el-table :data="checkedTb">
              <el-table-column prop="name" label="版块" />
              <el-table-column prop="options" label="操作" />
            </el-table>
          </el-card>
        </div>
      </div>
      <el-row slot="footer">
        <el-button type="primary">确定</el-button>
        <el-button @click="btnCancel">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    showAddDialog: false,
  },

  data() {
    const validatePass = (rule, value, callback) => {
      if (this.type == "查看") {
        callback(new Error("错误"));
      } else {
        callback();
      }
    };

    return {
      formData: {
        name: "", // 角色名称
        permissions: [], //角色权限
        description: "", // 描述
        enVisible: "0", // 权限开启
      },
      type: "",
      checked: {
        employees: [],
        salarys: [],
        socials: [],
        actSalarys: [],
        attendences: [],
        approvals: [],
        settings: [],
        kpis: [],
        relaxs: [],
        giveRoles: [],
      },
      checkOptions: {
        employees: {
          name: "人事管理",
          value: "employees",
          options: {
            look: { name: "查看", value: "look" },
            add: { name: "添加", value: "add" },
            edit: { name: "编辑", value: "edit" },
            delete: { name: "删除", value: "delete" },
          },
        },

        salarys: {
          name: "工资管理",
          value: "salarys",
          options: {
            look: { name: "查看", value: "look" },
            add: { name: "添加", value: "add" },
            edit: { name: "编辑", value: "edit" },
            delete: { name: "删除", value: "delete" },
          },
        },

        socials: {
          name: "社保管理",
          value: "socials",
          options: {
            look: { name: "查看", value: "look" },
            add: { name: "添加", value: "add" },
            edit: { name: "编辑", value: "edit" },
            delete: { name: "删除", value: "delete" },
          },
        },

        actSalarys: {
          name: "实发工资管理",
          value: "actSalarys",
          options: {
            look: { name: "查看", value: "look" },
            add: { name: "添加", value: "add" },
            edit: { name: "编辑", value: "edit" },
            delete: { name: "删除", value: "delete" },
          },
        },
        attendences: {
          name: "考勤管理",
          value: "attendences",
          options: {
            look: { name: "查看", value: "look" },
            add: { name: "添加", value: "add" },
            edit: { name: "编辑", value: "edit" },
            delete: { name: "删除", value: "delete" },
          },
        },
        approvals: {
          name: "审批管理",
          value: "approvals",
          options: {
            look: { name: "查看", value: "look" },
            add: { name: "添加", value: "add" },
            edit: { name: "编辑", value: "edit" },
            delete: { name: "删除", value: "delete" },
          },
        },

        settings: {
          name: "权限设置管理",
          value: "settings",
          options: {
            look: { name: "查看", value: "look" },
            add: { name: "添加", value: "add" },
            edit: { name: "编辑", value: "edit" },
            delete: { name: "删除", value: "delete" },
          },
        },

        kpis: {
          name: "KPI管理",
          value: "kpis",
          options: {
            look: { name: "查看", value: "look" },
            add: { name: "添加", value: "add" },
            edit: { name: "编辑", value: "edit" },
            delete: { name: "删除", value: "delete" },
          },
        },
        relaxs: {
          name: "休假管理",
          value: "relaxs",
          options: {
            look: { name: "查看", value: "look" },
            add: { name: "添加", value: "add" },
            edit: { name: "编辑", value: "edit" },
            delete: { name: "删除", value: "delete" },
          },
        },

        giveRoles: {
          name: "角色赋予",
          value: "giveRoles",
          options: {
            roles: { name: "分配角色", value: "roles" },
          },
        },
      },
      checkAll: {
        employees: false,
        salarys: false,
        socials: false,
        actSalarys: false,
        attendences: false,
        approvals: false,
        settings: false,
        kpis: false,
        relaxs: false,
        giveRoles: false,
      },
      isIndeterminate: {
        employees: false,
        salarys: false,
        socials: false,
        actSalarys: false,
        attendences: false,
        approvals: false,
        settings: false,
        kpis: false,
        relaxs: false,
        giveRoles: false,
      },

      checkedTb: [],

      rules: {
        name: [
          { message: "当前不能输入", trigger: "blur", validator: validatePass },
        ],
      },
    };
  },

  computed: {
    showText() {
      if (this.type == "编辑") {
        return "编辑";
      } else if (this.type == "新增") {
        return "新增";
      } else if (this.type == "查看") {
        return "查看";
      }
    },
  },

  methods: {
      //如果是点击编辑弹出弹窗，则弹窗中要显示对应数据
    showEditChecked() {
        let permissions = this.formData.permissions
        let checked = this.checked

        //改变多选框状态和表的数据
      for (let item of permissions) {
        let temp = item.split("-");
        let modules = temp[0];  
        let option = temp[1];
        checked[modules].push(option);
        this.handleCheckedItemChange(modules, option)
      }        
      

    },


       


    //修改组件的数据函数
    //option为add,delete...
    addTableItem(modules, option) {       
        //如果不是点击全选框
      if (option != undefined) {
        //stata是标志位,如果是1，则证明表项中没有此项，应该添加
        //如果是0，则证明表项中有此项，只需修改
        let state = 1;
        //当前table
        let tb = this.checkedTb;   
        let Opname = this.checkOptions[modules].options[option].name;

        for (let item of tb) {
          //应该修改表项
          if (item.value == modules) {
            state = 0;
            item.options = item.options + " " + Opname;
            break;
          }
        }
        //应该增加表项
        if (state) {
          tb.push({
            name: this.checkOptions[modules].name,
            value: this.checkOptions[modules].value,
            options: Opname,
          });
        }
      } 
      //如果点击全选框
      else {
        let str = "";
        //obj是对象集合，[add:{name:'添加', value:'add'}...]
        let objs = this.checkOptions[modules].options;  
        //stata是标志位,如果是1，则证明表项中没有此项，应该添加
        //如果是0，则证明表项中有此项，只需修改
        let state = 1;              
        //当前table
        let tb = this.checkedTb; 

        //查看，添加，编辑，删除，全加入表中
        for (let obj of Object.values(objs)) {
          str = str + obj.name + " ";
        }
        for (let item of tb) {
          if (item.value == modules) {
            item.options = str;
            state = 0;
            break;
          }
        }

        //表中没有对应模块，需要添加
        if (state) {
          tb.push({
            name: this.checkOptions[modules].name,
            value: this.checkOptions[modules].value,
            options: str,
          });
        }
      }
    },

    deleteTableItem(modules, option) {

      //取消选中某一项时
      if (option != undefined) {
        let tb = this.checkedTb;
        //name是option的中文名，值为查看，添加...
        let Opname = this.checkOptions[modules].options[option].name;          
        for (let i in tb) {
          //删除表中的某一项
          if (tb[i].value == modules) {
            //这里的options是一个字符串，"查看 添加 编辑 删除"
            tb[i].options = tb[i].options.replace(Opname, "");
            //options为空，应删除表单中的这一项
            if (!tb[i].options.trim()) {
              tb.splice(i, 1);
            }
            break;
          }
        }
      }
      //取消全选时,删除表中的某一项，
      else {
        let tb = this.checkedTb;          
        //Mdname是modules的中文名,值为人事管理，工资管理...
        let Mdname = this.checkOptions[modules].name;
        for (var index in tb) {
          if (tb[index].name == Mdname) {
            tb.splice(index, 1);
            break;
          }
        }

      }
    },




    //组件相关函数
    //value为true或者false，代表当前全选框的状态
    //modules是当前选择的模块
    //modules:employee,social,salary 
    handleCheckAllChange(value, modules) {
        //把数据发送给后端保存
        //这个函数必须在前，因为删除数据是依据多选框的状态来决定的
        //否则取消全选时，permissions中的相关项不会被删除
        this.savedataByCheckallbox(value, modules) 
        //改变表的数据
        this.changeTbByCheckallbox(value, modules)       
        //设置多选框的状态
        this.changeCheckallbox(value, modules)

    },

    //modules为人事管理，工资管理，社保管理...
    //option为查看，增加，删除，修改
    handleCheckedItemChange(modules, option) {
        this.savedataByCheckSinglebox(modules,option)

        this.changeTbBychecksinglebox(modules, option)
        //更改多选框的命令必须在最后，因为删除数据和更改表的数据，都依赖多选框的状态
        this.changeCheckSinglebox(modules)
    },  
    
    btnCancel() {
      this.cleanData(); //把数据复原，以免错误选中
      this.$emit("update:showAddDialog", false);
    },    



    //组件子函数
    changeCheckallbox(value, modules){
      let checked = this.checked[modules];
      //所有操作方法(都是对象)
      let checkOptions = this.checkOptions[modules].options;
      //全选框
      let isIndeterminate = this.isIndeterminate;


      //选中所有选项或取消选中所有项
      if(value){
        for (let item of Object.values(checkOptions)) {
            //避免重复添加，造成数据错误
            if(checked.indexOf(item.value) == -1){
                checked.push(item.value);
            }
        }
      }
      else{
          checked.splice(0, checked.length)
      }
      isIndeterminate[modules] = false; 

    },
    changeTbByCheckallbox(value, modules){
        if(value){
            this.addTableItem(modules);
        }
        else{
            this.deleteTableItem(modules);
        }
    },

    changeTbBychecksinglebox(modules, option){
        let checked = this.checked[modules];
        
        if (checked.indexOf(option) != -1) {
            this.addTableItem(modules, option);
        }
        else{
            this.deleteTableItem(modules, option);
        }
    },
    //改变单选框的状态
    changeCheckSinglebox(modules){
      //勾选逻辑，未全选则全选框显示横线，全选则全选框打勾
      let checkOptionsLength = Object.keys(this.checkOptions[modules].options).length; //选项的个数
      let checkedCount = this.checked[modules].length; //这个值随着勾选的变化而变化，所以要列出来
      let isIndeterminate = this.isIndeterminate;
      let checkAll = this.checkAll;

      isIndeterminate[modules] = checkedCount > 0 && checkedCount < checkOptionsLength;
      checkAll[modules] = checkedCount === checkOptionsLength;
    },








    //保存数据函数
    savedataByCheckallbox(value, modules){
      let checked = this.checked[modules];  //[add,look,edit,delete]
      let checkOptions = this.checkOptions[modules].options;    //add,look,edit,delete
      let permissions = this.formData.permissions;     //


      //全部添加
      if (value) {
        //手动添加
        for (let key in checkOptions) {
          //单个选项对象
          let obj = checkOptions[key];
          if (checked.indexOf(obj.value) != -1) {
              //temp为"attendences-look"，"attendences-edit"...即子权限
            let temp = modules + "-" + obj.value;
            permissions.push(temp);
          }
        }
      }
      //全部删除
      else {
        for (let option of checked) {
        //temp为"attendences-look"，"attendences-edit"...即子权限
          let temp = modules + "-" + option;
          let index = permissions.indexOf(temp);
          permissions.splice(index, 1);
        }
      }
    },

    //modules为人事管理，工资管理，社保管理...
    //option为查看，增加，删除，修改
    savedataByCheckSinglebox(modules, option){
      let temp = modules + "-" + option;
      //option为查看，增加，删除，修改
      
      //勾选逻辑，未全选则全选框显示横线，全选则全选框打勾
      let checked = this.checked[modules];
      let permissions = this.formData.permissions 
      
      
      //选中某项，增加数据
      if (checked.indexOf(option) != -1) {
        //权限中没有该项，则添加
        if (permissions.indexOf(temp) == -1) {
          permissions.push(temp);

        }
      }
      //取消选中某项
      else{
        //权限中没有该项，则添加
        let index = this.formData.permissions.indexOf(temp);
        if (index != -1) {
          this.formData.permissions.splice(index, 1);
        }
      }           
    },


    //清空数据
    cleanData() {
      (this.formData = {
        name: "", // 角色名称
        permissions: [], //角色权限
        description: "", // 描述
        enVisible: "0", // 权限开启
      }),
        (this.isIndeterminate = {
          employees: false,
          salarys: false,
          socials: false,
          actSalarys: false,
          attendences: false,
          approvals: false,
          settings: false,
          kpis: false,
          relaxs: false,
          giveRoles: false,
        }),
        (this.checkAll = {
          employees: false,
          salarys: false,
          socials: false,
          actSalarys: false,
          attendences: false,
          approvals: false,
          settings: false,
          kpis: false,
          relaxs: false,
          giveRoles: false,
        }),
        (this.checked = {
          employees: [],
          salarys: [],
          socials: [],
          actSalarys: [],
          attendences: [],
          approvals: [],
          settings: [],
          kpis: [],
          relaxs: [],
          giveRoles: [],
        }),
        (this.checkedTb = []); //表中展示的数据
    },    
  },
};
</script>


<style>
.container {
  display: flex;
}

.left_div {
  width: 600px;
}
.right_div {
  width: 600px;
  margin-left: 30px;
  font-size: 18px;
}

.select1_ECB {
  display: block;
  width: 130px;
}

/* 选择框 */
.select_ECB {
  display: block;
  margin-top: 10px;
  width: 150px;
}
.select_ECB:first-child {
  margin-top: 0px;
  margin-left: 10px;
}

.selectAll_EC {
  margin-left: 10px;
  display: block;
  margin-top: 10px;
  width: 150px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  width: 150px;
  margin-top: 20px;
  margin-left: 20px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>