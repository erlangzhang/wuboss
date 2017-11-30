<style>
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <NavBar :titleList="titleList"></NavBar>
        </div>
        <div class='content-header'>
            <VIcon type='appstore' /> 发布管理
            <div class='breadcrumb-header'></div>
        </div>
        <div class="table-container">
            <span class='table-title'>显示第 {{getStartPage}} 至 {{getLastPage}} 条，共 {{pagination.total}} 条</span>
            <el-dropdown class="select-row-dropdown">
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
                        <el-checkbox v-model="columnsChecked.city">地区</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.class">分类</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.type">类型</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.status">状态</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.sum">酒店数量</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.onTime">上线时间</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.offTime">下线时间</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.opt">操作</el-checkbox>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!--     <el-input class='search-input' placeholder="商户名称/ID" icon="search" v-model="search" size="small" :on-icon-click="handleSearch">
            </el-input> -->
            <SearchInput :defaultSearch="defaultSearch" :handleSearch="handleSearch"></SearchInput>
        </div>
        <el-table :data="datas" border style="width:100%" v-loading="loading" element-loading-text="加载中" @sort-change='handleSortChange' @filter-change="getFilterCondition">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="ID" prop="merchantId" v-if="columnsChecked.id">
            </el-table-column>
            <el-table-column label="商户名称" prop="merchantName" v-if="columnsChecked.name">
            </el-table-column>
            <el-table-column label="地区" prop="provinceText" v-if="columnsChecked.city" :filter-multiple=false :filters="provinceList" :filter-method="filterProvince" filter-placement="top" column-key="provinceText">
            </el-table-column>
            <el-table-column label="分类" prop="category" v-if="columnsChecked.class" :filter-multiple=false :filters="categoryList" :filter-method="filterCategory" filter-placement="bottom-end" column-key="category">
            </el-table-column>
            <el-table-column label="类型" prop="merchantType" v-if="columnsChecked.type" :filter-multiple=false :filters="[{ text: '免费', value: '0' }, { text: '付费', value: '1' }]" :filter-method="filterMerchantType" filter-placement="bottom-end" column-key="merchantType">
                <template scope="scope">
                    <el-tag :type="scope.row.merchantType === 0 ? 'primary' : 'success'" close-transition>{{scope.row.merchantTypeText}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="status" v-if="columnsChecked.status" :filters="statusList" :filter-multiple=false :filter-method="filterStatus" filter-placement="bottom-end" column-key="status">
                <template scope="scope">
                    <el-tag style="margin-top: 5px;">{{renderStatus(scope.row.status)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="酒店数量" prop="sumOfHotels" v-if="columnsChecked.sum">
            </el-table-column>
            <el-table-column label="上线时间" prop="onlineTime" v-if="columnsChecked.onTime" :sortable="true">
            </el-table-column>
            <el-table-column label="下线时间" prop="offlineTime" v-if="columnsChecked.offTime" :sortable="true">
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip v-if="columnsChecked.opt">
                <template scope="scope">
                    <!--<router-link class="retrieve-btn" :to="'/content/publish-management-set?id='+ 
                    scope.row.merchantId">
                    发布设置</router-link>-->
                    <p style="cursor: pointer; color: blue;" @click="publishSet(scope.row)">发布设置
                    </p>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-pagination">
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
import {
    contentStore,
    hotelStore
} from '../stores';
import moment from 'moment';
import '../style/index.less';
export default {
    data() {
            return {
                defaultSearch: '商户名称/ID',
                titleList: ["内容管理", "本地生活圈", "商户发布", "发布管理"],
                datas: [],
                province: '',
                category: '',
                merchantType: -1,
                categoryList: [],
                provinceList: [],
                statusList: [/*{
                    text: '待审核',
                    value: '0'
                }, {
                    text: '已通过',
                    value: '1'
                }, {
                    text: '驳回',
                    value: '2'
                }, */{
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
                search: '',
                sort: '',
                status: -1,
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 10,
                },
                loading: false,
                columnsChecked: {
                    id: true,
                    name: true,
                    city: true,
                    class: true,
                    type: true,
                    status: true,
                    sum: true,
                    onTime: true,
                    offTime: true,
                    opt: true,
                },
            }

        },
        components: {
            VIcon,
            Btn,
            NavBar,
            SearchInput,
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
            renderStatus(status) { // 0: 待审核 1：已通过 2：驳回 3 : 末发布 4： 待上线 5： 已上线 6： 已下线
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

            getFilterCondition(data) {
                if (data.provinceText) {
                    if (data.provinceText.length != 0) {
                        this.province = data.provinceText;
                    } else {
                        this.province = '';
                    }
                }

                if (data.category) {
                    if (data.category.length != 0) {
                        this.category = data.category;
                    } else {
                        this.category = '';
                    }
                }
                if (data.merchantType) {
                    if (data.merchantType.length != 0) {
                        this.merchantType = data.merchantType;
                    } else {
                        this.merchantType = -1;
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
            filterMerchantType(value, row) {
                return row.merchantType === value;
            },
            filterProvince(value, row) {
                return row.provinceText === value;
            },
            filterCategory(value, row) {
                return row.category === value;
            },
            filterStatus(value, row) {
                return row.status === value;
            },

            publishSet(row) {
                if (row.status == 4 || row.status == 5 || row.status == 6) {
                    console.log("releaseId>>>", row.releaseId);
                    this.$router.push("/content/publish-management-set?id=" + row.releaseId + "&status=" + row.status);
                } else {
                    console.log("merchantId>>>", row.merchantId);
                    this.$router.push("/content/publish-management-set?id=" + row.merchantId + "&status=" + row.status);
                }
            },

            handlePageSizeChange(val) {
                this.pagination.pageSize = val;
                this.fetch();
            },
            handleCurPageChange(val) {
                this.pagination.currentPage = val;
                this.fetch();
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
            fetch() {
                const params = {
                    page: this.pagination.currentPage,
                    limit: this.pagination.pageSize,
                    sort: this.sort,
                }
                if (this.search && this.search != "") {
                    params.search = this.search;
                }
                if (this.province && this.province != "") {
                    params.province = this.province;
                }
                if (this.category && this.category != "") {
                    params.category = this.category;
                }
                if (this.merchantType != -1) {
                    params.merchantType = this.merchantType;
                }
                if (this.status != -1) {
                    params.status = this.status;
                }
                this.loading = true;
                contentStore.listReleaseMerchant(params).then(res => {
                    this.datas = res.data.docs;
                    console.log("发布管理列表数据", res.data.docs);
                    this.pagination.total = Number(res.data.total);
                    this.datas.map(item => {
                        if (item.onlineTime) {
                            item.onlineTime = moment.unix(item.onlineTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                        if (item.offlineTime) {
                            item.offlineTime = moment.unix(item.offlineTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                        item.merchantTypeText = item.merchantType === 0 ? '免费' : '付费';
                        item.provinceText = item.province.name;
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
                this.$message.error(`获取商户数据失败！${err}`);
            });
        },
}
</script>
