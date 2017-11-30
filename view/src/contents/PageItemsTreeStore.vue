<style>
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>
                    <!-- :to="{ path: '/' }" -->
                    <span @click='focusIndex()'>
                    <VIcon class='breadcrumb-icon' type='home' /> 首页</span></el-breadcrumb-item>
                <el-breadcrumb-item>素材管理</el-breadcrumb-item>
                <el-breadcrumb-item>栏目树库</el-breadcrumb-item>
            </el-breadcrumb>
            <div class='breadcrumb-header'></div>
        </div>
        <div class='content-header'>
            <VIcon type='appstore' /> 栏目树列表
            <div class='breadcrumb-header'></div>
        </div>
        <div class='operator-bar'>
            <router-link class="create-btn" to='/content/new-item-tree'>
                <VIcon type='plus' class='iconfont-button' />新增</router-link>
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
                        <el-checkbox v-model="columnsChecked.id">id</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.name">项目名称</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.description">项目描述</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.createdAt">创建时间</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.updatedAt">更新时间</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.userName">创建人</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.opt">操作</el-checkbox>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!--<el-input class='search-input' placeholder="项目名称" icon="search" v-model="search" size="small" :on-icon-click="handleSearch">
            </el-input>-->
            <SearchInput :defaultSearch="defaultSearch" :handleSearch="handleSearch"></SearchInput>
            <el-table :data="datas" v-loading="loading" element-loading-text="加载中" border style="width: 100%" @sort-change='handleSortChange' @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.isSelected" @change="onChecked(scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column prop="columnTreeId" label="id" v-if="columnsChecked.id">
                </el-table-column>
                <el-table-column v-if="columnsChecked.name" label="项目名称" prop="name">
                </el-table-column>
                <el-table-column prop="description" label="描述" v-if="columnsChecked.description">
                </el-table-column>
                <el-table-column prop="createdAt" sortable label="创建时间" v-if="columnsChecked.createdAt" width="180">
                    <template scope="scope">
                        <label> {{ renderTime(scope.row.createdAt) }}</label>
                    </template>
                </el-table-column>
                <el-table-column prop="updatedAt" sortable label="更新时间" v-if="columnsChecked.updatedAt" width="180">
                    <template scope="scope">
                        <label> {{ renderTime(scope.row.updatedAt) }}</label>
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="创建人" v-if="columnsChecked.userName">
                </el-table-column>
                <el-table-column label="操作" v-if="columnsChecked.opt" width="260" show-overflow-tooltip>
                    <template scope="scope">
                        <!--     <router-link class="edit-btn" :to="'/content/new-item-tree?id=' + scope.row.columnTreeId">
                            <VIcon type='edit' class='iconfont-button' />编辑</router-link> -->
                        <a href="javascript:;" @click="handleDel(scope.row)" class="delete-btn">
                            <VIcon type="delete" class='iconfont-button' />删除
                        </a>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-pagination">
                <el-pagination :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="pagination.total">
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
import moment from 'moment';
import lodash from 'lodash';
import {
    VIcon,
    Btn,
    SearchInput,
} from '../components';
import {
    contentStore
} from '../stores';
import '../style/index.less';
import {
    mapActions
} from 'vuex';
export default {
    data() {
            return {
                defaultSearch: "项目名称",
                search: '',
                sort: '',
                datas: [],
                dialogVisible: false,
                batchDialogVisible: false,
                selectRow: {},
                selectItems: [],
                columnsChecked: {
                    id: false,
                    description: true,
                    name: true,
                    createdAt: true,
                    opt: true,
                    updatedAt: true,
                    userName: true,
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
            ...mapActions({
                setMenuIndex: 'hotel/SET_CUR_EDIT_ID',
            }),
            focusIndex() {
                this.$router.push('/');
                this.setMenuIndex({
                    curEditId: '1'
                });
            },
            handleSortChange(param) {
                if (!!param.prop) {
                    const order = param.order === 'ascending' ? '' : '-';
                    this.sort = order + param.prop;
                }
                this.fetch();
            },
            fetch() {
                const params = {
                    page: this.pagination.currentPage,
                    limit: this.pagination.pageSize,
                    sort: this.sort,
                    search: this.search,
                }
                this.loading = true;
                contentStore.listItemTree(params).then(ret => {
                    this.datas = ret.data.docs;
                    this.pagination.total = Number(ret.data.total);
                    this.loading = false;
                    for (const item of this.datas) {
                        this.$set(item, "isSelected", false);
                        for (const itemS of this.selectItems) {
                            if (item.columnTreeId === itemS.columnTreeId) {
                                this.$set(item, 'isSelected', itemS.isSelected);
                                break;
                            }
                        }
                    }
                }).catch(err => {
                    this.$message.error(`列表账号数据失败！${err}`);
                    this.loading = false;
                });
            },
            handleSearch(searchText) {
                this.search = searchText;
                this.fetch();
            },
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                this.fetch();
            },
            handleCurrentChange(val) {
                this.pagination.currentPage = val;
                this.fetch();
            },
            renderTime(unix) {
                return moment(unix * 1000).format('YYYY-MM-DD HH:mm:ss');
            },


            handleDel(row) {
                this.dialogVisible = true;
                this.selectRow = row;
            },
            handleDelOk() {
                contentStore.batchDeleteColumnTree([this.selectRow.columnTreeId]).then(ret => {
                    this.dialogVisible = false;
                    this.pagination.currentPage = 1;
                    this.fetch();
                }).catch(err => {
                    this.$message.error(`删除失败！${err}`);
                });
            },
            onChecked(row) {
                row.isSelected = !!row.isSelected;
                let isSet = false;
                for (const item of this.selectItems) {
                    if (item.columnTreeId === row.columnTreeId) {
                        item.isSelected = !!row.isSelected;
                        isSet = true;
                        break;
                    }
                }
                if (!isSet) {
                    this.selectItems.push({
                        columnTreeId: row.columnTreeId,
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
                for (const item of this.datas) {
                    item.isSelected = selection.length !== 0;
                    let isSet = false;
                    for (const item1 of this.selectItems) {
                        if (item1.columnTreeId === item.columnTreeId) {
                            item1.isSelected = selection.length !== 0;
                            isSet = true;
                            break;
                        }
                    }
                    if (!isSet) {
                        this.selectItems.push({
                            columnTreeId: item.columnTreeId,
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
                // this.selectItems = val;
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
                }
            },
            handleBatchDelOk() {
                const idArray = this.selectItems.map(item => {
                    return item.columnTreeId;
                })
                contentStore.batchDeleteColumnTree(idArray).then(ret => {
                    this.batchDialogVisible = false;
                    this.pagination.currentPage = 1;
                    this.fetch();
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
