<style>
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">
                    <VIcon class='breadcrumb-icon' type='home' /> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>酒店管理</el-breadcrumb-item>
                <el-breadcrumb-item>酒店分组</el-breadcrumb-item>
            </el-breadcrumb>
            <div class='breadcrumb-header'></div>
        </div>
        <div class='content-header'>
            <VIcon type='appstore' /> 酒店分组
            <div class='breadcrumb-header'></div>
        </div>
        <div class='operator-bar'>
            <router-link class="create-btn" to='category/edit'>
                <VIcon type='plus' class='iconfont-button' />新增</router-link>
            <a href="javascript:;" class="refresh-btn" @click='getCategoryList'>
                <VIcon type='reload' class='iconfont-button' />刷新</a>
            <el-dropdown @command='showCommand'>
                <span class="batch-btn">
              <VIcon type="check-square-o"/> 批量操作 <VIcon type="down"/>
          </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='禁用'>
                        <VIcon type="pause-circle-o" class='iconfont-button' />禁用</el-dropdown-item>
                    <el-dropdown-item command='启用'>
                        <VIcon type="play-circle-o" class='iconfont-button' />启用</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span class="batch-select-span" v-if="this.selectedCategory.length !== 0">{{ `选择了 ${this.selectedCategory.length} 项`}}</span>
            <el-dialog v-model="dialogVisible" size="tiny">
                <span><VIcon type="question-circle" class="delete-btn-dialog-icon"/>确定要批量{{ action }}吗？</span>
                <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleCommand()">确 定</el-button>
          </span>
            </el-dialog>
        </div>
        <div class='table-container'>
            <span class='table-title'>显示第 {{(pagination.currentPage - 1) * pagination.pageSize +1|| 1 }} 至 {{getLastPage}} 条，共 {{category.length}} 条</span>
            <!--<el-input class='search-input' placeholder="搜索" icon="search" v-model="search" size="small" :on-icon-click="handleSearch">
            </el-input>-->
            <SearchInput :defaultSearch="defaultSearch" :handleSearch="handleSearch"></SearchInput>
            <el-table :data="category" border style="width: 100%" v-loading="loadingTable" @sort-change='handleSortChange' @selection-change='handleSelectionChange'>
                <el-table-column type="selection" width="50">
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.isSelected" @change="onChecked(scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label='分组名称' sortable></el-table-column>
                <el-table-column prop="hotelIds" label='酒店列表' :formatter='categoryFormat'></el-table-column>
                <el-table-column prop="createdAt" label='创建时间' sortable>
                    <template scope="scope">
                        <label> {{ renderTime(scope.row.createdAt) }}</label>
                    </template>
                </el-table-column>
                <el-table-column prop="updatedAt" label='更新时间' sortable>
                    <template scope="scope">
                        <label> {{ renderTime(scope.row.updatedAt) }}</label>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label='状态' sortable>
                    <template scope='scope'>
                        <el-tag :type='!!scope.row.status ? "success" : "danger"'>{{ !!scope.row.status ? "正常" : "禁用" }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="260" show-overflow-tooltip>
                    <template scope="scope">
                        <router-link class="edit-btn" :to="'/category/edit?id=' + scope.row.id">
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
import moment from 'moment';
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
                defaultSearch: "分组名称",
                search: '',
                sort: '',
                category: [],
                selectedCategory: [],
                action: '',
                loadingTable: false,
                dialogVisible: false,
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },
            };
        },
        computed: {
            selectedCategoryIds() {
                return this.selectedCategory.map((category) => {
                    return category.id;
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
            }
        },
        components: {
            VIcon,
            Btn,
            SearchInput,
        },
        created: function() {
            this.getCategoryList();
        },
        methods: {
            renderTime(unix) {
                return moment(unix * 1000).format('YYYY-MM-DD HH:mm:ss');
            },
            getCategoryList() {
                const params = {
                    page: this.pagination.currentPage,
                    limit: this.pagination.pageSize,
                    sort: this.sort,
                    search: this.search,
                }
                this.loadingTable = true;
                hotelStore.getCategoryList(params).then(res => {
                    this.loadingTable = false;
                    if (res.code === 0) {
                        this.category = res.data.docs;
                        this.pagination.total = res.data.total;

                        for (const item of this.category) {
                            this.$set(item, 'isSelected', false);
                            /*for (const it of this.selectedHotel) {*/
                            for (const it of this.selectedCategory) {
                                if (it.id === item.id) {
                                    this.$set(item, 'isSelected', it.isSelected);
                                    break;
                                }
                            }
                        }
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch(err => {
                    this.loadingTable = false;
                    // console.error('err: ', err);
                    this.$message.error(`获取酒店分组数据失败：${err}`);
                })
            },

            onChecked(row) {
                row.isSelected = !!row.isSelected;
                let isSet = false;
                for (const item of this.selectedCategory) {
                    if (item.id === row.id) {
                        item.isSelected = !!row.isSelected;
                        isSet = true;
                        break;
                    }
                }
                if (!isSet) {
                    this.selectedCategory.push({
                        id:row.id,
                        name: row.name,
                        isSelected: row.isSelected,
                    });
                }
                lodash.remove(this.selectedCategory, item => {
                    return item.isSelected === false;
                });
                this.resetChecked();
            },

            handleSelectionChange(selection) {
                for (const item of this.category) {
                    item.isSelected = selection.length !== 0;
                    let isSet = false;
                    for (const item1 of this.selectedCategory) {
                        if (item1.id === item.id) {
                            item1.isSelected = selection.length !== 0;
                            isSet = true;
                            break;
                        }
                    }
                    if (!isSet) {
                        this.selectedCategory.push({
                            id:item.id,
                            name: item.name,
                            isSelected: selection.length !== 0,
                        });
                    }
                }

                console.log("全选取出来的selectitem", this.selectItems);

                lodash.remove(this.selection, item => {
                    return item.isSelected === false;
                });
                this.resetChecked();
                // this.selectItems = selection;
            },
            resetChecked() {
                const array = new Array();
                for (const item of this.selectedCategory) {
                    if (item.isSelected !== false) {
                        array.push(item);
                    }
                }
                this.selectedCategory = null;
                this.selectedCategory = array;

            },

            categoryFormat(row, column) {
                return row.hotelIds.join('、');
            },
            handleCurPageChange(page) {
                this.pagination.currentPage = page;
                this.getCategoryList();
            },
            handlePageSizeChange(pageSize) {
                this.pagination.pageSize = pageSize;
                this.getCategoryList();
            },
            handleSearch(searchText) {
                this.search = searchText;
                this.getCategoryList();
            },
            handleSortChange(param) {
                if (!!param.prop) {
                    const order = param.order === 'ascending' ? '' : '-';
                    this.sort = order + param.prop;
                } else {
                    this.sort = '';
                }
                this.getCategoryList();
            },
            /*handleSelectionChange(category) {
                this.selectedCategory = category;
            },*/
            showCommand(command) {
                this.action = command;
                this.dialogVisible = true;
            },
            handleCommand() {
                this.dialogVisible = false;
                if (this.selectedCategoryIds.length === 0) {
                    this.$message.error('请先选择分组!');
                    return;
                }
                switch (this.action) {
                    case '启用':
                        {
                            this.handleStatusChange(1, this.selectedCategoryIds);
                            break;
                        }
                    case '禁用':
                        {
                            this.handleStatusChange(0, this.selectedCategoryIds);
                            break;
                        }
                    default:
                        break;
                }
            },
            handleStatusChange(status, ids) {
                this.loadingTable = true;
                hotelStore.changeCategoryStatus({
                    id: ids,
                    status: status,
                }).then(res => {
                    this.loadingTable = false;
                    if (res.code === 0) {
                        this.selectedCategory= [];
                        this.getCategoryList();
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
                    path: '/category/edit',
                    query: {
                        id: row.id
                    }
                });
            },
        },
}
</script>
