<template>
  <div>
    <el-form ref="UsersForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="密码" prop="uPassword">
        <el-input v-model="formData.uPassword" placeholder="请输入密码" clearable show-password
          :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="uName">
        <el-input v-model="formData.uName" placeholder="请输入用户名" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="自我介绍" prop="uInroduce">
        <el-input v-model="formData.uInroduce" type="textarea" placeholder="请输入自我介绍"
          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="头像上传" prop="uImg" required>
        <el-upload ref="uImg"
                   :file-list="uImgfileList"
                   :action="uImgAction"
                   :before-upload="uImgBeforeUpload"
                   :on-success="pConentUploadImg"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" prop="uNote">
        <el-input v-model="formData.uNote" type="textarea" placeholder="请输入备注"
          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
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
        uPassword: undefined,
        uName: undefined,
        uInroduce: undefined,
        uImg: null,
        uNote: undefined,
      },
      rules: {
        uPassword: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        uName: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        uInroduce: [{
          required: true,
          message: '请输入自我介绍',
          trigger: 'blur'
        }],
        uNote: [{
          required: true,
          message: '请输入备注',
          trigger: 'blur'
        }],
      },
      uImgAction: 'http://39.105.202.40:8282/upload',
      uImgfileList: [],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
  //  数据同步
    let _this = this
    _this.$api.userApi.selectUser(_this.usrId).then(res =>{
      if (res != null){
        console.log(res)
        _this.formData.uId = res.uid
        _this.formData.uName = res.uname
        _this.formData.uNote = res.unote
        _this.formData.uInroduce = res.uinroduce
        // _this.formData.uImg = res.img
        // _this.uImgfileList.push(res.img)
      }
    })
  },
  methods: {
    submitForm() {
      this.$refs['UsersForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
        else {
          let _this = this
          _this.$api.userApi.userInsert(_this.formatDate).then(res =>{
            if (res ==1){
              alert("添加成功")
            }else {
              alert("添加失败，查看相关错误日志")
            }
          })
        }
      })
    },
    resetForm() {
      this.$refs['UsersForm'].resetFields()
    },
    uImgBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 4
      if (!isRightSize) {
        this.$message.error('文件大小超过 4MB')
      }
      return isRightSize
    },
    pConentUploadImg(response, file, fileList) {
      // this.formData.pConent = '-' + file.response.msg
      // this.uImgfileList= []
      // this.uImgfileList.push(file.response.msg)
      let _this = this
      _this.formData.uImg = file.response.msg
      this.uImgfileList.push(file.response.msg)
    },
  }
}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

</style>
