<template>

    <div>

        <h1 style="text-align: center">用户操作日志</h1>

        <!--   表格  -->
        <el-table
                :data="tableData"
                border
                style="min-width: 761px; width: 100%">

            <el-table-column
                    fixed
                    prop="ulId"
                    label="ID"
                    min-width="5%">
            </el-table-column>
            <el-table-column
                    prop="fkUId"
                    label="操作用户ID"
                    min-width="10%">
            </el-table-column>
            <el-table-column
                    prop="ulIp"
                    label="操作用户IP"
                    min-width="10%">
            </el-table-column>
            <el-table-column
                    prop="ulDate"
                    label="时间"
                    min-width="10%">
            </el-table-column>
            <el-table-column
                    prop="ulContent"
                    label="操作内容"
                    min-width="55%">
            </el-table-column>

            <el-table-column

                    label="操作"
                    min-width="10%">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary" size="small">用户信息</el-button>
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
                title="用户信息"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
            <!--            <span>需要下架相册吗</span>-->
            <UserNo v-bind:usrId="usrId"
                        :key="(new Date()).getTime()"
                        style="margin-bottom: 20px"/>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>
    import UserNo from "./dialog/userNo";

    export default {
        components: {
            UserNo
        },
        data() {
            return {
                current: null,
                total: null,
                tableData: [],
                usrId: '',
                dialogVisible: false,

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
                _this.usrId = row.fkUId
                // _this.$router.push({
                //     path: '/PageUpdate',
                //     query:{
                //         id: row.id
                //     }
                // })
            },


            pagePrev(){
                let _this = this
                _this.$api.userLogApi.listByAll(_this.pageNum - 1, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })
            },

            pageNext(){
                let _this = this
                _this.$api.userLogApi.listByAll(_this.pageNum + 1, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })
            },

            page(number){
                let _this = this
                _this.$api.userLogApi.listByAll(number, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })

            }


        },
        created() {
            const _this = this
            _this.$api.userLogApi.listByAll(1, 8).then(res => {
                _this.tableData = res.list
                _this.total = res.total
                _this.pageNum = res.pageNum
            })
        },


    }
</script>