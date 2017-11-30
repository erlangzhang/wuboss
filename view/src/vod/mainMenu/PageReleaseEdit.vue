<style>
</style>
<template>
    <div class='layout-container'>
        <PublicHeader :title="init.title" :breadcrumbs="init.breadcrumbs"></PublicHeader>
        <el-steps :space="350" :active="activeStep">
            <el-step title="选择资源"></el-step>
            <el-step title="选择酒店"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <div class="step-div" v-if="activeStep == 1">
            <div>
                <span style="color:red">*</span> <span>项目名称</span>
                <el-input style="width:300px" placeholder="输入项目名称" v-model="name" size="small" :disabled="!editFlag"></el-input>
            </div>
            <MainMenuSelector ref="mediaSelector" :data="tableData" :editable="editFlag"></MainMenuSelector>
            <div class="step-bottom-btn-div">
                <el-button size="small" @click="handleCancel">取消</el-button>
                <el-button size="small" type="primary" @click="handleNextStep">下一步</el-button>
            </div>
        </div>
        <div class="step-div" v-if="activeStep == 2">
            <HotelSelector v-if="activeStep == 2" ref="hotelSelector" :data="hotelData" :editable="editFlag"></HotelSelector>
            <div class="step-bottom-btn-div">
                <el-button size="small" @click="handlePreStep">上一步</el-button>
                <el-button size="small" type="primary" @click="handleSubmit" v-show="editFlag">发布任务</el-button>
            </div>
        </div>
        <div class="step-div" v-if="activeStep == 3">
            <h2>已成功发布主菜单任务</h2>
            <p style="font-size: 16px;">3 秒后跳转回列表...</p>
            <el-button size="small" type="primary" @click="handleCancel">返回列表</el-button>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import lodash from 'lodash';
import PublicHeader from '../../components/PublicHeader.vue';
import MainMenuSelector from '../../components/MainMenuSelector.vue';
import HotelSelector from '../../components/HotelSelector.vue';
import {
    mainMenuStore
} from "../../stores";
import '../../style/index.less';
export default {
    data() {
        return {
            id: this.$route.query.id,
            init: {
                breadcrumbs: ['主菜单管理', '发布管理', '新增发布'],
                title: '新增发布',
            },
            name: '',
            mediaData: [],
            hotelData: [],
            activeStep: 1,
            isOnline: true,
            tableData: [],
            editFlag: true
        }
    },
    components: {
        PublicHeader,
        MainMenuSelector,
        HotelSelector,
    },
    methods: {
        handleCancel() {
            this.$router.push('/main_menu/release');
        },
        handlePreStep() {
            this.activeStep--;
        },
        handleNextStep() {
            console.log('mediaData', this.mediaData);
            console.log('hotelData', this.hotelData);
            if (this.name.trim().length == 0) {
                this.$alert('请填写项目名称', '提示', {confirmButtonText: '确定'});
                return;
            }
            if (this.tableData.length == 0) {
                this.$alert('请选择资源', '提示', {confirmButtonText: '确定'});
                return;
            }
            this.activeStep++;
        },
        handleSubmit() {
            if (this.hotelData.length == 0) {
                this.$alert('请选择酒店', '提示', {confirmButtonText: '确定'});
                return;
            }

            let releaseObj = {}
            releaseObj.materials = []
            releaseObj.name = this.name
            this.tableData.map(item => {
                if (item.id) {
                    let material = {}
                    material.itemId = item.id
                    material.position = parseInt(item._position) + 1
                    releaseObj.materials.push(material)
                }
            })
            console.log('releaseObj.materials: ' + JSON.stringify(releaseObj.materials))
            console.log('this.tableData: ' + JSON.stringify(this.tableData))

            releaseObj.hotels = this.hotelData.map(item => {
                let hotel = {}
                hotel.hostId = item.hostId
                hotel.name = item.name
                hotel.city = item.city
                hotel.grade = item.hotelGrade
                hotel.agencyName = item.agency
                return hotel
            })
            mainMenuStore.releaseMainMenu(releaseObj).then(ret => {
                if (0 == ret.code) {
                    this.activeStep++;
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 3000);
                }else
                    this.$message.error("发布失败！");

            }).catch(err => {
                this.$message.error(`发布失败！${err}`);
            })

        },
        formatOnOffLineTime(isDefault, onlineTime, offlineTime) {
            if (1==isDefault || (null == onlineTime && null == offlineTime))
                return '永久'
            return this.renderTime_YYYYMMDDHHMM(onlineTime) +'/'+this.renderTime_YYYYMMDDHHMM(offlineTime);
        },
        renderTime_YYYYMMDDHHMM(unix) {
            return moment(unix * 1000).format('YYYY-MM-DD HH:mm');
        },
    },
    created() {
        for (let i=1; i<=16; i++) {
            let d = {
                position: i,
                name: '',
                actionType: '',
                visibleLang: '',
                rangeInfo: '',
            }
            this.tableData.push(d)
        }
        // 新增
        if (!this.id) {
            return
        }

        // 编辑
        this.editFlag = false
        mainMenuStore.getMainMenuReleaseInfo(this.id).then(ret => {
            this.name = ret.data.name
            let materials = ret.data.materials
            materials.sort((a, b) => {return a.position - b.position}).map(item => {
                item.actionType = mainMenuStore.getActionTypeName(item.itemType)
                item.rangeInfo = this.formatOnOffLineTime(item.isDefault, item.onlineTime, item.offlineTime)
                this.tableData[item.position-1] = item
            })
            this.tableData = [...this.tableData]

            this.hotelData = ret.data.hotels.map(item =>{
                item.stars = item.grade
                return item
            })

        }).catch(err => {
            this.$message.error(`获取主菜单发布详情失败！${err}`);
        })
    }
}
</script>
<<style>
.step-div {
    margin-top: 20px;
    margin-bottom: 20px;
}
.step-bottom-btn-div {
    margin-top: 10px;
    float: right;
}
</style>

