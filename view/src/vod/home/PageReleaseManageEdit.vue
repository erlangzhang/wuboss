<style>
</style>
<template>
    <div class='layout-container'>
        <el-steps :space="350" :active="activeStep">
            <el-step title="选择推荐资源"></el-step>
            <el-step title="选择目标酒店"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <div class="step-div" v-if="activeStep == 1">
            <div>
                <span style="color:red">*</span> <span>任务名称</span>
                <el-input style="width:300px" placeholder="输入任务名称" v-model="taskName" size="small"></el-input>
            </div>
            <div style="margin-top: 10px">
                <span style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <span>视频位</span>
                <el-select v-model="videoLocation" size="small" placeholder="请选择">
                    <el-option
                    v-for="item in videoLocationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <span v-if="videoLocation>0">数量</span>
                <el-select v-if="videoLocation>0" v-model="videoNumber" size="small" placeholder="请选择">
                    <el-option
                    v-for="item in [1,2,3,4,5]"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </div>
            <div v-if="videoLocation==1">
                <div v-for="i in videoNumber" style="margin-top: 10px">
                    <span>{{ `视频${i} Content ID` }}</span>
                    <el-input style="width:300px" placeholder="请输入" v-model="videoIds[i-1]" size="small"></el-input>
                </div>
            </div>
            <div v-if="videoLocation==2">
                <div v-for="i in videoNumber" style="display: inline-block;margin: 5px;">
                    <PicUploadAddMer :multiple="false" :uploadSuccess="(imgs) => {handleUploadSuccess(i, imgs)}"></PicUploadAddMer>
                    <div style="clear: both"></div>
                    <div>{{ `首页视频位海报${i}，尺寸1280*720` }}</div>
                </div>
            </div>
            <MediaSelector ref="mediaSelector" :data="mediaData" :previewType="1" :withTopic="true"></MediaSelector>
            <div class="step-bottom-btn-div">
                <el-button size="small" @click="handleCancel">取消</el-button>
                <el-button size="small" type="primary" @click="handleNextStep">下一步</el-button>
            </div>
        </div>
        <div class="step-div" v-if="activeStep == 2">
            <HotelSelector v-if="activeStep == 2" ref="hotelSelector" :data="hotelData"></HotelSelector>
            <div class="step-bottom-btn-div">
                <el-button size="small" @click="handlePreStep">上一步</el-button>
                <el-button size="small" type="primary" @click="handleSubmit">发布任务</el-button>
            </div>
        </div>
        <div class="step-div" v-if="activeStep == 3">
            <h2>已更新VOD首页内容</h2>
            <p style="font-size: 16px;">您选择的推荐资源已更新至目标酒店</p>
            <p style="font-size: 16px;">3 秒后跳转回列表</p>
            <el-button size="small" type="primary" @click="handleCancel">返回列表</el-button>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import lodash from 'lodash';
import {
    VIcon,
    Btn,
    PicUploadAddMer,
} from '../../components';
import PublicHeader from '../../components/PublicHeader.vue';
import MediaSelector from '../../components/MediaSelector.vue';
import HotelSelector from '../../components/HotelSelector.vue';
import {
    vodHomeStore,
} from '../../stores';
import '../../style/index.less';
export default {
    data() {
        return {
            taskName: '',
            mediaData: [],
            hotelData: [],
            activeStep: 1,
            mediaSortedData: [],
            videoLocationOptions: [
                {
                    value: 0,
                    label: '无',
                }, {
                    value: 1,
                    label: '视频',
                }, {
                    value: 2,
                    label: '图片',
                }
            ],
            videoLocation: null,
            videoNumber: null,
            videoIds: ['', '', '', '', ''],
            pics: [null, null, null, null, null],
            promotion: '',
        }
    },
    components: {
        VIcon,
        Btn,
        PublicHeader,
        MediaSelector,
        HotelSelector,
        PicUploadAddMer,
    },
    methods: {
        handleCancel() {
            this.$router.push('/vod_home/release_manage');
        },
        handlePreStep() {
            this.activeStep--;
        },
        handleNextStep() {
            console.log('mediaData', this.mediaData);
            console.log('sorted mediaData', this.$refs.mediaSelector.getSortedData());
            this.mediaSortedData = this.$refs.mediaSelector.getSortedData();
            // console.log('hotelData', this.hotelData);
            // console.log('sorted hotelData', this.$refs.hotelSelector.getSortedData());
            if (this.taskName.trim().length == 0) {
                this.$alert('请填写任务名称', '提示', {confirmButtonText: '确定'});
                return;
            }
            if (this.videoLocation > 0) {
                if (!this.videoNumber) {
                    this.$alert('请选择视频位数量', '提示', {confirmButtonText: '确定'});
                    return;
                }
                if (this.videoLocation == 1) {
                    let videos = [];
                    for (let i = 0; i < this.videoNumber; i++) {
                        if (this.videoIds[i].trim().length == 0) {
                            this.$alert(`请填写视频位${i+1}的Content ID`, '提示', {confirmButtonText: '确定'});
                            return;
                        }
                        videos.push({contentId: this.videoIds[i].trim()});
                    }
                    this.promotion = {
                        promotionType: 'videos',
                        videos,
                        pics: {},
                    }
                } else if (this.videoLocation == 2) {
                    let pics = [];
                    for (let i = 0; i < this.videoNumber; i++) {
                        if (!this.pics[i]) {
                            this.$alert(`请上传视频位${i+1}的海报`, '提示', {confirmButtonText: '确定'});
                            return;
                        }
                        pics.push(this.pics[i]);
                    }
                    this.promotion = {
                        promotionType: 'pics',
                        pics,
                        videos: {},
                    }
                }
            }
            
            if (this.mediaSortedData.length == 0) {
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

            vodHomeStore.createRelease({
                name: this.taskName,
                promotion: this.promotion,
                contents: this.mediaSortedData.map((item, i) => ({
                    objectType: item.objectType,
                    globalId: item.globalId,
                    position: i + 1,
                })),
                hotels: this.hotelData.map(item => ({
                    hostId: item.hostId,
                    hotelName: item.name,
                })),
            }).then(res => {
                this.activeStep++;
                setTimeout(() => {
                    this.$router.go(-1);
                }, 3000);
            })
        },
        handleUploadSuccess(position, imgs) {
            console.log(`handleUploadSuccess ${position}`, imgs);
            this.pics[position - 1] = imgs[0];
        }
    }
}
</script>
<style>
.step-div {
    margin-top: 20px;
    margin-bottom: 20px;
}
.step-bottom-btn-div {
    margin-top: 10px;
    float: right;
}
</style>

