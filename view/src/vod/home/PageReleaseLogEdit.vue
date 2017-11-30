<style>
</style>
<template>
    <div class='layout-container'>
        <h3>执行酒店</h3>
        <div style="margin-bottom:20px;">七天酒店、如家酒店</div>
        <h3>推荐内容</h3>
        <MediaSelector ref="mediaSelector" :data="mediaData" :editable="false" :previewType="1"></MediaSelector>
        <div class="step-bottom-btn-div">
            <el-button size="small" @click="handleCancel">返回</el-button>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import lodash from 'lodash';
import {
    VIcon,
    Btn,
} from '../../components';
import PublicHeader from '../../components/PublicHeader.vue';
import MediaSelector from '../../components/MediaSelector.vue';
import {
    userStore,
    appStore,
} from '../../stores';
import '../../style/index.less';
export default {
    data() {
        return {
            taskName: '',
            mediaData: [
                {
                    name: '武林外传',
                    id: 1234,
                    category: '动作',
                    level: 3,
                    language: '中文',
                }, {
                    name: '逃学威龙',
                    id: 1235,
                    category: '动作',
                    level: 3,
                    language: '中文',
                }, {
                    name: '新闻联播',
                    id: 1236,
                    category: '动作',
                    level: 3,
                    language: '中文',
                }, {
                    name: '天气预报',
                    id: 1237,
                    category: '动作',
                    level: 3,
                    language: '中文',
                }, 
            ],
            activeStep: 1,
        }
    },
    components: {
        VIcon,
        Btn,
        PublicHeader,
        MediaSelector,
    },
    methods: {
        handleCancel() {
            this.$router.push('/vod_home/release_log');
        },
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

