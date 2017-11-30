<template>
    <div>
        <XTable ref="selected" :options="selectedOptions" :data="data"></XTable>
        <el-dialog title="请选择酒店" :visible.sync="dialogVisible">
            <div style="margin-bottom: 10px">
                <el-cascader
                    size="small"
                    :options="cascaderOptions"
                    @active-item-change="handleItemChange"
                    @change="handleCascaderChange"
                    :props="cascaderProps"
                    placeholder="选择省市"
                ></el-cascader>
            </div>
            <Transfer
                :titles="transferTitles"
                :data="transferData"
                :target-keys="transferTargetKeys"
                :list-style="listStyle"
                :render-format="renderTransferRow"
                filterable
                @on-change="handleTransferChange">
            </Transfer>
            <div class="dialog-bottom-btn-div">
                <el-button size="small" @click="handleCancel">取消</el-button>
                <el-button size="small" type="primary" @click="handleSubmit">确定选择</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import XTable from './XTable.vue';
import Transfer from 'iview/src/components/transfer';
import {
    VIcon,
    Btn,
} from '../components';
import {
    hotelStore
} from '../stores'

const COLUMN_OPTION = [
    {id: 'name', title: '酒店名称', checked: true},
    {id: 'city', title: '地区', checked: true},
    {id: 'stars', title: '等级', checked: true},
];

export default {
    name: 'HotelSelector',
    components: {
        XTable,
        VIcon,
        Btn,
    },
    props: {
        data: {
            type: Array,
        },
        editable: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        let selectedOptions;
        if (this.editable) {
            selectedOptions = {
                columns: COLUMN_OPTION,
                tableOperations: [
                    {
                        title: '添加酒店',
                        type: 'danger',
                        icon: 'add',
                        onClick: () => { this.dialogVisible = true }
                    }
                ],
                columnOperations: [
                    {
                        title: '移除',
                        type: 'danger',
                        icon: 'delete',
                        visible: (rowData) => { return true },
                        confirm: {title: '确定移除吗？'},
                        onClick: (rowData) => {
                            for (let i = 0; i < this.data.length; i++) {
                                if (rowData == this.data[i]) {
                                    this.data.splice(i, 1);
                                }
                            }
                        }
                    }
                ],
                batchOperations: [
                    {
                        title: '移除酒店',
                        type: 'danger',
                        confirm: {title: '确定移除吗？'},
                        onClick: (rows) => {
                            for (let rowData of rows) {
                                for (let i = 0; i < this.data.length; i++) {
                                    if (rowData == this.data[i]) {
                                        this.data.splice(i, 1);
                                    }
                                }
                            }
                        }
                    }
                ],
            }
        } else {
            selectedOptions = {
                columns: COLUMN_OPTION,
            }
        }

        return {
            transferTitles: ['可选酒店', '已选酒店'],
            transferData: [],
            transferTargetKeys: [],
            listStyle: {
                width: '250px',
                height: '400px',
                textAlign: 'left',
            },
            selectedOptions: selectedOptions,
            
            cascaderOptions: [],
            cascaderProps: {
                value: 'label',
                children: 'cities'
            },
            provinceData: [],
            cityData: [],
            dialogVisible: false,
            province: '',
            city: '',
            searchQuery: '',
        };
    },
    methods: {
        handleItemChange(val) {
            console.log('active item:', val);
        },
        handleCascaderChange(val) {
            console.log('handleCascaderChange', val);
            // this.transferData = [
            //     {
            //         key: '1',
            //         name: '如家酒店',
            //         city: '深圳',
            //         level: 3,
            //     }, {
            //         key: '2',
            //         name: '七天酒店',
            //         city: '深圳',
            //         level: 2,
            //     }, {
            //         key: '3',
            //         name: '维也纳酒店',
            //         city: '深圳',
            //         level: 5,
            //     }, {
            //         key: '4',
            //         name: 'AAA酒店',
            //         city: '深圳',
            //         level: 1,
            //     }, {
            //         key: '5',
            //         name: 'BBB酒店',
            //         city: '深圳',
            //         level: 4,
            //     }, 
            // ];

            let cityId = 0;
            for (let province of this.cascaderOptions) {
                if (val[0] == province.label) {
                    for (let city of province.cities) {
                        if (val[1] == city.label) {
                            cityId = city.id;
                            break;
                        }
                    }
                    break;
                }
            }

            hotelStore.getHotelList({citys: `${cityId}`, page: 1, limit: 10000}).then(res => {
                this.transferData = res.data.docs.map(item => {
                    return {
                        key: `${item.hostId}`,
                        ...item,
                    };
                });
            });
        },
        renderTransferRow(item) {
            return item.name;
        },
        handleTransferChange(data) {
            console.log('handleTransferChange', data);
            this.transferTargetKeys = data;
        },
        handleCancel() {
            this.dialogVisible = false;
        },
        handleSubmit() {
            this.transferTargetKeys.forEach(key => {
                for (let item of this.transferData) {
                    if (key == item.key) {
                        console.log('item', item);
                        this.$refs.selected.pushRow(item);
                        break;
                    }
                }
            });
            this.dialogVisible = false;
        },
        getProvinceName(id) {
            for (let province of this.provinceData) {
                if (province.id == id) {
                    return province.name;
                }
            }
        },
        getCityName(id) {
            for (let city of this.cityData) {
                if (city.id == id) {
                    return city.name;
                }
            }
        },
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
.province-select {
    width: 20%;
}
.city-select {
    width: 20%;
}
.search-query-input {
    width: 40%;
}
.dialog-bottom-btn-div {
    margin-top: 10px;
    margin-bottom: 50px;
    float: right;
}
</style>
