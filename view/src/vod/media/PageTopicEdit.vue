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
            <el-checkbox-group class="new-item-checkbox" v-model="visibleLang" @change="handleLangSelect()">
                <el-checkbox v-for="item in tabs" :label="item.label" :name="item.name">
                </el-checkbox>
            </el-checkbox-group>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane v-for="item in selectedTabs" :label="item.label">
                    <el-form label-width="120px" class="demo-ruleForm" :model='languageInfo[item.name]' :ref='item.name' :rules='rules'>

                        <el-form-item label="专题名称:"  prop="name">
                            <el-input v-model="languageInfo[item.name].name" class="text-input" placeholder="请输入专题名称"></el-input>
                        </el-form-item>

                        <el-form-item label="一句话描述:" prop="description">
                            <el-input type="textarea"
                                        class="text-input"
                                        v-model="languageInfo[item.name].description"
                                        :autosize="{ minRows: 1, maxRows: 2}"
                                        placeholder="请输入描述"></el-input>
                        </el-form-item>

                        <el-form-item label="专题图片:" prop="pics">
                            单张最大尺寸为2MB，支持JPG、PNG、GIF格式）
                        </el-form-item>
                        <el-form-item style="width: 80%">
                            <el-row type="flex">
                                <el-col v-for="(pic, i) in picRules">
                                    <PicUploadAddMer
                                        v-if="languageInfo[item.name].pics && languageInfo[item.name].pics[i]"
                                        :multiple="false"
                                        :defaultFileList="[languageInfo[item.name].pics[i]]"
                                        :uploadSuccess="(imgs) => {handleUploadSuccess(item.name, i, imgs)}"></PicUploadAddMer>
                                    <PicUploadAddMer
                                        v-else
                                        :multiple="false"
                                        :uploadSuccess="(imgs) => {handleUploadSuccess(item.name, i, imgs)}"></PicUploadAddMer>
                                    <div style="clear: both"></div>
                                    <div>{{pic.remark}}</div>
                                </el-col>
                            </el-row>
                        </el-form-item>

                    </el-form>
                </el-tab-pane>
            </el-tabs>

            <span>专题影片：（专题影片必须包含一部以上等级为3的影片，否则不能提交）</span>
                
            <MediaSelector v-if="mediaData" ref="mediaSelector" :data="mediaData" :previewType="99"></MediaSelector>

            <div style="font-size:15px;margin-top:10px;"><span style="color:red">*</span> <span>所属语种</span></div>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="checkedLas" @change="handleCheckedLasChange">
                <el-checkbox v-for="item in las" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>

            <div class="step-bottom-btn-div">
                <el-button size="small" @click="handleCancel">取消</el-button>
                <el-button size="small" type="primary" @click="handleSubmit">提交</el-button>
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
                    {remark:'竖版海报，尺寸360 x 548'},
                    {remark:'宽版海报，尺寸234 x 269'},
                    {remark:'专题背景，尺寸1280 x 720'}
                ],
                mediaData: null,
                activeName: '',
                rules: {
                    name: [{
                        required: true,
                        trigger: 'blur',
                        message: '专题名称必填',
                    }],
                    description: [{
                        required: true,
                        trigger: 'blur',
                        message: '一句话描述必填',
                    }],
                },
                languageInfo: {
                    chi: {langCode: 'chi'},
                    eng: {langCode: 'eng'},
                    jpn: {langCode: 'jpn'},
                    kor: {langCode: 'kor'},
                },
                sortedMediaData: [],
                formCanSubmit: 0,

                checkAll: false,
                isIndeterminate: false,
                las: ['简体中文', '英文', '日文', '韩文'],
                checkedLas: [],
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
                this.$router.push('/media/topic');
            },
            validateLanguageInfo() {
                if (this.checkedLas.length == 0) {
                    this.$alert(`所属语种必须至少有一种语言`, '提示', {confirmButtonText: '确定'});
                    return;
                }

                if (this.selectedTabs.length == 0) {
                    this.$alert(`专题必须要选择一种语言`, '提示', {confirmButtonText: '确定'});
                    return;
                }

                this.formCanSubmit = 0;
                for (let lang of this.selectedTabs) {
                    if (!this.languageInfo[lang.name].pics || this.languageInfo[lang.name].pics.length < 3) {
                        this.$alert(`请上传3张海报图片`, '提示', {confirmButtonText: '确定'});
                        break;
                    }
                    let isPicNull = false;
                    for (let pic of this.languageInfo[lang.name].pics) {
                        if (!pic) {
                            isPicNull = true;
                            break;
                        }
                    }
                    if (isPicNull) {
                        this.$alert(`请上传3张海报图片`, '提示', {confirmButtonText: '确定'});
                        break;
                    }
                    
                    this.$refs[lang.name][0].validate((res) => {
                        if (!res) {
                            this.$alert(`请补充完必输的语言信息`, '提示', {confirmButtonText: '确定'});
                        } else {
                            this.formCanSubmit++;
                        }
                    });
                }
            },
            submitData() {
                let languageInfo = [];
                Object.keys(this.languageInfo).forEach(lang => {
                    if (this.languageInfo[lang].name) {
                        languageInfo.push(this.languageInfo[lang]);
                    }
                });

                let operatingLanguage = this.checkedLas.map(item => {
                    for (let language of this.tabs) {
                        if (item == language.label) {
                            return language.name;
                        }
                    }
                });

                let id = this.$route.query.id;
                if (id) {
                    mediaStore.updateTopic(id, {
                        language: languageInfo,
                        filmIds: this.sortedMediaData.map(item => (item.globalId)),
                        operatingLanguage: operatingLanguage,
                    }).then(res => {
                        // this.$alert(`创建专题成功`, '提示', {confirmButtonText: '确定'});
                        this.$router.go(-1);
                    }).catch(error => {
                        this.$alert(`修改专题失败`, '错误', {confirmButtonText: '确定'});
                    });
                } else {
                    mediaStore.createTopic({
                        language: languageInfo,
                        filmIds: this.sortedMediaData.map(item => (item.globalId)),
                        operatingLanguage: operatingLanguage,
                    }).then(res => {
                        // this.$alert(`创建专题成功`, '提示', {confirmButtonText: '确定'});
                        this.$router.go(-1);
                    }).catch(error => {
                        this.$alert(`创建专题失败`, '错误', {confirmButtonText: '确定'});
                    });
                }
            },
            handleLangSelect() {
                console.log('this.visibleLang', this.visibleLang);
                this.selectedTabs = this.visibleLang.map(item => {
                    for (let tab of this.tabs) {
                        if (tab.label == item) {
                            return tab;
                        }
                    }
                });
            },
            iconBeforeUpload(file) {
                const isOutSize = file.size / 1024 / 1024 > 2;
                if (isOutSize)
                    this.$message.error('上传 图片大小不能超过 2MB!');
                return !isOutSize;
            },
            iconMapUploadSuccess(file) {

            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleUploadSuccess(langCode, i, imgs) {
                const types = [1, 32, 7];

                console.log(`handleUploadSuccess ${langCode} ${i}`, imgs);
                if (this.languageInfo[langCode].pics == undefined) {
                    this.languageInfo[langCode].pics = [];
                }
                this.languageInfo[langCode].pics[i] = {
                    type: types[i],
                    url: imgs[0].url,
                    md5: imgs[0].md5,
                    name: imgs[0].md5,
                };
            },
            handleCheckAllChange(event) {
                this.checkedLas = event.target.checked ? this.las : [];
                this.isIndeterminate = false;
            },
            handleCheckedLasChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.las.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.las.length;
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

                    this.checkedLas = res.data.operateInfo.langs.map(item => {
                        for (let language of this.tabs) {
                            if (item == language.name) {
                                return language.label;
                            }
                        }
                    });
                    if (this.checkedLas.length > 0) {
                        this.isIndeterminate = true;                        
                    }
                    if (this.checkedLas.length == this.las.length) {
                        this.checkAll = true;
                    }
                })
            } else {
                this.mediaData = [];
                this.visibleLang = ['简体中文'];
                this.selectedTabs = [{label:"简体中文", name:"chi"}];
            }
        }
}
</script>
