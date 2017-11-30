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
                    breadcrumbs: ['主菜单管理', '主菜单素材'],
                    title: '主菜单素材',
                },
                tableOptions: {
                    columns: [
                        {id: 'name', title: '推荐位名称', checked: true},
                        {id: 'description', title: '描述', checked: true},
                        {id: 'actionType', title: '关联动作', checked: true, formatter: (row) => {
                            return mainMenuStore.getActionTypeName(row.actionType)
                        }},
                        {id: 'onOffLineTime', title: '上下线时间', checked: true, sortable: true, formatter: (row) => {
                            return this.formatOnOffLineTime(row.onlineTime, row.offlineTime)
                        }},
                        {id: 'visibleLang', title: '可见语言', checked: true, formatter: (row) => {
                            return mainMenuStore.renderLanguages(row.visibleLang)
                        }},
                        {id: 'operatorName', title: '创建人', checked: true},
                        {id: 'createAt', title: '创建时间', checked: true, formatter: (row) => {
                            return moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss')
                        }}
                    ],
                    tableOperations: [
                        {
                            title: '新增',
                            icon: 'plus',
                            type: 'danger',
                            onClick: () => { this.$router.push('/main_menu/material-edit'); }
                        }, {
                            title: '刷新',
                            icon: 'refresh',
                            type: 'default',
                            onClick: () => { this.requestTableData() }
                        },
                    ],
                    columnOperations: [
                        {
                            title: '编辑',
                            icon: 'edit',
                            type: 'warning',
                            onClick: (rowData) => { this.$router.push('/main_menu/material-edit?id='+rowData.id); }
                        }, {
                            title: '删除',
                            icon: 'delete',
                            type: 'danger',
                            visible: (rowData) => { return true },
                            confirm: {title: '确定删除吗？'},
                            onClick: (rowData) => { this.handleDelete(rowData.id); }
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
                mainMenuStore.getMMMaterialList(this.tableParams).then(res => {
                    this.tableData = res.data.docs;
                    this.pagination = {
                        currentPage: res.data.page,
                        pageSize: res.data.limit,
                        total: res.data.total,
                    }
                });

                //mainMenuStore.getLanguages()
            },
            // 删除素材
            handleDelete(id){
                if(!id) return

                mainMenuStore.deleteMaterial(id).then(ret => {
                    console.log('ret-- ' + JSON.stringify(ret))
                    if (0 == ret.code)
                        this.$message('删除成功')
                    else
                        this.$message.error('删除失败');

                    this.requestTableData()

                }).catch(err => {
                    this.$message.error(`删除素材失败！${err}`);
                })
            },
            handleRefresh() {
                this.fetch();
            },
            formatOnOffLineTime(onlineTime, offlineTime) {
                if (null == onlineTime && null == offlineTime)
                    return '永久'
                return this.renderTime_YYYYMMDDHHMM(onlineTime) +'/'+this.renderTime_YYYYMMDDHHMM(offlineTime);
            },
            renderTime_YYYYMMDDHHMM(unix) {
                return moment(unix * 1000).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        mounted() {
            this.requestTableData();
        }
}
</script>
