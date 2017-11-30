<style scope>
.el-table .info-row {
    background: #e2f0e4;
}
</style>
<template>
    <div class='layout-container'>
        <div class='operator-bar'>
            <a href="javascript:;" @click="handleRefresh" class="refresh-btn">
                <VIcon type='reload' class='iconfont-button' />刷新</a>
        </div>
        <div class='table-container'>
            <span class='table-title'>显示第 {{(pagination.currentPage - 1) * pagination.pageSize+1 || 1 }} 至 {{getLastPage}} 项，共 {{pagination.total}} 项</span>
            <el-dropdown class="select-row-dropdown" :hide-on-click="false">
                <el-button class="select-row">
                    选择列
                    <VIcon type="down" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.columnId">栏目ID</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.name">栏目名称</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.isLeftNode">是否为条目</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.language">可见语言</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.description">描述</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.userName">创建人</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.createdAt">创建时间</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.updatedAt">更新时间</el-checkbox>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-input class='search-input' placeholder="栏目id，项目名称" icon="search" v-model="search" size="small" :on-icon-click="handleSearch">
            </el-input>
            <el-table :data="datas" v-loading="loading" :row-class-name="tableRowClassName" element-loading-text="加载中" border style="width: 100%" @current-change="handleSelectChange">
                <el-table-column v-if="columnsChecked.columnId" label="栏目ID" prop="columnId">
                </el-table-column>
                <el-table-column v-if="columnsChecked.name" label="栏目名称">
                    <template scope="scope">
                        <label> {{ renderName(scope.row.language) }}</label>
                    </template>
                </el-table-column>
                <el-table-column v-if="columnsChecked.isLeftNode" label="是否为条目">
                    <template scope="scope">
                        <el-tag :type="scope.row.isLeafNode ? 'success' : 'danger'">{{scope.row.isLeafNode ? '条目' : '非条目'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column v-if="columnsChecked.language" label="可见语言">
                    <template scope="scope">
                        <label> {{ renderLanguage(scope.row.language) }}</label>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="描述" v-if="columnsChecked.description">
                </el-table-column>
                <el-table-column prop="userName" label="创建人" v-if="columnsChecked.userName">
                </el-table-column>
                <el-table-column prop="createdAt" label="创建时间" v-if="columnsChecked.createdAt" width="180">
                    <template scope="scope">
                        <label> {{ renderTime(scope.row.createdAt) }}</label>
                    </template>
                </el-table-column>
                <el-table-column prop="updatedAt" label="更新时间" v-if="columnsChecked.updatedAt">
                    <template scope="scope">
                        <label> {{ renderTime(scope.row.updatedAt) }}</label>
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
} from '../components';
import {
    userStore,
    contentStore,
} from '../stores';
import '../style/index.less';
export default {
    props: {
        onSelect: Function,
        selectColumnId: String,
        epgChoosedList: Array,
    },
    data() {
        return {
            currentRow: '',
            search: '',
            datas: [],
            dialogVisible: false,
            batchDialogVisible: false,
            selectRow: {},
            selectItems: [],
            lastEpgChoosedList: [],
            columnsChecked: {
                columnId: true,
                name: true,
                isLeftNode: true,
                description: false,
                opt: false,
                userName: false,
                createdAt: false,
                updatedAt: false,
                language: true,
            },
            pagination: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
            },
            loading: false,
            language: [],
        }
    },
    components: {
        VIcon,
        Btn,
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
    watch: {
        selectColumnId(id) {
            for (const item of this.datas) {
                if (id === item.columnId) {
                    this.currentRow = item;
                    break;
                }
            }
        },
        epgChoosedList(value) {
            var tempSet = new Set();
            this.lastEpgChoosedList.map(item => {
                tempSet.add(item);
            });
            value.map(item => {
                tempSet.add(item);
            });

            if (this.lastEpgChoosedList.length != Array.from(tempSet).length) {
                const params = {
                    limit: 10,
                    page: 1,
                };
                if (this.epgChoosedList.length != 0) {
                    params.epg = this.epgChoosedList;
                }
                this.fetch(params);
            }
            this.lastEpgChoosedList = [...value];
        },
    },
    created: function() {
        contentStore.listLanguage().then(ret => {
            this.language = ret.data;
        }).catch(err => {
            this.$message.error(`获取语言数据失败!${err}`);
        });
        const params = {
            limit: 10,
            page: 1,
        };
        if (this.epgChoosedList.length != 0) {
            console.log("选择了EPG版本", this.epgChoosedList);
            params.epg = this.epgChoosedList;
        }
        this.fetch(params);
    },
    methods: {
        tableRowClassName(row, index) {
            if (!row || !row.columnId || !this.currentRow || !this.currentRow.columnId)
                return '';
            if (row.columnId === this.currentRow.columnId) {
                return 'info-row';
            }
            return '';
        },
        handleSelectChange(val) {
            if (this.onSelect) {
                this.onSelect(val);
            }
            this.currentRow = val;
        },
        fetch(params = {
            limit: 10,
            page: 1
        }) {
            this.loading = true;
            contentStore.listItem(params).then(ret => {
                this.datas = ret.data.docs;
                this.pagination.total = Number(ret.data.total);
                // this.pagination.pageSize = Number(ret.data.limit);
                // this.pagination.currentPage = Number(ret.data.page);
                this.loading = false;
                if (!this.selectColumnId) {
                    return;
                }
                for (const item of this.datas) {
                    if (this.selectColumnId === item.columnId) {
                        this.currentRow = item;
                        break;
                    }
                }
            }).catch(err => {
                this.$message.error(`列表账号数据失败！${err}`);
                this.loading = false;
            });
        },
        renderLanguage(language) {
            if (language.length === 0) {
                return '';
            }
            const array = [];
            for (const item of language) {
                for (const it of this.language) {
                    if (item.languageType === it.code) {
                        array.push(`${it.name}-${it.code}`);
                        break;
                    }
                }
            }
            return array.toString();
        },
        renderName(language) {
            if (language.length === 0) {
                return '';
            }
            const array = language.map(item => {
                return item.name;
            });
            return array.toString();
        },
        handleSearch(ev) {
            const params = {
                limit: this.pagination.pageSize,
                page: this.pagination.currentPage
            };
            if (this.search) {
                params.search = this.search;
            }

            if (this.epgChoosedList.length != 0) {
                params.epg = this.epgChoosedList;
            }
            this.fetch(params);
        },
        handleSizeChange(val) {
            this.pagination.pageSize = val;
            const params = this.search ? {
                search: this.search,
                page: this.pagination.currentPage,
                limit: val
            } : {
                page: this.pagination.currentPage,
                limit: val
            };
            if (this.epgChoosedList.length != 0) {
                params.epg = this.epgChoosedList;
            }
            this.fetch(params);
        },
        handleCurrentChange(val) {
            this.pagination.currentPage = val;
            const params = {
                page: val,
                limit: this.pagination.pageSize,
            };
            if (this.search) {
                params.search = this.search;
            }
            if (this.epgChoosedList.length != 0) {
                params.epg = this.epgChoosedList;
            }
            this.fetch(params);
        },
        renderTime(unix) {
            return moment(unix * 1000).format('YYYY-MM-DD HH:mm:ss');
        },
        renderArray(arry) {
            const tmp = arry.map(item => {
                return item.name;
            })
            return tmp.toString();
        },
        handleDel(row) {
            this.dialogVisible = true;
            this.selectRow = row;
        },
        handleDelOk() {
            userStore.batchDeleteContent([this.selectRow.id]).then(ret => {
                this.dialogVisible = false;
                const params = this.search ? {
                    search: this.search
                } : {};
                this.fetch(params);
            }).catch(err => {
                this.$message.error(`删除失败！${err}`);
            });
        },
        handleSelectionChange(val) {
            this.selectItems = val;
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
                return item.id;
            })
            userStore.batchDeleteContent(idArray).then(ret => {
                this.batchDialogVisible = false;
                const params = this.search ? {
                    search: this.search
                } : {};
                this.fetch(params);
            }).catch(err => {
                this.$message.error(`批量删除失败！${err}`);
            });
        },
        handleRefresh() {
            const params = {
                limit: this.pagination.pageSize,
                page: this.pagination.currentPage
            };
            if (this.search) {
                params.search = this.search;
            }
            if (this.epgChoosedList.length != 0) {
                params.epg = this.epgChoosedList;
            }
            this.fetch(params);
        },
    }
}
</script>
