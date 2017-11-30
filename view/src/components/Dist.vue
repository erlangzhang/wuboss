<template>
    <div>
        <el-select v-model="provinceSelect" :size="size" @change="selectProvinceCallback" filterable placeholder="请选择省">
            <el-option v-for="item in provinceOpt" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="citySelect" :size="size" @change="selectCityCallback" filterable placeholder="请选择市">
            <el-option v-for="item in cityOpt" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <el-select v-if="level >= 3" v-model="distSelect" :size="size" @change="selectDistCallback" filterable placeholder="请选择区">
            <el-option v-for="item in disOpt" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<script>
import request from '../stores/request';
import functionPool from '../stores/functionPool';

export default {
    props: {
        onSelect: {
            type: Function,
        },
        level: {
            type: [Number, String],
            default: 3,
        },
        size: {
            type: String,
            default: 'small',
        },
        defaultValue: {
            type: Object,
            default: function() {
                return null;
                // return { 
                //   province: {
                //     name: '',
                //   },
                //   city: {
                //     name: '',
                //   },
                //   dist: {
                //     name: '',
                //   }
                // }
            }
        },
    },
    data() {
        return {
            provinceSelect: '',
            citySelect: '',
            distSelect: '',
            distData: {},
            // 防止选择省份后重置市、县/区时多次触发onSelect
            isReset: false,
            provinceMap: new Map(),
            cityMap: new Map(),
            distMap: new Map(),
        }
    },
    created() {
        request('/wushu/api/areas')
            .then(functionPool.package200)
            .then(ret => {
                this.distData = ret.data;
            }).catch(err => {
                this.$message.error(`获取行政区数据失败！${err}`);
            });
    },
    methods: {
        selectChangeCallback() {
            if (!this.onSelect) {
                return;
            }
            this.onSelect({
                province: {
                    id: this.provinceSelect,
                    name: this.provinceMap.get(this.provinceSelect),
                },
                city: {
                    id: this.citySelect,
                    name: this.citySelect ? this.cityMap.get(this.citySelect) : '',
                },
                dist: {
                    id: this.distSelect,
                    name: this.distSelect ? this.distMap.get(this.distSelect) : '',
                },
            });
        },
        checkChange() {
            if (this.defaultValue && this.defaultValue.province && this.defaultValue.province.id && (this.defaultValue.city || this.defaultValue.dist)) {
                if (this.provinceSelect === this.defaultValue.province.id) {
                    switch (parseInt(this.level)) {
                        case 1:
                            return false;
                        case 2:
                            {
                                if (this.defaultValue.city.id && this.citySelect === this.defaultValue.city.id)
                                    return flase;
                            }
                        case 3:
                            {
                                if (this.defaultValue.city.id && this.citySelect === this.defaultValue.city.id && this.defaultValue.dist.id && this.distSelect === this.defaultValue.dist.id)
                                    return false;
                            }
                    }
                }
            }
            return true;
        },
        selectProvinceCallback(value, a) {
            if (!this.checkChange()) {
                return;
            }
            this.citySelect = '';
            this.distSelect = '';

            this.selectChangeCallback();
        },
        selectCityCallback(value) {
            if (!this.checkChange()) {
                return;
            }
            this.distSelect = '';
            this.selectChangeCallback();
        },
        selectDistCallback() {
            if (!this.checkChange()) {
                return;
            }
            this.selectChangeCallback();
        },
        setDefaultValue() {
            if (this.defaultValue && this.defaultValue.province && this.defaultValue.province.id && this.distData.province) {
                this.provinceSelect = this.defaultValue.province.id;
            }
            if (this.defaultValue && this.defaultValue.city && this.defaultValue.city.id && this.distData.city) {
                this.citySelect = this.defaultValue.city.id;
            }
            if (this.defaultValue && this.defaultValue.dist && this.defaultValue.dist.id && this.distData.county) {
                this.distSelect = this.defaultValue.dist.id;
            }
        },
    },
    watch: {
        defaultValue(newObj) {
            this.setDefaultValue();
        },
        distData(newObj) {
            this.setDefaultValue();
        },
    },
    computed: {
        provinceOpt: function() {
            if (!this.distData.province) {
                return [];
            }
            return this.distData.province.map(item => {
                this.provinceMap.set(item.id, item.name);
                return {
                    value: item.id,
                    label: item.name,
                }
            })
        },
        cityOpt: function() {
            if (!this.provinceSelect)
                return '';
            const r = [];
            for (const item of this.distData.city) {
                this.cityMap.set(item.id, item.name);
                if (item.parentId === this.provinceSelect) {
                    r.push({
                        value: item.id,
                        label: item.name,
                    });
                }
            }
            return r;
        },
        disOpt: function() {
            if (!this.citySelect) {
                return '';
            }
            const r = [];
            for (const item of this.distData.county) {
                this.distMap.set(item.id, item.name);
                if (item.parentId === this.citySelect) {
                    r.push({
                        value: item.id,
                        label: item.name,
                    });
                }
            }
            return r;
        },
    },
}
</script>
