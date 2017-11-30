<style>
.preview .el-dialog__body {
    padding: 0px;
}

.preview .layout-container {
    margin: 0px;
}
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <NavBar :titleList="titleList"></NavBar>
        </div>
        <div class='content-header' @click="gotoAllMerchant()">
            <i class="el-icon-arrow-left"></i> 返回列表
        </div>
        <el-form ref="form" :model="detailsInfo" label-width="100px">
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
            <el-form-item label="商家海报:">
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
                <img :src="languageInfo.map" style="background-color: lightblue;width: 400px;height: 180px;"></img>
            </el-form-item>
            <el-form-item label="交通信息:">
                <span>{{languageInfo.routeinfo}}</span>
            </el-form-item>
            <el-form-item>
                <el-button @click="handlePreview">预览</el-button>
                <el-button type="primary" @click='gotoAddMerchant'>编辑</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="" v-model="dialogVisible" size="small" style="height: 550px;overflow: hidden" class="preview" @close="closeDialog">
            <Preview :previewData="previewData"></Preview>
        </el-dialog>
    </div>
</template>
<script>
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
                titleList: ["内容管理", "本地生活圈", "商户库", "商户详情"],
                dialogVisible: false,
                detailsInfo: {},
                languageInfo: {},
                previewData: {},
                phoneList: [{
                    phoneNum: '',
                }],
                openingTimeList: [{
                    day: "",
                    time: "",
                }],
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
        methods: {
            gotoAllMerchant() {
                this.$router.push("/content/all-merchant");
            },
            handlePreview() {
                this.dialogVisible = true;
                var collectedObj = {
                    chargetype: parseInt(this.detailsInfo.chargetype),
                    category: this.detailsInfo.category,
                    label: this.detailsInfo.label,
                    phone: this.detailsInfo.phone,
                    biztime: this.detailsInfo.biztime,
                    language: [{
                        lang: 'chi',
                        name: this.languageInfo.name,
                        address: this.languageInfo.address,
                        description: this.detailsInfo.description,
                        pictures: this.languageInfo.pictures,
                        customCategory: this.languageInfo.customCategory,
                        routepic: this.languageInfo.mapObj,
                        routeinfo: this.languageInfo.routeinfo,
                    }, ],
                };
                this.previewData = collectedObj;
            },
            gotoAddMerchant() {
                this.$router.push("/content/add-merchant?id=" + this.id);
            },
            closeDialog() {
                this.dialogVisible = false;
            },
        },

        created: function() {
            if (!this.id) {
                return;
            }
            contentStore.getMerchantInfo(this.id).then(res => {
                this.detailsInfo = res.data;
                this.detailsInfo.chargeTypeText = this.detailsInfo.chargetype == 0 ? "免费" : "付费";
                this.languageInfo = this.detailsInfo.language[0];
                this.languageInfo.map = this.languageInfo.routepic.url;
                this.languageInfo.mapObj = this.languageInfo.routepic;

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
            }).catch(err => {
                this.$message.error(`获取数据失败!${err}`);
            });

        },
        components: {
            VIcon,
            Btn,
            Preview,
            NavBar,
        },
}
</script>
