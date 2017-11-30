<style>
    .step-bottom-btn-div {
        margin-top: 10px;
        margin-bottom: 50px;
        float: right;
    }
    .input-text {
        width: 200px;
    }
</style>

<template>
    <div class='layout-container' style="margin-bottom: 100px">
        <PublicHeader :title="init.title" :breadcrumbs="init.breadcrumbs"></PublicHeader>
        <div class="table-container" v-if="data">
            <!-- --------------------------- 影片信息 --------------------------- -->
            <div v-if="editType != 'operate'">
                <el-checkbox-group class="new-item-checkbox" v-model="visibleLang" @change="handleLangSelect()">
                    <el-checkbox v-for="item in tabs" :label="item.label" :name="item.name">
                    </el-checkbox>
                </el-checkbox-group>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane v-for="item in selectedTabs" :label="item.label">
                        <el-form label-width="120px" class="demo-ruleForm" :model='languageInfo[item.name]' :ref='item.name' :rules='languageRules'>
                            <el-row type="flex">
                                <el-form-item :label="item.label + '名称'" prop="name">
                                    <el-input v-model="languageInfo[item.name].name" class="input-text"></el-input>
                                </el-form-item>
                                <el-form-item label="影片类型:" prop="genres">
                                    <el-input v-model="languageInfo[item.name].genres" class="input-text"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row type="flex">
                                <el-form-item label="对白语言:" prop="dialogueLang">
                                    <el-input v-model="languageInfo[item.name].dialogueLang" class="input-text"></el-input>
                                </el-form-item>
                                <el-form-item label="字幕语言:" prop="subtitleLang">
                                    <el-input v-model="languageInfo[item.name].subtitleLang" class="input-text"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row type="flex">
                                <el-form-item label="导演:" prop="director">
                                    <el-input v-model="languageInfo[item.name].director" class="input-text"></el-input>
                                </el-form-item>
                                <el-form-item label="国家:" prop="country">
                                    <el-input v-model="languageInfo[item.name].country" class="input-text"></el-input>
                                </el-form-item>
                            </el-row>

                            <el-form-item label="演员:" style="width: 80%" prop="actor">
                                <el-input v-model="languageInfo[item.name].actor"></el-input>
                            </el-form-item>

                            <el-form-item label="简介:" style="width: 80%" prop="description">
                                <el-input type="textarea"
                                            v-model="languageInfo[item.name].description"
                                            :autosize="{ minRows: 2, maxRows: 4}"
                                            placeholder="请输入简介"></el-input>
                            </el-form-item>

                            <el-form-item label="影片图片:" prop="poster">
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
                                        <div style="font-size: 12px">{{pic.remark}}</div>
                                    </el-col>
                                </el-row>
                            </el-form-item>

                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!-- --------------------------- 运营信息 --------------------------- -->
            <div v-if="editType != 'language'">
                <div class='content-header' v-if="!editType">
                    <VIcon type='appstore' /> 运营信息
                    <div class='breadcrumb-header'></div>
                </div>

                <el-form label-width="120px" class="demo-ruleForm" ref="operationForm" :rules="operationRules" :model="operateInfo">
                    <el-row type="flex">
                        <el-form-item label="GlobalID">
                            <div class="input-text">{{ data.globalId }}</div>
                        </el-form-item>
                        <el-form-item label="ContentID">
                            <div class="input-text">{{ data.contentId }}</div>
                        </el-form-item>
                    </el-row>
                    <el-row type="flex">
                        <el-form-item label="所属语种:" prop="langs">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                            <el-checkbox-group v-model="checkedLas" @change="handleCheckedLasChange">
                                <el-checkbox v-for="item in las" :label="item" :key="item">{{item}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-row>
                    <el-row type="flex">
                        <el-form-item label="收费类型:" prop="isfree">
                            <div class="input-text">
                                <el-radio class="radio" v-model="operateInfo.isfree" :label="0">收费</el-radio>
                                <el-radio class="radio" v-model="operateInfo.isfree" :label="1">免费</el-radio>
                            </div>
                        </el-form-item>
                        <el-form-item v-if="operateInfo.isfree===0" label="指导价:" prop="price">
                            <el-input v-model="operateInfo.price" class="input-text"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row type="flex">
                        <el-form-item label="评分级别:" prop="starrating">
                            <el-input v-model="operateInfo.starrating" class="input-text"></el-input>
                        </el-form-item>
                        <el-form-item label="数字评分:" prop="rating">
                            <el-input v-model="operateInfo.rating" class="input-text"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row type="flex">
                        <el-form-item label="节目等级:" prop="vodrank">
                            <el-input v-model="operateInfo.vodrank" class="input-text"></el-input>
                        </el-form-item>
                        <el-form-item label="观看次数起点:" prop="viewcount">
                            <el-input v-model="operateInfo.viewcount" class="input-text"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row type="flex">
                        <el-form-item label="版权截止时间:">
                            <el-date-picker
                                :disabled="isForever"
                                v-model="dateRange"
                                type="daterange"
                                placeholder="选择时间范围">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="forever">
                            <el-checkbox label="永久" v-model="isForever"></el-checkbox>
                        </el-form-item>
                    </el-row>

                    <el-form-item label="影片分类:" style="width: 98%">
                        <el-checkbox-group v-model="selectedCategories" @change="handleCategorySelect()">
                            <el-checkbox v-for="item in categories" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="标签:" style="width: 80%" prop="introduction">
                        <el-tag
                            :key="tag"
                            v-for="tag in tags"
                            :closable="true"
                            :close-transition="false"
                            @close="handleClose(tag)"
                        >
                            {{tag}}
                        </el-tag>
                        <el-input
                            style="width:80px"
                            v-if="tagInputVisible"
                            v-model="currentTag"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="addTag"
                            @blur="addTag"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+ 增加标签</el-button>
                    </el-form-item>
                </el-form>
            </div>

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
    Category,
    Telephone,
    OpeningTime,
    PicUploadAddMer,
    PicAppearAddMer,
    Preview,
    NavBar,
} from "../../components";
import {
    contentStore,
    mediaStore,
} from "../../stores";
import { getParameterByName } from '../../common';
import moment from 'moment';
import PublicHeader from '../../components/PublicHeader.vue';
export default {
    data() {
        let editType = getParameterByName('editType');
        return {
            init: {
                breadcrumbs: [
                    '媒资管理', 
                    !editType ? '待入库影片' : '影片库', 
                    !editType ? '影片详情' : (editType == 'language' ? '媒资信息' : '运营信息'),
                ],
                title: !editType ? '影片详情' : (editType == 'language' ? '媒资信息' : '运营信息'),

            },
            tabs: [
                {label:"简体中文", name:"chi"},
                {label:"英文", name:"eng"},
                {label:"日文", name:"jpn"},
                {label:"韩文", name:"kor"}
            ],
            selectedTabs: [],
            checkAll: false,
            isIndeterminate: false,
            las: ['简体中文', '英文', '日文', '韩文'],
            // mediaType: ['最新上映', '激情院线', '影片分类', '生活爱情', '动作剧场', '科幻大片', '动漫卡通', '烧脑悬疑', '喜剧世界'],
            checkedLas: [],
            chargeType: '',
            activeName: '',
            picRules: [
                {remark:'竖版海报，尺寸360x548'},
                {remark:'宽版海报，尺寸234x269'},
                {remark:'剧照，尺寸932x525'},
                {remark:'老版缩略图，尺寸107x145'},
                {remark:'老版推荐图，尺寸157x217'},
            ],
            data: null,
            languageInfo: {
                chi: {},
                eng: {},
                jpn: {},
                kor: {},
            },
            operateInfo: {},
            languageRules: {
                name: [{
                    required: true,
                    trigger: 'blur',
                    message: '名称必填',
                }],
                genres: [{
                    required: true,
                    trigger: 'blur',
                    message: '影片类型必选',
                }],
                dialogueLang: [{
                    required: true,
                    trigger: 'blur',
                    message: '对白语言必填',
                }],
                subtitleLang: [{
                    required: true,
                    trigger: 'blur',
                    message: '字幕语言必填',
                }],
                director: [{
                    required: true,
                    trigger: 'blur',
                    message: '导演必填',
                }],
                country: [{
                    required: true,
                    trigger: 'blur',
                    message: '国家必填',
                }],
                actor: [{
                    required: true,
                    trigger: 'blur',
                    message: '演员必填',
                }],
                description: [{
                    required: true,
                    trigger: 'blur',
                    message: '简介必填',
                }]
            },
            operationRules: {
                starrating: {
                    type: 'string',
                    required: true,
                    trigger: 'blur',
                    message: '必填',
                },
                rating: {
                    type: 'string',
                    required: true,
                    trigger: 'blur',
                    message: '必填',
                },
                vodrank: {
                    type: 'string',
                    required: true,
                    trigger: 'blur',
                    message: '必填',
                },
                price: {
                    type: 'string',
                    required: true,
                    trigger: 'blur',
                    message: '必填',
                },
                isfree: {
                    type: 'number',
                    required: true,
                    trigger: 'blur',
                    message: '必填',
                },
                // category: {
                //     required: true,
                //     trigger: 'change',
                //     message: '必填',
                //     type: 'array',
                // }
            },
            visibleLang: [],
            categories: [],
            selectedCategories: [],
            isForever: false,
            currentTag: '',
            tagInputVisible: false,
            tags: [],
            dateRange: [],

            formCanSubmit: 0,
            editType: editType
        };
    },
    methods: {
        checkParams() {
            if (this.materialObj.title.trim() == '') {
                this.$message.error("推荐位标题名不能为空！");
                return false;
            }
            if (this.materialObj.relaAction == "") {
                this.$message.error("关联动作必选！");
                return false;
            }
            if (this.materialObj.language == "") {
                this.$message.error("可见语言必选！");
                return false;
            }
            return true;
        },
        // 保存
        handleSubmit(formName) {
            // this.$router.push('/media/pending');
            console.log('this.$refs', this.$refs);

            if (this.editType != 'language') {
                if (this.dateRange.length < 2 && !this.isForever) {
                    this.$alert(`请选择时间范围`, '提示', {confirmButtonText: '确定'});
                    return;
                }
                if (this.checkedLas.length == 0) {
                    this.$alert(`请在运营信息至少勾选一种语言`, '提示', {confirmButtonText: '确定'});
                    return;
                }
                this.$refs.operationForm.validate((res) => {
                    if (!res) {
                        this.$alert(`请补充完必输的运营信息`, '提示', {confirmButtonText: '确定'});
                    } else {
                        this.validateLanguageInfo();
                    }
                });
            } else {
                this.validateLanguageInfo();
            }
        },
        // 取消
        handleCancel(formName) {
            this.$router.go(-1);
        },
        validateLanguageInfo() {
            if (this.editType == 'operate') {
                this.submitData();
                return;
            }

            if (this.selectedTabs.length == 0) {
                this.$alert(`影片详情必须要选择一种语言`, '提示', {confirmButtonText: '确定'});
                return;
            }

            this.formCanSubmit = 0;
            for (let lang of this.selectedTabs) {
                if (this.languageInfo[lang.name].pics.length < 5) {
                    this.$alert(`请上传5张${lang.label}图片`, '提示', {confirmButtonText: '确定'});
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
                    this.$alert(`请上传5张${lang.label}图片`, '提示', {confirmButtonText: '确定'});
                    break;
                }

                this.$refs[lang.name][0].validate((res) => {
                    if (!res) {
                        this.$alert(`请补充完必输的${lang.label}语言信息`, '提示', {confirmButtonText: '确定'});
                    } else {
                        this.formCanSubmit++;
                        console.log(`this.selectedTabs`, this.selectedTabs);
                        console.log(`formCanSubmit`, this.formCanSubmit);
                        if (this.selectedTabs.length > 0 && this.formCanSubmit == this.selectedTabs.length) {
                            this.submitData();
                        }
                    }
                });
            }
        },
        submitData() {
            let languageInfo = [];
            if (this.editType != 'operate') {
                this.selectedTabs.forEach(lang => {
                    if (this.languageInfo[lang.name].langCode) {
                        languageInfo.push(this.languageInfo[lang.name]);
                    }
                });
            }
            
            let operateInfo = this.operateInfo;
            if (this.editType != 'language') {
                if (this.isForever) {
                    operateInfo.endTime = 0;
                } else {
                    operateInfo.endTime = parseInt(this.dateRange[0].getTime() / 1000);
                    operateInfo.startTime = parseInt(this.dateRange[1].getTime() / 1000);
                }
                operateInfo.category = this.selectedCategories.map(item => {
                    for (let category of this.categories) {
                        if (item == category.name) {
                            return category;
                        }
                    }
                });
                operateInfo.langs = this.checkedLas.map(item => {
                    for (let lang of this.tabs) {
                        if (item == lang.label) {
                            return lang.name;
                        }
                    }
                });
                operateInfo.tag = this.tags;
                operateInfo.sequence = parseInt(operateInfo.sequence);
            }

            let promise = null;
            if (this.editType == 'language') {
                promise = mediaStore.updateFilmLanguageInfo(getParameterByName('id'), {
                    language: languageInfo
                });
            } else if (this.editType == 'operate') {
                promise = mediaStore.updateFilmOperationInfo(getParameterByName('id'), {
                    operateInfo
                });
            } else {
                promise = mediaStore.updateFilm(getParameterByName('id'), {
                    status: 6, // 状态直接变成上线
                    language: languageInfo,
                    operateInfo
                });
            }

            promise.then(res => {
                // this.$alert(`更改成功`, '提示', {confirmButtonText: '确定'});
                this.$router.go(-1);
            }).catch(error => {
                this.$alert(`更改失败, ${error.message}`, '错误', {confirmButtonText: '确定'});
            })
        },
        posterUploadSuccess(fileList) {
            console.log("得到的数组：", fileList);
            this.materialObj.pictures[this.postIndex] = fileList;
            console.log("海报上传成功的数组", this.materialObj.pictures);
        },
        posterIndex(index) {
            this.postIndex = index;
        },
        posterBeforeUpload(file) {
            console.log("选择的单个海报", file);

        },
        iconBeforeUpload(file) {
            const isOutSize = file.size / 1024 / 1024 > 2;
            if (isOutSize)
                this.$message.error('上传 图片大小不能超过 2MB!');
            return !isOutSize;
        },
        iconMapUploadSuccess(file) {

        },
        // 选择永久
        doForever(data) {
            console.log(data)
        },
        // 选择关联动作
        chooseOpt(data) {
            this.image = 'image' == data;
            this.video = 'video' == data;
            this.column = 'column' == data;
            this.movieSpecial = 'movieSpecial' == data;
        },
        // 选择语言
        handleLaSelect(values) {
            this.laTabs = values.map(item => {
                return item;
            });
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleUploadSuccess(langCode, i, imgs) {
            const types = [1, 32, 2, 0, 21];
            console.log(`handleUploadSuccess ${langCode} ${i}`, imgs);
            if (!this.languageInfo[langCode].pics) {
                this.languageInfo[langCode].pics = [];
            }
            this.languageInfo[langCode].pics[i] = {
                type: types[i],
                url: imgs[0].url,
                md5: imgs[0].md5,
                name: imgs[0].md5,
            };
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
        handleCategorySelect() {
            console.log('this.selectedCategories', this.selectedCategories);
        },
        addTag() {
            let inputValue = this.currentTag;
            if (inputValue) {
                this.tags.push(inputValue);
            }
            this.tagInputVisible = false;
            this.currentTag = '';
        },
        showTagInput() {
            this.tagInputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleClose(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1);
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
    },
    watch: {
        // formCanSubmit(value) {
        //     console.log(`this.selectedTabs`, this.selectedTabs);
        //     console.log(`formCanSubmit`, value);
        //     if (this.selectedTabs.length > 0 && value == this.selectedTabs.length) {
        //         this.submitData();
        //     }
        // }
    },
    mounted() {
        let id = getParameterByName('id');
        console.log('media id', id);
        mediaStore.getFilm(id).then(res => {
            console.log('getFilm', res);
            let selectedLang = [];
            for (let item of res.data.language) {
                this.languageInfo[item.langCode] = item;
                for (let tab of this.tabs) {
                    if (tab.name == item.langCode) {
                        selectedLang.push(tab);
                        break;
                    }
                }
            }
            this.selectedTabs = selectedLang;
            this.visibleLang = selectedLang.map(item => (item.label));

            this.operateInfo = res.data.operateInfo;
            if (this.operateInfo.price !== undefined) {
                this.operateInfo.price = `${this.operateInfo.price}`;
            }
            if (this.operateInfo.rating !== undefined) {
                this.operateInfo.rating = `${this.operateInfo.rating}`;
            }
            if (this.operateInfo.vodrank !== undefined) {
                this.operateInfo.vodrank = `${this.operateInfo.vodrank}`;
            }
            if (this.operateInfo.starrating !== undefined) {
                this.operateInfo.starrating = `${this.operateInfo.starrating}`;
            }
            if (this.operateInfo.sequence !== undefined) {
                this.operateInfo.sequence = `${this.operateInfo.sequence}`;
            }
            this.data = res.data;
            this.selectedCategories = res.data.operateInfo.category.map(item => item.name);
            if (res.data.operateInfo.tag.length == 0) {
                this.tags = [];
            } else {
                if (Array.isArray(res.data.operateInfo.tag)) {
                    this.tags = res.data.operateInfo.tag;
                } else {
                    this.tags = [res.data.operateInfo.tag];
                }
            }
            if (res.data.operateInfo.endTime !== undefined) {
                if (res.data.operateInfo.endTime == 0) {
                    this.isForever = true;
                } else {
                    this.dateRange = [
                        new Date(res.data.operateInfo.endTime * 1000),
                        new Date(res.data.operateInfo.startTime * 1000)
                    ]
                }
            }
            this.checkedLas = res.data.operateInfo.langs.map(item => {
                for (let lang of this.tabs) {
                    if (lang.name == item) {
                        return lang.label;
                    }
                }
            });
        });
        mediaStore.getCategoryList().then(res => {
            this.categories = res.data;
        })
    }
}
</script>
