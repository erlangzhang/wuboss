<style>
.el-table-filter__content {
    max-height: 200px;
    overflow: scroll;
}
</style>
<template>
    <div class='layout-container'>
        <NavBar :titleList="titleList"></NavBar>
        <div class='content-header'>
            <VIcon type='appstore' /> 已通过商户
            <div class='breadcrumb-header'></div>
        </div>
        <div class='table-container'>
            <span class='table-title'>显示第 {{getStartPage }} 至 {{getLastPage}} 条，共 {{pagination.total}} 条</span>
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
                        <el-checkbox v-model="columnsChecked.name">商户名称</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.region">地区</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.class">分类</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.type">类型</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.operator">审核人</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.auditTime">审核时间</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.opt">操作</el-checkbox>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!--    <el-input class='search-input' placeholder="商户名称/ID" icon="search" v-model="search" size="small" :on-icon-click="handleSearch">
            </el-input> -->
            <SearchInput :defaultSearch="defaultSearch" :handleSearch="handleSearch"></SearchInput>
            <el-table :data="datas" v-loading="loading" element-loading-text="加载中" border style="width: 100%" @sort-change='handleSortChange' @filter-change="getChargeType">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="ID" prop="id" v-if="columnsChecked.id" width="250">
                </el-table-column>
                <el-table-column label="商户名称" prop="merchantName" v-if="columnsChecked.name" :sortable="true" width="150">
                </el-table-column>
                <el-table-column prop="merchantDist" label="地区" class="province-style" v-if="columnsChecked.region" width="100" :filters="provinceList" :filter-multiple="false" :filter-method="filterProvince" filter-placement="top" column-key="merchantDist"></el-table-column>
                <el-table-column prop="category" label="分类" v-if="columnsChecked.class" width="100" :filters="categoryList" :filter-multiple="false" :filter-method="filterCategory" filter-placement="bottom-end" column-key="category">
                </el-table-column>
                <el-table-column prop="chargetype" label="类型" width="100" v-if="columnsChecked.type" :filter-multiple=false :filters="[{ text: '免费', value: '0' }, { text: '付费', value: '1' }]" :filter-method="filterChargeType" filter-placement="bottom-end" column-key="chargetype">
                    <template scope="scope">
                        <el-tag :type="scope.row.chargetype === 0 ? 'primary' : 'success'" close-transition>{{scope.row.chargetypeText}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="operatorName" label="审核人" v-if="columnsChecked.operator" width="180">
                </el-table-column>
                <el-table-column prop="auditTime" label="审核时间" v-if="columnsChecked.auditTime" width="180" :sortable="true">
                </el-table-column>
                <el-table-column label="操作" v-if="columnsChecked.opt" show-overflow-tooltip>
                    <template scope="scope">
                        <router-link class="retrieve-btn" :to="'/content/passed-detail?id='+scope.row.id">
                            <VIcon type='info-circle-o' class='iconfont-button' />详细信息</router-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-pagination">
                <el-pagination :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" @size-change='handlePageSizeChange' @current-change='handleCurPageChange' layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
                </el-pagination>
            </div>
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
import {
    contentStore,
    hotelStore
} from '../stores';
import moment from 'moment';
export default {
    data() {
            return {
                defaultSearch: '商户名称/ID',
                titleList: ["内容管理", "本地生活圈", "商户审核", "已通过商户"],
                statusList: [{
                    text: '待审核',
                    value: '0'
                }, {
                    text: '已通过',
                    value: '1'
                }, {
                    text: '驳回',
                    value: '2'
                }, {
                    text: '未发布',
                    value: '3'
                }, {
                    text: '待上线',
                    value: '4'
                }, {
                    text: '已上线',
                    value: '5'
                }, {
                    text: '已下线',
                    value: '6'
                }, ],
                categoryList: [],
                provinceList: [],
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },
                datas: [],
                columnsChecked: {
                    id: true,
                    name: true,
                    region: true,
                    class: true,
                    type: true,
                    operator: true,
                    auditTime: true,
                    opt: true
                },
                loading: false,
                search: '',
                status: -1,
                province: [],
                chargetype: -1,
                category: [],
                sort: '',
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
            renderStatus(status) { // 0: 待审核 1：已通过 2：驳回 3: 末发布 4：待上线 5：已上线 6：已下线 
                switch (status) {
                    case 0:
                        return "待审核";
                        break;
                    case 1:
                        return "已通过";
                        break;
                    case 2:
                        return "驳回";
                        break;
                    case 3:
                        return "末发布";
                        break;
                    case 4:
                        return "待上线";
                        break;
                    case 5:
                        return "已上线";
                        break;
                    case 6:
                        return "已下线";
                        break;
                }

            },
            filterChargeType(value, row) {
                return row.chargetype === value;
            },
            getChargeType(data) {
                if (data.merchantDist) {
                    if (data.merchantDist.length != 0) {
                        this.province = data.merchantDist;
                    } else {
                        this.province = [];
                    }
                }
                if (data.category) {
                    if (data.category.length != 0) {
                        this.category = data.category;
                    } else {
                        this.category = [];
                    }
                }
                if (data.chargetype) {
                    if (data.chargetype != "") {
                        this.chargetype = parseInt(data.chargetype[0]);
                    } else {
                        this.chargetype = -1;
                    }
                }

                if (data.status) {
                    if (data.status != "") {
                        this.status = parseInt(data.status[0]);
                    } else {
                        this.status = -1;
                    }
                }

                this.fetch();
            },
            filterProvince(value, row) {
                return row.merchantDist === value;
            },
            filterCategory(value, row) {
                this.category.push(value);
                this.fetch();
                return row.category === value;
            },
            filterStatus(value, row) {
                this.status = parseInt(value);
                this.fetch();
                return row.status === value;
            },
            handleSearch(searchText) {
                this.search = searchText;
                this.fetch();
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
            handlePageSizeChange(val) {
                this.pagination.pageSize = val;
                this.fetch();
            },
            handleCurPageChange(val) {
                this.pagination.currentPage = val;
                this.fetch();
            },
            fetch() {
                const params = {
                    page: this.pagination.currentPage,
                    limit: this.pagination.pageSize,
                    sort: this.sort,
                }

                if (this.status != -1) {
                    params.status = this.status;
                }
                if (this.search && this.search != "") {
                    params.search = this.search;
                }
                if (this.chargetype != -1) {
                    params.chargetype = this.chargetype;
                }
                if (this.province.length != 0) {
                    params.province = this.province;
                }
                if (this.category.length != 0) {
                    params.category = this.category;
                }

                console.log("params 传递的参数>>>>", params);
                this.loading = true;
                contentStore.listPassedMerchantInfo(params).then(res => {
                    this.datas = res.data.docs;
                    this.pagination.total = Number(res.data.total);
                    console.log(this.pagination.total, "数据总条数", Number(res.data.total))
                    this.datas.map(item => {
                        item.merchantName = item.language[0].name;
                        item.merchantDist = item.language[0].address.province.name;
                        item.chargetypeText = item.chargetype === 0 ? '免费' : '付费';
                        if (item.auditHistory.length != 0) {
                            item.operatorName = item.auditHistory[0].operatorName;
                            item.auditTime = moment.unix(item.auditHistory[0].auditTime).format("YYYY-MM-DD HH:mm:ss");
                        }
                    });
                    this.loading = false;
                }).catch(err => {
                    this.$message.error(`列表数据获取失败！${err}`);
                    this.loading = false;
                });
            },
        },
        created: function() {
            Promise.all([
                contentStore.listAllCategory(),
                hotelStore.getAreaList(),
            ]).then(results => {
                this.categoryList = results[0].data.docs.map(item => {
                    return {
                        text: item.name,
                        value: item.id,
                    }
                });

                this.provinceList = results[1].data.province.map(item => {
                    return {
                        text: item.name,
                        value: item.name,
                    }
                });
                this.fetch();
            }).catch(err => {
                this.$message.error(`获取商户分类数据失败！${err}`);
            });



        },
        components: {
            VIcon,
            Btn,
            NavBar,
            SearchInput,
        },

}
</script>
