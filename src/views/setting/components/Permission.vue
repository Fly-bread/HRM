<template>
  <el-dialog
    ref="dialog"
    title="分配权限"
    :visible="showPermDialog"
    @close="btnPermCancel"
  >
    <el-tree
      ref="permTree"
      :data="permData"
      :props="defaultProps"
      default-expand-all=""
      show-checkbox=""
      node-key="id"
      :default-checked-keys="selectCheck"
      :check-strictly="true"
    />
    <el-row slot="footer" type="flex" justify="center">
      <el-col>
        <el-button
          size="small"
          @click="btnPermCancel"
        >取消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="btnPermOK"
        >确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { assignPerm } from '@/api/setting'
export default {
  props: {
    showPermDialog: {
      type: Boolean,
      default: false
    },
    permData: { // 接收权限数据
      type: Array,
      default: null
    },
    roleId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      selectCheck: [] // 接收已经选中的节点
    }
  },
  methods: {
    async btnPermOK() {
      try {
        // getCheckedKeys 方法 得到是 node-key属性的集合
        await assignPerm({ id: this.roleId, permIds: this.$refs.permTree.getCheckedKeys() })
        await this.$message({
          type: 'success',
          message: '分配成功'
        })
        // await this.$refs.dialog.getPermissionList()
        this.$emit('update:showPermDialog', false)
      } catch (error) {
        console.log(error)
      }
    },
    btnPermCancel() {
      this.selectCheck = []
      this.$emit('update:showPermDialog', false)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
