<style>
</style>
<template>
    <div class='layout-container'>
        <PublicHeader :title="init.title" :breadcrumbs="init.breadcrumbs"></PublicHeader>
        <div style="padding: 15px; background-color: #dddddd">
            <span>操作人：</span>
            <el-input v-model="tableParams.operatorId" size="small" style="width: 160px;">
            </el-input>
            <span>查询时间：</span>
            <el-date-picker
                v-model="dateRange"
                size="small"
                type="daterange"
                align="right"
                placeholder="选择日期范围"
                :picker-options="pickerOptions">
            </el-date-picker>
            </el-input>
            <span>执行酒店：</span>
            <el-input v-model="tableParams.search" size="small" placeholder="请输入酒店名称或者HostID" style="width: 200px;">
            </el-input>
            <el-button size="small" type="primary" @click="handleSearch" style="margin-left:20px">搜索</el-button>
            <el-button size="small" @click="handleReset">重置</el-button>
        </div>
        <XTable :options="tableOptions" :data="tableData" :pagination="pagination" @tableParamsChange="handleTableParamsChange"></XTable>
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
import { vodHomeStore } from '../../stores';
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
                    {id: 'updatedAt', title: '时间', checked: true},
                    {id: 'operatorName', title: '操作人', checked: true},
                    {id: 'amount', title: '酒店数量', checked: true, formatter: (row) => {
                        return row.hotels.length;
                    }},
                    {id: 'hotels', title: '执行酒店', checked: true, formatter: (row) => {
                        return row.hotels.map(item => (item.hotelName)).join(', ');
                    }},
                ],
                columnOperations: [
                    {
                        title: '查看',
                        icon: 'document',
                        type: 'info',
                        onClick: (rowData) => { this.$router.push(`/vod_home/release_preview?id=${rowData.id}`); }
                    }
                ]
            },
            tableData: [],
            pagination: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
            },
            
            loading: false,
            dateRange: [],
            pickerOptions: {
                // shortcuts: [{
                //     text: '最近一周',
                //     onClick(picker) {
                //     const end = new Date();
                //     const start = new Date();
                //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                //     picker.$emit('pick', [start, end]);
                //     }
                // }, {
                //     text: '最近一个月',
                //     onClick(picker) {
                //     const end = new Date();
                //     const start = new Date();
                //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                //     picker.$emit('pick', [start, end]);
                //     }
                // }, {
                //     text: '最近三个月',
                //     onClick(picker) {
                //     const end = new Date();
                //     const start = new Date();
                //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                //     picker.$emit('pick', [start, end]);
                //     }
                // }],
                // onPick: ({maxDate, minDate}) => {
                //     console.log(maxDate, minDate);
                //     console.log(moment(maxDate).format('YYYYMMDD'));
                //     if (maxDate && minDate) {
                //         this.dateRange = moment(minDate).format('YYYYMMDD') + '-' + moment(maxDate).format('YYYYMMDD');
                //     }
                // },
            },
            tableParams: {
                page: 1,
                limit: 10,
                search: '',
                sort: '',
                dateRange: '',
                operatorId: '',
            },
        }
    },
    components: {
        VIcon,
        Btn,
        PublicHeader,
        XTable,
    },
    methods: {
        handleSearch() {
            this.tableParams.page = 1;
            console.log(`dateRange`, this.dateRange);
            if (this.dateRange.length == 2 && this.dateRange[0] && this.dateRange[1]) {
                this.tableParams.dateRange = moment(this.dateRange[0]).format('YYYYMMDD') + '-' + moment(this.dateRange[1]).format('YYYYMMDD');
            } else {
                this.tableParams.dateRange = '';
            }
            this.requestTableData();
        },
        handleReset() {
            this.dateRange = [];
            this.tableParams.search = '';
            this.tableParams.dateRange = '';
            this.requestTableData();
        },
        requestTableData() {
            vodHomeStore.getReleaseLogList(this.tableParams).then(res => {
                console.log('vodHomeStore.getReleaseLogList', res);
                this.tableData = res.data.docs;
                this.pagination = {
                    currentPage: res.data.page,
                    pageSize: res.data.limit,
                    total: res.data.total,
                };
            });
        },
        handleTableParamsChange(params) {
            this.tableParams.page = params.page;
            this.tableParams.limit = params.limit;
            this.tableParams.sort = params.sort;
            this.requestTableData();
        }
    },
    mounted() {
        this.requestTableData();
    }
}
</script>
