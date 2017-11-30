<style>
</style>
<template>
    <div class='layout-container'>
        <div class="step-div">
            <div>
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
                <el-row type="flex">
                    <el-col v-for="i in videoNumber">
                        <PicUploadAddMer
                            v-if="pics[i-1]"
                            :multiple="false"
                            :uploadSuccess="(imgs) => {handleUploadSuccess(i, imgs)}"
                            :defaultFileList="[pics[i-1]]"></PicUploadAddMer>
                        <PicUploadAddMer
                            v-else
                            :multiple="false"
                            :uploadSuccess="(imgs) => {handleUploadSuccess(i, imgs)}"></PicUploadAddMer>
                        <div style="clear: both"></div>
                        <div>{{ `首页视频位海报${i}，尺寸1280*720` }}</div>
                    </el-col>
                </el-row>
            </div>
            <MediaSelector v-if="mediaData" ref="mediaSelector" :data="mediaData" :previewType="1" :withTopic="true"></MediaSelector>
            <div class="step-bottom-btn-div">
                <el-button size="small" @click="handleCancel">取消</el-button>
                <el-button size="small" type="primary" @click="handleSubmit">提交</el-button>
            </div>
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
    mediaStore,
} from '../../stores';
import '../../style/index.less';
export default {
    data() {
        return {
            taskName: '',
            mediaData: null,
            hotelData: [],
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
        handleSubmit() {
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
                this.$router.go(-1);
            });
        },
        handleUploadSuccess(position, imgs) {
            console.log(`handleUploadSuccess ${position}`, imgs);
            this.pics[position - 1] = imgs[0];
        },
        requestData() {
            vodHomeStore.getHotelRelease(this.$route.query.id).then(res => {
                console.log('getHotelRelease', res);
                this.hotelData = [{
                    hostId: res.data.hostId,
                    name: res.data.hotelName,
                }];
                this.taskName = res.data.hotelName;
                if (res.data.promotion.promotionType == 'videos') {
                    this.videoLocation = 1;
                    this.videos = res.data.promotion.videos;
                    this.videoNumber = res.data.promotion.videos.length;
                    for (let i = 0; i < res.data.promotion.videos.length; i++) {
                        this.videoIds[i] = `${res.data.promotion.videos[i].contentId}`;
                    }
                } else if (res.data.promotion.promotionType == 'pics') {
                    this.videoLocation = 2;
                    this.videos = res.data.promotion.pics;
                    this.videoNumber = res.data.promotion.pics.length;
                    for (let i = 0; i < res.data.promotion.pics.length; i++) {
                        this.pics[i] = res.data.promotion.pics[i];
                    }
                } else {
                    this.videoLocation = 0;
                }

                this.mediaData = res.data.contents.map(item => {
                    return {
                        objectType: item.objectType,
                        position: item.position,
                        ...item.info,
                    };
                });

                // let positions = [];
                // let promises = res.data.contents.map(item => {
                //     positions.push(item.position);
                //     if (item.objectType == 19) {
                //         return mediaStore.getTopic(item.globalId);
                //     } else {
                //         return mediaStore.getFilm(item.globalId);
                //     }
                // });
                // Promise.all(promises).then(multiRes => {
                //     console.log('before this.mediaData');
                //     this.mediaData = multiRes.map((innerRes, i) => {
                //         return {
                //             ...innerRes.data,
                //             position: positions[i],
                //             objectType: res.data.contents[i].objectType,
                //         };
                //     });
                //     console.log('this.mediaData', this.mediaData);
                // }).catch(error => {
                //     this.$alert('获取媒体信息失败', '错误', {confirmButtonText: '确定'});
                // });
            });
        }
    },
    mounted() {
        this.requestData();
    },
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

