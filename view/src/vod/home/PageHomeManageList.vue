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
                breadcrumbs: ['VOD首页管理', 'VOD首页管理'],
                title: 'VOD首页管理',
            },
            tableOptions: {
                columns: [
                    {id: 'hostId', title: 'Host ID', checked: true},
                    {id: 'hotelName', title: '酒店名称', checked: true},
                    {id: 'cityName', title: '城市', checked: true},
                    {id: 'hotelGrade', title: '酒店等级', checked: true},
                    {id: 'recommendCount', title: '推荐数量', checked: true},
                    {id: 'updatedAt', title: '状态更新时间', checked: true},
                    {id: 'operatorName', title: '修改人', checked: true},
                ],
                tableOperations: [
                    {
                        title: '刷新',
                        icon: 'reload',
                        type: 'default',
                        onClick: () => {  }
                    },
                ],
                columnOperations: [
                    {
                        title: '管理',
                        icon: 'edit',
                        type: 'warning',
                        onClick: (rowData) => { this.$router.push(`/vod_home/home_manage-edit?id=${rowData.id}`); }
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
            vodHomeStore.getHotelReleaseList(this.tableParams).then(res => {
                console.log('vodHomeStore.getReleaseList', res);
                this.tableData = res.data.docs;
                this.pagination = {
                    currentPage: res.data.page,
                    pageSize: res.data.limit,
                    total: res.data.total,
                }
            });
        },
    },
    mounted() {
        this.requestTableData();
    }
    
}
</script>
