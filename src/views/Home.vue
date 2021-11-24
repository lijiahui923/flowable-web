<template>
    <div class="home-container">
        <el-button class="home-btn" size="mini" type="primary" @click="goProcess(true)">新增</el-button>
        <el-table
            :default-sort = "{prop: 'lastUpdated', order: 'descending'}"
            :data="tableData"
            size="mini"
            style="width: 100%">
            <el-table-column
            fixed
            prop="id"
            label="流程编号"
            width="350px">
            </el-table-column>
            <el-table-column
            prop="key"
            label="流程标识">
            </el-table-column>
            <el-table-column
            prop="name"
            label="流程名称">
            </el-table-column>
            <el-table-column
            prop="description"
            label="描述">
            </el-table-column>
            <el-table-column
            prop="lastUpdated"
            sortable
            width="250px"
            label="时间">
            </el-table-column>
            <el-table-column>
            <!-- <template slot="header">
                <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template> -->
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small" @click="goProcess(false, scope.row.id)">编辑</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
        </el-pagination> -->
    </div>
</template>

<script>
import axios from 'axios'
import { setIsAdd, setId } from './comm'
export default {
    name: 'home',
    data() {
        return {
            tableData: [],
            page: {
                currentPage: 1,
                pageSize: 100,
                total: 0
            },
            search: ''
        }
    },
    watch: {},
    created() {
        this.getProcessList()
    },
    methods: {
        getProcessList() {
            axios.get('/api/rest/models').then(res => {
                const { data, total } = res.data
                this.tableData = data
                this.page.total = total
            })
        },
        goProcess(bol, id) {
            setIsAdd(bol, id)
            this.$router.push({name: 'About'})
        },
        handleClick(id) {
            setId(id)
            this.$router.push({name: 'About'})
        },
        handleSizeChange() {},
        handleCurrentChange() {}
    }
}
</script>

<style>
.home-container {
    margin: 10px;
}
.home-container button {
    margin-bottom: 10px;
}</style>