<style scoped>
.el-table .el-tag {
    margin-right: 5px;
}
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">
                    <VIcon class='breadcrumb-icon' type='home' /> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>酒店管理</el-breadcrumb-item>
                <el-breadcrumb-item>酒店列表</el-breadcrumb-item>
            </el-breadcrumb>
            <div class='breadcrumb-header'></div>
        </div>
        <div class='content-header'>
            <VIcon type='appstore' /> 酒店列表
            <div class='breadcrumb-header'></div>
        </div>
        <div class='operator-bar'>
            <router-link class="create-btn" to='/hotel/edit'>
                <VIcon type='plus' class='iconfont-button' />新建</router-link>
            <a href='javascript:;' class="refresh-btn" @click='getHotelList'>
                <VIcon type='reload' class='iconfont-button' />刷新</a>
            <!--<router-link class="edit-btn" to='/'>
                <VIcon type='edit' class='iconfont-button' />编辑</router-link>-->
            <el-dropdown @command='showCommand'>
                <span class="batch-btn">
                    <VIcon type="check-square-o"/>
                    批量操作 <VIcon type="down"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='禁用'>
                        <VIcon type="pause-circle-o" class='iconfont-button' />禁用</el-dropdown-item>
                    <el-dropdown-item command='启用'>
                        <VIcon type="play-circle-o" class='iconfont-button' />启用</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!--<span class="batch-select-span" v-if="this.selectedHotel.length !== 0">{{ `选择了 ${this.selectedHotel.length} 项`}}</span>-->
            <span class="batch-select-span" v-if="this.selectItems.length !== 0">{{ `选择了 ${this.selectItems.length} 项`}}</span>
            <!--<a href="javascript:;" @click="dialogVisible = true" class="delete-btn">
                <VIcon type="delete" class='iconfont-button' />禁用
            </a>-->
            <el-dialog v-model="dialogVisible" size="tiny">
                <span><VIcon type="question-circle" class="delete-btn-dialog-icon"/>确定要批量{{ action }}吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleCommand()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class='table-container'>
            <span class='table-title'>显示第 {{(pagination.currentPage - 1) * pagination.pageSize+1 || 1 }} 至 {{getLastPage}} 条，共 {{hotels.length}} 条</span>
            <el-dropdown class="select-row-dropdown" :hide-on-click="false">
                <el-button class="select-row">
                    选择列
                    <VIcon type="down" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for='item in columns'>
                        <el-checkbox v-model="item.defaultShow">{{ item.label }}</el-checkbox>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!--<el-input class='search-input' placeholder="搜索" icon="search" v-model="search" size="small" :on-icon-click="handleSearch">
            </el-input>-->
            <SearchInput :defaultSearch="defaultSearch" :handleSearch="handleSearch"></SearchInput>
            <el-table :data="hotels" border style="width: 100%" v-loading="loadingTable" @sort-change='handleSortChange' @selection-change='handleSelectionChange'>
                <el-table-column type="selection" width="50">
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.isSelected" @change="onChecked(scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <template v-for='item in columns' v-if='item.defaultShow'>
                    <el-table-column :prop="item.name" :label='item.label' :sortable='item.sortable' v-if='item.name === "tags"'>
                        <template scope='scope'>
                            <el-tag type='gray' v-for='tag in scope.row.tags'>{{ tag }}</el-tag>
                        </template>
                    </el-table-column> 


                    <el-table-column :prop="item.epgVersion" :label='item.label' :sortable='item.sortable' v-if='item.name === "epgVersion"'>
                        <template scope='scope'>
                            <el-tag type='success' v-for='version in scope.row.epgVersion'>{{ version }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column :prop="item.name" :label='item.label' :sortable='item.sortable' v-else></el-table-column>
                </template>
                <el-table-column prop='status' label='状态' sortable>
                    <template scope='scope'>
                        <el-tag :type='!!scope.row.status ? "success" : "danger"'>{{ !!scope.row.status ? "正常" : "禁用" }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" show-overflow-tooltip>
                    <template scope="scope">
                        <router-link class="edit-btn" :to="'/hotel/edit?id=' + scope.row.id">
                            <VIcon type='edit' class='iconfont-button' />编辑</router-link>
                        <a href="javascript:;" @click="handleStatusChange((+scope.row.status + 1) % 2, [scope.row.id])" :class="scope.row.status === 0 ? 'status-btn-actived' : 'status-btn-unactived'">
                            <VIcon :type="scope.row.status === 0 ? 'unlock' : 'lock'" class="iconfont-button" />{{scope.row.status === 0 ? '启用' : '禁用' }}
                        </a>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-pagination">
                <el-pagination :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" @current-change='handleCurPageChange' @size-change='handlePageSizeChange'>
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import {
    VIcon,
    Btn,
    SearchInput,
} from '../components';
import {
    hotelStore
} from '../stores';
import {
    Loading
} from 'element-ui';
import '../style/index.less';
import lodash from 'lodash';
export default {
    data() {
            return {
                defaultSearch: "酒店名称/Host ID",
                search: '',
                sort: '',
                tempCurPageItemSelected:[],
                hotels: [],
                selectedHotel: [],
                selectItems: [],
                action: '',
                loadingTable: false,
                dialogVisible: false,
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },
                columns: [{
                    name: 'id',
                    defaultShow: true,
                    label: 'ID',
                    sortable: false,
                }, {
                    name: 'hostId',
                    defaultShow: true,
                    label: 'Host ID',
                    sortable: true,
                }, {
                    name: 'city',
                    defaultShow: true,
                    label: '城市',
                    sortable: true,
                }, {
                    name: 'agency',
                    defaultShow: true,
                    label: '所属办事处',
                    sortable: true,
                }, {
                    name: 'name',
                    defaultShow: true,
                    label: '酒店名称',
                    sortable: false,
                }, {
                    name: 'ctripStars',
                    defaultShow: true,
                    label: '携程星级',
                    sortable: true,
                }, {
                    name: 'stars',
                    defaultShow: true,
                    label: '酒店级别',
                    sortable: true,
                }, {
                    name: 'createdAt',
                    defaultShow: true,
                    label: '创建时间',
                    sortable: true,
                }, {
                    name: 'updatedAt',
                    defaultShow: true,
                    label: '更新时间',
                    sortable: true,
                }, {
                    name: 'roomsCount',
                    defaultShow: true,
                    label: '房间数量',
                    sortable: true,
                }, {
                    name: 'pmsManufacturer',
                    defaultShow: true,
                    label: 'PMS厂商',
                    sortable: true,
                }, {
                    name: 'sales',
                    defaultShow: true,
                    label: '销售员',
                    sortable: true,
                }, {
                    name: 'projectNum',
                    defaultShow: true,
                    label: '立项号',
                    sortable: false,
                }, {
                    name: 'epgVersion',
                    defaultShow: true,
                    label: 'EPG版本',
                    sortable: true,
                }, {
                    name: 'tags',
                    defaultShow: true,
                    label: '标签',
                    sortable: true,
                }, ],
            };
        },
        computed: {
            selectedHotelIds() {
                return this.selectItems.map((hotel) => {
                    return hotel.id;
                })
            },

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

            },
        },
        components: {
            VIcon,
            Btn,
            SearchInput,
        },
        created: function() {
            this.getHotelList();
        },
        methods: {
            getHotelList() {
                const params = {
                    page: this.pagination.currentPage,
                    limit: this.pagination.pageSize,
                    sort: this.sort,
                    search: this.search,
                }
                this.loadingTable = true;
                hotelStore.getHotelList(params).then(res => {
                    this.loadingTable = false;
                    if (res.code === 0) {
                        this.hotels = res.data.docs.map((hotel) => {
                            hotel.address = `${hotel.province}${hotel.city}${hotel.county}${hotel.detailAddress}`;
                            return hotel;
                        });
                        this.pagination.total = res.data.total;
                        for (const item of this.hotels) {
                            this.$set(item, 'isSelected', false);
                            /*for (const it of this.selectedHotel) {*/
                            for (const it of this.selectItems) {
                                if (it.id === item.id) {
                                    this.$set(it, 'name', item.name);
                                    this.$set(item, 'isSelected', it.isSelected);
                                    break;
                                }
                            }
                        }
                    } else {
                        this.$message.error(`获取酒店数据失败：${err}`);
                    }
                }).catch(err => {
                    this.loadingTable = false;
                    console.error('err: ', err);
                    this.$message.error(`获取酒店数据失败：${err}`);
                })
            },

            onChecked(row) {
                row.isSelected = !!row.isSelected;
                let isSet = false;
                for (const item of this.selectItems) {
                    if (item.id === row.id) {
                        item.isSelected = !!row.isSelected;
                        isSet = true;
                        break;
                    }
                }
                if (!isSet) {
                    this.selectItems.push({
                        id: row.id,
                        isSelected: row.isSelected,
                        name: row.name,
                    });
                }
                lodash.remove(this.selectItems, item => {
                    return item.isSelected === false;
                });
                this.resetChecked();
            },

            handleSelectionChange(selection) {

                for (const item of this.hotels) {
                    item.isSelected = selection.length !== 0;
                    let isSet = false;
                    for (const item1 of this.selectItems) {
                        if (item1.id === item.id) {
                            item1.isSelected = selection.length !== 0;
                            isSet = true;
                            break;
                        }
                    }
                    if (!isSet) {
                        this.selectItems.push({
                            id: item.id,
                            name: item.name,
                            isSelected: selection.length !== 0,
                        });
                    }
                }
                lodash.remove(this.selection, item => {
                    return item.isSelected === false;
                });
                this.resetChecked();
                this.tempCurPageItemSelected = selection;
                // this.selectItems = selection;
            },
            resetChecked() {
                const array = new Array();
                for (const item of this.selectItems) {
                    if (item.isSelected !== false) {
                        array.push(item);
                    }
                }
                this.selectItems = null;
                this.selectItems = array;
            },

            handleCurPageChange(page) {
                this.pagination.currentPage = page;
                this.getHotelList();
            },
            handlePageSizeChange(pageSize) {
                this.pagination.pageSize = pageSize;
                this.getHotelList();
            },
            handleSearch(searchText) {
                this.search = searchText;
                this.getHotelList();
            },
            handleSortChange(param) {
                if (!!param.prop) {
                    const order = param.order === 'ascending' ? '' : '-';
                    this.sort = order + param.prop;
                } else {
                    this.sort = '';
                }
                this.getHotelList();
            },
            /*handleSelectionChange(hotels) {
                this.selectedHotel = hotels;
            },*/
            showCommand(command) {
                this.action = command;
                this.dialogVisible = true;
            },
            handleCommand() {
                this.dialogVisible = false;
                if (this.selectedHotelIds.length === 0) {
                    this.$message.error('请先选择酒店!');
                    return;
                }
                switch (this.action) {
                    case '启用':
                        {
                            this.handleStatusChange(1, this.selectedHotelIds);
                            break;
                        }
                    case '禁用':
                        {
                            this.handleStatusChange(0, this.selectedHotelIds);
                            break;
                        }
                    default:
                        break;
                }
            },
            handleStatusChange(status, ids) {
                this.loadingTable = true;
                hotelStore.changeHotelStatus({
                    id: ids,
                    status: status,
                }).then(res => {
                    this.loadingTable = false;
                    if (res.code === 0) {
                        this.selectItems = [];
                        this.getHotelList();
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch(err => {
                    this.loadingTable = false;
                    console.error('err: ', err);
                })
            },
            handleEdit(idx, row) {
                this.$router.push({
                    path: '/hotel/edit',
                    query: {
                        id: row.id
                    }
                });
            },
        },
}
</script>
