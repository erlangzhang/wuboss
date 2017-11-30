<template>
    <div>
        <el-dialog title="下发情况" :visible.sync="mDialogVisible">
            <div style="padding: 15px; background-color: #dddddd">
                <span>按城市：</span>
                <el-cascader
                    size="small"
                    v-model="cascaderValue"
                    :options="cascaderOptions"
                    @active-item-change="handleItemChange"
                    @change="handleCascaderChange"
                    :props="cascaderProps"
                    placeholder="选择省市"
                    style="width: 150px;"
                ></el-cascader>
                <span>酒店名称：</span>
                <el-input v-model="query.search" size="small" style="width: 130px;">
                </el-input>
                <el-button size="small" type="primary" @click="handleSearch" style="margin-left:20px">搜索</el-button>
                <el-button size="small" @click="handleReset">重置</el-button>
            </div>
            <XTable :options="tableOptions" :data="tableData" ></XTable>
        </el-dialog>
    </div>
</template>
<script>
    import XTable from './XTable.vue';
    import {
            VIcon,
            Btn,
    } from '../components';
    import {
        hotelStore,
        mediaStore
    } from '../stores';

    const STATUSES = ['待下发', '进行中', '下载成功', '下载失败'];

    export default {
        name: 'MessageSelector',
        components: {
            XTable,
            VIcon,
            Btn,
        },
        props: {
            data: {
                type: Array,
            }
        },
        data() {
            return {
                tableOptions: {
                    columns: [
                        {id: 'name', title: '酒店名称', checked: true},
                        {id: 'status', title: '状态', checked: true, formatter: (row) => {
                            return STATUSES[row.status];
                        }},
                        {id: 'speed', title: '速度', checked: true, formatter: (row) => {
                            return (row.speed / 1024 / 1024).toFixed(2) + 'MB/s';
                        }},
                        {id: 'percent', title: '百分比', checked: true, formatter: (row) => {
                            return row.percent + '%';
                        }},
                        {id: 'totalsize', title: '总大小', checked: true, formatter: (row) => {
                            return (row.totalsize / 1024 / 1024).toFixed(2) + 'MB';
                        }},
                    ],
                },
                tableData: [],
                loading: false,
                mDialogVisible: false,
                cascaderOptions: [],
                cascaderProps: {
                    value: 'label',
                    children: 'cities'
                },
                cascaderValue: [],
                provinceData: [],
                cityData: [],
                query: {
                    city: '',
                    search: '',
                },
                id: 0,
            }
        },
        methods: {
            showDialog(id) {
                this.mDialogVisible = true;
                this.id = id;
                this.requestTableData();
            },
            requestTableData() {
                mediaStore.getFilmReleaseList(this.id, this.query).then(res => {
                    this.tableData = res.data.hotels;
                }).catch(err => {
                    this.$message('查找失败，原因：' + err.message);
                });
            },
            handleItemChange(val) {
                console.log('active item:', val);
            },
            handleCascaderChange(val) {
                console.log('handleCascaderChange', val);

                this.query.city = val[1];
            },
            handleSearch() {
                this.requestTableData();
            },
            handleReset() {
                this.cascaderValue = [];
                this.query = {city: '', search: ''};
                this.requestTableData();
            }
        },
        mounted() {
            hotelStore.getAreaList().then((res) => {
                let cascaderOptions = res.data.province.map(item => {
                    return {
                        id: item.id,
                        label: item.name, 
                        cities: [],
                    };
                });

                res.data.city.forEach(item => {
                    for (let province of cascaderOptions) {
                        if (province.id == item.parentId) {
                            province.cities.push({
                                id: item.id,
                                label: item.name,
                            });
                        }
                    }
                });

                this.cascaderOptions = cascaderOptions;
                this.provinceData = res.data.province;
                this.cityData = res.data.city;
            });
        }
    }
</script>
<style>
</style>
