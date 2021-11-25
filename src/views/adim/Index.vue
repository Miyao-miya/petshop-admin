<template>

    <div>

        <h1 style="text-align: center">管理员信息管理</h1>

        <!--   表格  -->
        <el-table
                :data="tableData"
                border
                style="min-width: 1000px; width: 100%">

            <el-table-column
                    fixed
                    prop="aId"
                    label="ID"
                    min-width="20%">
            </el-table-column>
            <el-table-column
                    prop="aName"
                    label="名字"
                    min-width="30%">
            </el-table-column>
            <el-table-column
                    prop="aRoot"
                    label="权限"
                    min-width="30%">
            </el-table-column>

            <el-table-column

                    label="操作"
                    min-width="20%">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary" size="small">修改</el-button>
                    <el-button @click="delete_a(scope.row)" type="info" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--    分页  -->
        <el-pagination
                background
                layout="prev, pager, next"
                page-size="5"
                :total="total"
                @prev-click ="pagePrev"
                @next-click ="pageNext"
                @current-change="page">
        </el-pagination>


        <!--        修改-->
        <el-dialog
                title="管理员修改操作"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
            <!--            <span>需要下架相册吗</span>-->
            <AdimUpdata v-bind:adim="adim"
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
    import AdimUpdata from "./dialog/adimUpdata";

    export default {
        components: {
            AdimUpdata
        },
        data() {
            return {
                current: null,
                total: null,
                tableData: [],
                adim: '',
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
                _this.adim = row
                // _this.$router.push({
                //     path: '/PageUpdate',
                //     query:{
                //         id: row.id
                //     }
                // })
            },


            pagePrev(){
                let _this = this
                _this.$api.adimApi.findAllByARoot(4, _this.pageNum - 1, 5).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })
            },

            pageNext(){
                let _this = this
                _this.$api.adimApi.findAllByARoot(4, _this.pageNum + 1, 5).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })
            },

            page(number){
                let _this = this
                _this.$api.adimApi.findAllByARoot(4,number, 5).then(res => {
                    _this.tableData = res.list
                    _this.total = res.total
                    _this.pageNum = res.pageNum
                })

            }


        },
        created() {
            const _this = this
            _this.$api.adimApi.findAllByARoot(4, 1, 5).then(res => {
                _this.tableData = res.list
                _this.total = res.total
                _this.pageNum = res.pageNum
            })
        },


    }
</script>