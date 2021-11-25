<template>
  <div>
    <el-form ref="UsersForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="用户名" prop="dName">
        <el-input v-model="formData.dName" placeholder="请输入用户名"  clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="dPassword">
        <el-input v-model="formData.dPassword" placeholder="请输入密码" clearable show-password
          :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="介绍" prop="dInroduce">
        <el-input v-model="formData.dInroduce" type="textarea" placeholder="请输入介绍"
          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="上传头像" prop="dImg" required>
        <el-upload ref="dImg"
                   :file-list="dImgfileList"
                   :action="dImgAction"
                   :before-upload="dImgBeforeUpload"
                   :on-success="pImgUploadImg"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
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
  props: [],
  data() {
    return {
      formData: {
        dName: undefined,
        dPassword: undefined,
        dInroduce: undefined,
        dImg: null,
      },
      rules: {
        dName: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        dPassword: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        dInroduce: [{
          required: true,
          message: '请输入介绍',
          trigger: 'blur'
        }],
      },
      dImgAction: 'http://39.105.202.40:8282/upload',
      dImgfileList: [],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['UsersForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
        else {
          let _this = this
          _this.$api.doctorApi.doctorinsert(_this.formData).then(res =>{
            if(res != null){
              alert("添加成功")
          }else {
              alert("添加失败，详情请看日志")
            }
          })
        }
      })
    },
    resetForm() {
      this.$refs['UsersForm'].resetFields()
    },
    dImgBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 4
      if (!isRightSize) {
        this.$message.error('文件大小超过 4MB')
      }
      return isRightSize
    },
    pImgUploadImg(response, file, fileList) {
      this.formData.dImg = file.response.msg
    },
  }
}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

</style>
