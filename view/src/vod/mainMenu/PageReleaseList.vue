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
        mainMenuStore
} from '../../stores';
import '../../style/index.less';
export default {
    data() {
            return {
                init: {
                    breadcrumbs: ['主菜单管理', '发布管理'],
                    title: '发布管理',
                },
                tableOptions: {
                    columns: [
                        {id: 'name', title: '项目名称', checked: true},
                        {id: 'hotelCnt', title: '发布酒店数', checked: true, formatter: (row) => {
                            return row.hotels.length
                        }},
                        {id: 'status', title: '状态', checked: true, formatter: (row) => {
                            return mainMenuStore.getReleaseStatue(row.status)
                        }},
                        {id: 'createdAt', title: '发布时间', checked: true, formatter: (row) => {
                            return moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss');
                        }},
                        {id: 'operatorName', title: '发布人', checked: true},
                    ],
                    tableOperations: [
                        {
                            title: '新增发布',
                            icon: 'plus',
                            type: 'danger',
                            onClick: () => { this.$router.push('/main_menu/release-edit'); }
                        }, {
                            title: '刷新',
                            icon: 'reload',
                            type: 'default',
                            onClick: () => { this.requestTableData() }
                        },
                    ],
                    columnOperations: [
                        {
                            title: '查看',
                            icon: 'document',
                            type: 'info',
                            onClick: (rowData) => { this.$router.push('/main_menu/release-edit?id=' + rowData.id); }
                        }, {
                            title: '删除',
                            icon: 'delete',
                            type: 'danger',
                            visible: (rowData) => { return true },
                            confirm: {title: '确定删除吗？'},
                            onClick: (rowData) => { this.handleDelete(rowData.id) }
                        },
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
                mainMenuStore.getMainMenuReleaseList(this.tableParams).then(res => {
                    console.log('res-- ' + JSON.stringify(res))
                    this.tableData = res.data.docs;
                    this.pagination = {
                        currentPage: res.data.page,
                        pageSize: res.data.limit,
                        total: res.data.total,
                    }
                });
            },
            // 删除
            handleDelete(id){
                if(!id) return

                mainMenuStore.deleteMainMenu(id).then(ret => {
                    console.log('ret-- ' + JSON.stringify(ret))
                    if (0 == ret.code)
                        this.$message('删除成功')
                    else
                        this.$message.error('删除失败');

                    this.requestTableData()

                }).catch(err => {
                    this.$message.error(`删除主菜单失败！${err}`);
                })
            },
            handleRefresh() {
                this.fetch();
            },
            formatOnOffLineTime(onlineTime, offlineTime) {
                return this.renderTime_YYYYMMDDHHMM(onlineTime) +'/'+this.renderTime_YYYYMMDDHHMM(offlineTime);
            },
            renderTime_YYYYMMDDHHMM(unix) {
                return moment(unix * 1000).format('YYYY-MM-DD HH:mm');
            },
        },
        mounted() {
            this.requestTableData();
        }
}
</script>
