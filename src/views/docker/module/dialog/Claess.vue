<template>
  <div>
    <el-form ref="UsersForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="医生ID" prop="fkDId">
        <el-input v-model="formData.fkDId" placeholder="请输入医生ID" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="cDatea">
        <el-time-picker v-model="formData.cDatea" format="HH:mm:ss" value-format="HH:mm:ss"
          :picker-options='{"selectableRange":"00:00:00-23:59:59"}' :style="{width: '100%'}"
          placeholder="请选择开始时间" clearable></el-time-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="cDateb">
        <el-time-picker v-model="formData.cDateb" format="HH:mm:ss" value-format="HH:mm:ss"
          :picker-options='{"selectableRange":"00:00:00-23:59:59"}' :style="{width: '100%'}"
          placeholder="请选择结束时间" clearable></el-time-picker>
      </el-form-item>
      <el-form-item label="单行文本" prop="cTf">
        <el-input v-model="formData.cTf" placeholder="请输入单行文本" clearable :style="{width: '100%'}"></el-input>
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
    'usrId'
  ],
  data() {
    return {
      formData: {
        fkDId: undefined,
        cDatea: '17:40:46',
        cDateb: null,
        cTf: undefined,
      },
      rules: {
        fkDId: [{
          required: true,
          message: '请输入医生ID',
          trigger: 'blur'
        }],
        cDatea: [{
          required: true,
          message: '请选择开始时间',
          trigger: 'change'
        }],
        cDateb: [{
          required: true,
          message: '请选择结束时间',
          trigger: 'change'
        }],
        cTf: [{
          required: true,
          message: '请输入单行文本',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
  },
  methods: {
    submitForm() {
      this.$refs['UsersForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
        else {
          let _this = this
          _this.$api.classesApi.inset(_this.formData).then(res =>{
            if (res == 1){
              alert("添加成功")
            }else {
              alert("添加失败，请查看错误日志")
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
