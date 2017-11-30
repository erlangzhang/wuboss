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
            <el-form-item label="商户名称 : ">
                <span>{{languageInfo.name}}</span>
            </el-form-item>
            <el-form-item label="商户类型 : ">
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
            <el-form-item label="描述信息 : ">
                <span>{{languageInfo.description}}</span>
            </el-form-item>
            <el-form-item label="商家地址 : ">
                <span>{{detailsInfo.addressText}}</span>
            </el-form-item>
            <el-form-item label="商家海报 : ">
                <ul style="float: left;font-size: 0;">
                    <li v-for="item in languageInfo.pictures" style="float: left">
                        <img v-bind:src="item.url" style="width: 150px;height: 150px;margin: 3px;background-color: lightblue;">
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="分类海报 : ">
                <div v-for="(item,index) in languageInfo.customCategory">
                    <p>{{item.name}}</p>
                    <ul class="clear">
                        <li v-for="itemChild in item.pictures" style="float: left;">
                            <img v-bind:src="itemChild.url" style="width: 150px;height: 150px;background-color: lightblue;">
                        </li>
                    </ul>
                </div>
            </el-form-item>
            <el-form-item label="如何到达 : ">
                <img v-bind:src="languageInfo.map" style="background-color: lightblue;width: 400px;height: 180px;"></img>
            </el-form-item>
            <el-form-item label="交通信息 : ">
                <span>{{languageInfo.routeinfo}}</span>
            </el-form-item>
            <el-form-item label="上传人 : ">
                <span>{{detailsInfo.upload.operatorName}}</span>
            </el-form-item>
            <el-form-item style="padding-bottom: 30px">
                <el-button type="primary" @click="passedBtn">通过审核</el-button>
                <el-button @click="rejectBtn">驳回</el-button>
            </el-form-item>
        </el-form>
        <el-dialog v-model="rejectdialogVisible">
            <el-form>
                <p>请选择驳回原因:</p>
                <el-checkbox-group :min="0" :max="3" v-model="checkedmessage">
                    <el-checkbox v-for="message in messages" :label="message" :key="message">{{message}}
                    </el-checkbox>
                </el-checkbox-group>
                <el-input type="textarea" placeholder="其它原因说明" v-model="messageObj.description">
                </el-input>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rejectdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="okRejectBtn">确 定</el-button>
            </span>
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
                titleList: ["内容管理", "本地生活圈", "商户审核", "待审核", "进入审核"],
                messages: ["商家名称错误或不明确", "商家信息错误或不全", "海报质量差，上传图片错误"],
                //id:1,
                form: {},
                detailsInfo: {
                    upload: {
                        operatorId: '',
                    },
                },
                languageInfo: {},
                rejectdialogVisible: false,
                messageObj: {
                    description: '',
                },
                checkedmessage: [],
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
            rejectBtn() {
                this.rejectdialogVisible = true;
            },
            backBtn() {
                this.$router.push("/content/unchecked");
            },
            okRejectBtn() {
                var rejectReason = "";
                for (var i = 0; i < this.checkedmessage.length; i++) {
                    rejectReason += this.checkedmessage[i] + ' ';
                }
                rejectReason += this.messageObj.description;

                if (rejectReason.trim() == '') {
                    this.$message.error(`至少有一个驳回理由!`);
                    return;
                }

                console.log(rejectReason, "选择的原因");
                contentStore.updateMerchantStatus(this.id, {
                    status: 2,
                    message: rejectReason,
                }).then(res => {
                    this.$router.push("/content/unchecked");
                }).catch(err => {
                    this.$message.error(`驳回失败!${err}`);
                });
            },
            passedBtn() {
                contentStore.updateMerchantStatus(this.id, {
                    status: 1
                }).then(res => {
                    this.$router.push("/content/passed-tip");
                }).catch(err => {
                    this.$message.error(`更新失败!${err}`);
                });
                setTimeout(() => {
                    this.$router.push("/content/unchecked");
                }, 3000);
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
