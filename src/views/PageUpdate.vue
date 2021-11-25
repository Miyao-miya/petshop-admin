<template>

    <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="id">
            <el-input v-model="form.id" readonly></el-input>
        </el-form-item>

        <el-form-item label="酒店名" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="设施" prop="des">
            <el-input v-model="form.des"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即修改</el-button>
            <el-button @click="resetForm('form')">取消</el-button>

        </el-form-item>
    </el-form>

</template>

<script>
    export default {
        data() {
            return {
                form: {
                    id: '',
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
                        axios.put('http://localhost:8181/book/update', this.form).then(function (resp) {
                            if (resp.data == 'success'){
                                _this.$router.push('/ManagePage')
                            }
                        })
                    }else {
                        console.log("err")
                        return false
                    }
                })
            },
            resetForm(formName){
                // this.$refs[formName].resetFields()
                this.$router.push('/ManagePage')
            }
        },
        created() {
            const _this = this
            axios.get('http://localhost:8181/book/findbyId/' + this.$route.query.id).then(function (resp) {
                _this.form = resp.data
            })
        }
    }
</script>

<style scoped>

</style>