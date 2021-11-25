<template>

    <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="酒店名" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="设施" prop="des">
            <el-input v-model="form.des"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            <el-button @click="resetForm('form')">取消</el-button>

        </el-form-item>
    </el-form>

</template>


<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    des: ''
                },
                rules:{
                    name:[
                        {required: true, message: "酒店名", trigger: 'blur'}
                    ],
                    des:[
                        {required: true, message: "设施", trigger: 'blur'},
                        {min: 3, message: '长度至少为3'}
                    ]
                }
            }
        },
        methods: {
            onSubmit(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid){
                        //axios.post(url, this.ref)
                        axios.post('http://localhost:8181/book/save', this.form).then(function (resp) {
                            if (resp.data == 'success'){
                                _this.$router.push({
                                    path:'\ManagePage',
                                    query:{
                                        totalage:'finally'
                                    }
                                })
                            }
                        })
                    }else {
                        console.log("err")
                        return false
                    }
                })
            },
            resetForm(formName){
              this.$refs[formName].resetFields()
            }
        }
    }
</script>