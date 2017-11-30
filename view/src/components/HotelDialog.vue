<template>
    <div>
        <el-dialog title="请选择酒店" :visible.sync="hDialogVisible">
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
} from '../stores';

export default {
    name: 'HotelDialog',
    components: {
        XTable,
        VIcon,
        Btn,
    },
    props: {
    },
    data() {
        return {
            transferTitles: ['可选酒店', '已选酒店'],
            transferData: [],
            transferTargetKeys: [],
            listStyle: {
                width: '250px',
                height: '400px',
                textAlign: 'left',
            },
            province: '',
            city: '',
            searchQuery: '',
            hDialogVisible: false,

            cascaderOptions: [],
            cascaderProps: {
                value: 'label',
                children: 'cities'
            },
            provinceData: [],
            cityData: [],
        };
    },
    methods: {
        handleItemChange(val) {
            console.log('active item:', val);
        },
        handleCascaderChange(val) {
            console.log('handleCascaderChange', val);
            
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
            this.transferTargetKeys = data;
        },
        handleCancel() {
            this.hDialogVisible = false;
        },
        handleSubmit() {
            let callBackData = []
            this.transferTargetKeys.forEach(key => {
                this.transferData.forEach(t => {
                    let data = {}
                    if (key == t.key) {
                        callBackData.push(t)
                    }
                })
            })
            this.$emit('hotelDialogCb', callBackData)
            this.hDialogVisible = false
        },
        showDialog() {
            this.hDialogVisible = true
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
.dialog-bottom-btn-div {
    margin-top: 10px;
    margin-bottom: 50px;
    float: right;
}
</style>
