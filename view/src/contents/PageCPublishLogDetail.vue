<style>
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
        <el-form>
            <el-form-item label="商户名称："><span>{{detailsInfo.merchantName}}</span></el-form-item>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="商户分类：">
                        <span>{{detailsInfo.category}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商户标签：">
                        <span v-for="item in detailsInfo.tags">{{item+ ' '}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="上线日期：">
                        <span style="color:red">{{renderTime(detailsInfo.onlineTime)}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="下线日期：">
                        <span style="color:red">{{renderTime(detailsInfo.offlineTime)}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="上线的酒店："></el-form-item>
            <el-table :data="detailsInfo.hotels" border>
                <el-table-column label="酒店名称" prop="hotelName"></el-table-column>
                <el-table-column label="地址" prop="hotelAddress"></el-table-column>
                <el-table-column label="上线位置" prop="posOfList"></el-table-column>
                <el-table-column label="图片广告位" prop="posOfPicture"></el-table-column>
                <el-table-column label="文字广告位" prop="posOfMenu"></el-table-column>
            </el-table>
            <el-form-item label="操作人：">{{detailsInfo.userName}}</el-form-item>
            <el-form-item label="操作时间：">{{renderTime(detailsInfo.operatingTime)}}</el-form-item>
            <p style="color:red">红色为新增内容</p>
        </el-form>
    </div>
</template>
<script>
import {
    VIcon,
    NavBar,
} from '../components';
import moment from 'moment';
import {
    contentStore,
} from '../stores';
export default {
    data() {
            return {
                titleList: ["内容管理", "本地生活圈", "商户发布", "发布日志", "查看详情"],
                detailsInfo: {
                    merchantName: "",
                    category: "",
                    tags: [],
                    onlineTime: "",
                    offlineTime: "",
                    userName: "",
                    operatingTime: "",
                    hotels: [],

                },
            }
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
            contentStore.getMerchantRealeaseLog(this.id).then(res => {
                this.detailsInfo = res.data;

            }).catch(err => {
                this.$message.error(`获取数据失败！${err}`);
            });

        },
        methods: {
            renderTime(time) {
                return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss');
            },
            backBtn() {
                this.$router.push("/content/publish-logs");
            },
        },
        components: {
            VIcon,
            NavBar,
        },
}
</script>
