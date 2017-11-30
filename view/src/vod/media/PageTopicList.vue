<style>
</style>
<template>
    <div class='layout-container'>
        <PublicHeader :title="init.title" :breadcrumbs="init.breadcrumbs"></PublicHeader>
        <XTable :options="tableOptions" :data="tableData" :pagination="pagination" :search="searchOptions" @tableParamsChange="handleTableParamsChange"></XTable>
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
                breadcrumbs: ['媒资管理', '专题库'],
                title: '专题库',
            },
            tableOptions: {
                columns: [
                    {id: 'name', title: '专题名称/一句话描述', checked: true, width: 250, formatter: (row) => {
                        return `<div><h3>${row.language[0].name}</h3><p>${row.language[0].description}</p></div>`;
                    }},
                    {id: 'amount', title: '影片数', checked: true, formatter: (row) => {
                        return row.films.length;
                    }},
                    {
                        id: 'status', title: '状态', checked: true,  
                        formatter: (row) => {
                            return mediaStore.getFilmStatue(row.status)
                        }, 
                        filter: {
                            multiple: false,
                            data: [
                                {text: '待入库', value: '0'},
                                {text: '待审核', value: '1'},
                                {text: '审核通过', value: '2'},
                                {text: '审核1', value: '3'},
                                {text: '审核2', value: '4'},
                                {text: '驳回', value: '5'},
                                {text: '上线', value: '6'},
                                {text: '下线', value: '7'},
                                {text: '待上线', value: '8'},
                            ],
                            onFilter: (value, row) => {
                                return value == row.status;
                            }
                        }
                    },
                    {id: 'id', title: 'GlobalID', checked: true},
                    {
                        id: 'isfree', title: '收费', checked: true, 
                        formatter: (row) => {
                            return mediaStore.isFree(row.operateInfo.isfree)
                        }, 
                        filter: {
                            multiple: false,
                            data: [
                                {text: '付费', value: '付费'},
                                {text: '免费', value: '免费'},
                            ],
                            onFilter: (value, row) => {
                                return value == mediaStore.isFree(row.operateInfo.isfree);
                            }
                        }
                    },
                    {id: 'operatorName', title: '创建人', checked: true, formatter: (row) => {
                        return row.upload.operatorName;
                    }},
                    {id: 'createdAt', title: '创建时间', checked: true, formatter: (row) => {
                        return !row.upload.uploadTime ? '' : mediaStore.renderTime_YYYYMMDDHHMM(row.upload.uploadTime);
                    }},
                ],
                tableOperations: [
                    {
                        title: '新增',
                        icon: 'plus',
                        type: 'danger',
                        onClick: () => { this.$router.push('/media/topic-edit'); }
                    }, {
                        title: '刷新',
                        icon: 'reload',
                        type: 'default',
                        onClick: () => { this.requestTableData(); }
                    },
                ],
                columnOperations: [
                    {
                        title: '预览',
                        icon: 'document',
                        type: 'info',
                        onClick: (rowData) => { this.$router.push('/media/topic-preview?id='+rowData.id); }
                    }, {
                        title: '编辑',
                        icon: 'edit',
                        type: 'warning',
                        onClick: (rowData) => { this.$router.push('/media/topic-edit?id='+rowData.id); }
                    }, {
                        title: '删除',
                        icon: 'delete',
                        type: 'danger',
                        visible: (rowData) => { return true },
                        confirm: {title: '确定删除吗？'},
                        onClick: (rowData) => { this.handleDelete(rowData.id) }
                    }
                ],
                batchOperations: [
                    {
                        title: '上线',
                        onClick: (rows) => {
                            let ids = rows.map(item => item.id);
                            mediaStore.batchUpdateTopicStatus({id: ids, status: 6}).then(res => {
                                this.$message('批量上线成功');
                                this.requestTableData();
                            }).catch(error => {
                                this.$message('批量上线失败');
                            });
                        }
                    }, {
                        title: '下线',
                        onClick: (rows) => {
                            let ids = rows.map(item => item.id);
                            mediaStore.batchUpdateTopicStatus({id: ids, status: 7}).then(res => {
                                this.$message('批量下线成功');
                                this.requestTableData();
                            }).catch(error => {
                                this.$message('批量下线失败');
                            });
                        }
                    },
                ],
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
                }
            },
            loading: false,
            tableParams: {
                page: 1,
                limit: 10,
                search: '',
                sort: '',
            }
        }
    },
    components: {
        PublicHeader,
        XTable,
    },
    methods: {
        handleTableParamsChange(params) {
            this.tableParams = params;
            this.requestTableData();
        },
        requestTableData() {
            mediaStore.getTopicList(this.tableParams).then(res => {
                this.tableData = res.data.docs;
                this.pagination = {
                    currentPage: res.data.page,
                    pageSize: res.data.limit,
                    total: res.data.total,
                }
            });
        },
        handleRefresh() {
            this.fetch();
        },
        // 删除
        handleDelete(id){
            if(!id) return;

            mediaStore.deleteTopic(id).then(ret => {
                console.log('ret-- ' + JSON.stringify(ret))
                if (0 == ret.code) {
                    this.$message('删除成功');
                    this.requestTableData();
                } else
                    this.$message.error('删除失败');

            }).catch(err => {
                this.$message.error(`删除专题失败！${err}`);
            })
        }
    },
    mounted() {
        this.requestTableData();
    }
    
}
</script>
