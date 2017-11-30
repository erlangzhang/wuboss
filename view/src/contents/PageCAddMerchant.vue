<style>
.streetInfo .el-input__inner {
    height: 30px;
    margin-top: 2.6px;
}
</style>
<template>
    <div class='layout-container'>
        <NavBar :titleList="titleList"></NavBar>
        <div class='content-header'>
            <VIcon type='appstore' /> {{ !this.id ? '添加商户': '更新商户'}}
            <div class='breadcrumb-header'></div>
        </div>
        <div class="table-container">
            <el-form :model="merchantObj" label-width="110px" ref="merchantObj" :rules='rules'>
                <el-form-item label="商户名称:" prop="name">
                    <el-input v-model="merchantObj.name" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="商户类型:" prop="type">
                    <el-select v-model="merchantObj.type" placeholder="请选择商户类型" @change="getMerchantType">
                        <el-option label="免费" value="0"></el-option>
                        <el-option label="付费" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商户分类:" prop="category">
                    <el-select v-model="merchantObj.category" placeholder="请选择商户分类" @change="getMerchantCat">
                        <el-option v-for="item in categoryList" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商户标签:" prop='label'>
                    <el-checkbox-group v-model="merchantObj.label" @change="getCheckedTags">
                        <el-checkbox v-for="item in  merchantTags" :label="item.name" name="label"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <div v-for="(item,index) in phoneList">
                    <el-form-item label="联系电话:" prop="phone">
                        <el-input v-model="merchantObj.phone" v-show="false"></el-input>
                        <el-input v-model="item.phoneNum" style="width:300px;float:left" placeholder="请输入联系电话"></el-input>
                        <div style="float: left;padding-left: 10px;">
                            <i class="el-icon-plus" v-if="item.phoneNum !=''&& index==phoneList.length-1 && phoneList.length <= 4" @click="addTelephone()"></i></div>
                        <div style="float: left;padding-left: 10px;">
                            <i class="el-icon-minus" v-if="phoneList.length>1" @click="minusTelephone(index)"></i>
                            <!-- item.phoneNum!=''&&  -->
                        </div>
                    </el-form-item>
                </div>
                <div v-for="(openingTimeObj,index) in openingTimeList">
                    <el-form-item label="营业时间:" prop="openTime">
                        <el-input v-model="merchantObj.openTime" v-show="false"></el-input>
                        <OpeningTime @openTimeEvent="addOpenTime" @minusTimeEvent="minusOpenTime" :index="index" :openingTimeObj="openingTimeObj" :length="openingTimeList.length" :openTimeCallBack="openTimeCallBack"></OpeningTime>
                    </el-form-item>
                </div>
                <el-form-item label="商家地址:" prop="address">
                    <el-row type="flex">
                        <Dist :onSelect='addressChange' size="small" level="3" :default-value='merchantObj.address' /></Dist>
                        <el-input class="streetInfo" v-model="street" placeholder="请填写详细地址" style="width: 200px; margin-left: 10px;"></el-input>
                    </el-row>
                </el-form-item>
                <el-form-item label="描述信息:">
                    <el-input v-model="merchantObj.description" placeholder="人均／口味／环境／服务的评分或一句话描述。" style="width: 500px"></el-input>
                </el-form-item>
                <el-form-item label="商家海报:" prop="poster">
                    <el-input v-model="merchantObj.poster" style="width: 220px;" v-show='false'></el-input>
                    <el-row :gutter="20">
                        <!-- v-for="(item,index) in merchantObj.pictures" -->
                        <el-col :span="4" >
                        <div @click="posterIndex(0)">
                            <PicUploadAddMer :multiple="false" :defaultFileList="renderImgList('',posterOne, {})" :uploadSuccess="posterUploadSuccessOne" :beforeUpload="posterBeforeUpload" :filterCondition="filterCondition"/>
                        </div>
                        </el-col>
                        <el-col :span="4">
                        <div @click="posterIndex(1)">
                                <PicUploadAddMer :multiple="false" :defaultFileList="renderImgList('',posterTwo, {})" :uploadSuccess="posterUploadSuccessTwo" :beforeUpload="posterBeforeUpload" :filterCondition="filterCondition"/>
                        </div>
                        </el-col>
                        <el-col :span="4">
                        <div @click="posterIndex(2)">
                                <PicUploadAddMer :multiple="false" :defaultFileList="renderImgList('',posterThree, {})" :uploadSuccess="posterUploadSuccessThree" :beforeUpload="posterBeforeUpload":filterCondition="filterCondition"/>
                        </div>
                        </el-col>
                        <el-col :span="4">
                        <div @click="posterIndex(3)">
                                <PicUploadAddMer :multiple="false" :defaultFileList="renderImgList('',posterFour, {})" :uploadSuccess="posterUploadSuccessFour" :beforeUpload="posterBeforeUpload":filterCondition="filterCondition"/>
                                 </div>
                        </el-col>
                        <el-col :span="4">
                        <div @click="posterIndex(4)">
                                <PicUploadAddMer :multiple="false" :defaultFileList="renderImgList('',posterFive, {})" :uploadSuccess="posterUploadSuccessFive" :beforeUpload="posterBeforeUpload":filterCondition="filterCondition"/>
                        </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <div style="padding-left: 8px;">竖版海报：274*432</div>
                        </el-col>
                        <el-col :span="4">
                            <div style="padding-left: 8px;">横版海报：274*206</div>
                        </el-col>
                        <el-col :span="4">
                            <div style="padding-left: 8px;">二维码：324*343</div>
                        </el-col>
                        <el-col :span="4">
                            <div style="padding-left: 8px;">商户商标：109*109</div>
                        </el-col>
                        <el-col :span="4">
                            <div style="padding-left: 8px;">首页推荐海报：430*280</div>
                        </el-col>
                    </el-row>
                </el-form-item>
                <div v-for="(item,index) in merchantObj.customCategory">
                    <el-form-item v-bind:label='"自定义分类"+(index +1) +":"' prop='customCategoryString'>
                        <el-input v-model="merchantObj.customCategoryString" v-show="false"></el-input>
                        <Category @allCateList="allCateList" @minusCateEvent="minusCategory" :customCategoryItem="item" :index="index" :customCategory="merchantObj.customCategory" :customCategoryCallback="customCategoryCallback">
                        </Category>
                        <span>图片尺寸：260*260</span>
                    </el-form-item>
                </div>
                <el-form-item label="如何到达:" prop="map">
                    <el-input v-model="merchantObj.map" v-show="false"></el-input>
                    <el-row>
                        <div  @click="posterIndex(100)">
                            <PicUploadAddMer :uploadSuccess="iconMapUploadSuccess" :defaultFileList="renderImgList('', merchantObj.routepic, {})" :beforeUpload="iconBeforeUpload" :filterCondition="filterCondition"/>
                        </div>
                    </el-row>
                    <el-row>
                        <span>图片尺寸:911*407</span>
                    </el-row>
                </el-form-item>
                <el-form-item label="交通信息" prop="traffic">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="merchantObj.traffic" style="width: 200px;">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleAction('merchantObj','preview')">预览</el-button>
                    <el-button type="primary" @click="handleAction('merchantObj','commit')">提交审核</el-button>
                </el-form-item>
            </el-form>
            <el-dialog title="" v-model="dialogVisible" size="normal" class="preview" @close="handleClose">
                <Preview :previewData="previewData"></Preview>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import {
    VIcon,
    Dist,
    Category,
    Telephone,
    OpeningTime,
    PicUploadAddMer,
    PicAppearAddMer,
    Preview,
    NavBar,
} from "../components";
import {
    contentStore
} from "../stores";
import moment from 'moment';
import {
    mapGetters,
    mapActions
} from 'vuex';
export default {
    data() {
            return {
                filterCondition: null,
                previewData: {},
                titleList: ["内容管理", "本地生活圈", "商户库", "添加商户"],
                dialogVisible: false,
                posterPics: [],
                postIndex: -1,
                textarea: ' ',
                imageUrl: ' ',
                phoneList: [{
                    phoneNum: '',
                }],
                openingTimeList: [{
                    day: "",
                    sTime: "",
                    eTime: "",
                }],
                language: [], //语言
                categoryList: [{
                    name: '',
                    childs: [],
                }],
                nameTabs: [],
                nameTabsValue: '免费',
                merchantTags: [],
                merchantTagList: [],
                street: '',

                posterOne:[],
                posterTwo:[],
                posterThree:[],
                posterFour:[],
                posterFive:[],

                merchantObj: {
                    name: '',
                    type: '',
                    category: '',
                    label: [],
                    phone: '1',
                    openTime: '2017',
                    address: {},
                    street: '',
                    description: '',
                    poster: '海报',
                    
                    pictures: [
                        [],
                        [],
                        [],
                        [],
                        [],
                    ],
                    customCategoryString: '自定义分类',
                    customCategory: [{
                        name: '',
                        pictures: [],
                    }, ],
                    routepic: [],
                    map: '地图',
                    traffic: '',
                },
                typeList: [29, 26, 27, 24, 25], //29:竖版大海报,26:横版小海报，27：二维码，24：logo,25:横版大海报
                typeMap: 28, //28：地图
                rules: {
                    name: [{
                        required: true,
                        message: '商户名称必填',
                        trigger: 'blur',
                    }, ],
                    type: [{
                        required: true,
                        // trigger: 'blur',
                        message: '商户类型必选',
                    }, ],
                    category: [{
                        required: true,
                        message: '商户分类必选',
                    }, ],
                    label: [{
                        required: true,
                        message: '至少选择一个商户标签',
                    }, ],
                    phone: [{
                        required: true,
                        message: '',
                    }, ],
                    openTime: [{
                        required: true,
                        message: '',
                    }, ],
                    address: [{
                        required: true,
                        message: '',
                    }, ],
                    poster: [{
                        required: true,
                        message: '',
                    }, ],
                    customCategoryString: [{
                        required: true,
                        message: '',
                    }, ],
                    customCategory: [{
                        required: true,
                        message: '',
                    }, ],
                    map: [{
                        required: true,
                        message: '',
                    }, ],
                    traffic: [{
                        required: true,
                        message: '交通信息必填',
                    }, ],

                },
            };
        },
        watch:{
            // postIndex(){
            // }
        },
        methods: {
            ...mapActions({
                setSubmenuIndex: 'content/SET_SUB_MENU_INDEX'
            }),
            checkParams() {
                if (this.merchantObj.name.trim() == '') {
                    this.$message.error("商户名称不能为空！");
                    return false;
                }
                if (this.merchantObj.type == "") {
                    this.$message.error("商户类型必选！");
                    return false;
                }
                if (this.merchantObj.category == "") {
                    this.$message.error("商户分类必选！");
                    return false;
                }
                if (this.merchantObj.label.length == 0) {
                    this.$message.error("商户标签必选！");
                    return false;
                }
                for (var i = 0; i < this.phoneList.length; i++) {
                    if (this.phoneList[i].phoneNum == "" || isNaN(parseInt(this.phoneList[i].phoneNum.replace(/-/g, ''))) == true) {
                        this.$message.error("请检查电话号码！");
                        return false;
                    }
                }
                for (var i = 0; i < this.openingTimeList.length; i++) {
                    if (this.openingTimeList[i].day == "" || this.openingTimeList[i].sTime == "" || this.openingTimeList[i].eTime == "") {
                        this.$message.error("请检查营业时间！");
                        return false;
                    }
                }

                if (!this.merchantObj.address.province) {
                    this.$message.error("商家地址至少选省！");
                    return false;
                }

                if (this.merchantObj.address.province.name == "") {
                    this.$message.error("商家地址至少选省！");
                    return false;
                }
                this.posterPics=[];
                this.posterPics.push(this.posterOne[0]);
                this.posterPics.push(this.posterTwo[0]);
                this.posterPics.push(this.posterThree[0]);
                this.posterPics.push(this.posterFour[0]);
                this.posterPics.push(this.posterFive[0]);

                for (var i = 0; i < this.posterPics.length; i++) {
                    if (this.posterPics[i] == undefined) {
                        this.$message.error("商家海报必须上传图片！");
                        return false;
                    }
                }
                for (var i = 0; i < this.posterPics.length; i++) {
                    this.$set(this.posterPics[i], "type", this.typeList[i]);
                }
                for (var i = 0; i < this.merchantObj.customCategory.length; i++) {
                    if (this.merchantObj.customCategory[i].name.trim() == "" || this.merchantObj.customCategory[i].pictures.length == 0) {
                        this.$message.error("请检查分类！");
                        return false;
                    }
                }
                if (this.merchantObj.routepic.length == 0) {
                    this.$message.error("请上传地图图片！");
                    return false;
                }
                if (this.merchantObj.traffic == "") {
                    this.$message.error("请填写交通信息！");
                    return false;
                }
                return true;
            },
            timeToSec(time) {
                var s = null;
                var hour = time.split(':')[0];
                var min = time.split(':')[1];
                s = Number(hour * 3600) + Number(min * 60);
                return s;
            },
            handleAction(formName, action) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.checkParams()) {
                            this.merchantObj.address.street = this.street;
                            if (this.merchantObj.type == "免费") {
                                this.merchantObj.type = "0";
                            } else if (this.merchantObj.type == "付费") {
                                this.merchantObj.type = "1";
                            }

                            var collectedObj = {
                                chargetype: parseInt(this.merchantObj.type),
                                category: this.merchantObj.category,
                                label: this.merchantObj.label,
                                phone: this.phoneList.map(item => {
                                    return item.phoneNum;
                                }),
                                biztime: this.openingTimeList.map(item => {
                                    return item.day + " " + item.sTime + "-" + item.eTime;
                                }),
                                language: [{
                                    lang: 'chi',
                                    name: this.merchantObj.name.trim(),
                                    address: this.merchantObj.address,
                                    description: this.merchantObj.description,
                                    pictures: this.posterPics,
                                    customCategory: this.merchantObj.customCategory,
                                    routepic: this.merchantObj.routepic[0],
                                    routeinfo: this.merchantObj.traffic,
                                }, ],
                            };
                            console.log("提交的数据", collectedObj);
                            switch (action) {
                                case 'preview':
                                    this.preview(collectedObj);
                                    break;
                                case 'commit':
                                    this.commitData(collectedObj);
                                    break;
                            }
                        }
                    }
                });
            },
            preview(collectedObj) {
                this.dialogVisible = true;
                this.previewData = collectedObj;
            },
            commitData(data) {
                if (this.id) {
                    contentStore.updateMerchantInfo(this.id, data).then(res => {
                        this.$router.push('/content/all-merchant');
                        this.setSubmenuIndex({
                            submenuIndex: '/content/all-merchant',
                        });
                    }).catch(err => {
                        this.$message.error(`更新失败!${err}`);
                    });
                } else {
                    contentStore.createMerchants(data).then(res => {
                        this.$router.push('/content/all-merchant');
                        this.setSubmenuIndex({
                            submenuIndex: '/content/all-merchant',
                        });
                    }).catch(err => {
                        this.$message.error(`创建失败!${err}`);
                    });
                }
            },
            posterUploadSuccessOne(fileList) {
                this.posterOne = fileList;
            },
            posterUploadSuccessTwo(fileList) {
                this.posterTwo = fileList;
            },
            posterUploadSuccessThree(fileList) {
                this.posterThree = fileList;
            },
            posterUploadSuccessFour(fileList) {
                this.posterFour = fileList;
            },
            posterUploadSuccessFive(fileList) {
                this.posterFive = fileList;
            }, 
            posterIndex(index) {
                this.postIndex = index;
                switch (index) {
                    case 0:
                        this.filterCondition = {
                            width: 274,
                            height: 432
                        }
                        break;
                    case 1:
                        this.filterCondition = {
                            width: 274,
                            height: 206
                        }
                        break;
                    case 2:
                        this.filterCondition = {
                            width: 324,
                            height: 343
                        };
                        break;
                    case 3:
                        this.filterCondition = {
                            width: 109,
                            height: 109
                        };
                        break;
                    case 4:
                        this.filterCondition = {
                            width: 430,
                            height: 280
                        };
                        break;
                    case 100:
                        this.filterCondition = {
                            width: 911,
                            height: 407
                        };
                        break;
                }
            },
            customCategoryCallback(data) {
                this.customCategory = data;
            },
            getCheckedTags(data) {
                this.merchantObj.label = data;
            },
            openTimeCallBack(day, sTime, eTime, index) {
                this.openingTimeList[index].day = day;
                this.openingTimeList[index].sTime = sTime;
                this.openingTimeList[index].eTime = eTime;
            },
            getMerchantType(data) {

            },
            posterBeforeUpload(file) {},
            iconBeforeUpload(file) {
                const isOutSize = file.size / 1024 / 1024 > 2;
                if (isOutSize)
                    this.$message.error('上传 图片大小不能超过 2MB!');
                return !isOutSize;
            },
            iconMapUploadSuccess(fileList) {
                this.merchantObj.routepic = fileList;
                this.merchantObj.routepic.map(item => {
                    item.type = 28;
                });
            },
            renderImgList(type, list, {}) {
                return list;

            },
            getMerchantCat(data) {
                this.merchantObj.category = data;
                for (var i = 0; i < this.categoryList.length; i++) {
                    if (this.categoryList[i].name == data) {
                        this.merchantTags = this.categoryList[i].childs;
                    }
                }
            },
            allCateList(data) {
                // this.customCategory = data;
            },
            minusCategory(index) {
                this.customCategory.splice(index, 1);
            },
            addTelephone(data) {
                var temp = {
                    phoneNum: '',
                }
                this.phoneList.push(temp);
            },
            minusTelephone(index) {
                this.phoneList.splice(index, 1);
            },
            addOpenTime(data) {
                this.openingTimeList.push(data);
            },
            minusOpenTime(index) {
                this.openingTimeList.splice(index, 1);
            },
            addressChange(obj) {
                this.merchantObj.address = obj;
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleClose() {
                this.dialogVisible = false;
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
        components: {
            VIcon,
            Dist,
            Category,
            Telephone,
            OpeningTime,
            PicUploadAddMer,
            PicAppearAddMer,
            Preview,
            NavBar,
        },
        mounted(){
        },
        created() {
            Promise.all([
                contentStore.listLanguage(),
                contentStore.listAllCategory(),
            ]).then(results => {
                this.language = results[0].data;
                this.categoryList = results[1].data.docs;
            }).catch(err => {
                this.$message.error(`获取商户分类数据失败！${err}`);
            });

            if (!this.id)
                return;
            contentStore.getMerchantInfo(this.id).then(ret => {
                this.merchantObj.name = ret.data.language[0].name;
                this.merchantObj.type = ret.data.chargetype == 0 ? '免费' : '付费';
                this.merchantObj.category = ret.data.category;
                this.merchantObj.label = ret.data.label;
                this.merchantTags = ret.data.label.map(item => {
                    return {
                        name: item
                    }
                });

                this.phoneList = ret.data.phone.map(item => {
                    return {
                        phoneNum: item
                    };
                });

                this.openingTimeList = ret.data.biztime.map(item => {
                    var tmp = item.split(" ");
                    return {
                        day: tmp[0],
                        sTime: tmp[1].split("-")[0],
                        eTime: tmp[1].split("-")[1],
                    }
                });
                this.$set(this.merchantObj, "address", {
                    province: {
                        id: ret.data.language[0].address.province.id,
                        name: ret.data.language[0].address.province.name,
                    },
                    city: {
                        id: ret.data.language[0].address.city.id,
                        name: ret.data.language[0].address.city.name,
                    },
                    dist: {
                        id: ret.data.language[0].address.dist.id,
                        name: ret.data.language[0].address.dist.name,
                    },
                });

                this.street = ret.data.language[0].address.street;
                this.merchantObj.description = ret.data.language[0].description;
                this.merchantObj.pictures = ret.data.language[0].pictures.map(item => {
                    return [item];
                });
                this.posterOne = this.merchantObj.pictures[0];
                this.posterTwo = this.merchantObj.pictures[1];
                this.posterThree = this.merchantObj.pictures[2];
                this.posterFour = this.merchantObj.pictures[3];
                this.posterFive = this.merchantObj.pictures[4];

                this.merchantObj.customCategory = ret.data.language[0].customCategory;
                this.merchantObj.routepic = [ret.data.language[0].routepic];
                this.merchantObj.traffic = ret.data.language[0].routeinfo;
            }).catch(err => {
                this.$message.error(`获取详情数据失败！${err}`);
            });

        }
}
</script>
