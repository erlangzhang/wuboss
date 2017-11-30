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
                breadcrumbs: ['主菜单管理', '主菜单管理'],
                title: '主菜单管理',
            },
            tableOptions: {
                columns: [
                    {id: 'hostId', title: 'hostId', checked: true},
                    {id: 'name', title: '酒店名称', checked: true},
                    {id: 'city', title: '城市', checked: true},
                    {id: 'agencyName', title: '所属办事处', checked: true, sortable: true},
                    {id: 'grade', title: '酒店等级', checked: true},
                    {id: 'menuTotal', title: '主菜单数量', checked: true},
                ],
                tableOperations: [
                    {
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
                        onClick: (rowData) => { this.$router.push('/main_menu/index-edit?id='+rowData.hostId); }
                    }
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
    methods: {
        handleTableParamsChange(params) {
            this.tableParams = params;
            this.requestTableData();
        },
        requestTableData() {
            mainMenuStore.getHotelList(this.tableParams).then(res => {
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
    },
    mounted() {
        this.requestTableData();
    }

}
</script>
