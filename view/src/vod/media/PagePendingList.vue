<style>
</style>
<template>
    <div class='layout-container'>
        <PublicHeader :title="init.title" :breadcrumbs="init.breadcrumbs"></PublicHeader>
        <XTable :options="tableOptions" :data="tableData" :pagination="pagination" :search="searchOptions" @tableParamsChange="handleTableParamsChange"></XTable>
        <el-dialog
            title="导入媒体文件"
            :visible.sync="dialogVisible"
            size="tiny">
            <el-upload
                drag
                action="/shineblue/api/media/films/import"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传相关配置文件</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import moment from 'moment';
import lodash from 'lodash';
import PublicHeader from '../../components/PublicHeader.vue';
import XTable from '../../components/XTable.vue';
import {
    mediaStore
} from '../../stores';
import '../../style/index.less';
export default {
    data() {
            return {
                init: {
                    breadcrumbs: ['媒资管理', '待入库影片'],
                    title: '待入库影片',
                },
                tableOptions: {
                    columns: [
                        {id: 'globalId', title: 'GlobalID', checked: true},
                        {id: 'name', title: '节目名称', checked: true, formatter: (row) => {
                            return row.language ? row.language[0].name : row.name;
                        }},
                        {id: 'duration', title: '片长', checked: true},
                        {id: 'fileSize', title: '大小', checked: true, formatter: (row) => {
                            return parseInt(row.fileSize / 1024 / 1024) + 'MB';
                        }},
                        {id: 'createdAt', title: '创建时间', checked: true, formatter: (row) => {
                            return mediaStore.renderTime_YYYYMMDDHHMM(row.createdAt)
                        }},
                        {id: 'status', title: '状态', checked: true, sortable: true, formatter: (row) => {
                            return mediaStore.getFilmStatue(row.status)
                        }},
                    ],
                    tableOperations: [
                        {
                            title: '导入',
                            icon: 'reload',
                            type: 'danger',
                            onClick: () => { this.dialogVisible = true; }
                        },
                    ],
                    columnOperations: [
                        {
                            title: '预览',
                            icon: 'document',
                            type: 'info',
                            onClick: (rowData) => { console.log('rowData', rowData); }
                        }, {
                            title: '编辑',
                            icon: 'edit',
                            type: 'warning',
                            onClick: (rowData) => { this.$router.push('/media/pending-edit?id='+rowData.globalId); }
                        }, {
                            title: '删除',
                            icon: 'delete',
                            type: 'danger',
                            visible: (rowData) => { return true },
                            confirm: {title: '确定删除吗？'},
                            onClick: (rowData) => { this.handleDelete(rowData) }
                        }
                    ],
                    batchOperations: [
                        {
                            title: '删除',
                            icon: 'delete',
                            confirm: {title: '确定删除吗？'},
                            onClick: (rows) => { this.handleBatchDelete(rows) }
                        }
                    ]
                },
                tableData: [],
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },
                searchOptions: {
                    placeholder: '查找',
                    onSearch: (query) => {
                        console.log('search query', query);
                        this.tableParams.search = query;
                        this.requestTableData();
                    }
                },
                loading: false,
                tableParams: {
                    page: 1,
                    limit: 10,
                    search: '',
                    sort: '',
                },
                dialogVisible: false,
            }
        },
        components: {
            PublicHeader,
            XTable,
        },
        created: function() {
        },
        computed: {
        },
        methods: {
            handleTableParamsChange(params) {
                this.tableParams = params;
                this.requestTableData();
            },
            requestTableData() {
                mediaStore.getFilmlList({...this.tableParams, status: '0'}).then(res => {
                    this.tableData = res.data.docs;
                    this.pagination = {
                        currentPage: res.data.page,
                        pageSize: res.data.limit,
                        total: res.data.total,
                    }
                });
            },
            handleRefresh() {
                this.requestTableData();
            },
            // 删除
            handleDelete(row){
                mediaStore.deleteFilm({id: [row.globalId]}).then(ret => {
                    console.log('ret-- ' + JSON.stringify(ret))
                    if (0 == ret.code) {
                        this.$message('删除成功');
                        this.requestTableData();
                    } else
                        this.$message.error('删除失败');

                }).catch(err => {
                    this.$message.error(`删除影片失败！${err}`);
                })
            },
            // 批量删除
            handleBatchDelete(rows) {
                if(null == rows || 0 >= rows.length) {
                    this.$message.error('请先勾选需要删除的影片');
                    return
                }

                let idArr = []
                rows.map(item => idArr.push(item.globalId))
                mediaStore.deleteFilm({id: idArr}).then(ret => {
                    console.log('ret-- ' + JSON.stringify(ret))
                    if (0 == ret.code) {
                        this.$message('删除成功');
                        this.requestTableData();
                    } else
                        this.$message.error('删除失败');

                }).catch(err => {
                    this.$message.error(`删除影片失败！${err}`);
                })

            },
            handleUploadSuccess(res, file) {
                console.log('upload', res);
                this.$alert('导入成功', '提示', {confirmButtonText: '确定'});
                this.dialogVisible = false;
            },
            handleUploadError(err, file) {
                console.log('upload err', `####${err.message}####`);
                this.$alert(`导入失败，错误信息：${err.message}`, '错误', {confirmButtonText: '确定'});
                this.dialogVisible = false;
            }
        },
        mounted() {
            this.requestTableData();
        }
}
</script>
