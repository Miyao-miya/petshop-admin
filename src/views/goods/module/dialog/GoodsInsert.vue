<template>
    <div>
        <el-form ref="UsersForm" :model="formData" :rules="rules" size="medium" label-width="100px">
            <el-form-item label="商品名" prop="gName">
                <el-input v-model="formData.gName" placeholder="请输入商品名" clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="fkGcId">
                <el-checkbox-group v-model="formData.fkGcId" size="medium">
                    <el-checkbox v-for="(item, index) in fkGcIdOptions" :key="index" :label="item.value"
                                 :disabled="item.disabled">{{item.label}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="标签" prop="fkTypeId">
                <el-checkbox-group v-model="formData.fkTypeId" size="medium">
                    <el-checkbox v-for="(item, index) in fkTypeIdOptions" :key="index" :label="item.value"
                                 :disabled="item.disabled">{{item.label}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="描述" prop="gContent">
                <el-input v-model="formData.gContent" type="textarea" placeholder="请输入描述"
                          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="价值" prop="gPrice">
                <el-input v-model="formData.gPrice" placeholder="请输入价值" clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="上传封面" prop="gImg" required>
                <el-upload ref="gImg"
                           :file-list="gImgfileList"
                           :action="gImgAction"
                           :before-upload="gImgBeforeUpload"
                           :on-success="pImgUploadImg"
                           list-type="picture-card" accept="image/*">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="相关图片" prop="gImgs" required>
                <el-upload ref="field110"
                           :file-list="gImgsfileList"
                           :action="gImgsAction"
                           :before-upload="field110BeforeUpload"
                           :on-success="pImgUploadImgs"
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
                    gName: undefined,
                    fkGcId: [],
                    fkTypeId: [],
                    gContent: undefined,
                    gPrice: undefined,
                    gImg: null,
                    gImgs: null,
                },
                rules: {
                    gName: [{
                        required: true,
                        message: '请输入商品名',
                        trigger: 'blur'
                    }],
                    fkGcId: [{
                        required: true,
                        type: 'array',
                        message: '请至少选择一个fkGcId',
                        trigger: 'change'
                    }],
                    fkTypeId: [{
                        required: true,
                        type: 'array',
                        message: '请至少选择一个fkTypeId',
                        trigger: 'change'
                    }],
                    gContent: [{
                        required: true,
                        message: '请输入描述',
                        trigger: 'blur'
                    }],
                    gPrice: [{
                        required: true,
                        message: '请输入价值',
                        trigger: 'blur'
                    }],
                },
                gImgAction: 'http://39.105.202.40:8282/upload',
                gImgfileList: [],
                gImgsAction: 'http://39.105.202.40:8282/upload',
                gImgsfileList: [],
                fkGcIdOptions: [{
                    "label": "选项一",
                    "value": 1
                }, {
                    "label": "选项二",
                    "value": 2
                }],
                fkTypeIdOptions: [{
                    "label": "选项一",
                    "value": 1
                }, {
                    "label": "选项二",
                    "value": 2
                }],
            }
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
            let _this = this

            let types ={
                label:'',
                value:'',
            }

            let gc ={
                label:'',
                value:'',
            }

            _this.$api.typeApi.listByAll().then(res =>{
                if (res != null){
                    _this.fkTypeIdOptions =[]
                    for (let i=0; i<res.length; i++){
                        types.label = res[i].tName
                        types.value = res[i].tId
                        _this.fkTypeIdOptions.push(JSON.parse(JSON.stringify(types)))
                    }
                }
            })

            _this.$api.goodsCategoryApi.listByAll().then(res =>{
                if (res != null){
                    _this.fkGcIdOptions =[]
                    for (let i=0; i<res.length; i++){
                        types.label = res[i].gcName
                        types.value = res[i].gcId
                        _this.fkGcIdOptions.push(JSON.parse(JSON.stringify(types)))
                    }
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
                        let imgs = ''
                        let gc = ''
                        let  type =''
                        for (let i =0; i<_this.formData.fkGcId.length; i++){
                            if (gc == null || gc == ''){
                                gc = _this.formData.fkGcId[i]
                            }else {
                                gc = gc + '-' + _this.formData.fkGcId[i]
                            }

                        }
                        for (let i=0; i<_this.formData.fkTypeId.length; i++){
                            if (type == null || type == ''){
                                type = _this.formData.fkTypeId[i]
                            }else {
                                type = type + '-' +_this.formData.fkTypeId[i]
                            }
                        }
                        // for (let i=0; i<_this.formData.gImgs.length; i++){
                        //     imgs = imgs +'-' + _this.formData.gImgs[i]
                        // }

                        _this.formData.fkGcId = JSON.parse(JSON.stringify(gc))
                        _this.formData.fkTypeId = JSON.parse(JSON.stringify(type))
                        // _this.formData.gImgs = imgs

                        _this.$api.goodsApi.goodsinsert(_this.formData).then(res =>{
                            if (res == 1){
                                alert("添加成功")
                            }else {
                                alert("添加失败，具体请查看相关日志")
                            }
                        })
                    }
                })
            },
            resetForm() {
                this.$refs['UsersForm'].resetFields()
            },
            gImgBeforeUpload(file) {
                let isRightSize = file.size / 1024 / 1024 < 4
                if (!isRightSize) {
                    this.$message.error('文件大小超过 4MB')
                }
                let isAccept = new RegExp('image/*').test(file.type)
                if (!isAccept) {
                    this.$message.error('应该选择image/*类型的文件')
                }
                return isRightSize && isAccept
            },
            field110BeforeUpload(file) {
                let isRightSize = file.size / 1024 / 1024 < 4
                if (!isRightSize) {
                    this.$message.error('文件大小超过 4MB')
                }
                return isRightSize
            },
            pImgUploadImg(response, file, fileList) {
                this.formData.gImg = file.response.msg
                this.gImgfileList.push(file.response.msg)
            },
            pImgUploadImgs(response, file, fileList) {
                if (this.formData.gImgs == null && this.formData.gImgs ==''){
                    this.formData.gImgs = file.response.msg
                }else {
                    this.formData.gImgs = this.formData.gImgs +'&'+ file.response.msg
                }

                this.gImgsfileList.push(file.response.msg)
            },
        }
    }

</script>
<style>
    .el-upload__tip {
        line-height: 1.2;
    }

</style>
