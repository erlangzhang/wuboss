<style scoped>
.form-header {
    margin-top: 20px;
    font-weight: normal;
}

.el-form {
    padding: 20px;
}

.tags-container .el-input {
    width: 120px;
}

.tagInput {
    height: 28px;
    border-color: #BFCBD9;
    border-radius: 3px;
    border-width: 1px;
    width: 100px;
}

input.tagInput:focus {
    border-radius: 3px;
    border-width: 1px;
}
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">
                    <VIcon class='breadcrumb-icon' type='home' /> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>酒店管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/hotel' }">酒店列表</el-breadcrumb-item>
                <el-breadcrumb-item>{{ !this.id ? '新增开户': '编辑酒店信息'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class='breadcrumb-header'></div>
        </div>
        <div class='content-header'>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <VIcon type='edit' /> {{ !this.id ? '新增开户': '编辑酒店信息'}}</div>
                </el-col>
            </el-row>
            <h6 class="form-header">酒店信息</h6>
            <div class='breadcrumb-header'></div>
            <el-form label-position='right' label-width='120px' :rules='rules' :model='hotelInfo' ref="hotelInfoForm">
                <el-form-item label="Host ID :" prop='hostId'>
                    <el-input-number v-model='hotelInfo.hostId' :disabled='!!id' :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="酒店名称 :" prop='name'>
                    <el-input v-model='hotelInfo.name'></el-input>
                </el-form-item>
                <el-form-item label="酒店类型 :" prop='hotelTypeSelect'>
                    <el-select v-model="hotelInfo.hotelTypeSelect" placeholder="请选择酒店类型">
                        <el-option label="单体" value="0"></el-option>
                        <el-option label="集团" value="1"></el-option>
                        <el-option label="运营商" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="EPG版本 :" prop='epgVersion'>
                    <!-- <el-select v-model="hotelInfo.epgVersion" placeholder="请选择EPG版本">
                        <el-option v-for='item in EPGVersions' :label="item" :value="item"></el-option>
                    </el-select> -->
                    <el-checkbox-group v-model="hotelInfo.epgVersion">
                        <el-checkbox v-for='item in EPGVersions' :label="item"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="酒店星级 :" prop='stars'>
                    <el-select v-model="hotelInfo.stars" placeholder="请选择酒店星级">
                        <el-option v-for='(item, key) in stars' :label="item" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="携程星级 :" prop='ctripStars'>
                    <el-select v-model="hotelInfo.ctripStars" placeholder="请选择携程星级">
                        <el-option v-for='(item, key) in ctripStars' :label="item" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系人 :" prop='contactName'>
                    <el-input v-model='hotelInfo.contactName'></el-input>
                </el-form-item>
                <el-form-item label="电话号码 :" prop='phoneNumber'>
                    <el-input type='tel' v-model='hotelInfo.phoneNumber'></el-input>
                </el-form-item>
                <el-form-item label="房间数量 :" prop='roomsCount'>
                    <el-input-number v-model="hotelInfo.roomsCount" :min="0" :step='1' :debounce='10'></el-input-number>
                </el-form-item>
                <el-form-item label="描述信息 :" prop='description'>
                    <el-input type="textarea" v-model="hotelInfo.description"></el-input>
                </el-form-item>
                <el-form-item label="地址信息 :" prop='detailAddress'>
                    <dist :on-select='addressChange' :default-value='hotelInfo.addrObj'></dist>
                    <el-input v-model='hotelInfo.detailAddress'></el-input>
                </el-form-item>
                <el-form-item label="坐标信息 :" prop='longitude'>
                    <Location :default-point='{lng:hotelInfo.longitude, lat:hotelInfo.latitude}' @change='locationChange'></Location>
                </el-form-item>
                <el-form-item label="pms厂商 :">
                    <el-input v-model="hotelInfo.pmsManufacturer"></el-input>
                </el-form-item>
                <el-form-item label="立项号 :" prop='projectNum'>
                    <el-input v-model="hotelInfo.projectNum"></el-input>
                </el-form-item>
                <el-form-item label="合同编号 :">
                    <el-input v-model="hotelInfo.contractNo"></el-input>
                </el-form-item>
                <el-form-item label="合同名称 :">
                    <el-input v-model="hotelInfo.contractName"></el-input>
                </el-form-item>
                <el-form-item label="是否开通wifi :" prop="enableUwifiSwitch">
                    <el-switch v-model="hotelInfo.enableUwifiSwitch" on-text="是" off-text="否"></el-switch>
                </el-form-item>
                <el-form-item label="是否开通hms :" prop='enableHmsSwitch'>
                    <el-switch v-model="hotelInfo.enableHmsSwitch" on-text="是" off-text="否"></el-switch>
                </el-form-item>
            </el-form>
            <h6 class="form-header">附属信息</h6>
            <div class='breadcrumb-header'></div>
            <el-form label-position='right' label-width='120px' :rules='rules' :model='hotelInfo' ref='affiliatedForm'>
                <el-form-item label="所属办事处 :" prop='agency'>
                    <el-select v-model="hotelInfo.agency" placeholder="请选择所属办事处">
                        <el-option v-for='item in agency' :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="酒店等级 :" prop='hotelGrade'>
                    <el-select v-model="hotelInfo.hotelGrade" placeholder="请选择酒店等级">
                        <el-option v-for='item in hotelGrade' :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="销售员 :" prop='sales'>
                    <el-input v-model='hotelInfo.sales'></el-input>
                </el-form-item>
                <el-form-item label="酒店标签 :" class="tags-container">
                    <Tag type="border" closable v-for='(tag, index) in hotelInfo.tags' @on-close='delTag(index)'>{{ tag }}</Tag>
                    <!-- <el-input size='small' v-model='curTag' placeholder="请输入标签" icon='plus' :on-icon-click='addTag'></el-input> -->
                    <input class="tagInput" v-model="curTag" placeholder="请输入标签" v-on:keyup.enter="addTag"></input>
                </el-form-item>
            </el-form>
        </div>
        <div class='save-btn-style'>
            <el-button type="primary" @click='checkForm(["hotelInfoForm", "affiliatedForm"])'>保存</el-button>
        </div>
    </div>
</template>
<script>
import Tag from 'iview/src/components/tag';
import {
    VIcon,
    Btn,
    Dist,
    Location
} from '../components';
import {
    hotelStore
} from '../stores';
export default {
    data() {
            return {
                hotelGrade: [],
                agency: [],
                EPGVersions: [],
                stars: {},
                ctripStars: {},
                id: '',
                curTag: '',
                isRequest: false,
                hotelInfo: {
                    hostId: '',
                    name: '',
                    hotelTypeSelect: '0',
                    hotelType: 0,
                    epgVersion: [],
                    stars: '',
                    ctripStars: '',
                    contactName: '',
                    phoneNumber: '',
                    roomsCount: 0,
                    description: '',
                    longitude: 0.0,
                    latitude: 0.0,
                    province: '',
                    city: '',
                    county: '',
                    detailAddress: '',
                    addrObj: {},
                    pmsManufacturer: '',
                    projectNum: '',
                    contractNo: '',
                    contractName: '',
                    enableUwifiSwitch: false,
                    enableHmsSwitch: false,
                    enableHms: 0,
                    enableUwifi: 0,
                    agency: '',
                    hotelGrade: '',
                    sales: '',
                    tags: [],
                },
                rules: {
                    hostId: [{
                        required: true,
                        message: '请输入Host ID',
                        trigger: 'blur',
                        type: 'number'
                    }, ],
                    name: [{
                        required: true,
                        message: '请输入酒店名称',
                        trigger: 'blur'
                    }, ],
                    hotelType: [{
                        required: false,
                        message: '请选择酒店类型',
                        trigger: 'change'
                    }, ],
                    epgVersion: [{
                        required: true,
                        message: '请选择EPG版本',
                    }, ],
                    stars: [{
                        required: true,
                        message: '请输入酒店星级',
                        trigger: 'blur'
                    }, ],
                    ctripStars: [{
                        required: true,
                        message: '请输入携程星级',
                        trigger: 'blur'
                    }, ],
                    contactName: [{
                        required: true,
                        message: '请输入联系人',
                        trigger: 'blur'
                    }, ],
                    phoneNumber: [{
                        required: true,
                        message: '请输入电话号码',
                        trigger: 'blur'
                    }, ],
                    roomsCount: [{
                        required: true,
                        message: '请输入房间数量',
                        trigger: 'blur',
                        type: 'number'
                    }, ],
                    description: [{
                        required: true,
                        message: '请输入描述信息',
                        trigger: 'blur'
                    }, ],
                    longitude: [{
                        required: true,
                        message: '请选择坐标信息',
                        trigger: 'blur',
                        type: 'number'
                    }, ],
                    latitude: [{
                        required: true,
                        message: '请选择坐标信息',
                        trigger: 'blur'
                    }, ],
                    detailAddress: [{
                        required: true,
                        message: '请选择并输入地址',
                        trigger: 'blur'
                    }, ],
                    projectNum: [{
                        required: true,
                        message: '请输入立项号',
                        trigger: 'blur'
                    }, ],
                    agency: [{
                        required: true,
                        message: '请选择所属办事处',
                        trigger: 'change'
                    }, ],
                    hotelGrade: [{
                        required: true,
                        message: '请选择酒店等级',
                        trigger: 'change'
                    }, ],
                    sales: [{
                        required: true,
                        message: '请输入销售员',
                        trigger: 'blur'
                    }, ],
                },
            };
        },
        components: {
            VIcon,
            Btn,
            Dist,
            Tag,
            Location,
        },
        created() {
            if (!!this.$route.query.id) {
                this.id = this.$route.query.id;
                hotelStore.getHotelDetail(this.id).then(res => {
                    if (res.code === 0) {
                        this.hotelInfo = res.data;
                        this.$set(this.hotelInfo, 'hotelTypeSelect', this.hotelInfo.hotelType.toString());
                        this.$set(this.hotelInfo, 'enableUwifiSwitch', !!this.hotelInfo.enableUwifi);
                        this.$set(this.hotelInfo, 'enableHmsSwitch', !!this.hotelInfo.enableHms);
                        this.$set(this.hotelInfo, 'addrObj', {
                            province: {
                                id: this.hotelInfo.province,
                            },
                            city: {
                                id: this.hotelInfo.city,
                            },
                            dist: {
                                id: this.hotelInfo.county,
                            }
                        });

                        console.log(this.hotelInfo.addrObj, "酒店地址");
                    } else {
                        this.$message.error(res.message);
                    }
                });
            }
            hotelStore.getHotelDataSource().then((data) => {
                this.hotelGrade = data.data.hotelGrades;
                this.agency = data.data.agencys;
                this.EPGVersions = data.data.epgs;
                this.stars = data.data.stars;
                this.ctripStars = data.data.ctripStars;
            });
        },
        methods: {
            addressChange(addrObj) {
                this.hotelInfo.province = addrObj.province.id;
                this.hotelInfo.city = addrObj.city.id;
                this.hotelInfo.county = addrObj.dist.id;
            },
            locationChange({
                lng,
                lat
            }) {
                this.hotelInfo.longitude = lng;
                this.hotelInfo.latitude = lat;
            },
            addTag() {
                if (this.curTag !== '') {
                    this.hotelInfo.tags.push(this.curTag);
                    this.curTag = '';
                }
            },
            delTag(idx) {
                this.hotelInfo.tags.splice(idx, 1);
            },
            checkForm(forms) {
                const formPromise = forms.map(form => {
                    return new Promise((resolve, reject) => {
                        this.$refs[form].validate((valid) => {
                            if (valid) {
                                resolve();
                            } else {
                                reject('请填写必填项');
                            }
                        });
                    })
                });
                Promise.all(formPromise)
                    .then(() => this.submit())
                    .catch(msg => this.$message.error(msg));
            },
            submit() {
                if (this.isRequest) return;
                this.isRequest = true;
                this.hotelInfo.hotelType = parseInt(this.hotelInfo.hotelTypeSelect);
                this.hotelInfo.enableUwifi = this.hotelInfo.enableUwifiSwitch ? 1 : 0;
                this.hotelInfo.enableHms = this.hotelInfo.enableHmsSwitch ? 1 : 0;
                this.$delete(this.hotelInfo, 'hotelTypeSelect');
                // this.$delete(this.hotelInfo, 'enableUwifiSwitch');
                // this.$delete(this.hotelInfo, 'enableHmsSwitch');
                this.$delete(this.hotelInfo, 'createdAt');
                this.$delete(this.hotelInfo, 'updatedAt');
                this.$delete(this.hotelInfo, 'addrObj');
                let tmpPromise;
                if (!!this.id) {
                    tmpPromise = hotelStore.saveHotel({
                        id: this.id,
                        data: this.hotelInfo
                    });
                } else {
                    tmpPromise = hotelStore.newHotel(this.hotelInfo);
                }
                tmpPromise.then((res) => {
                    if (res.code === 0) {
                        this.$router.push('/hotel');
                    } else {
                        this.isRequest = false;
                        this.$message.error(res.message);
                    }
                }).catch((error) => {
                    this.isRequest = false;
                    // console.error(error);
                    this.$message.error(error.message);
                });
            },
        }
}
</script>
