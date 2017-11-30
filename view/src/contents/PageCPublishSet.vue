<style>
.hotelMuti .el-checkbox {
    margin-left: 0px;
}

.hotelMuti .el-checkbox__label {
    padding-right: 5px;
}

.el-table .info-row {
    background: white;
}

.el-table .positive-row {
    background: lightgray;
}
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <NavBar :titleList="titleList"></NavBar>
        </div>
        <div class='content-header' @click="backBtn()">
            <i class="el-icon-arrow-left"></i> 返回列表
            <div class='breadcrumb-header'></div>
        </div>
        <el-form :model="itemInfo">
            <el-form-item label="商户名称：">
                <span>{{merchantInfo.name}}</span>
            </el-form-item>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="商户分类：">
                        <span>{{merchantInfo.category}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商户标签：">
                        <span v-for="item of merchantInfo.tags">{{item + ' '}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="上线时间：">
                        <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" :picker-options="pickerOnlineOptions" v-model="itemInfo.onlineTime">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="下线时间：">
                        <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" :picker-options="pickerOnlineOptions" v-model="itemInfo.offlineTime" @change="judgeTime">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <!--<el-form-item label="选择该商家上线的酒店："></el-form-item>-->
            <el-row style="margin-top: 10px; margin-bottom: 10px;">
                <el-col :span="3" class="row-admin-edit">
                    <label class="label-admin-edit">选择该商户上线的酒店： </label>
                </el-col>
                <el-col :span="19">
                </el-col>
            </el-row>
            <el-table :data="detailsInfo.hotels" border style="width:100%" :row-class-name='rowClassName'>
                <el-table-column label="ID" prop="hostId" fixed="left"></el-table-column>
                <el-table-column label="酒店名称" prop="hotelName"></el-table-column>
                <el-table-column label="地址" prop="hotelAddress"></el-table-column>
                <el-table-column label="状态" prop="status">
                    <template scope="scope">
                        <el-tag style="margin-top: 5px;">{{renderStatus(scope.row.status) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="上线位置">
                    <template scope="scope">
                        <el-input size="mini" prop="posOfList" v-model='scope.row.posOfList' style='width: 50px;'></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="图片广告位">
                    <template scope="scope">
                        <el-checkbox size="small"></el-checkbox>
                        <el-input size="mini" prop="posOfPicture" v-model='scope.row.posOfPicture' style='width: 50px;'></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="文字广告位">
                    <template scope="scope">
                        <el-checkbox size="small"></el-checkbox>
                        <el-input size="mini" prop="posOfMenu" v-model='scope.row.posOfMenu' style='width: 50px;'></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip fixed="right">
                    <template scope="scope">
                        <a href="javascript:;" @click="handlePub(scope.row)">
                            <VIcon type='info-circle-o' class='iconfont-button' />发布情况
                        </a>
                        <!--    <a v-show="showDelete(scope.row)" href="javascript:;" @click="handleDel(scope.row)" class="delete-btn">
                            <VIcon type="edit" class="iconfont-button" />{{scope.row.editOpt}}
                        </a>    -->
                        <a  href="javascript:;" @click="deleteRow(scope.$index, scope.row)" class="delete-btn">
                            <VIcon type="edit" class="iconfont-button" />{{scope.row.deleteStatus===0?"删除":"恢复"}}
                        </a>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <div style="padding-bottom: 10px;">
            <el-button type="text" @click="dialogVisible = true" style="padding-bottom: 10px;">+添加酒店</el-button>
        </div>
        </br>
        <!--     <div class="table-pagination">
            <el-pagination :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" @size-change='handlePageSizeChange' layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div> -->
        <div style="margin-top: 30px;">
            <el-button type="primary" @click="savePublish">保存并发布</el-button>
            <el-button @click="backBtn">返回</el-button>
            <span>上次的发布时间为：</span>
            <span>{{renderTime(detailsInfo.updatedAt)}}</span>
        </div>
        <el-dialog title="请选择酒店" v-model="dialogVisible" size="small" :before-close="handleClose">
            <el-form>
                <el-form-item>
                    <Dist :onSelect='addressChange' size="small" level="2" :default-value='addressObj' />
                    </Dist>
                </el-form-item>
                <el-form-item>
                    <SearchInput :defaultSearch="defaultSearch" :handleSearch="handleSearch" style="float: left"></SearchInput>
                </el-form-item>
                <el-form-item label="酒店等级:">
                    <el-select v-model="hotelGrade" placeholder="请选择" @change="getStarList(hotelGrade)">
                        <el-option v-for="item in hotelGradeList" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="已选择的酒店: " v-if="rowChecked.length !== 0">
                    <el-tag class="tag-admin-edit" v-for="tag in rowChecked" :closable="true" type="primary" @close="handleCloseHotelTag(tag)">
                        {{tag.name}}
                    </el-tag>
                </el-form-item>
                <div class='item-table-container'>
                    <el-table :data="hotelInfo" v-loading="loadingTable" element-loading-text="加载中" border style="width: 100%;margin-top: 20px;max-height: 200px;overflow-y: auto;" @select-all="handleSelectAll">
                        <el-table-column type="selection" width="50">
                            <template scope="scope">
                                <el-checkbox v-model="scope.row.isSelected" @change="onChecked(scope.row)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="酒店名称" prop="name">
                        </el-table-column>
                    </el-table>
                    <div class="table-pagination">
                        <el-pagination :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="pagination.total">
                        </el-pagination>
                    </div>
                </div>
                <!--    <el-checkbox-group class="hotelMuti" v-model="hotelCheckList" style="max-height: 200px;overflow-y: auto">
                        <el-checkbox v-for="item in hotelInfo" :label="item" :key="item">
                            {{item.name}}</el-checkbox>
                    </el-checkbox-group> -->
                <!-- </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="okAddHotel">确 定</el-button>
            </span>
        </el-dialog>
        <!--   <el-dialog v-model="deldialogVisible" size="tiny">
            <span><VIcon type="question-circle" class="delete-btn-dialog-icon"/>确定删除吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deldialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDelOk">确 定</el-button>
            </span>
        </el-dialog> -->
        <el-dialog title="" v-model="pubdialogVisible" size="large">
            <el-form>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="酒店名称 : ">
                            <span>{{hotelPubInfo.hotelName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="地区 : ">
                            <span>{{hotelPubInfo.city}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="酒店等级 : ">
                            <span>{{hotelPubInfo.grade}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="地址 : ">
                            <span>{{hotelPubInfo.address}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-tree :data="detailsCateInfo" :props="defaultProps"></el-tree>
                    </el-col>
                    <el-col :span="20">
                        <el-table :data="hotelPubInfo.merchants" border>
                            <el-table-column label="序号" type='index'></el-table-column>
                            <el-table-column label="商户编码" prop="merchantId"></el-table-column>
                            <el-table-column label="商户名称" prop="merchantName"></el-table-column>
                            <el-table-column label="标签" prop="tags"></el-table-column>
                            <el-table-column label="商户地址" prop="merchantAddress"></el-table-column>
                            <el-table-column label="位置" prop="posOfList"></el-table-column>
                            <el-table-column label="首页广告位" prop="posOfPicture"></el-table-column>
                            <el-table-column label="文字广告位" prop="posOfMenu"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-button type="primary" style="float: right; margin: 20px 0" @click="pubdialogVisible = false">确 定
                </el-button>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import {
    VIcon,
    Dist,
    Btn,
    NavBar,
    SearchInput,
} from '../components';
import moment from 'moment';
import lodash from 'lodash';
import {
    contentStore,
    hotelStore,
} from '../stores';
import '../style/index.less';
export default {
    data() {
            return {
                defaultSearch: "请输入关键词",
                titleList: ["内容管理", "本地生活圈", "商户发布", "发布管理", "详情设置"],
                search: '',
                value2: '',
                loadingTable: false,
                province: -1,
                citys: '',
                valueStar: '',
                hotelGrade: '',
                addressObj: {},
                mdetailsInfo: {},
                languageInfo: {},
                merchantInfo: {
                    name: '',
                    category: '',
                    tags: '',
                },
                hotelPubInfo: {},
                hotelGradeList: [],
                gradeCheckList: [],
                hotelInfo: [],
                detailsCateInfo: [],
                defaultProps: {
                    children: 'childs',
                    label: 'name'
                },
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 1,
                },
                pickerOnlineOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                dialogVisible: false,
                deldialogVisible: false,
                pubdialogVisible: false,
                selectRow: {},
                itemInfo: {
                    merchantId: '',
                    merchantName: '',
                    category: '',
                    tags: '',
                    merchantType: '',
                    province: '',
                    city: '',
                    onlineTime: '',
                    offlineTime: '',
                    hotels: [],
                },
                gradeCheckList: [],
                hotelCheckList: [],
                rowChecked: [],
                provinceOpt: [],
                provinceInfo: [],
                detailsInfo: {
                    hotels: []
                },
            }

        },
        methods: {
            renderStatus(status) { // 0: 待审核 1：已通过 2：驳回 3: 末发布 4：待上线 5：已上线 6：已下线 
                switch (status) {
                    case 0:
                        return "待审核";
                        break;
                    case 1:
                        return "已通过";
                        break;
                    case 2:
                        return "驳回";
                        break;
                    case 3:
                        return "末发布";
                        break;
                    case 4:
                        return "待上线";
                        break;
                    case 5:
                        return "已上线";
                        break;
                    case 6:
                        return "已下线";
                        break;
                }

            },
            /*showDelete(data) {
                switch (data.status) {
                    case 4:
                    case 5:
                    case 6:
                        return false;
                        break;
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        return true;
                        break;
                }
            },*/

            handleSelectAll(selection) {
                for (const item of this.hotelInfo) {
                    item.isSelected = selection.length !== 0;
                    let isSet = false;
                    for (const item1 of this.rowChecked) {
                        if (item1.hostId === item.hostId) {
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
                            status: item.status,
                            detailAddress: item.detailAddress,
                        });
                    }
                }
                lodash.remove(this.rowChecked, item => {
                    return item.isSelected === false;
                });
                this.resetChecked();
            },
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                this.getHotelList();
            },
            handleCurrentChange(val) {
                this.pagination.currentPage = val;
                this.getHotelList();
            },
            handleCloseHotelTag(tag) {
                lodash.remove(this.rowChecked, item => {
                    return item.hostId === tag.hostId;
                });
                this.resetChecked();
                for (const item of this.hotels) {
                    if (item.hostId === tag.hostId) {
                        item.isSelected = false;
                        break;
                    }
                }
            },
            onChecked(row) {
                row.isSelected = !!row.isSelected;
                let isSet = false;
                for (const item of this.rowChecked) {
                    if (item.hostId === row.hostId) {
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
                        detailAddress: row.detailAddress,
                        status: row.status,
                    });
                }

                lodash.remove(this.rowChecked, item => {
                    return item.isSelected === false;
                });
                this.resetChecked();
            },
            resetChecked() {
                const array = new Array();
                for (const item of this.rowChecked) {
                    array.push(item);
                }
                this.rowChecked = null;
                this.rowChecked = array;
            },

            rowClassName(row, index) {
                if (row.deleteStatus == 0) {
                    return '';
                } else {
                    return 'positive-row';
                }

            },

            handlePageSizeChange(val) {
                this.pagination.pageSize = val;
                const params = {
                    limit: val,
                    page: this.pagination.currentPage,
                };
                if (this.search) {
                    params.search = this.search;
                }
                this.fetch(params);
            },
            handleCurPageChange(val) {
                this.pagination.currentPage = val;
                const params = {
                    page: val,
                    limit: this.pagination.pageSize
                };
                if (this.search) {
                    params.search = this.search;
                }
                this.fetch(params);
            },
            deleteRow(index, item) {
                if (item.deleteStatus == 1) {
                    this.$set(item, "deleteStatus", 0);
                } else {
                    this.$set(item, "deleteStatus", 1);
                }
            },

            judgeTime(val) {
                var tempOnlineTime = moment(this.itemInfo.onlineTime).unix();
                var tempOfflineTime = moment(val).unix();
                if (tempOnlineTime > tempOfflineTime) {
                    this.$message.error("下线时间要大于上线时间");
                    this.itemInfo.offlineTime = '';
                }
            },
            handleDelOk() {
                console.log(this.selectRow);
            },
            handlePub(row) {
                const params = {
                    id: row.hostId,
                }
                contentStore.getHotelMerchantInfo(params).then(res => {
                    console.log(row.hostId);
                    this.hotelPubInfo = res.data;
                }).catch(err => {
                    this.$message.error(`获取数据失败！${err}`);
                });

                contentStore.listAllCategory().then(res => {
                    this.detailsCateInfo = res.data.docs;
                }).catch(err => {
                    this.$message.error(`获取数据失败！${err}`);
                });
                this.pubdialogVisible = true;
            },

            backBtn() {
                this.$router.push("/content/publish-management");
            },
            handleClose(done) {
                this.$confirm('确认关闭？').then(_ => {
                    done();
                }).catch(_ => {});
            },
            getHotelList() {
                const params = {
                    page: this.pagination.currentPage,
                    limit: this.pagination.pageSize,
                }

                if (this.search && this.search != "") {
                    params.search = this.search;
                }
                if (this.province != -1) {
                    params.province = this.province;
                }
                if (this.citys != "") {
                    params.citys = this.citys;
                }
                if (this.hotelGrade != "") {
                    params.hotelGrade = this.hotelGrade;
                }

                console.log("请求的参数>>>", params);


                this.loadingTable = true;
                hotelStore.getHotelList(params).then(res => {
                    this.loadingTable = false;
                    if (res.code === 0) {
                        this.hotelInfo = res.data.docs;
                        console.log("hotelList>>>", this.hotelInfo);
                        this.pagination.total = res.data.total;
                        for (const item of this.hotelInfo) {
                            this.$set(item, 'isSelected', false);
                            for (const it of this.rowChecked) {
                                if (it.hostId === item.hostId) {

                                    console.log("请求的hostid和选中的id相等");
                                    this.$set(it, 'name', item.name);
                                    this.$set(item, 'isSelected', it.isSelected);
                                    break;
                                }
                            }
                        }
                    } else {
                        this.$message.error(`获取酒店数据失败：${err}`);
                    }
                }).catch(err => {
                    this.loadingTable = false;
                    console.error('err: ', err);
                    this.$message.error(`获取酒店数据失败：${err}`);
                })
            },
            addressChange(address) {
                console.log("选择的地址>>>>>", address);
                this.province = parseInt(address.province.id);
                if (address.city.id != "") {
                    this.citys = address.city.id;
                }

                this.getHotelList();
            },
            handleSearch(searchText) {
                this.search = searchText;
                this.getHotelList();
            },

            getStarList(item) {
                this.hotelGrade = item;
                this.getHotelList();
            },

            handleCheckedGrade() {
                this.getHotelList();
            },

            handleSelectionChange(val) {
                this.rowChecked = Array.from(new Set([...val, ...this.rowChecked]));
            },
            savePublish() {
                if (this.checkParams()) {
                    var tempHotList = [];
                    for (var i = 0; i < this.detailsInfo.hotels.length; i++) {
                        if (this.detailsInfo.hotels[i].deleteStatus == 0) {
                            tempHotList.push(this.detailsInfo.hotels[i]);
                        }
                    }
                    console.log(this.detailsInfo.hotels, "<<<<PPP>>>>", tempHotList);
                    this.itemInfo.onlineTime = moment(this.itemInfo.onlineTime).unix();
                    this.itemInfo.offlineTime = moment(this.itemInfo.offlineTime).unix();
                    // this.itemInfo.hotels = this.rowChecked;
                    this.itemInfo.hotels = tempHotList;


                    var tempHotList1 = tempHotList.map(item => {
                        console.log("AADD", item);
                        this.$delete(item, "deleteStatus");
                        return item;
                    });
                    console.log("修改后的列表", tempHotList1);

                    var hash = {};
                    // this.itemInfo.hotels = this.itemInfo.hotels.reduce(function(item, next) {
                    //     hash[next.hostId] ? '' : hash[next.hostId] = true && item.push(next);
                    //     return item
                    // }, []);
                    if (this.status == 4 || this.status == 5 || this.status == 6) {
                        console.log("更新发布中的merchantId:", this.merchantInfo.merchantId);
                        this.itemInfo.merchantId = this.merchantInfo.merchantId;
                        this.itemInfo.merchantName = this.detailsInfo.merchantName;
                        this.itemInfo.category = this.detailsInfo.category;
                        this.itemInfo.tags = this.detailsInfo.tag;
                        this.itemInfo.province = this.detailsInfo.province.name;
                        this.itemInfo.city = this.detailsInfo.city.name;
                        this.itemInfo.merchantType = this.detailsInfo.merchantType;
                        console.log(this.itemInfo, 'gxpost');
                        contentStore.updateMerchant(this.id, this.itemInfo).then(ret => {
                            console.log(this.itemInfo);
                            this.$router.push("/content/publish-management");
                        }).catch(err => {
                            this.$message.error(`更新失败!${err}`);
                        });
                    } else {
                        this.itemInfo.merchantId = this.id;
                        this.itemInfo.merchantName = this.languageInfo.name;
                        this.itemInfo.category = this.mdetailsInfo.category;
                        this.itemInfo.tags = this.mdetailsInfo.label;
                        this.itemInfo.merchantType = this.mdetailsInfo.merchantType;
                        this.itemInfo.province = this.languageInfo.address.province.name;
                        this.itemInfo.city = this.languageInfo.address.city.name;
                        contentStore.releaseMerchant(this.itemInfo).then(ret => {
                            this.$router.push("/content/publish-management");
                        }).catch(err => {
                            this.$message.error(`发布商户失败!${err}`);
                        });
                    }
                }
            },
            checkParams() {
                if (this.itemInfo.onlineTime == "") {
                    this.$message.error("上线时间必选！");
                    return false;
                }
                if (this.itemInfo.offlineTime == "") {
                    this.$message.error("下线线时间必选！");
                    return false;
                }

                var tempHotList = [];
                for (var i = 0; i < this.detailsInfo.hotels.length; i++) {
                    if (this.detailsInfo.hotels[i].deleteStatus == 0) {
                        tempHotList.push(this.detailsInfo.hotels[i]);
                    }
                }
                if (tempHotList.length == 0) {
                    this.$message.error("请选择上线酒店！");
                    return false;
                }
                var tempOnlineTime = moment(this.itemInfo.onlineTime).unix();
                var tempOfflineTime = moment(this.itemInfo.offlineTime).unix();
                if (tempOnlineTime > tempOfflineTime) {
                    this.$message.error("下线时间要大于上线时间");
                    this.itemInfo.offlineTime = '';
                    return false;
                }
                return true;

            },
            okAddHotel() {
                console.log("zz", this.rowChecked);
                // const tmpHotels = this.hotelCheckList.map((hotel) => {
                const tmpHotels = this.rowChecked.map((hotel) => {
                    return {
                        hostId: hotel.hostId,
                        hotelAddress: hotel.detailAddress,
                        hotelName: hotel.name,
                        status: hotel.status,
                        posOfList: 1,
                        posOfMenu: 0,
                        posOfPicture: 0,
                        deleteStatus: 0,
                    }
                });
                this.detailsInfo.hotels = Array.from(new Set([...this.detailsInfo.hotels, ...tmpHotels]));
                var hash = {};
                this.detailsInfo.hotels = this.detailsInfo.hotels.reduce(function(item, next) {
                    hash[next.hostId] ? '' : hash[next.hostId] = true && item.push(next);
                    return item
                }, []);
                this.addressObj = {};
                this.dialogVisible = false;
            },
            renderTime(time) {
                return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss');
            },
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
            status: {
                get: function() {
                    if (this.$route && this.$route.query) {
                        return this.$route.query.status;
                    } else {
                        return '';
                    }
                }
            },

        },
        created: function() {
            if (!this.id) {
                return;
            }
            this.getHotelList();
            console.log(this.status, this.id, "传过来的id");
            if (this.status == 4 || this.status == 5 || this.status == 6) {
                contentStore.getMerchantRealeaseInfo(this.id).then(res => {
                    this.detailsInfo = res.data;
                    this.detailsInfo.hotels.map(item => {
                        item.status = this.detailsInfo.merchant.status;
                        this.$set(item, "deleteStatus", 0);
                    });
                    console.log(this.rowChecked, "ASSSSSSS");
                    this.merchantInfo.name = this.detailsInfo.merchantName;
                    this.merchantInfo.merchantId = this.detailsInfo.merchantId;
                    this.merchantInfo.category = this.detailsInfo.category;
                    this.merchantInfo.tags = this.detailsInfo.tag;
                    this.itemInfo.onlineTime = new Date(this.detailsInfo.onlineTime * 1000);
                    console.log("默认的上线时间", this.itemInfo.onlineTime);
                    this.itemInfo.offlineTime = new Date(this.detailsInfo.offlineTime * 1000);
                    console.log("默认的上线时间", this.itemInfo.offlineTime);
                }).catch(err => {
                    this.$message.error(`获取数据失败！${err}`);
                });

            } else {
                contentStore.getMerchantInfo(this.id).then(res => {
                    this.mdetailsInfo = res.data;
                    this.languageInfo = this.mdetailsInfo.language[0];
                    this.merchantInfo.name = this.languageInfo.name;
                    this.merchantInfo.category = this.mdetailsInfo.category;
                    this.merchantInfo.tags = this.mdetailsInfo.label;
                }).catch(err => {
                    this.$message.error(`获取数据失败!${err}`);
                });
            }


            hotelStore.getGradList().then(res => {
                this.hotelGradeList = res.data.hotelGrades;
            }).catch(err => {
                this.$message.error(`获取数据失败！${err}`);
            });
        },
        components: {
            VIcon,
            Btn,
            NavBar,
            Dist,
            SearchInput,
        },
}
</script>
