<style>
.details-depict {
    margin-top: 20px;
    font-size: 10px;
}

.operation {
    margin-left: 20px;
}

.detail-align {
    width: 100px;
    /*background-color: red;*/
    text-align: right;
    color: gray;
    font-size: 10px;
}

.content-details table tr td {
    font-weight: 300;
    font-size: 8px
}

.highlight {
    color: #FFA724;
    text-align: center;
    padding-right: 5px;
}
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>
                    <span @click='focusIndex()'>
                    <VIcon class='breadcrumb-icon' type='home' /> 首页
                    </span>
                </el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
            <div class='breadcrumb-header'></div>
        </div>
        <div class='content-header'>
            <VIcon type='info-circle-o' /> 发布详情
            <div class='breadcrumb-header'></div>
        </div>
        <div class="content-details">
            <div class="details-depict">
                <el-form label-width="120px" class="demo-ruleForm">
                    <el-form-item label="活动名称:" prop="name">
                        <span>{{detailsInfo.name}}</span>
                    </el-form-item>
                    <el-form-item label="项目描述:">
                        <span>{{detailsInfo.description}}</span>
                    </el-form-item>
                    <el-form-item label="上线时间:" prop="name">
                        <span>{{renderTime(detailsInfo.onlineTime)}}</span>
                    </el-form-item>
                    <el-form-item label="下线时间:" prop="name">
                        <span>{{renderTime(detailsInfo.offlineTime)}}</span>
                    </el-form-item>
                    <el-form-item label="父级栏目:" prop="name">
                        <el-button @click="columnClick('parent')" type="text">{{detailsInfo.targetParent.name}}</el-button>
                    </el-form-item>
                    <el-form-item label="对应EPG版本:" prop="name">
                        <el-tag v-for="tag in columnEpgs" type="primary" style="margin-right: 10px">
                            {{tag}}
                        </el-tag>
                    </el-form-item>
                    <el-form-item label="发布内容:" prop="name">
                        <el-button @click="columnClick('column')" type="text">{{this.renderColumnName()}}</el-button>
                    </el-form-item>
                    <el-form-item label="栏目位置:" prop="name">
                        <span>{{detailsInfo.position}}</span>
                    </el-form-item>
                    <el-form-item label="发布酒店:" prop="name">
                        <span v-if="isShow() === true">共发布 <span style="color: blue;">{{selectHotels.length}}</span> 家酒店。
                        <el-badge v-for="(item, index) of detailsInfo.hotelStatus" :value="item.count" v-if="detailsInfo.hotelStatus.lengt !== 0 && item.count !== 0" class="item" style="margin-right: 10px;">
                            <el-tag :type="renderTagType(item.name)">{{ renderStatus(item.name) }}</el-tag>
                        </el-badge>
                        </span>
                        <span v-if="isShow() === false">共发布 <span style="color: blue;">{{selectHotels.length}}</span> 家酒店。当前状态 <span style="color: red;">{{renderStatus(detailsInfo.status)}} </span>。未发布</span>
                        <span v-if="detailsInfo.hotelStatus.length !== 0">共发布 <span style="color: blue;">{{selectHotels.length}}</span> 家酒店。<span style="color: blue;">发布成功 {{renderStatusCount('RELEASED')}} 家，</span><span style="color: red;">发布失败 {{renderStatusCount('TRELEASEERROR')}} 家；</span><span style="color: blue;">已上线 {{renderStatusCount('ONLINE')}} 家，</span><span style="color: red;">上线失败 {{renderStatusCount('ONLINEERROR')}} 家。</span><span style="color: blue;">已下线 {{renderStatusCount('OFFLINED')}} 家。</span><span style="color: red;">下线失败 {{renderStatusCount('OFFLINEDERROR')}} 家。</span></span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class='table-container'>
            <el-table :data="detailsInfo.hotels" border v-loading="loading" style="width: 100%">
                <el-table-column label="地区" prop="hostId">
                </el-table-column>
                <el-table-column label="酒店名称" prop="name" required>
                </el-table-column>
                <el-table-column prop="detailAddress" label="地区">
                </el-table-column>
                <el-table-column prop="agency" label="所属办事处">
                </el-table-column>
                <el-table-column prop="stars" label="酒店等级">
                </el-table-column>
                <el-table-column prop="hotelType" label="酒店类型" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="epgVersion" label="EPG版本">
                </el-table-column>
                <el-table-column prop="tags" label="标签">
                </el-table-column>
                <el-table-column label="状态">
                    <template scope="scope">
                        <span><el-tag :type="renderTagType(scope.row.status)">{{renderStatus(scope.row.status)}}</el-tag></span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" show-overflow-tooltip>
                    <template scope="scope">
                        <a href="javascript:;" @click="publishAgain(scope.row)" v-if="scope.row.status != 'RELEASED'" class="delete-btn">
                            <VIcon type="edit" class='iconfont-button' />重发
                        </a>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-pagination">
                <el-pagination :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" @current-change='handleCurPageChange' @size-change='handlePageSizeChange'>
                </el-pagination>
            </div>
        </div>
        <div class="operation">
            <el-button type="primary">{{renderStatus(detailsInfo.status)}}</el-button>
            <el-button @click="gotoContentList()">返回</el-button>
        </div>
    </div>
