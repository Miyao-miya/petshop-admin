<template>
  <div>

    <el-form ref="UsersForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="用户ID" prop="uid">
        <el-input v-model="formData.uid" placeholder="请输入用户ID" readonly clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="uname">
        <el-input v-model="formData.uname" placeholder="请输入用户名" readonly clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="账号权限" prop="utf">
        <el-input v-model="formData.utf" placeholder="请输入账号状态" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item size="large">
<!--        <el-button type="primary" @click="submitForm">提交</el-button>-->
<!--        <el-button @click="resetForm">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [
          'usrId'
  ],
  data() {
    return {
      formData: {
        uid: undefined,
        uname: undefined,
        unote: undefined,
        udate: undefined,
        uinroduce: undefined,
        utf: undefined,
        uimg:'',
      },
      rules: {
        uid: [{
          required: true,
          message: '请输入用户ID',
          trigger: 'blur'
        }],
        uname: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        unote: [{
          required: true,
          message: '请输入备忘录',
          trigger: 'blur'
        }],
        udate: [{
          required: true,
          message: '请输入注册时间',
          trigger: 'blur'
        }],
        uinroduce: [{
          required: true,
          message: '请输入介绍',
          trigger: 'blur'
        }],
        utf: [{
          required: true,
          message: '请输入账号状态',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {


  },
  mounted() {
    let _this = this
    _this.$api.adimApi.select(_this.usrId).then(res =>{
      if (res != null){
        _this.formData.uid = res.aId
        _this.formData.uname = res.aName
        _this.formData.utf = res.aRoot
      }
    })
  },
  methods: {
    submitForm() {
      this.$refs['UsersForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['UsersForm'].resetFields()
    },
  }
}

</script>
<style>
</style>
