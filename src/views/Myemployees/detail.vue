<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 放置tabs -->
      <el-card>
        <el-tabs>
          <el-tab-pane label="登陆账户设置">
            <el-form
              ref="userForm"
              :model="userInfo"
              :rules="rules"
              label-width="120px"
              style="margin-left: 340px; margin-top: 20px;"
            >
              <el-form-item label="姓名" prop="username">
                <el-input
                  v-model="userInfo.username"
                  style="width: 300px"
                />
              </el-form-item>
              <el-form-item label="登陆密码" prop="password2">
                <el-input
                  v-model="userInfo.password2"
                  placeholder="请输入新密码"
                  style="width: 300px"
                />
              </el-form-item>
              <el-form-item label="确认登陆密码" prop="checkpassword2">
                <el-input
                  v-model="userInfo.checkpassword2"
                  placeholder="请再次输入新密码"
                  style="width: 300px"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="primary"
                  style="margin-left: 240px;"
                  @click="saveUser"
                >保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link
                  :to="`/employees/print/12`"
                >
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 放置个人详情 -->
            <component :is="userComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位详情">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link
                  :to="`/employees/print/${userid}?type=job`"
                >
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 岗位详情 -->
            <component :is="JobComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetaiById } from '@/api/employees'
import UserInfo from './components/user-info'
import JobInfo from './components/job-info'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    var validatecheckpass = (rule, value, callback) => {
      if (value !== this.userInfo.password2) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userComponent: 'UserInfo',
      JobComponent: 'JobInfo',
      userid: this.$route.params.id, // 提前定义id
      userInfo: {
        username: '',
        // 不定义为password是为了一开始不显示明文密码
        password2: '',
        checkpassword2: ''
      },
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度必须为6-18位', trigger: 'blur' }],
        checkpassword2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度必须为6-18位', trigger: 'blur' },
          { validator: validatecheckpass, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userid)
    },
    async saveUser() {
      try {
        // 手动校验form表单
        await this.$refs.userForm.validate()
        await saveUserDetaiById({ ...this.userInfo, password: this.userInfo.password2 }) // 将新密码password2替换password
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$router.back()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
