<style>
    .step-bottom-btn-div {
        margin-top: 10px;
        margin-bottom: 50px;
        float: right;
    }
    .text-input {
        width: 350px;
    }
</style>

<template>
    <div class='layout-container'>
        <PublicHeader :title="init.title" :breadcrumbs="init.breadcrumbs"></PublicHeader>
        <div class="table-container">
            <el-tabs v-model="activeName">
                <el-tab-pane v-for="item in selectedTabs" :label="item.label">
                    <el-form label-width="120px" class="demo-ruleForm" :model='languageInfo[item.name]' :ref='item.name'>

                        <el-form-item label="专题名称:">
                            <span>{{ languageInfo[item.name].name }}</span>
                        </el-form-item>

                        <el-form-item label="一句话描述:">
                            <span>{{ languageInfo[item.name].description }}</span>
                        </el-form-item>

                        <el-form-item label="专题图片:">
                            单张最大尺寸为2MB，支持JPG、PNG、GIF格式）
                        </el-form-item>
                        <el-form-item style="width: 80%">
                            <el-row type="flex">
                                <el-col v-for="(pic, i) in picRules" v-if="languageInfo[item.name].pics[i]">
                                    <img :src="languageInfo[item.name].pics[i].url" style="margin:10px; max-width: 95%">
                                </el-col>
                            </el-row>
                        </el-form-item>

                    </el-form>
                </el-tab-pane>
            </el-tabs>

            <span>专题影片：</span>
                
            <MediaSelector v-if="mediaData !== null" ref="mediaSelector" :data="mediaData" :previewType="99" :editable="false"></MediaSelector>

            <div class="step-bottom-btn-div">
                <el-button size="small" @click="handleCancel">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {
    VIcon,
    Dist,
    PicUploadAddMer,
    PicAppearAddMer,
    Preview,
    NavBar,
} from "../../components";
import {
    mediaStore
} from "../../stores";
import moment from 'moment';
import PublicHeader from '../../components/PublicHeader.vue';
import MediaSelector from '../../components/MediaSelector.vue';
import { getParameterByName } from '../../common';
export default {
    data() {
            return {
                init: {
                    breadcrumbs: ['媒资管理', '专题库', '专题管理'],
                    title: '专题管理',

                },
                tabs: [
                    {label:"简体中文", name:"chi"},
                    {label:"英文", name:"eng"},
                    {label:"日文", name:"jpn"},
                    {label:"韩文", name:"kor"}
                ],
                selectedTabs: [],
                visibleLang: [],
                picRules: [
                    {remark:'大海报，尺寸455*567'},
                    {remark:'小海报，尺寸455*567'},
                    {remark:'专题背景，尺寸1280*720'}
                ],
                mediaData: null,
                activeName: '',
                languageInfo: {
                    chi: {langCode: 'chi'},
                    eng: {langCode: 'eng'},
                    jpn: {langCode: 'jpn'},
                    kor: {langCode: 'kor'},
                },
                sortedMediaData: [],
                formCanSubmit: 0,
            };
        },
        methods: {
            // 保存
            handleSubmit(formName) {
                // this.$router.push('/media/topic');

                this.sortedMediaData = this.$refs.mediaSelector.getSortedData();
                if (this.sortedMediaData.length == 0) {
                    this.$alert(`请选择影片`, '提示', {confirmButtonText: '确定'});
                    return;
                }

                this.validateLanguageInfo();
            },
            // 取消
            handleCancel(formName) {
                this.$router.go(-1);
            },
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
            PicUploadAddMer,
            PicAppearAddMer,
            Preview,
            NavBar,
            PublicHeader,
            MediaSelector
        },
        watch: {
            formCanSubmit(value) {
                if (this.selectedTabs.length > 0 && value == this.selectedTabs.length) {
                    this.submitData();
                }
            }
        },
        mounted() {
            let id = this.$route.query.id; //getParameterByName('id');

            // 如果id存在，则表示是编辑专题
            if (id) {
                mediaStore.getTopic(id).then(res => {
                    console.log('getTopic', res);
                    this.mediaData = res.data.films;
                    let langCodes = []
                    for (let language of res.data.language) {
                        this.languageInfo[language.langCode] = language;
                        langCodes.push(language.langCode);
                    }
                    this.visibleLang = mediaStore.getLanguagesByCodes(langCodes);
                    let selectedTabs = [];
                    for (let i = 0; i < langCodes.length; i++) {
                        selectedTabs.push({label: this.visibleLang[i], name: langCodes[i]});
                    }
                    this.selectedTabs = selectedTabs;
                })
            } else {
                this.selectedTabs = [{label:"简体中文", name:"chi"}];
                this.visibleLang = ['简体中文'];
                this.mediaData = [];
            }
        }
}
</script>
