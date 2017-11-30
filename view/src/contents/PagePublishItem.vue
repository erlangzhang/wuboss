<style>
.table-publish-item tr td {
    text-align: right;
}

.table-publish-item {
    border-collapse: separate;
    border-spacing: 20px;
}

.chooseHotelTable tr td:first-child {
    text-align: right;
}

.my-autocomplete {
    li {
        line-height: normal;
        padding: 7px;
        .name {
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .addr {
            font-size: 12px;
            color: #b4b4b4;
        }
        .highlighted .addr {
            color: #ddd;
        }
    }
}

.save-btn-style-admin-edit {
    text-align: center;
    margin: 20px;
}

.item-table-container {
    margin: 20px;
}
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">
                    <VIcon class='breadcrumb-icon' type='home' />首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                <el-breadcrumb-item>栏目管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div class='breadcrumb-header'></div>
        </div>
        <div class="publish-item-container" style="margin-top: 20px;margin-left: 10px;border: 1px solid lightgrey;padding-bottom: 5px;">
            <div style="background-color: #4A86E8;color: white;padding:10px;font-size: 18px;">
                <VIcon class='breadcrumb-icon' :type="!this.id ? 'home': 'edit'" /> {{ !this.id ? '发布栏目': '编辑栏目'}}{{currentStep}}/3
            </div>
            <template>
                <Steps :current="currentStep" style="padding: 20px;">
                    <Step title="基础设置"></Step>
                    <Step title="发布规则"></Step>
                    <Step title="选择酒店"></Step>
                </Steps>
            </template>
            <div class="firstStep" v-if="currentStep == 0">
                <el-form :model="itemInfo" ref="itemInfo" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="名称:" required prop="name">
                        <el-input v-model="itemInfo.name" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="发布描述:" prop="description">
                        <el-input type="textarea" v-model="itemInfo.description" style="width: 250px;"></el-input>
                    </el-form-item>
                    <el-form-item prop="onlineTime" label="上线时间:" required>
                        <el-date-picker type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" v-model="itemInfo.onlineTime" :picker-options="pickerOnlineOptions" style="width: 200px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item prop="offlineTime" label="下线时间:" required>
                        <el-date-picker type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" v-model="itemInfo.offlineTime" :picker-options="pickerOnlineOptions" style="width: 200px;" @change="judgeTime"></el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <div class="secondStep" v-if="currentStep == 1">
                <el-form :model="itemInfo" ref="itemInfo" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="父级栏目:" prop="targetParentId" required>
                        <el-autocomplete class="inline-input" v-model="targetParentValue" @select="handleParentSelect" :fetch-suggestions="querySearch" placeholder="请输入父级栏目"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="是否栏目树:" prop="isTree">
                        <el-switch v-model="itemInfo.isColumnTree " on-text="是" off-text="否" @change="getSwitchValue()">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="发布内容:" prop="columnId" required>
                        <el-autocomplete class="inline-input" v-model="columnValue" @select="handleColumnSelect" :fetch-suggestions="queryContentSearch" placeholder="请填写发布内容"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="栏目位置:" prop="position" required>
                        <el-input v-model="itemInfo.position" type="number" min="1" style="width: 100px;"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="thirdStep" v-if="currentStep == 2">
                <el-form label-width="140px" class="demo-ruleForm">
                    <el-form-item label="选择地区:">
                        <el-row el-row type="flex">
                            <Dist :onSelect='addressChange' size="small" level="2" />
                        </el-row>
                    </el-form-item>
                    <el-form-item label="选择所属办事处:">
                        <el-select v-model="value" placeholder="请选择" @change="getOfficeList(value)">
                            <el-option v-for="item in agency" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="酒店等级:">
                        <el-select v-model="valueStar" placeholder="请选择" @change="getStarList(valueStar)">
                            <el-option v-for="item in hotelGrade" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="酒店类型:">
                        <el-select v-model="valueType" placeholder="请选择" @change="getTypeList(valueType)">
                            <el-option v-for="item in hotelTypeObj" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!--    <el-form-item label="EPG版本:">
                        <el-select v-model="valueEdition" placeholder="请选择" @change="getEGPEditionList(valueEdition)">
                            <el-option v-for="item in EPGEdition" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="酒店名称:">
                        <el-input v-model="search" style="width: 250px;"></el-input>
                        <el-button type="primary" @click="handleSearch" icon="search">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-row v-if="rowChecked.length !== 0">
                    <el-col :span="2" class="row-admin-edit">
                        <label class="label-admin-edit">已选择的酒店: </label>
                    </el-col>
                    <el-col :span="20">
                        <el-tag class="tag-admin-edit" v-for="tag in rowChecked" :closable="true" type="primary" @close="handleCloseHotelTag(tag)">
                            {{tag.name}}
                        </el-tag>
                    </el-col>
                </el-row>
                <div class='item-table-container'>
                    <el-table :data="hotels" v-loading="loading" element-loading-text="加载中" border style="width: 100%;margin-top: 20px;" @select-all="handleSelectAll">
                        <el-table-column type="selection" width="50">
                            <template scope="scope">
                                <el-checkbox v-model="scope.row.isSelected" @change="onChecked(scope.row)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="地区" prop="hostId">
                        </el-table-column>
                        <el-table-column label="酒店名称" prop="name">
                        </el-table-column>
                        <el-table-column prop="detailAddress" label="地区">
                        </el-table-column>
                        <el-table-column prop="agency" label="所属办事处">
                        </el-table-column>
                        <el-table-column prop="hotelGrade" label="酒店等级">
                        </el-table-column>
                        <el-table-column prop="hotelType" label="酒店类型" :formatter="formatter">
                        </el-table-column>
                        <el-table-column prop="epgVersion" label="EPG版本">
                        </el-table-column>
                        <el-table-column prop="tags" label="标签">
                        </el-table-column>
                    </el-table>
                    <div class="table-pagination">
                        <el-pagination :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="pagination.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <div class='save-btn-style-admin-edit'>
            <el-button type="info" :disabled="currentStep === 0 " @click="btnUpClick">上一步</el-button>
            <el-button type="info" :disabled="currentStep === 2 " @click="btnNextClick">下一步</el-button>
            <el-button type="primary" :disabled="currentStep !== 2" @click="btnSaveClick">保存</el-button>
        </div>
    </div>
</template>
<script>
import {
    VIcon,
    Btn,
    Dist,
} from '../components';
import moment from 'moment';
import lodash from 'lodash';
import {
    contentStore,
    hotelStore
} from '../stores';
export default {
    data() {
            return {
                contents: [],
                currentStep: 0,
                loading: false,
                fatherDataList: [],
                search: '',
                sort: '',
                filterObj: {
                    province: '',
                    city: '',
                    agency: '',
                    star: '',
                    hotelType: '',
                    epg: '',
                },
                hotelTypeObj: ["单体", "集团", "运营商"],
                citys: [],
                pickerOnlineOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                agency: [],
                hotelStar: [],
                hotelType: [],
                EPGEdition: [],

                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },

                hotels: [],
                itemInfo: {
                    name: '',
                    onlineTime: '',
                    offlineTime: '',
                    targetParentId: '',
                    columnId: '',
                    position: 1,
                    hotels: [],
                    description: '',
                    isColumnTree: false,
                },

                value: '',
                valueStar: '',
                valueType: '',
                valueEdition: '',

                rowChecked: [],
                column: {

                },
                targetParent: {

                },
                columnValue: '',
                targetParentValue: '',
                isNoneExist: false, //是否需要'无'这个字段
            };
        },
        components: {
            VIcon,
            Btn,
            Dist,
        },
        computed: {
            id: {
                get: function() {
                    if (this.$route && this.$route.query) {
                        return this.$route.query.id;
                    } else {
                        return '';
                    }
                }
            },
        },
        methods: {
            judgeTime(val) {
                var tempOnlineTime = moment(this.itemInfo.onlineTime).unix();
                var tempOfflineTime = moment(val).unix();
                if (tempOnlineTime > tempOfflineTime) {
                    this.$message.error("下线时间要大于上线时间");
                    this.itemInfo.offlineTime = '';
                }
            },
            handleParentSelect(item) {
                this.targetParent.targetParentId = item.id;
            },
            handleColumnSelect(item) {
                this.column.columnId = item.id;
                this.filterObj.epg = item.checkedEpgs;
                console.log(item, "得出的筛选条件", this.filterObj.epg);
                this.getHotelList();
            },
            handleCloseHotelTag(tag) {
                lodash.remove(this.rowChecked, item => {
                    return item.id === tag.id;
                });
                this.resetChecked();
                for (const item of this.hotels) {
                    if (item.id === tag.id) {
                        item.isSelected = false;
                        break;
                    }
                }
            },
            resetChecked() {
                const array = new Array();
                for (const item of this.rowChecked) {
                    array.push(item);
                }
                this.rowChecked = null;
                this.rowChecked = array;
            },
            onChecked(row) {
                row.isSelected = !!row.isSelected;

                let isSet = false;
                for (const item of this.rowChecked) {
                    if (item.id === row.id) {
                        item.isSelected = !!row.isSelected;
                        isSet = true;
                        break;
                    }
                }
                if (!isSet) {
                    this.rowChecked.push({
                        id: row.id,
                        isSelected: row.isSelected,
                        name: row.name,
                        hostId: row.hostId,
                    });
                }

                lodash.remove(this.rowChecked, item => {
                    return item.isSelected === false;
                });
                this.resetChecked();
            },
            handleSelectAll(selection) {
                for (const item of this.hotels) {
                    item.isSelected = selection.length !== 0;

                    let isSet = false;
                    for (const item1 of this.rowChecked) {
                        if (item1.id === item.id) {
                            item1.isSelected = selection.length !== 0;
                            isSet = true;
                            break;
                        }
                    }
                    if (!isSet) {
                        this.rowChecked.push({
                            id: item.id,
                            hostId: item.hostId,
                            name: item.name,
                            isSelected: selection.length !== 0,
                        });
                    }
                }
                lodash.remove(this.rowChecked, item => {
                    return item.isSelected === false;
                });
                this.resetChecked();
            },
            btnSaveClick() {
                var tmpOffTime = moment(this.itemInfo.offlineTime).unix();
                var tmpTime = moment().unix();
                if (tmpTime > tmpOffTime) {
                    this.$message.error('下线时间过期了!');
                    return;
                }
                if (this.targetParentValue === this.columnValue) {
                    this.$message.error('下发栏目与父级栏目不能为同一个栏目!');
                    this.targetParentValue = '';
                    this.columnValue = '';
                    return;
                }
                if (this.rowChecked.length === 0) {
                    this.$message.error('请先选择酒店!');
                    return;
                }
                this.itemInfo.hotels = this.rowChecked.map(item => {
                    return {
                        hostId: item.hostId
                    };
                });
                this.itemInfo.offlineTime = moment(this.itemInfo.offlineTime).unix();
                this.itemInfo.onlineTime = moment(this.itemInfo.onlineTime).unix();
                this.itemInfo.columnId = this.column.columnId;
                this.itemInfo.targetParentId = this.targetParent.targetParentId;
                delete this.itemInfo.column;
                delete this.itemInfo.targetParent;

                if (this.id) {
                    delete this.itemInfo.releaseId;
                    contentStore.updateRelease(this.id, this.itemInfo).then(ret => {
                        this.$router.push("/content");
                    }).catch(err => {
                        this.$message.error(`更新失败!${err}`);
                    });
                    return;
                }
                contentStore.release(this.itemInfo).then(ret => {
                    this.$router.push("/content");
                }).catch(err => {
                    this.$message.error(`发布失败!${err}`);
                });
            },
            btnUpClick() {
                this.currentStep -= 1;
            },
            btnNextClick() {
                if (this.checkParams(this.currentStep)) {
                    this.currentStep += 1;
                }
            },
            handleSearch(ev) {
                this.getHotelList();
            },
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                this.getHotelList();
            },
            handleCurrentChange(val) {
                this.pagination.currentPage = val;
                this.getHotelList();
            },
            getOfficeList(item) {
                this.filterObj.agency = item;
            },

            getOnlineTime(time) {
                this.itemInfo.onlineTime = time;
            },
            getOfflineTime(time) {
                this.itemInfo.offlineTime = time;
            },

            getStarList(item) {
                this.filterObj.hotelGrade = item;
                console.log(this.filterObj.hotelGrade, "切换后的获取的值");
            },
            getTypeList(item) {
                if (item == "单体") {
                    this.filterObj.hotelType = 0;
                } else if (item == "集团") {
                    this.filterObj.hotelType = 1;
                } else {
                    this.filterObj.hotelType = 2;
                }
            },
            getEGPEditionList(item) {
                this.filterObj.epg = item;
            },
            formatter(row, column) {
                if (row.hotelType == 0) {
                    return "单体";
                } else if (row.hotelType == 1) {
                    return "集团";
                } else {
                    return "运营商";
                }
            },

            gotoContentList() {
                this.$router.push("/content");
            },
            getSwitchValue() {
                this.columnValue = '';

            },

            querySearch(queryString, cb) {
                this.isNoneExist = true;
                this.getItemList(queryString, cb);
            },

            queryContentSearch(queryString, cb) {
                if (this.itemInfo.isColumnTree) {
                    this.getItemTreeList(queryString, cb);
                } else {
                    this.isNoneExist = false;
                    this.getItemList(queryString, cb);
                }
            },
            getItemTreeList(queryString, cb) {
                const params = {
                    search: queryString,
                }
                contentStore.listItemTree(params).then(res => {
                    if (res.code == 0) {
                        var itemTreeList = res.data.docs.map((item) => {
                            return {
                                value: item.name,
                                id: item.columnTreeId,
                                checkedEpgs: [item.style],
                            }
                        });
                        console.log("栏目树的列表CCC>>>>", itemTreeList);
                        var results = queryString ? itemTreeList.filter(this.createFilter(queryString)) : itemTreeList;
                        // 调用 callback 返回建议列表的数据

                        cb(itemTreeList);

                        // if (itemTreeList.length == 0) {
                        //     this.columnValue = '';
                        //     this.$message.error("搜索的栏目树不存在,请重新搜索！");
                        //     cb(itemTreeList);
                        // } else {
                        //     cb(itemTreeList);
                        // }

                    }
                }).catch(err => {
                    this.$message.error(err.message);
                });
            },
            getItemList(queryString, cb) {
                const params = {
                    search: queryString,
                }
                if (this.isNoneExist) {
                    params.isLeafNode = false;
                }

                console.log("发布的父级栏目的参数：", params);

                contentStore.listItem(params).then(res => {
                    if (res.code == 0) {
                        var itemList = res.data.docs.map((item) => {
                            console.log("栏目树的item>>>>", item);
                            var tempEpgs = [];
                            for (var i = 0; i < item.style.length; i++) {
                                tempEpgs.push(item.style[i].styleName);
                            }
                            return {
                                value: item.language[0].name,
                                id: item.columnId,
                                checkedEpgs: tempEpgs,
                            }
                        });
                        console.log("栏目树的列表AAA>>>>", itemList);

                        if (this.isNoneExist) {
                            itemList.unshift({
                                value: "无",
                                id: "-1"
                            });
                        }
                        var results = queryString ? itemList.filter(this.createFilter(queryString)) : itemList;
                        // 调用 callback 返回建议列表的数据

                        cb(itemList);

                        // if (this.isNoneExist) { //父级栏目
                        //     if (itemList.length == 1) {
                        //         this.targetParentValue = '';
                        //         this.$message.error("搜索的栏目不存在,请重新搜索!!");
                        //         cb(itemList);
                        //     } else {
                        //         cb(itemList);
                        //     }

                        // } else { //发布内容
                        //     if (itemList.length == 0) {
                        //         this.columnValue = '';
                        //         this.$message.error("搜索的栏目不存在,请重新搜索!!");
                        //         cb(itemList);
                        //     } else {
                        //         cb(itemList);
                        //     }
                        // }
                    }
                }).catch(err => {
                    this.$message.error(err.message);
                });
            },

            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
                };
            },

            checkParams(currentStep) {
                if (currentStep === 0) {
                    if (!this.itemInfo.name || this.itemInfo.name.trim() == "") {
                        this.$message.error('名称必填！');
                        return false;
                    }
                    if (!this.itemInfo.onlineTime) {
                        this.$message.error('上线时间必选！');
                        return false;
                    }
                    if (!this.itemInfo.offlineTime) {
                        this.$message.error('下线时间必选！');
                        return false;
                    }

                    var tempOnlineTime = moment(this.itemInfo.onlineTime).unix();
                    var tempOfflineTime = moment(this.itemInfo.offlineTime).unix();
                    if (tempOnlineTime > tempOfflineTime) {
                        this.$message.error("下线时间要大于上线时间");
                        this.itemInfo.offlineTime = '';
                        return false;
                    }
                } else if (currentStep === 1) {
                    if (!this.targetParentValue) {
                        this.$message.error("请选择父级栏目！");
                        return false;
                    }
                    if (this.targetParent.targetParentId == undefined || this.targetParent.targetParentId === "") {
                        this.$message.error("父级栏目填写有误！");
                        return false;
                    }
                    if (!this.columnValue) {
                        this.$message.error("请填写发布内容！");
                        return false;
                    }
                    if (this.column.columnId == undefined || this.column.columnId === "") {
                        this.$message.error("发布内容填写有误！");
                        return false;
                    }
                    if (!this.itemInfo.position || !this.isPositiveInteger(this.itemInfo.position)) {
                        this.$message.error("请填写正确的栏目位置！");
                        return false;
                    }
                    if (this.itemInfo.position < 0 || this.itemInfo.position == 0) {
                        this.$message.error('栏目位置大于等于1!');
                        return false;
                    }
                }
                return true;
            },

            isPositiveInteger(value) {
                var re = /^[0-9]+$/;
                return re.test(value);
            },

            addressChange(addrObj) {
                this.filterObj.province = addrObj.province.id;
                this.filterObj.city = addrObj.city.id;
            },

            getHotelList() {
                const params = {
                    page: this.pagination.currentPage,
                    limit: this.pagination.pageSize,
                    sort: this.sort,
                    search: this.search,
                    province: this.filterObj.province,
                    citys: this.filterObj.city,
                    agency: this.filterObj.agency,
                    hotelGrade: this.filterObj.hotelGrade,
                    hotelType: this.filterObj.hotelType,
                    epg: this.filterObj.epg,
                    status: 1,
                }
                this.loading = true;
                console.log("搜索酒店的请求数据", params);
                hotelStore.getHotelList(params).then(res => {
                    this.loading = false;
                    if (res.code === 0) {
                        this.hotels = res.data.docs.map((hotel) => {
                            hotel.address = `${hotel.province}${hotel.city}${hotel.county}${hotel.detailAddress}`;
                            return hotel;
                        });
                        this.pagination.total = res.data.total;

                        for (const item of this.hotels) {
                            this.$set(item, 'isSelected', false);
                            for (const item1 of this.itemInfo.hotels) {
                                if (item.hostId === item1.hostId) {
                                    this.$set(item, 'isSelected', true);
                                    break;
                                }
                            }
                            for (const it of this.rowChecked) {
                                if (it.hostId === item.hostId) {
                                    this.$set(it, 'name', item.name);
                                    this.$set(item, 'isSelected', it.isSelected);
                                    break;
                                }
                            }
                        }
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch(err => {
                    this.loading = false;
                    this.$message.error(`获取酒店数据失败!${err}`);
                })
            },
        },
        created: function() {
            hotelStore.getHotelDataSource().then((data) => {
                this.hotelGrade = data.data.hotelGrades;
                this.agency = data.data.agencys;
                this.EPGEdition = data.data.epgs;
                this.hotelStar = data.data.stars;
                console.log("酒店星级hotelStar >>>>>", this.hotelStar);
                // console.log("酒店等级hotelGrade >>>>>", this.hotelGrade);

            }).catch(err => {
                this.$message.error(`获取酒店数据失败${err}`);
            });

            if (!this.id) {
                // this.getHotelList();
                return;
            }
            contentStore.retrieveContentDetail(this.id).then(results => {
                if (results.code == 0) {
                    this.itemInfo = results.data;
                    this.itemInfo.offlineTime = new Date(this.itemInfo.offlineTime * 1000);
                    this.itemInfo.onlineTime = new Date(this.itemInfo.onlineTime * 1000);
                    this.itemInfo.targetParentId = this.itemInfo.targetParent.name;
                    this.itemInfo.columnId = this.itemInfo.column.name;
                    this.column = this.itemInfo.column;
                    this.targetParent = this.itemInfo.targetParent;
                    this.columnValue = this.column.name;
                    this.targetParentValue = this.targetParent.name;

                    if (this.rowChecked.length === 0) {
                        this.itemInfo.hotels.forEach(item => {
                            this.rowChecked.push({
                                hostId: item.hostId,
                            });
                        })
                    }
                    // this.getHotelList();
                } else {
                    this.$message.error(`获取内容失败`);
                }
            }).catch(err => {
                this.$message.error(`获取内容详情失败！${err}`);
            });
        },
}
</script>
