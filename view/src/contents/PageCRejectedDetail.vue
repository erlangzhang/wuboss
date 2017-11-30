<style>
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <NavBar :titleList="titleList"></NavBar>
        </div>
        <div class='content-header' @click="backBtn()">
            <i class="el-icon-arrow-left"></i> 返回列表
        </div>
        <el-form ref='form' :model='form' label-width="100px">
            <el-form-item label="商户名称:">
                <span>{{languageInfo.name}}</span>
            </el-form-item>
            <el-form-item label="商户类型:">
                <span>{{detailsInfo.chargeTypeText}}</span>
            </el-form-item>
            <el-form-item label="商户分类:">
                <span>{{detailsInfo.category}}</span>
            </el-form-item>
            <el-form-item label="商户标签:">
                <span v-for="item of detailsInfo.label">{{item}}</br></span>
            </el-form-item>
            <el-form-item label="联系电话:">
                <span v-for="item of detailsInfo.phone">{{item}}</br></span>
            </el-form-item>
            <el-form-item label="营业时间:">
                <span v-for="item of detailsInfo.biztime">{{item}}</br></span>
            </el-form-item>
            <el-form-item label="描述信息:">
                <span>{{languageInfo.description}}</span>
            </el-form-item>
            <el-form-item label="商家地址:">
                <span>{{detailsInfo.addressText}}</span>
            </el-form-item>
            <el-form-item label="商家海报">
                <ul style="float: left;font-size: 0;">
                    <li v-for="item in languageInfo.pictures" style="float: left">
                        <img v-bind:src="item.url" style="width: 150px;height: 150px;margin: 3px;background-color: lightblue">
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="分类海报:">
                <div v-for="(item,index) in languageInfo.customCategory">
                    <p>{{item.name}}</p>
                    <ul class="clear">
                        <li v-for="itemChild in item.pictures" style="float: left;">
                            <img v-bind:src="itemChild.url" style="width: 150px;height: 150px; margin: 3px;background-color: lightblue">
                        </li>
                    </ul>
                </div>
            </el-form-item>
            <el-form-item label="如何到达:">
                <img v-bind:src="languageInfo.map" style="background-color: lightblue;width: 400px;height: 180px;"></img>
            </el-form-item>
            <el-form-item label="交通信息:">
                <span>{{languageInfo.routeinfo}}</span>
            </el-form-item>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="上传人：">
                        <span>{{detailsInfo.upload.operatorName}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="上传时间：">
                        <span>{{renderTime(detailsInfo.upload.uploadTime)}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="审核人：">
                        <span>{{auditHistoryInfo.operatorName}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="审核时间：">
                        <span>{{renderTime(auditHistoryInfo.auditTime)}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="驳回原因:">
                <span style="color:red">{{auditHistoryInfo.detail}}</span>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import moment from 'moment';
import {
    VIcon,
    Btn,
    Preview,
    NavBar,
} from '../components';
import {
    contentStore,
} from '../stores';
export default {
    data() {
            return {
                titleList: ["内容管理", "本地生活圈", "商户审核", "驳回", "详细信息"],
                form: {},
                //id:1,
                detailsInfo: {
                    upload: {
                        operatorId: '',
                        uploadTime: '',
                    },
                },
                languageInfo: {},
                auditHistoryInfo: {},
            }
        },
        created: function() {
            if (!this.id) {
                return;
            }
            contentStore.getMerchantInfo(this.id).then(res => {
                this.detailsInfo = res.data;
                this.detailsInfo.chargeTypeText = this.detailsInfo.chargetype == 0 ? "免费" : "付费";
                this.languageInfo = this.detailsInfo.language[0];
                this.auditHistoryInfo = this.detailsInfo.auditHistory[0];
                this.languageInfo.map = this.languageInfo.routepic.url;
                this.languageInfo.mapObj = this.languageInfo.routepic;
                console.log("语言对象", this.languageInfo);

                if (this.languageInfo.address.province.name) {
                    this.detailsInfo.addressText = this.languageInfo.address.province.name;
                    if (this.languageInfo.address.city) {
                        this.detailsInfo.addressText += this.languageInfo.address.city.name;
                        if (this.languageInfo.address.dist) {
                            this.detailsInfo.addressText += this.languageInfo.address.dist.name;
                        }
                    }
                }
                this.detailsInfo.addressText += this.languageInfo.address.street;

                console.log(this.detailsInfo.addressText, "详情最后的地址");
            }).catch(err => {
                this.$message.error(`获取数据失败!${err}`);
            });

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
            renderTime(unix) {
                return moment(unix * 1000).format('YYYY-MM-DD HH:mm:ss');
            },

            backBtn() {
                this.$router.push("/content/rejected");
            },

        },
        components: {
            VIcon,
            Btn,
            Preview,
            NavBar,
        },
}
</script>
