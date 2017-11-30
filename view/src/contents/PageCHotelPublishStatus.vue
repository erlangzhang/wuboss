<style>
.el-table-filter {
    max-height: 200px;
    overflow: scroll;
}
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <NavBar :titleList="titleList"></NavBar>
        </div>
        <div class='content-header'>
            <VIcon type='appstore' /> 酒店发布情况
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
                        <el-checkbox v-model="columnsChecked.name">酒店名称</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.city">地区</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.grade">等级</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.address">酒店地址</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.sum">上线商家</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.opt">操作</el-checkbox>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!--  <el-input class='search-input' placeholder="酒店名称/ID" icon="search" v-model="search" size="small" :on-icon-click="handleSearch">
            </el-input> -->
            <SearchInput :defaultSearch="defaultSearch" :handleSearch="handleSearch"></SearchInput>
        </div>
        <el-table :data="datas" v-loading="loading" element-loading-text="加载中" border style="width: 100%" @sort-change='handleSortChange' @filter-change="getChargeFilter">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="ID" prop="hostId" v-if="columnsChecked.id" width="250">
            </el-table-column>
            <el-table-column label="酒店名称" prop="hotelName" v-if="columnsChecked.name" :sortable="true" width="180">
            </el-table-column>
            <el-table-column prop="city" label="地区" v-if="columnsChecked.city" width="100" :filters="cityList" :filter-method="filterCity" :filter-multiple='false' filter-placement="top" column-key="city">
            </el-table-column>
            <el-table-column prop="grade" label="等级" v-if="columnsChecked.grade" width="150" :filters="gradeList" :filter-method="filterGrade" :filter-multiple='false' filter-placement="top" column-key="grade">
            </el-table-column>
            <el-table-column prop="address" label="酒店地址" v-if="columnsChecked.address" width="180">
            </el-table-column>
            <el-table-column prop="sumOfMerchants" label="上线商家" v-if="columnsChecked.sum" width="180">
            </el-table-column>
            <el-table-column label="操作" v-if="columnsChecked.opt" show-overflow-tooltip>
                <template scope="scope">
                    <router-link class="retrieve-btn" :to="'/content/hotelpublish-detail?id='+scope.row.hostId">
                        <VIcon type='info-circle-o' class='iconfont-button' />查看详细</router-link>
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
export default {
    data() {
            return {
                defaultSearch: "酒店名称/ID",
                titleList: ["内容管理", "本地生活圈", "发布情况", "酒店发布情况"],
                cityList: [],
                gradeList: [],
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },
                datas: [],
                columnsChecked: {
                    id: true,
                    name: true,
                    city: true,
                    grade: true,
                    address: true,
                    sum: true,
                    opt: true
                },
                search: '',
                region: -1,
                grade: '',
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
            filterCity(value, row) {
                return row.city === value;
            },
            filterGrade(value, row) {
                return row.grade === value;
            },
            getChargeFilter(data) {
                if (data.grade) {
                    if (data.grade.length != 0) {
                        this.grade = data.grade[0];
                    } else {
                        this.grade = '';
                    }
                }
                if (data.city) {
                    if (data.city.length != 0) {
                        this.region = data.city[0];
                    } else {
                        this.region = -1;
                    }
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
                console.log("请求列表");
                const params = {
                    page: this.pagination.currentPage,
                    limit: this.pagination.pageSize,
                    sort: this.sort,
                }
                if (this.search && this.search != "") {
                    params.search = this.search;
                }
                if (this.region != -1) {
                    params.region = this.region;
                }
                if (this.grade && this.grade != "") {
                    params.grade = this.grade;
                }
                console.log("请求的参数", params);
                this.loading = true;
                contentStore.listHotelReleaseMerchant(params).then(res => {
                    this.datas = res.data.docs;
                    console.log(res.data, "+____");
                    this.pagination.total = Number(res.data.total);
                    this.loading = false;
                }).catch(err => {
                    this.$message.error(`列表数据获取失败！${err}`);
                    this.loading = false;
                });
            },
        },
        created: function() {
            Promise.all([
                hotelStore.getAreaList(),
                hotelStore.getGradList(),
            ]).then(results => {
                this.cityList = results[0].data.city.map(item => {
                    return {
                        text: item.name,
                        value: item.id,
                    }
                });
                this.gradeList = results[1].data.hotelGrades.map(item => {
                    return {
                        text: item,
                        value: item,
                    }
                });
                this.fetch();
            }).catch(err => {
                this.$message.error(`获取列表失败！${err}`);
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
