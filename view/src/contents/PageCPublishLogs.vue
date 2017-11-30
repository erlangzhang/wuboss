<style></style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <NavBar :titleList="titleList"></NavBar>
        </div>
        <div class='content-header'>
            <VIcon type='appstore' /> 发布日志
            <div class='breadcrumb-header'></div>
        </div>
        <div class='table-container'>
            <span class='table-title'>显示第 {{getStartPage}} 至 {{getLastPage}} 项，共 {{pagination.total}} 项</span>
            <el-dropdown class="select-row-dropdown" :hide-on-click="false">
                <el-button class="select-row">
                    选择列
                    <VIcon type="down" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.id">ID</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.operatingTime">操作时间</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.operator">操作人</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.merchantName">商户名称</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.modification">修改项</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.opt">操作</el-checkbox>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <SearchInput :defaultSearch="defaultSearch" :handleSearch="handleSearch"></SearchInput>
        </div>
        <el-table :data="datas" v-loading="loading" element-loading-text="加载中" border style="width: 100%" @sort-change='handleSortChange'>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="ID" prop="logId" v-if="columnsChecked.id" width="250">
            </el-table-column>
            <el-table-column label="操作时间" prop="operatingTime" v-if="columnsChecked.operatingTime" width="180" :sortable="true">
            </el-table-column>
            <el-table-column prop="userName" label="操作人" v-if="columnsChecked.operator" width="100">
            </el-table-column>
            <el-table-column prop="merchantName" label="商户名称" v-if="columnsChecked.merchantName" width="150">
            </el-table-column>
            <el-table-column prop="modification" label="修改项" v-if="columnsChecked.modification" width="180">
                <template scope='scope'>
                    <el-tag type='primary' v-for='item in scope.row.modification'>{{ item }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" v-if="columnsChecked.opt" show-overflow-tooltip>
                <template scope="scope">
                    <router-link class="retrieve-btn" :to="'/content/publishlog-detail?id='+scope.row.logId">
                        <VIcon type='info-circle-o' class='iconfont-button' />查看详细</router-link>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-pagination" style="padding-bottom: 50px">
            <el-pagination :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" @size-change='handlePageSizeChange' @current-change='handleCurPageChange' layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {
    VIcon,
    Btn,
    NavBar,
    SearchInput,
} from '../components';
import moment from 'moment';
import {
    contentStore
} from '../stores';
export default {
    data() {
            return {
                titleList: ["内容管理", "本地生活圈", "商户发布", "发布日志"],
                defaultSearch: '商户名称',
                titleList: ["内容管理", "本地生活圈", "商户发布", "发布日志"],
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },
                datas: [],
                columnsChecked: {
                    id: true,
                    operatingTime: true,
                    operator: true,
                    merchantName: true,
                    modification: true,
                    opt: true
                },
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },
                modifInfo: [],
                search: '',
                sort: '',
                loading: false,

            };
        },

        computed: {
            getStartPage: function() {
                if (this.pagination.total == 0) {
                    return 0;
                } else {
                    return (this.pagination.currentPage - 1) * this.pagination.pageSize + 1;
                }
            },
            getLastPage: function() {
                var maxCurrPage = parseInt(this.pagination.total / this.pagination.pageSize);
                if (maxCurrPage == 0) {
                    return this.pagination.total;
                }
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
            },
        },

        methods: {
            handlePageSizeChange(val) {
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
            handleCurPageChange(val) {
                this.pagination.currentPage = val;
                const params = {
                    page: val,
                    limit: this.pagination.pageSize
                };
                if (this.search) {
                    params.search = this.search;
                }
                this.fetch(params);
            },
            handleSortChange(param) {
                if (!!param.prop) {
                    const order = param.order === 'ascending' ? '' : '-';
                    this.sort = order + param.prop;
                } else {
                    this.sort = '';
                }
                this.fetch();
            },
            handleSearch(searchText) {
                this.search = searchText;
                this.fetch();
            },
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
                contentStore.getMerchantRealeaseLogs(params).then(res => {

                    this.datas = res.data.docs;
                    this.datas.map(item => {
                        return item.operatingTime = moment(item.operatingTime * 1000).format('YYYY-MM-DD HH:mm:ss');
                    });
                    this.modifInfo = res.data.docs[0].modification;
                    console.log(this.modifInfo, 'zp');
                    console.log(res.data, "+++SSS");
                    this.pagination.total = Number(res.data.total);
                    this.loading = false;
                }).catch(err => {
                    this.$message.error(`列表数据获取失败！${err}`);
                    this.loading = false;
                });
            },
        },
        created: function() {
            this.fetch();
        },
        components: {
            VIcon,
            Btn,
            NavBar,
            SearchInput,
        },

}
</script>
