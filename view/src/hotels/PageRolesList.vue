<style>
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">
                    <VIcon class='breadcrumb-icon' type='home' /> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div class='breadcrumb-header'></div>
        </div>
        <div class='content-header'>
            <VIcon type='appstore' /> 角色列表
            <div class='breadcrumb-header'></div>
        </div>
        <div class='operator-bar'>
            <router-link class="create-btn" to='roles/edit'>
                <VIcon type='plus' class='iconfont-button' />新建角色</router-link>
            <a href="javascript:;" @click="handleRefresh" class="refresh-btn">
                <VIcon type='reload' class='iconfont-button' />刷新</a>
            <el-dropdown @command="handleCommand">
                <span class="batch-btn">
        <VIcon type="check-square-o"/>
        批量操作 <VIcon type="down"/>
      </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="delete">
                        <VIcon type="delete" class='batch-iconfont-button' />删除</el-dropdown-item>
                    <el-dropdown-item command="lock">
                        <VIcon type="lock" class='batch-iconfont-button' />锁定</el-dropdown-item>
                    <el-dropdown-item command="unlock">
                        <VIcon type="unlock" class='batch-iconfont-button' />解锁</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span class="batch-select-span" v-if="this.selectItems.length !== 0">{{ `选择了 ${this.selectItems.length} 项`}}</span>
        </div>
        <div class='table-container'>
            <span class='table-title'>显示第 {{(pagination.currentPage - 1) * pagination.pageSize +1|| 1 }} 至 {{getLastPage}} 条，共 {{pagination.total}} 条</span>
            <el-dropdown class="select-row-dropdown" :hide-on-click="false">
                <el-button class="select-row">
                    选择列
                    <VIcon type="down" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.name">角色名称</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.permissions">权限</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.status">状态</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.createdAt">创建时间</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.updatedAt">更新时间</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.opt">操作</el-checkbox>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!--<el-input class='search-input' placeholder="角色名称" icon="search" v-model="search" size="small" :on-icon-click="handleSearch">
            </el-input>-->
            <SearchInput :defaultSearch="defaultSearch" :handleSearch="handleSearch"></SearchInput>
            <el-table :data="roles" v-loading="loading" element-loading-text="加载中" border style="width: 100%" @selection-change="handleSelectionChange" @sort-change='handleSortChange'>
                <el-table-column type="selection" width="55">
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.isSelected" @change="onChecked(scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column v-if="columnsChecked.name" label="角色名称" prop="name" width="120">
                </el-table-column>
                <el-table-column prop="permissions" label="权限" v-if="columnsChecked.permissions">
                    <template scope="scope">
                        <label> {{ renderPermissisons(scope.row.permissions) }}</label>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" v-if="columnsChecked.status" width="120">
                    <template scope="scope">
                        <el-tag :type="scope.row.status === 0 ? 'danger' : 'success'" close-transition>
                            <VIcon :type="scope.row.status ? 'check-circle-o' : 'close-circle-o'" size='12' /> {{scope.row.status ? '有效' : '无效'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="创建时间" sortable v-if="columnsChecked.createdAt" width="180">
                    <template scope="scope">
                        <label> {{ renderTime(scope.row.createdAt) }}</label>
                    </template>
                </el-table-column>
                <el-table-column prop="updatedAt" label="更新时间" sortable v-if="columnsChecked.updatedAt" width="180">
                    <template scope="scope">
                        <label> {{ renderTime(scope.row.updatedAt) }}</label>
                    </template>
                </el-table-column>
                <el-table-column label="操作" v-if="columnsChecked.opt" show-overflow-tooltip>
                    <template scope="scope">
                        <router-link class="edit-btn" :to="'/roles/edit?id=' + scope.row.id">
                            <VIcon type='edit' class='iconfont-button' />编辑</router-link>
                        <a href="javascript:;" @click="updateStatus(scope.row)" :class="scope.row.status === 0 ? 'status-btn-actived' : 'status-btn-unactived'">
                            <VIcon :type="scope.row.status === 0 ? 'unlock' : 'lock'" class="iconfont-button" />{{scope.row.status === 0 ? '解锁' : '锁定' }}
                        </a>
                        <a href="javascript:;" @click="handleDel(scope.row)" class="delete-btn">
                            <VIcon type="delete" class='iconfont-button' />删除
                        </a>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-pagination">
                <el-pagination :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
                </el-pagination>
            </div>
            <el-dialog v-model="dialogVisible" size="tiny">
                <span><VIcon type="question-circle" class="delete-btn-dialog-icon"/>确定删除吗？</span>
                <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelOk">确 定</el-button>
      </span>
            </el-dialog>
            <el-dialog v-model="batchDialogVisible" size="tiny">
                <span><VIcon type="question-circle" class="delete-btn-dialog-icon"/>确定要批量删除吗？</span>
                <span slot="footer" class="dialog-footer">
      <el-button @click="batchDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleBatchDelOk">确 定</el-button>
    </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import lodash from 'lodash';
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
                defaultSearch: "搜索",
                search: '',
                roles: [],
                dialogVisible: false,
                batchDialogVisible: false,
                selectRow: {},
                selectItems: [],
                columnsChecked: {
                    name: true,
                    permissions: true,
                    opt: true,
                    status: true,
                    createdAt: false,
                    updatedAt: false,
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
        created: function() {
            this.fetch();
        },
        methods: {
            handleSortChange(param) {
                const tmp = {
                    limit: this.pagination.pageSize,
                    page: this.pagination.currentPage
                };
                if (!!param.prop) {
                    const order = param.order === 'ascending' ? '' : '-';
                    tmp.sort = order + param.prop;
                }
                this.fetch(tmp);
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
                for (const item of this.roles) {
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

                console.log("全选取出来的selectitem", this.selectItems);

                lodash.remove(this.selection, item => {
                    return item.isSelected === false;
                });
                this.resetChecked();
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
                console.log(" this.selectItems去掉false以后的数组>>>", this.selectItems);
            },
            renderTime(unix) {
                return moment(unix * 1000).format('YYYY-MM-DD HH:mm:ss');
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
                userStore.listRoles(params).then(ret => {
                    this.roles = ret.data.docs;
                    this.pagination.total = Number(ret.data.total);
                    this.loading = false;
                    for (const item of this.roles) {
                        this.$set(item, "isSelected", false);
                        for (const itemS of this.selectItems) {
                            if (item.id === itemS.id) {
                                this.$set(item, 'isSelected', itemS.isSelected);
                                break;
                            }
                        }
                    }
                }).catch(err => {
                    this.$message.error(`获取角色数据失败！${err}`);
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
            renderArray(arry) {
                return arry.toString();
            },
            renderPermissisons(array) {
                return this.renderArray(array.map(item => {
                    return item.name;
                }));
            },
            updateStatus(row) {
                const status = row.status === 0 ? 1 : 0;
                userStore.updateRoleStatus([row.id], status).then(ret => {
                    for (const item of this.roles) {
                        if (item.id !== row.id) {
                            continue;
                        }
                        item.status = item.status === 0 ? 1 : 0;
                        break;
                    }
                }).catch(err => {
                    this.$message.error(`更新状态失败！${err}`);
                });
            },
            handleDel(row) {
                this.dialogVisible = true;
                this.selectRow = row;
            },
            handleDelOk() {
                userStore.batchDeleteRole([this.selectRow.id]).then(ret => {
                    this.dialogVisible = false;
                    const params = {
                        page: 1,
                        limit: this.pagination.pageSize
                    };
                    if (this.search) {
                        params.search = this.search;
                    }
                    this.fetch(params);
                }).catch(err => {
                    this.$message.error(`删除失败！${err}`);
                });
            },
            handleCommand(command) {
                if (this.selectItems.length === 0) {
                    this.$message({
                        message: '请先选择操作的项！',
                        type: 'warning'
                    });
                    return;
                }
                switch (command) {
                    case 'delete':
                        {
                            this.batchDialogVisible = true;
                            break;
                        }
                    case 'lock':
                    case 'unlock':
                        {
                            const status = command === 'lock' ? 0 : 1;
                            let array = this.selectItems.map(item => {
                                if (item.status === status) {
                                    return null;
                                }
                                return item.id;
                            });
                            array = lodash.compact(array);
                            userStore.updateRoleStatus(array, status).then(ret => {
                                const params = {
                                    page: 1,
                                    limit: this.pagination.pageSize
                                };
                                if (this.search) {
                                    params.search = this.search;
                                }
                                this.fetch(params);
                            }).catch(err => {
                                this.$message.error(`批量操作失败！${err}`);
                            });
                            break;
                        }
                }
            },
            handleBatchDelOk() {
                const idArray = this.selectItems.map(item => {
                    return item.id;
                })
                userStore.batchDeleteRole(idArray).then(ret => {
                    this.batchDialogVisible = false;
                    const params = {
                        page: 1,
                        limit: this.pagination.pageSize
                    };
                    if (this.search) {
                        params.search = this.search;
                    }
                    this.fetch(params);
                }).catch(err => {
                    this.$message.error(`批量删除失败！${err}`);
                });
            },
            handleRefresh() {
                this.fetch();
            },
        }
}
</script>
