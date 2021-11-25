<template>

    <div>

        <h1 style="text-align: center">帖子信息管理</h1>

        <div style="width: 100%; height: 60px">
            <!--            <el-button type="primary" @click="editInsert">添加订单</el-button>-->
        </div>

        <!--   表格  -->
        <el-table
                :data="tableData"
                border
                style="min-width: 1000px; width: 100%">

            <el-table-column
                    fixed
                    prop="pid"
                    label="ID"
                    min-width="5%">
            </el-table-column>
            <el-table-column
                    prop="fkUId.uid"
                    label="用户ID"
                    min-width="10%">
            </el-table-column>
            <el-table-column
                    prop="pname"
                    label="帖子名"
                    min-width="10%">
            </el-table-column>
            <el-table-column
                    label="帖子封面"
                    min-width="15%">
                <template slot-scope="scopeImg">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scopeImg.row.pimg">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
                    label="主题"
                    align="center"
                    min-width="10%">
                <template slot-scope="scopeT">
                    <el-tag v-for="(item, index) in scopeT.row.fkTId" style="margin: 1px">{{item.tName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="fkGId.gname"
                    label="标签"
                    align="center"
                    min-width="10%">
                <template slot-scope="scopeType">
                    <el-tag type="success" v-for="(item, index) in scopeType.row.fkTypeId" style="margin: 1px">
                        {{item.tName}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="pdate"
                    label="创建时间"
                    min-width="10%">
            </el-table-column>
            <el-table-column
                    prop="pissueDate"
                    label="预定发布时间"
                    min-width="10%">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    min-width="20%">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary" size="small">信息内容</el-button>
                    <el-button @click="delete_a(scope.row)" type="info" size="small">删除帖子</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--    分页  -->
        <el-pagination
                background
                layout="prev, pager, next"
                page-size="8"
                :total="total"
                @prev-click="pagePrev"
                @next-click="pageNext"
                @current-change="page">
        </el-pagination>


        <!--                修改-->
        <el-dialog
                title="帖子内容"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
            <!--            <span>需要下架相册吗</span>-->
           <div v-html="postContent"></div>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!--                添加-->
        <el-dialog
                title="用户添加操作"
                :visible.sync="dialogVisibleInsert"
                width="50%"
                :before-close="handleClose">
            <!--            <span>需要下架相册吗</span>-->
            <UserInsert :key="(new Date()).getTime()"
                        style="margin-bottom: 20px"/>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleInsert = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleInsert = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>

    import UserInsert from "./dialog/UserInsert";
    import UserUpdata from "./dialog/UserUpdata";

    export default {
        components: {
            // DockerNo,
            UserInsert,
            UserUpdata,
        },
        data() {
            return {
                current: null,
                total: null,
                tableData: [],
                usrId: '',
                dialogVisible: false,
                dialogVisibleInsert: false,
                postContent:'',

                pageNum: '',
            }
        },
        methods: {
            //删除页码数据
            delete_a(row) {
                const _this = this
                _this.$api.postApi.delect(row.pid).then(res => {
                    if (res == 1) {
                        alert("删除成功")
                    } else {
                        alert("删除失败，详情到日志查看")
                        _this.page(_this.current)
                    }
                })

            },

            //修改
            edit(row) {
                const _this = this
                _this.dialogVisible = true
                _this.postContent = row.pcontent
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


            pagePrev() {
                let _this = this
                _this.$api.postApi.listByAll(_this.pageNum - 1, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })
            },

            pageNext() {
                let _this = this
                _this.$api.postApi.listByAll(_this.pageNum + 1, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })
            },

            page(number) {
                let _this = this
                _this.$api.postApi.listByAll(number, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })

            }


        },
        created() {
            const _this = this
            _this.$api.postApi.listByAll(1, 8).then(res => {
                _this.tableData = res.list
                _this.total = res.total
                _this.pageNum = res.pageNum
            })
        },


    }
</script>