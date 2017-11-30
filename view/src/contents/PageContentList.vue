<style>
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <el-breadcrumb separator=">">
                <!-- <el-breadcrumb-item :to="{ path: '/' }" @click="focusIndex(1)"> -->
                <el-breadcrumb-item>
                    <span @click='focusIndex()'>
                        <VIcon class='breadcrumb-icon' type='home' /> 首页 </span>
                </el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                <el-breadcrumb-item>栏目管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div class='breadcrumb-header'></div>
        </div>
        <div class='content-header'>
            <VIcon type='appstore' /> 栏目管理
            <div class='breadcrumb-header'></div>
        </div>
        <div class='operator-bar'>
            <router-link class="create-btn" to='/content/publish-item'>
                <VIcon type='plus' class='iconfont-button' />发布</router-link>
            <a href='javascript:;' class="refresh-btn" @click='fetch()'>
                <VIcon type='reload' class='iconfont-button' />刷新</a>
            <span class="batch-select-span" v-if="this.selectItems.length !== 0">{{ `选择了 ${this.selectItems.length} 项`}}</span>
        </div>
        <div class='table-container'>
            <!--    <span class='table-title'>显示第 {{(pagination.currentPage - 1) * pagination.pageSize + 1 || 1 }} 至 {{pagination.currentPage * pagination.pageSize}} 条，共 {{pagination.total}} 条</span> -->
            <span class='table-title'>显示第 {{(pagination.currentPage - 1) * pagination.pageSize +1 || 1 }} 至 {{getLastPage}} 条，共 {{pagination.total}} 条</span>
            <el-dropdown class="select-row-dropdown" :hide-on-click="false">
                <el-button class="select-row">
                    选择列
                    <VIcon type="down" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.name">发布项目名称</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.itemPosition">栏目位置</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.publishDesciption">发布描述</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.onlineTime">上线时间</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.offlineTime">下线时间</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.status">状态</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-checkbox v-model="columnsChecked.opt">操作</el-checkbox>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!--<el-input class='search-input' placeholder="栏目位置/名称" icon="search" v-model="search" size="small" :on-icon-click="handleSearch">
            </el-input>-->
            <SearchInput :defaultSearch="defaultSearch" :handleSearch="handleSearch"></SearchInput>
            <el-table :data="contents" v-loading="loading" element-loading-text="加载中" border style="width: 100%" @selection-change="handleSelectionChange" @sort-change='handleSortChange'>
             <!--    <el-table-column type="selection" width="55">
                </el-table-column> -->
                <el-table-column v-if="columnsChecked.name" label="项目名称" prop="name">
                </el-table-column>
                <el-table-column prop="position" label="栏目位置" v-if="columnsChecked.itemPosition">
                </el-table-column>
                <el-table-column prop="description" label="发布描述" v-if="columnsChecked.publishDesciption">
                </el-table-column>
                <el-table-column prop="onlineTime" label="上线时间" v-if="columnsChecked.onlineTime" width="180" :sortable="true">
                    <template scope="scope">
                        <label> {{ renderTime(scope.row.onlineTime) }}</label>
                    </template>
                </el-table-column>
                <el-table-column prop="offlineTime" label="下线时间" v-if="columnsChecked.offlineTime" width="180" :sortable="true">
                    <template scope="scope">
                        <label> {{ renderTime(scope.row.offlineTime) }}</label>
                    </template>
                </el-table-column>
                <el-table-column label="状态" v-if="columnsChecked.status" width="180">
                    <template scope="scope">
                        <el-tag v-if="isShow(scope.row) === false" style="margin-top: 5px;">{{ renderStatus(scope.row.status) }}</el-tag>
                        <el-tag prop="success" v-if="isShow(scope.row) === true && renderErrorCount(scope.row) === 0" style="margin-top: 5px;">{{ renderStatus1(scope.row) }}</el-tag>
                        <el-badge v-if="isShow(scope.row) === true && renderErrorCount(scope.row) !== 0" :value="renderErrorCount(scope.row)" class="item" style="margin-top: 10px; margin-right: 10px;">
                            <el-tag prop="status">{{ renderStatus1(scope.row) }}</el-tag>
                        </el-badge>
                        <!--
                        <el-badge v-if="scope.row.hotelStatus.length !== 0" v-for="(item, index) of scope.row.hotelStatus" :value="item.count" class="item" style="margin-top: 10px; margin-right: 10px;">
                            <el-tag prop="status">{{ renderStatus(item.name) }}</el-tag>
                        </el-badge>
                        -->
                        </br>
                        <span prop="verifyTime" style="font-size:6px">{{ renderTime(scope.row.updatedAt) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" v-if="columnsChecked.opt" show-overflow-tooltip>
                    <template scope="scope">
                        <router-link v-if="scope.row.status === 'UNAPPROVED' || scope.row.status === 'UNAPPROVED'" class="edit-btn" :to="'/content/publish-item?id=' + scope.row.releaseId">
                            <VIcon type='edit' class='iconfont-button' />编辑</router-link>
                        <a href="javascript:;" class="edit-btn" style="background: #bcbcbc;" v-else>
                            <VIcon type='edit' class='iconfont-button' />编辑
                        </a>
                        <!--  <a href="javascript:;" @click="handleDel(scope.row)" class="delete-btn">
                            <VIcon type="delete" class='iconfont-button' />删除
                        </a> -->
                        <router-link class="retrieve-btn" :to="'/content/project-detail?id='+scope.row.releaseId">
                            <VIcon type='info-circle-o' class='iconfont-button' />详情</router-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-pagination">
                <el-pagination :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" @size-change='handlePageSizeChange' @current-change='handleCurPageChange' layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
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
import {
    VIcon,
    Btn,
    SearchInput,
} from '../components';
import {
    contentStore
} from '../stores';
import moment from 'moment';
import '../style/index.less';
import {
    mapGetters,
    mapActions
} from 'vuex';
export default {
    data() {
            return {
                defaultSearch: "栏目位置/名称",
                search: '',
                sort: '',
                contents: [],
                input2: "",
                selectItems: [],
                dialogVisible: false,
                batchDialogVisible: false,
                selectRow: {},
                columnsChecked: {
                    name: true,
                    type: true,
                    belongEPG: true,
                    itemPosition: true,
                    publishDesciption: true,
                    onlineTime: true,
                    offlineTime: true,
                    status: true,
                    opt: true
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
            this.sort = "-createdAt";
            this.fetch();
        },
        computed: {
            ...mapGetters({
                id: 'hotel/GET_CUR_EDIT_ID'
            }),
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
                    curEditId: '1',
                });

                console.log("列表》》》", this.id)
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
            isShow(row) {
                for (const item of row.hotelStatus) {
                    if (item.count !== 0) {
                        return true;
                    }
                }
                return false;
            },
            renderStatus(status) {
                switch (status) {
                    case 'UNRELEASED':
                        return '未发布';
                    case 'UNAPPROVED':
                        return '待审核';
                    case 'APPROVEDERROR':
                        return '审核未通过';
                    case 'APPROVED':
                        return '已审核';
                    case 'RELEASED':
                        return '发布成功';
                    case 'RELEASEERROR':
                        return '发布失败';
                    case 'ONLINE':
                        return '已上线';
                    case 'ONLINEERROR':
                        return '上线失败';
                    case 'OFFLINED':
                        return '已下线';
                    case 'OFFLINEDERROR':
                        return '下线失败';
                }
            },
            renderErrorCount(row) {
                if (!row || !row.hotelStatus || row.hotelStatus.length === 0) {
                    return 0;
                }
                let error = 0;
                for (const item of row.hotelStatus) {
                    switch (item.name) {
                        case 'RELEASEERROR':
                        case 'ONLINEERROR':
                        case 'OFFLINEDERROR':
                            error = error + item.count;
                    }
                }
                return error;
            },
            renderStatus1(row) {
                var errorCount;
                for (const item of row.hotelStatus) {
                    if (item.name == 'RELEASEERROR' && item.count != 0) {
                        return '失败';
                    }
                    if (item.name == 'ONLINEERROR' && item.count != 0) {
                        return '失败';
                    }
                    if (item.name == 'OFFLINEDERROR' && item.count != 0) {
                        return '失败';
                    }
                    // console.log("renderStatus1失败", item.name);
                    // switch (item.name) {
                    //     case 'RELEASEERROR':
                    //     case 'ONLINEERROR':
                    //     case 'OFFLINEDERROR':
                    //         return '失败';
                    // }
                }
                return '成功';
            },
            renderTime(timestamp) {
                return moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
            },
            handleSearch(searchText) {
                this.search = searchText;
                this.fetch();
            },
            handleSelectionChange(val) {
                this.selectItems = val;
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
                contentStore.list(params).then(res => {
                    this.contents = res.data.docs;
                    this.pagination.total = Number(res.data.total);
                    this.loading = false;
                }).catch(err => {
                    this.$message.error(`列表数据获取失败！${err}`);
                    this.loading = false;
                });
            },
            handleCurPageChange(val) {
                this.pagination.currentPage = val;
                this.fetch();
            },
            handlePageSizeChange(val) {
                console.log("总的数量", val);
                this.pagination.pageSize = val;
                this.fetch();
            },

            handleDetail() {
                this.$router.push("content/project-detail");
            },
            handleDel(row) {
                this.dialogVisible = true;
                this.selectRow = row;
            },
            handleDelOk() {
                contentStore.batchDeleteContent([this.selectRow.columnId]).then(ret => {
                    this.dialogVisible = false;
                    const params = {
                        page: 1,
                        limit: this.pagination.pageSize
                    };
                    if (this.search) {
                        params.search = this.search;
                    }
                    this.getData(params);
                }).catch(err => {
                    this.$message.error(`删除失败！${err}`);
                });
            },
            gotoPublishItem() {
                this.$router.push("content/publish-item");
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
                        this.batchDialogVisible = true;
                        break;
                }
            },

            handleBatchDelOk() {
                const idArray = this.selectItems.map(item => {
                    return item.columnId;
                })
                contentStore.batchDeleteContent(idArray).then(ret => {
                    this.batchDialogVisible = false;
                    const params = {
                        page: 1,
                        limit: this.pagination.pageSize
                    };
                    if (this.search) {
                        params.search = this.search;
                    }
                    this.getData(params);
                }).catch(err => {
                    this.$message.error(`批量删除失败！${err}`);
                });
            },
        }
}
</script>
