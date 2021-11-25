<template>

    <div>

        <h1 style="text-align: center">医生信息管理</h1>

        <div style="width: 100%; height: 60px">
            <el-button type="primary" @click="editInsert">添加医生</el-button>
        </div>

        <!--   表格  -->
        <el-table
                :data="tableData"
                border
                style="min-width: 761px; width: 100%">

            <el-table-column
                    fixed
                    prop="did"
                    label="ID"
                    min-width="5%">
            </el-table-column>
            <el-table-column
                    prop="dname"
                    label="用户名"
                    min-width="10%">
            </el-table-column>
            <el-table-column
                    prop="dpassword"
                    label="密码"
                    min-width="10%">
            </el-table-column>
            <el-table-column
                    label="头像"
                    min-width="10%">
                <template slot-scope="scopeImg">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scopeImg.row.dimg"
                            :preview-src-list="scopeImg.row.dimg">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
                    prop="dinroduce"
                    label="简介"
                    min-width="30%">
            </el-table-column>
            <el-table-column
                    prop="ddate"
                    label="创建时间"
                    min-width="10%">
            </el-table-column>
            <el-table-column
                    prop="utf"
                    label="状态"
                    min-width="10%">
            </el-table-column>

            <el-table-column

                    label="操作"
                    min-width="10%">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary" size="small">医生信息修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--    分页  -->
        <el-pagination
                background
                layout="prev, pager, next"
                page-size="8"
                :total="total"
                @prev-click ="pagePrev"
                @next-click ="pageNext"
                @current-change="page">
        </el-pagination>


        <!--                修改-->
        <el-dialog
                title="医生信息修改操作"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
            <!--            <span>需要下架相册吗</span>-->
            <DockerNo v-bind:usrId="usrId"
                    :key="(new Date()).getTime()"
                    style="margin-bottom: 20px"/>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!--                添加-->
        <el-dialog
                title="医生信息添加操作"
                :visible.sync="dialogVisibleInsert"
                width="50%"
                :before-close="handleClose">
            <!--            <span>需要下架相册吗</span>-->
            <DoctorInsert :key="(new Date()).getTime()"
                           style="margin-bottom: 20px"/>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleInsert = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleInsert = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>
    import DockerNo from "./dialog/DockerNo";
    import DoctorInsert from "./dialog/DoctorInsert";

    export default {
        components: {
            DockerNo,
            DoctorInsert,
        },
        data() {
            return {
                current: null,
                total: null,
                tableData: [],
                usrId: '',
                dialogVisible: false,
                dialogVisibleInsert:false,

                pageNum:'',
            }
        },
        methods: {
            //删除页码数据
            delete_a(row) {
                const _this = this

                _this.$api.adimApi.delect(row.aId).then(res =>{
                    if (res == 1){
                        alert("删除成功")
                    }else {
                        alert("删除失败，详情到日志查看")
                        _this.page(_this.current)
                    }
                })

            },

            //修改
            edit(row) {
                const _this = this
                _this.dialogVisible = true
                console.log(row)
                _this.usrId = row.did
                // _this.$router.push({
                //     path: '/PageUpdate',
                //     query:{
                //         id: row.id
                //     }
                // })
            },


            //修改
            editInsert() {
                const _this = this
                _this.dialogVisibleInsert = true
            },


            pagePrev(){
                let _this = this
                _this.$api.doctorApi.findAll(_this.pageNum - 1, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })
            },

            pageNext(){
                let _this = this
                _this.$api.doctorApi.findAll(_this.pageNum + 1, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })
            },

            page(number){
                let _this = this
                _this.$api.doctorApi.findAll(number, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })

            }


        },
        created() {
            const _this = this
            _this.$api.doctorApi.findAll(1, 8).then(res => {
                _this.tableData = res.list
                _this.total = res.total
                _this.pageNum = res.pageNum
            })
        },


    }
</script>