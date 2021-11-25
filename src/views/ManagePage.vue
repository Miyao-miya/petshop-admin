<template>

<div>

    <!--   表格  -->
    <el-table
            :data="tableData"
            border
            style="width: 100%">

        <el-table-column
                fixed
                prop="id"
                label="ID"
                width="60">
        </el-table-column>
        <el-table-column
                prop="name"
                label="酒店名"
                width="120">
        </el-table-column>
        <el-table-column
                prop="des"
                label="设施"
                width="520">
        </el-table-column>

        <el-table-column
                fixed="right"
                label="操作"
                width="100">
            <template slot-scope="scope">
                <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="delete_a(scope.row)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!--    分页  -->
    <el-pagination
            background
            layout="prev, pager, next"
            page-size="6"
            :total="total"
            @current-change="page">
    </el-pagination>

</div>

</template>

<script>
    export default {
        methods: {
            //输出页码数据
            page(currentPage){
                const _this = this
                axios.get('http://localhost:8181/book/findAll/'+currentPage+'/6')
                    .then(function (resp) {
                        _this.current = currentPage
                        _this.tableData = resp.data.content
                        _this.total = resp.data.totalElements
                    })
            },
            delete_a(row){
                const _this = this
                axios.delete('http://localhost:8181/book/delectById/' + row.id).then(function () {
                    _this.$notify({
                        title: '提示',
                        message: '删除成功了',
                        duration: 0
                    });
                //    动态刷新,刷新现在的分页数据
                    _this.page(_this.current)
                })
            },
            edit(row) {
                const _this = this
                _this.$router.push({
                    path: '/PageUpdate',
                    query:{
                        id: row.id
                    }
                })
            }

        },
        created() {
            const _this = this
            axios.get('http://localhost:8181/book/findAll/1/6')
            .then(function (resp) {
                _this.tableData = resp.data.content
                _this.total = resp.data.totalElements
            })
        },

        data() {
            return {
                current:null,
                total: null,
                tableData: []
            }
        }
    }
</script>