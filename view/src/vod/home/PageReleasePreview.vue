<style>
</style>
<template>
    <div class='layout-container'>
        <div class="preview-div">
            <div>
                <span>任务名称: </span>
                <span>{{ taskName }}</span>
            </div>
            <div v-if="videoLocation>0" style="margin-top: 10px">
                <span>视频位: </span>
                <span>{{ videoLocation==1 ? '视频' : '图片' }}</span>
            </div>
            <div v-if="videoLocation==1">
                <div v-for="(video, i) in videos" style="margin-top: 10px">
                    <span>{{ `视频${i+1} Content ID: ` }}</span>
                    <span>{{ videos[i].contentId }}</span>
                </div>
            </div>
            <div v-if="videoLocation==2">
                <el-row type="flex">
                    <el-col v-for="(pic, i) in pics">
                        <img :src="pics[i].url" style="max-width: 90%" />
                    </el-col>
                </el-row>
            </div>
            <div style="margin-top: 10px">
                <span>执行酒店: </span>
                <span>{{ hotels }}</span>
            </div>
            <MediaSelector v-if="mediaData.length > 0" ref="mediaSelector" :data="mediaData" :previewType="1" :editable="false"></MediaSelector>
            <div class="step-bottom-btn-div">
                <el-button size="small" @click="handleCancel">返回</el-button>
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
    mediaStore,
    vodHomeStore,
} from '../../stores';
import '../../style/index.less';
import { getParameterByName } from '../../common';
export default {
    data() {
        return {
            taskName: '',
            mediaData: [],
            hotels: '',
            videoLocation: null,
            videos: [],
            pics: [],
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
    },
    mounted() {
        vodHomeStore.getRelease(getParameterByName('id')).then(res => {
            this.taskName = res.data.name;
            this.hotels = res.data.hotels.map(item => item.hotelName).join('、');
            if (res.data.promotion.promotionType == 'videos') {
                this.videoLocation = 1;
                this.videos = res.data.promotion.videos;
            } else if (res.data.promotion.promotionType == 'pics') {
                this.videoLocation = 2;
                this.pics = res.data.promotion.pics;
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
            //         return null;//mediaStore.getTopic(item.globalId);
            //     } else {
            //         return mediaStore.getFilm(item.globalId);
            //     }
            // });
            // Promise.all(promises).then(multiRes => {
            //     console.log('before this.mediaData');
            //     this.mediaData = multiRes.map((res, i) => {
            //         return {
            //             ...res.data,
            //             position: positions[i],
            //         };
            //     });
            //     console.log('this.mediaData', this.mediaData);
            // }).catch(error => {
            //     this.$alert('获取媒体信息失败', '错误', {confirmButtonText: '确定'});
            // });
        })
    }
}
</script>
<style>
.preview-div {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 16px;
}
.step-bottom-btn-div {
    margin-top: 10px;
    float: right;
}
</style>

