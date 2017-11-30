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
import {
    VIcon,
    Btn,
} from '../../components';
import PublicHeader from '../../components/PublicHeader.vue';
import XTable from '../../components/XTable.vue';
import {
    vodHomeStore,
} from '../../stores';
import '../../style/index.less';
export default {
    data() {
        return {
            init: {
                breadcrumbs: ['VOD首页管理', '发布管理'],
                title: '发布管理',
            },
            tableOptions: {
                columns: [
                    {id: 'name', title: '任务名称', checked: true},
                    {id: 'amount', title: '发布酒店数', checked: true, formatter: (row) => {
                        return row.hotels.length;
                    }},
                    {id: 'updatedAt', title: '发布更新时间', checked: true},
                    {id: 'operatorName', title: '发布人', checked: true},
                ],
                tableOperations: [
                    {
                        title: '发布任务',
                        icon: 'plus',
                        type: 'danger',
                        onClick: () => { this.$router.push('/vod_home/release_manage-edit'); }
                    }, {
                        title: '刷新',
                        icon: 'reload',
                        type: 'default',
                        onClick: () => { this.requestTableData(); }
                    },
                ],
                columnOperations: [
                    {
                        title: '查看',
                        icon: 'document',
                        type: 'info',
                        onClick: (rowData) => { this.$router.push(`/vod_home/release_preview?id=${rowData.id}`); }
                    }, {
                        title: '删除',
                        icon: 'delete',
                        type: 'danger',
                        visible: (rowData) => { return true },
                        confirm: {title: '确定删除吗？'},
                        onClick: (rowData) => { this.deleteVodHomeRelease(rowData.id); }
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
            }
        }
    },
    components: {
        VIcon,
        Btn,
        PublicHeader,
        XTable,
    },
    methods: {
        handleTableParamsChange(params) {
            console.log('handleTableParamsChange', params);
            this.tableParams = params;
            this.requestTableData();
        },
        requestTableData() {
            vodHomeStore.getReleaseList(this.tableParams).then(res => {
                console.log('vodHomeStore.getReleaseList', res);
                this.tableData = res.data.docs;
                this.pagination = {
                    currentPage: res.data.page,
                    pageSize: res.data.limit,
                    total: res.data.total,
                }
            });
        },
        deleteVodHomeRelease(id) {
            vodHomeStore.deleteRelease(id).then(res => {
                this.requestTableData();
                this.$alert('删除成功', '提示', {confirmButtonText: '确定'});
            }).catch(error => {
                this.$alert('删除失败', '错误', {confirmButtonText: '确定'});
            });
        }
    },
    mounted() {
        this.requestTableData();
    }
    
}
</script>
