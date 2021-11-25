<template>
    <div>

        <div style="width: 100%; height: 140px;margin-left: 30%">
            <span>&nbsp;</span>
            <p style="color: #B3C0D1">头像</p>
            <el-image
                    style="width: 100px; height: 100px"
                    :src="formData.uimg"
                    :preview-src-list="srcList">
            </el-image>
        </div>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>

        <el-form ref="UsersForm" :model="formData" :rules="rules" size="medium" label-width="100px">
            <el-form-item label="医生ID" prop="uid">
                <el-input v-model="formData.uid" placeholder="请输入用户ID" readonly clearable :style="{width: '100%'}">
                </el-input>
            </el-form-item>
            <el-form-item label="名字" prop="uname">
                <el-input v-model="formData.uname" placeholder="请输入用户名" readonly clearable :style="{width: '100%'}">
                </el-input>
            </el-form-item>
            <!--      <el-form-item label="备忘录" prop="unote">-->
            <!--        <el-input v-model="formData.unote" placeholder="请输入备忘录" readonly clearable :style="{width: '100%'}">-->
            <!--        </el-input>-->
            <!--      </el-form-item>-->
            <el-form-item label="注册时间" prop="udate">
                <el-input v-model="formData.udate" placeholder="请输入注册时间" readonly clearable :style="{width: '100%'}">
                </el-input>
            </el-form-item>
            <el-form-item label="介绍" prop="uinroduce">
                <el-input v-model="formData.uinroduce" type="textarea" placeholder="请输入介绍" readonly
                          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="账号状态" prop="utf">
                <el-input v-model="formData.utf" placeholder="请输入账号状态" clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
<!--            <el-form-item size="large">-->
<!--                <el-button type="primary" @click="submitForm">提交</el-button>-->
<!--                <el-button @click="resetForm">重置</el-button>-->
<!--            </el-form-item>-->
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
                    uimg: '',
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
            _this.$api.doctorApi.doctorselect(_this.usrId).then(res => {
                if (res != null) {
                    _this.formData.uid = res.did
                    _this.formData.uname = res.dname
                    _this.formData.uinroduce = res.dinroduce
                    _this.formData.uimg = res.dimg
                    _this.formData.udate = res.ddate
                    _this.formData.password = res.password
                    _this.formData.utf = res.utf
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
                        let docker = {
                            dId: _this.formData.uid,
                            dName: _this.formData.uname,
                            dinroduce: _this.formData.uinroduce,
                            dImg: _this.formData.uimg,
                            dDate: _this.formData.udate,
                            dPassword: _this.formData.password,
                            uTf: _this.formData.utf,
                        }
                        console.log(docker)
                        _this.$api.doctorApi.updateByPrimaryKeySelective(docker).then(res =>{
                            if (res == 1){
                               alert(" 修改成功")
                            }else {
                                alert(" 修改失败，具体情况情况相关错误日志")
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
