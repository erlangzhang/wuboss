<style>
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">
                    <VIcon class='breadcrumb-icon' type='home' /> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>操作日志</el-breadcrumb-item>
            </el-breadcrumb>
            <div class='breadcrumb-header'></div>
        </div>
        <div class='content-header'>
            <VIcon type='appstore' /> 操作日志列表
            <div class='breadcrumb-header'></div>
        </div>
        <div class='operator-bar'>
            <a href="javascript:;" @click="handleRefresh" class="refresh-btn">
                <VIcon type='reload' class='iconfont-button' />刷新</a>
        </div>
        <div class='table-container'>
            <span class='table-title'>显示第 {{(pagination.currentPage - 1) * pagination.pageSize+1 || 1 }} 至 {{getLastPage}} 条，共 {{pagination.total}} 条</span>
            <el-dropdown class="select-row-dropdown" :hide-on-click="false">
                <el-button class="select-row">
                    选择列
                    <VIcon type="down" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.id">id</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.name">操作人</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.url">url</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.method">操作方法</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.params">操作内容</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.code">操作结果</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.message">描述</el-checkbox>
                        </el-checkbox>
                        </el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.createdAt">操作时间</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.ip">登入ip</el-checkbox>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!--<el-input class='search-input' placeholder="操作人" icon="search" v-model="search" size="small" :on-icon-click="handleSearch">
            </el-input>-->
            <SearchInput :defaultSearch="defaultSearch" :handleSearch="handleSearch"></SearchInput>
            <el-table :data="datas" v-loading="loading" element-loading-text="加载中" border style="width: 100%">
                <el-table-column v-if="columnsChecked.id" label="id" prop="id">
                </el-table-column>
                <el-table-column v-if="columnsChecked.name" label="操作人" prop="name">
                </el-table-column>
                <el-table-column prop="method" label="操作方法" v-if="columnsChecked.method">
                </el-table-column>
                <el-table-column prop="url" label="url" v-if="columnsChecked.url">
                </el-table-column>
                <el-table-column prop="params" label="操作内容" v-if="columnsChecked.params">
                    <template scope="scope">
                        <span>
          {{ renderParams(scope.row.params) }}
        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="code" label="操作结果" v-if="columnsChecked.code">
                    <template scope="scope">
                        <span>
          {{ renderCode(scope.row.code) }}
        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="message" label="描述" v-if="columnsChecked.message">
                </el-table-column>
                <el-table-column prop="ip" label="登入ip" v-if="columnsChecked.ip">
                </el-table-column>
                <el-table-column prop="createdAt" label="操作时间" v-if="columnsChecked.createdAt">
                    <template scope="scope">
                        <span>
          {{ renderTime(scope.row.createdAt) }}
        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-pagination">
                <el-pagination :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import {
    VIcon,
    Btn,
    SearchInput,
} from '../components';
import {
    userStore
} from '../stores';
import '../style/index.less';
export default {
    data() {
            return {
                defaultSearch: "操作人",
                search: '',
                datas: [],
                dialogVisible: false,
                columnsChecked: {
                    id: false,
                    name: true,
                    url: true,
                    account: true,
                    code: true, //操作结果
                    params: false,
                    createdAt: true,
                    method: true,
                    ip: true,
                    message: false,
                },
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },
                loading: false,
            }
        },
        components: {
            VIcon,
            Btn,
            SearchInput,
        },
        created: function() {
            this.fetch();
        },
        computed: {
            getLastPage: function() {
                var maxCurrPage = parseInt(this.pagination.total / this.pagination.pageSize);
                var yushu = this.pagination.total % this.pagination.currentPage;
                if (yushu != 0) {
                    if (this.pagination.currentPage <= maxCurrPage) {
                        return this.pagination.currentPage * this.pagination.pageSize;
                    } else {
                        return this.pagination.total;
                    }
                } else {
                    return this.pagination.currentPage * this.pagination.pageSize;
                }

            }
        },
        methods: {
            fetch() {
                const params = {
                    page: this.pagination.currentPage,
                    limit: this.pagination.pageSize,
                    sort: this.sort,
                }
                if (this.search && this.search != "") {
                    params.search = this.search;
                }
                this.loading = true;
                userStore.listLogs(params).then(ret => {
                    this.datas = ret.data.docs;
                    this.loading = false;
                    this.pagination.total = Number(ret.data.total);
                    // this.pagination.pageSize = Number(ret.data.limit);
                    // this.pagination.currentPage = Number(ret.data.page);
                }).catch(err => {
                    this.$message.error(`获取操作日志失败！${err}`);
                    this.loading = false;
                });
            },

            handleSearch(searchText) {
                this.search = searchText;
                this.fetch();
            },
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                const params = {
                    limit: val,
                    page: this.pagination.currentPage,
                };
                if (this.search) {
                    params.search = this.search;
                }
                this.fetch(params);
            },
            handleCurrentChange(val) {
                this.pagination.currentPage = val;
                const params = {
                    limit: this.pagination.pageSize,
                    page: val,
                };
                if (this.search) {
                    params.search = this.search;
                }
                this.fetch(params);
            },
            renderParams(params) {
                return JSON.stringify(params);
            },
            renderCode(code) {
                switch (code) {
                    case 0:
                        return '操作成功';
                    default:
                        return '操作失败';
                }
            },
            renderTime(unix) {
                return moment(unix * 1000).format('YYYY-MM-DD HH:mm:ss');
            },
            handleRefresh() {
                this.fetch();
            },
        }
}
</script>
