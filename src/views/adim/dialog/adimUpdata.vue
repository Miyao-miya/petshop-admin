<template>
  <div>
    <el-form ref="UsersForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="ID" prop="aId">
        <el-input v-model="formData.aId" placeholder="请输入ID" readonly clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="aPassword">
        <el-input v-model="formData.aPassword" placeholder="请输入密码" clearable show-password
          :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="名字" prop="aName">
        <el-input v-model="formData.aName" placeholder="请输入名字" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="aRoot">
        <el-input-number v-model="formData.aRoot" placeholder="权限"></el-input-number>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [
          'adim'
  ],
  data() {
    return {
      formData: {
        aId: undefined,
        aPassword: undefined,
        aName: undefined,
        aRoot: undefined,
      },
      rules: {
        aId: [{
          required: true,
          message: '请输入ID',
          trigger: 'blur'
        }],
        aPassword: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        aName: [{
          required: true,
          message: '请输入名字',
          trigger: 'blur'
        }],
        aRoot: [{
          required: true,
          message: '权限',
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
    this.formData.aId = this.adim.aId
    this.formData.aPassword = this.adim.aPassword
    this.formData.aRoot = this.adim.aRoot
    this.formData.aName = this.adim.aName
  },
  methods: {
    submitForm() {
      this.$refs['UsersForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
        else {
          let _this = this
          _this.$api.adimApi.update(_this.formData).then(res =>{
            if (res == 1){
              alert("修改成功")
            }else {
              alert("修改失败，具体请查看错误日志")
            }
          })
        }
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
