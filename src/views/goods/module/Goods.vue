<template>

    <div>

        <h1 style="text-align: center">相册信息管理</h1>

        <div style="width: 100%; height: 60px">
                        <el-button type="primary" @click="editInsert">添加商品</el-button>
        </div>

        <!--   表格  -->
        <el-table
                :data="tableData"
                border
                style="min-width: 1000px; width: 100%">

            <el-table-column
                    fixed
                    prop="gid"
                    label="ID"
                    min-width="5%">
            </el-table-column>
            <el-table-column
                    prop="gname"
                    label="商品名"
                    min-width="15%">
            </el-table-column>
            <el-table-column
                    label="商品封面"
                    min-width="15%">
                <template slot-scope="scopeImg">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scopeImg.row.gimg"
                            :preview-src-list="scopeImg.row.gimgs">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
                    label="类型"
                    align="center"
                    min-width="20%">
                <template slot-scope="scopeGc">
                    <el-tag type="success" v-for="(item, index) in scopeGc.row.fkGcId" style="margin: 1px">
                        {{item.gcName}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    label="标签"
                    align="center"
                    min-width="20%">
                <template slot-scope="scopeType">
                    <el-tag type="success" v-for="(item, index) in scopeType.row.fkTypeId" style="margin: 1px">
                        {{item.tName}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="gcontent"
                    label="描述"
                    min-width="15%">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    min-width="20%">
                <template slot-scope="scope">
                    <el-button @click="delete_a(scope.row)" type="info" size="small">删除商品</el-button>
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


<!--        &lt;!&ndash;                修改&ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="帖子内容"-->
<!--                :visible.sync="dialogVisible"-->
<!--                width="50%"-->
<!--                :before-close="handleClose">-->
<!--            &lt;!&ndash;            <span>需要下架相册吗</span>&ndash;&gt;-->
<!--            <div v-html="postContent"></div>-->

<!--            <span slot="footer" class="dialog-footer">-->
<!--            <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->

        <!--                添加-->
        <el-dialog
                title="商品添加操作"
                :visible.sync="dialogVisibleInsert"
                width="50%"
                :before-close="handleClose">
            <!--            <span>需要下架相册吗</span>-->
            <GoodsInsert :key="(new Date()).getTime()"
                        style="margin-bottom: 20px"/>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleInsert = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleInsert = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>

    import GoodsInsert from "./dialog/GoodsInsert";

    export default {
        components: {
            GoodsInsert,
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
                _this.$api.goodsApi.goodsdelete(row.gid).then(res => {
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
                _this.$api.goodsApi.goodsPageInfo(_this.pageNum - 1, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })
            },

            pageNext() {
                let _this = this
                _this.$api.goodsApi.goodsPageInfo(_this.pageNum + 1, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })
            },

            page(number) {
                let _this = this
                _this.$api.goodsApi.goodsPageInfo(number, 8).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })

            }


        },
        created() {
            const _this = this
            _this.$api.goodsApi.goodsPageInfo(1, 8).then(res => {
                _this.tableData = res.list
                _this.total = res.total
                _this.pageNum = res.pageNum
            })
        },


    }
</script>