<style>
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #cedde6;
}
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <NavBar :titleList="titleList"></NavBar>
        </div>
        <div class='content-header' @click="backToList">
            <i class="el-icon-arrow-left"></i> 返回列表
            <div class='breadcrumb-header'></div>
        </div>
        <el-form>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="酒店名称 : ">
                        <span>{{detailsInfo.hotelName}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="地区 : ">
                        <span>{{detailsInfo.city}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="酒店等级 : "><span>{{detailsInfo.grade}}</span></el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="地址 : "><span>{{detailsInfo.address}}</span></el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-tree :data="detailsCateInfo" :props="defaultProps" :highlight-current="true" @node-click="handleNodeClick"></el-tree>
                </el-col>
                <el-col :span="20">
                    <el-table :data="detailsInfo.merchants" border>
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
            <el-form-item>
                <el-button type="primary" @click="backToList()" style="margin-top:20px">
                    确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {
    VIcon,
    Btn,
    NavBar,
} from '../components';
import {
    contentStore,
} from '../stores';
export default {
    data() {
            return {
                titleList: ["内容管理", "本地生活圈", "商户情况", "酒店发布情况", "查看详情"],
                category: '',
                tag: '',
                detailsInfo: {
                    hostId: "",
                    hotelName: "",
                    city: "",
                    grade: "",
                    address: "",
                    merchants: [],
                },
                detailsCateInfo: [],
                defaultProps: {
                    children: 'childs',
                    label: 'name'
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
            contentStore.listAllCategory().then(res => {
                this.detailsCateInfo = res.data.docs;
                this.fetch();
            }).catch(err => {
                this.$message.error(`获取分类数据失败！${err}`);
            });
        },
        methods: {
            fetch() {
                const params = {
                    id: this.id,
                }
                if (this.category != '') {
                    params.category = this.category;
                }
                if (this.tag != '') {
                    params.tag = this.tag;
                }

                contentStore.getHotelMerchantInfo(params).then(res => {
                    this.detailsInfo = res.data;
                }).catch(err => {
                    this.$message.error(`获取数据失败！${err}`);
                });
            },
            backToList() {
                this.$router.push("/content/hotel-publish-status");
            },
            handleNodeClick(data) {
                if (data.childs) {
                    this.category = data.name;
                    this.tag = '';
                } else {

                    this.tag = data.name;
                    for (var i = 0; i < this.detailsCateInfo.length; i++) {
                        if (this.detailsCateInfo[i].childs) {
                            for (var j = 0; j < this.detailsCateInfo[i].childs.length; j++) {
                                if (this.detailsCateInfo[i].childs[j].name == this.tag) {
                                    this.category = this.detailsCateInfo[i].name;
                                }
                            }

                        }
                    }
                }
                this.fetch();
            },
        },
        components: {
            VIcon,
            Btn,
            NavBar,
        },
}
</script>
