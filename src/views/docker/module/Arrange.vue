<template>

    <div>

        <h1 style="text-align: center">医生排班信息管理</h1>

        <div style="width: 100%; height: 60px">
            <el-button type="primary" @click="editInsert">添加排班</el-button>
        </div>

        <!--   表格  -->
        <el-table
                :data="tableData"
                border
                style="min-width: 761px; width: 100%">

            <el-table-column
                    fixed
                    prop="cid"
                    label="ID"
                    min-width="10%">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="fkDId"
                    label="医生ID"
                    min-width="10%">
            </el-table-column>
            <el-table-column
                    prop="cdatea"
                    label="开始时间"
                    min-width="20%">
            </el-table-column>
            <el-table-column
                    prop="cdateb"
                    label="结束时间"
                    min-width="20%">
            </el-table-column>
            <el-table-column
                    prop="ctf"
                    label="状态"
                    min-width="20%">
            </el-table-column>

            <el-table-column

                    label="操作"
                    min-width="20%">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary" size="small">医生信息</el-button>
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
                title="管理员修改操作"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
            <!--            <span>需要下架相册吗</span>-->
            <DockerNoCopy v-bind:usrId="usrId"
                      :key="(new Date()).getTime()"
                      style="margin-bottom: 20px"/>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!--                添加-->
        <el-dialog
                title="添加排班新"
                :visible.sync="dialogVisibleInsert"
                width="50%"
                :before-close="handleClose">
            <!--            <span>需要下架相册吗</span>-->
            <Claess :key="(new Date()).getTime()"
                          style="margin-bottom: 20px"/>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleInsert = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleInsert = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>
    import DockerNoCopy from "./dialog/DockerNoCopy";
    import Claess from "./dialog/Claess";

    export default {
        components: {
            DockerNoCopy,
            Claess,
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
                _this.usrId = row.fkDId
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
                _this.$api.classesApi.listByAll(_this.pageNum - 1, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })
            },

            pageNext(){
                let _this = this
                _this.$api.classesApi.listByAll(_this.pageNum + 1, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })
            },

            page(number){
                let _this = this
                _this.$api.classesApi.listByAll(number, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })

            }


        },
        created() {
            const _this = this
            _this.$api.classesApi.listByAll(1, 8).then(res => {
                _this.tableData = res.list
                _this.total = res.total
                _this.pageNum = res.pageNum
            })
        },


    }
</script>