</template>
<script>
import {
    VIcon
} from '../components';
import {
    contentStore,
    hotelStore
} from '../stores';
import {
    mapActions
} from 'vuex';
import funcTool from '../common';
export default {
    data() {
            return {
                loading: false,
                hotels: [],
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },
                hotelSource: [],

                detailsInfo: {
                    releaseId: "",
                    name: "",
                    onlineTime: 0,
                    offlineTime: 0,
                    targetParent: {},
                    column: {
                        // columnId: 20222,
                        // name: "酒店服务"
                    },
                    position: 0,
                    hotels: [],
                    description: "",
                    isColumnTree: false,
                    status: '',
                    hotelStatus: [],
                },
                columnEpgs: [],
                selectHotels: [], // 选择发布的酒店
            };
        },
        computed: {
            id: {
                get: function() {
                    if (this.$route && this.$route.query)
                        return this.$route.query.id;
                    else
                        return '';
                }
            }
        },
        created: function() {
            if (!this.id) {
                return;
            }

            contentStore.getReleaseDetail(this.id).then(res => {
                this.detailsInfo = res.data;
                this.pagination.total = res.data.hotels.length;
                this.selectHotels = res.data.hotels;
                this.columnEpgs = [];
                if (this.detailsInfo.isColumnTree) {
                    contentStore.retrieveColumnTree(this.detailsInfo.column.columnId).then(ret => {
                        this.detailsInfo.column = ret.data;
                        console.log("栏目树id结果>>>>>>>>", this.detailsInfo.column);
                        this.columnEpgs.push(`Epg ${this.detailsInfo.column.style}`);
                    }).catch(error => {
                        this.$message.error(`获取发布内容失败！${error}`);
                    })
                } else {
                    contentStore.getItemInfo(this.detailsInfo.column.columnId).then(ret => {
                        this.detailsInfo.column = ret.data;
                        console.log("栏目id结果>>>>>>>>", this.detailsInfo.column);
                        if (!this.detailsInfo.column.style)
                            return;
                        this.detailsInfo.column.style.forEach(item => {
                            this.columnEpgs.push(`Epg ${item.styleName}`);
                        })
                    }).catch(error => {
                        this.$message.error(`获取发布内容失败！${error}`);
                    })
                }
                if (this.id) {
                    this.getHotelList();
                }

                // this.columnEpgs = [];
                // if (this.detailsInfo.isColumnTree) {
                //  this.columnEpgs.push(`Epg ${item.style}`);
                // } else {
                //  if (!this.detailsInfo.column.style)
                //      return;
                //  this.detailsInfo.column.style.forEach(item => {
                //      this.columnEpgs.push(`Epg ${item.styleName}`);
                //  })
                // }
            }).catch(err => {
                this.$message.error(`获取数据失败！${err}`);
            });
            if (!this.id) {
                this.getHotelList();
            }
        },
        methods: {
            ...mapActions({
                setMenuIndex: 'hotel/SET_CUR_EDIT_ID',
            }),
            focusIndex() {
                this.$router.push('/');
                this.setMenuIndex({
                    curEditId: '1'
                });
            },
            renderColumnName() {
                if (this.detailsInfo.isColumnTree) {
                    return this.detailsInfo.column.name;
                } else {
                    if (!this.detailsInfo.column.language || this.detailsInfo.column.language.length === 0)
                        return '';
                    return this.detailsInfo.column.language[0].name;
                }
            },
            isShow() {
                for (const item of this.detailsInfo.hotelStatus) {
                    if (item.count !== 0) {
                        return true;
                    }
                }
                return false;
            },
            renderStatus(status) {
                switch (status) {
                    case 'UNRELEASED':
                        return '未发布';
                    case 'UNAPPROVED':
                        return '待审核';
                    case 'APPROVEDERROR':
                        return '审核未通过';
                    case 'APPROVED':
                        return '已审核';
                    case 'RELEASED':
                        return '发布成功';
                    case 'RELEASEERROR':
                        return '发布失败';
                    case 'ONLINE':
                        return '已上线';
                    case 'ONLINEERROR':
                        return '上线失败';
                    case 'OFFLINED':
                        return '已下线';
                    case 'OFFLINEDERROR':
                        return '下线失败';
                    default:
                        return '未选择';

                }
            },
            renderTagType(status) {
                switch (status) {
                    case 'APPROVEDERROR':
                    case 'RELEASEERROR':
                    case 'ONLINEERROR':
                    case 'OFFLINEDERROR':
                        return 'danger';
                    default:
                        return 'primary';
                }
            },
            columnClick(type) {
                switch (type) {
                    case 'parent':
                        {
                            this.$router.push(`/content/new-item?id=${this.detailsInfo.targetParent.targetParentId}`);
                            break;
                        }
                    case 'column':
                        {
                            if (this.detailsInfo.isColumnTree) {
                                this.$router.push(`/content/new-item-tree?id=${this.detailsInfo.column.columnTreeId}`);
                            } else {
                                this.$router.push(`/content/new-item?id=${this.detailsInfo.column.columnId}`);
                            }
                            break;
                        }
                }
            },
            renderTime(unix) {
                return funcTool.renderTime(unix);
            },
            renderStatusCount(statusType) {
                for (const item of this.detailsInfo.hotelStatus) {
                    if (item.name === statusType) {
                        return item.count;
                    }
                }
                return 0;
            },

            publishAgain(hotelObj) {
                console.log("this.detailsInfo详情对象", this.detailsInfo);
                const tmp = JSON.parse(JSON.stringify(this.detailsInfo));
                console.log("tmp JSON数据", tmp);
                //转换数组
                tmp.hotels = [{
                    hostId: hotelObj.hostId
                }];
                console.log("酒店对象:>>>", tmp.hotels);

                delete tmp.releaseId;
                delete tmp.createdAt;
                delete tmp.updatedAt;
                if (tmp.isColumnTree) {
                    tmp.columnId = tmp.column.columnTreeId;
                } else {
                    tmp.columnId = tmp.column.columnId;
                }
                delete tmp.column;
                tmp.targetParentId = tmp.targetParent.targetParentId;
                delete tmp.targetParent;

                console.log("剩下的数据tmp>>", tmp)
                contentStore.release(tmp).then(ret => {
                    this.$router.push('/content');
                }).catch(err => {
                    this.$message.error(`发布错误${err}`);
                });
            },
            handleCurPageChange(val) {
                this.pagination.currentPage = val;
                this.getHotelList();
            },
            handlePageSizeChange(val) {
                this.pagination.pageSize = val;
                this.getHotelList();
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
            getHotelList() {
                // 获取酒店数据
                const tmpHotelSource = [];
                const tmpHotelId = [];
                const start = (this.pagination.currentPage - 1) * this.pagination.pageSize;
                for (let i = start; i < start + this.pagination.pageSize; ++i) {
                    if (i >= this.selectHotels.length) {
                        break;
                    }
                    tmpHotelId.push(this.selectHotels[i].hostId);
                    tmpHotelSource.push(this.selectHotels[i]);
                }
                this.loading = true;
                hotelStore.getHotelList({
                    hostIds: tmpHotelId.toString(),
                }).then(res => {
                    this.loading = false;
                    if (res.code === 0) {
                        const tmp = res.data.docs.map((hotel) => {
                            hotel.address = `${hotel.province}${hotel.city}${hotel.county}${hotel.detailAddress}`;
                            return hotel;
                        });
                        tmp.forEach(item => {
                            tmpHotelSource.forEach(item1 => {
                                if (item1.hostId === item.hostId) {
                                    item.status = item1.status;
                                    item.retryCount = item1.retryCount;
                                    item.startTime = item1.startTime;
                                    item.endTime = item1.endTime;
                                }
                            });
                        })
                        this.detailsInfo.hotels = tmp;

                    } else {
                        this.$message.error(res.message);
                    }
                }).catch(err => {
                    this.loading = false;
                    this.$message.error(`获取酒店数据失败!${err}`);
                });
            },

            gotoContentList() {
                this.$router.push("/content");
            },
        },
        components: {
            VIcon,
        },

}
</script>
