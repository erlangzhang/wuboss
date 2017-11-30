<style>
    .text-input {
        width: 193px;
    }
    .textarea-input {
        width: 438px;
    }
    .step-bottom-btn-div {
        margin-top: 10px;
        margin-bottom: 50px;
        float: right;
    }
</style>

<template>
    <div class='layout-container'>
        <PublicHeader :title="init.title" :breadcrumbs="init.breadcrumbs"></PublicHeader>
        <div class="table-container">
            <el-form :model="materialObj" label-width="120px" ref="materialObj" :rules='rules'>
                <el-form-item label="推荐位标题名:" prop="name">
                    <el-input v-model="materialObj.name" class="text-input"></el-input>
                </el-form-item>
                <el-form-item label="推荐位副标题:">
                    <el-input v-model="materialObj.subName" class="text-input"></el-input>
                </el-form-item>
                <el-form-item label="条目描述:">
                    <el-input type="textarea" v-model="materialObj.description" class="textarea-input"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="上下线日期:">
                            <el-date-picker
                                    :disabled="forever"
                                    type="datetime"
                                    :editable="timeEdit"
                                    placeholder="选择日期" v-model="materialObj.onlineTime">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="至">
                            <el-date-picker
                                    :disabled="forever"
                                    type="datetime"
                                    :editable="timeEdit"
                                    placeholder="选择日期" v-model="materialObj.offlineTime">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item>
                            <el-checkbox label="永久" v-model="forever" :value="forever" @change="doForever"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="关联动作:" prop="actionType">
                    <el-select v-model="materialObj.actionType" placeholder="请选择关联动作" @change="chooseOpt">
                        <el-option v-for="item in relaActions" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="视频ID:" v-show="video" prop="contentGlobalId">
                    <el-input v-model="materialObj.contentGlobalId" placeholder="填写content ID" class="text-input"></el-input>
                </el-form-item>
                <el-form-item label="电影专题:" v-show="movieSpecial" prop="contentGlobalId">
                    <el-select v-model="materialObj.contentGlobalId" placeholder="请选择专题">
                        <el-option v-for="item in movieSpecialItem" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择栏目:" v-show="column" prop="contentGlobalId">
                    <el-select v-model="materialObj.contentGlobalId" placeholder="请选择栏目类型">
                        <el-option v-for="item in columnItems" :label="item.name" :value="item.globalId"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="可见语言:" prop="visibleLang">
                    <el-checkbox-group class="new-item-checkbox" v-model="materialObj.visibleLang" @change="handleLaSelect">
                        <el-checkbox v-for="item in languages" :label="item.langName" :value="item.langCode">
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item v-if="materialObj.visibleLang.length !== 0" style="width: 98%" >
                    <el-tabs v-model="laTabChecked" type="border-card">
                        <el-tab-pane v-for="item in selectedTabs" :label="renderLanguage(item.langCode)">
                            <el-form-item label="上传海报:" :model='languageInfo[item.langCode]'>
                                <el-form-item style="width: 80%">
                                    <el-row type="flex">
                                        <el-col v-for="(pic, i) in picRules">
                                            <PicUploadAddMer
                                                    v-if="languageInfo[item.langCode].pics && languageInfo[item.langCode].pics[i]"
                                                    :multiple="false"
                                                    :defaultFileList="[languageInfo[item.langCode].pics[i]]"
                                                    :beforeUpload="iconBeforeUpload"
                                                    :uploadSuccess="(imgs) => {handleUploadSuccess(item.langCode, i, imgs, pic.type)}"/>
                                            <PicUploadAddMer
                                                    v-else
                                                    :multiple="false"
                                                    :beforeUpload="iconBeforeUpload"
                                                    :uploadSuccess="(imgs) => {handleUploadSuccess(item.langCode, i, imgs, pic.type)}"/>
                                            <div style="clear: both"></div>
                                            <div>{{pic.remark}}</div>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-form-item>

                            <el-form-item label="详情图片:" v-show="image" prop="contentGlobalId">
                                <PicUploadAddMer
                                        v-if="actionImage[item.langCode].pics"
                                        :multiple="true"
                                        :defaultFileList="actionImage[item.langCode].pics"
                                        :beforeUpload="iconBeforeUpload"
                                        :uploadSuccess="(imgs) => {handleActionUploadSuccess(item.langCode, imgs)}" />
                                <PicUploadAddMer
                                        v-else
                                        :multiple="true"
                                        :beforeUpload="iconBeforeUpload"
                                        :uploadSuccess="(imgs) => {handleActionUploadSuccess(item.langCode, imgs)}"/>
                            </el-form-item>
                            </el-tab-pane>
                    </el-tabs>
                </el-form-item>


                <el-form-item class="step-bottom-btn-div">
                    <el-button type="primary" @click="handleSubmit('materialObj')">保存</el-button>
                    <el-button @click="handleCancel('materialObj')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {
    PicUploadAddMer,
    PicAppearAddMer,
    Preview,
    NavBar,
} from "../../components";
import {
    mainMenuStore,
    mediaStore
} from "../../stores";
import moment from 'moment';
import PublicHeader from '../../components/PublicHeader.vue';
export default {
    data() {
            return {
                id: this.$route.query.id,
                init: {
                    breadcrumbs: ['主菜单管理', '主菜单素材', '新增素材'],
                    title: '新增素材',
                },
                previewData: {},
                titleList: ["内容管理", "本地生活圈", "商户库", "添加商户"],
                forever: false,
                languages: mainMenuStore.getLanguages(), //语言
                selectedTabs: [],
                pictures: [],
                relaActions: [
                    {name: '图片', value: 1},
                    {name: '视频', value: 2},
                    {name: '跳转栏目', value: 3},
                    {name: '电影专题', value: 4},
                    {name: '无动作', value: 5}],
                image: false,
                video: false,
                column: false,
                movieSpecial: false,
                laTabChecked: '',
                languageInfo: {
                    chi: {},
                    eng: {},
                    jpn: {},
                    kor: {},
                },
                actionImage: {
                    chi: {},
                    eng: {},
                    jpn: {},
                    kor: {},
                },
                picRules: [
                    {type: 1, remark:'海报，尺寸308*436'},
                    {type: 29, remark:'推荐图，尺寸224*120'},
                    {type: 30, remark:'推荐图，尺寸308*120'},
                    {type: 31, remark:'推荐图，尺寸214*436'}
                ],
                columnItems: [],
                movieSpecialItem: [], // 专题列表
                timeEdit: false,
                materialObj: {
                    name: '', // 推荐位标题名
                    subName: '', // 推荐位副标题
                    description: '', // 条目描述
                    isDefault: 0, // 默认为非缺省
                    onlineTime: '', // 上线时间
                    offlineTime: '', // 下线时间
                    actionType: '', // 关联动作类型
                    contentGlobalId: '', // 关联动作的值
                    visibleLang: [], // 可见语言
                    languageList: [],

                },
                rules: {
                    name: [{
                        type: 'string',
                        required: true,
                        trigger: 'blur',
                        message: '推荐位标题名必填',
                    }, ],
                    actionType: [{
                        type: 'number',
                        required: true,
                        trigger: 'blur',
                        message: '关联动作必选',
                    }, ],
                    visibleLang: [{
                        type: 'array',
                        required: true,
                        trigger: 'blur',
                        message: '可见语言必选',
                    }, ],
                },
            };
        },
        methods: {
            checkParams() {
                // 校验上下线时间
                if(!this.forever) {
                    if (this.materialObj.onlineTime == '') {
                        this.$message.error("上线时间必填！");
                        return false;
                    }
                    if (this.materialObj.offlineTime == "") {
                        this.$message.error("下线时间必填！");
                        return false;
                    }
                    if (moment(this.materialObj.onlineTime).isBefore(moment())) {
                        this.$message.error("上线时间已过期！");
                        return false;
                    }
                    if (moment(this.materialObj.offlineTime).isBefore(moment())) {
                        this.$message.error("下线时间已过期！");
                        return false;
                    }
                    if (moment(this.materialObj.offlineTime).isBefore(moment(this.materialObj.onlineTime))) {
                        this.$message.error("下线时间不能早于上线时间！");
                        return false;
                    }
                }

                // 校验关联动作(非图片)
                if (1 != this.materialObj.actionType && 5 != this.materialObj.actionType && (this.materialObj.contentGlobalId == "" || this.materialObj.contentGlobalId == null)) {
                    this.$message.error(`关联动作内容不能为空!`);
                    return false;
                }

                for (let lang of this.selectedTabs) {
                    if (!this.languageInfo[lang.langCode].pics || this.languageInfo[lang.langCode].pics.length < 4) {
                        this.$message.error(`请上传4张【${lang.langName}】海报图片!`);
                        return false;
                    }
                    let isPicNull = false;
                    for (let pic of this.languageInfo[lang.langCode].pics) {
                        if (!pic) {
                            isPicNull = true;
                            break;
                        }
                    }
                    if (isPicNull) {
                        this.$message.error(`请上传4张【${lang.langName}】海报图片!`);
                        return false;
                    }
                    if (1 == this.materialObj.actionType && (!this.actionImage[lang.langCode].pics || this.actionImage[lang.langCode].pics.length < 1)) {
                        this.$message.error(`【${lang.langName}】的详情图片不能为空`);
                        return false;
                    }
                }

                return true;
            },
            // 保存
            handleSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.checkParams()) {
                            this.materialObj.onlineTime = moment(this.materialObj.onlineTime).format('X')
                            this.materialObj.offlineTime = moment(this.materialObj.offlineTime).format('X')
                            this.materialObj.visibleLang = mainMenuStore.transLanguages(this.materialObj.visibleLang, 2)
                            if(this.forever) {
                                this.materialObj.isDefault = 1
                                this.materialObj.onlineTime = ''
                                this.materialObj.offlineTime = ''
                            }
                            else
                                this.materialObj.isDefault = 0

                            // 新增
                            if (!this.id) {
                                Object.keys(this.languageInfo).forEach(lang => {
                                    if (this.languageInfo[lang].pics) {
                                        this.languageInfo[lang].langCode = lang
                                        if(1 == this.materialObj.actionType) {
                                            this.actionImage[lang].pics.map(i => {
                                                this.languageInfo[lang].pics.push(i)
                                            })
                                        }
                                        this.materialObj.languageList.push(this.languageInfo[lang]);
                                    }
                                });

                                mainMenuStore.createMaterial(this.materialObj).then(ret => {
                                    console.log('===ret ' +  JSON.stringify(ret))
                                    if (0 == ret.code) {
                                        this.$router.push('/main_menu/material')
                                        this.$message("创建成功！");
                                    }else
                                        this.$message.error("创建失败！");
                                }).catch(err => {
                                    this.$message.error(`创建失败！${err}`);
                                })
                            }
                            // 编辑
                            else {
                                this.materialObj.languageList = []
                                Object.keys(this.languageInfo).forEach(lang => {
                                    if (this.languageInfo[lang].pics) {
                                        this.languageInfo[lang].langCode = lang
                                        if(1 == this.materialObj.actionType) {
                                            this.actionImage[lang].pics.map(i => {
                                                this.languageInfo[lang].pics.push(i)
                                            })
                                        }
                                        this.materialObj.languageList.push(this.languageInfo[lang]);
                                    }
                                });

                                mainMenuStore.editMaterial(this.id, this.materialObj).then(ret => {
                                    if (0 == ret.code) {
                                        this.$router.push('/main_menu/material')
                                        this.$message("编辑成功！");
                                    }else
                                        this.$message.error("编辑失败！");
                                }).catch(err => {
                                    this.$message.error(`编辑失败！${err}`);
                                })
                            }

                        }
                    }
                });
            },
            // 取消
            handleCancel(form) {
                this.$router.push('/main_menu/material');
            },
            // 选择关联动作
            chooseOpt(data) {
                this.image = (1 == data)
                this.video = (2 == data)
                this.column = (3 == data)
                this.movieSpecial = (4 == data)
                if (5 == data) {
                    this.image = false
                    this.video = false
                    this.column = false
                    this.movieSpecial = false
                }
            },
            doForever() {
                if(this.forever) {
                    this.materialObj.onlineTime = ''
                    this.materialObj.offlineTime = ''
                }
            },
            // 选择语言
            handleLaSelect(values) {
                this.selectedTabs = values.map(item => {
                    for (let tab of this.languages) {
                        if (tab.langName == item) {
                            return tab;
                        }
                    }
                });

            },
            renderLanguage(langCode){
                return mainMenuStore.renderLanguages(langCode)
            },
            iconBeforeUpload(file) {
                const isOutSize = file.size / 1024 / 1024 > 2;
                if (isOutSize)
                    this.$message.error('上传 图片大小不能超过 2MB!');
                return !isOutSize;
            },
            // 海报
            handleUploadSuccess(langCode, i, imgs, type) {
                if (imgs.length > 0) {
                    if (this.languageInfo[langCode].pics == undefined) {
                        this.languageInfo[langCode].pics = [];
                    }
                    this.languageInfo[langCode].pics[i] = {
                        type: type,
                        url: imgs[0].url,
                        md5: imgs[0].md5,
                        name: imgs[0].md5,
                    };
                }else{
                    this.languageInfo[langCode].pics.splice(i, 1);
                }
            },
            // 关联详情图片
            handleActionUploadSuccess(langCode, imgs) {
                // 添加图片
                if (this.actionImage[langCode].pics == undefined || (this.actionImage[langCode].pics && imgs.length > this.actionImage[langCode].pics.length)) {
                    let actionPic = {
                        type: 15,
                        url: imgs[0].url,
                        md5: imgs[0].md5,
                        name: imgs[0].md5,
                    };
                    if (this.actionImage[langCode].pics == undefined) {
                        this.actionImage[langCode].pics = [];
                    }
                    this.actionImage[langCode].pics.push(actionPic)
                }
                // 移除图片
                else {
                    let imgArr = []
                    if (imgs.length > 0) {
                        imgs.map(img => {
                            let actionPic = {
                                type: 15,
                                url: img.url,
                                md5: img.md5,
                                name: img.md5,
                            };
                            imgArr.push(actionPic)
                        })
                    }
                    this.actionImage[langCode].pics = imgArr
                }
            }
        },
        computed: {
        },
        components: {
            PicUploadAddMer,
            PicAppearAddMer,
            Preview,
            NavBar,
            PublicHeader,
        },
        created() {
            // 获取栏目
            mainMenuStore.getCategory().then(ret => {
                this.columnItems = ret
            })
            // 获取专题列表
            mediaStore.getTopicList({page:1,limit:1000}).then(ret => {
                if (0 == ret.code) {
                    let data = ret.data.docs
                    data.map(d => {
                        let topic = {
                            name: d.language[0].name,
                            id: d.globalId
                        }
                        this.movieSpecialItem.push(topic)
                    })
                }
            })

            if (!this.id) {
                // 新增默认 【中文】
                this.materialObj.visibleLang = mainMenuStore.transLanguages('chi', 1)
                this.selectedTabs = [mainMenuStore.getLanguages()[0]]
                return
            }
            mainMenuStore.getMaterial(this.id).then(ret => {
                if (0 == ret.code) {
                    this.init.title = '编辑素材'
                    this.init.breadcrumbs[2] = '编辑素材'
                    let data = ret.data.docs
                    this.materialObj = data
                    this.materialObj.onlineTime = (null==data.onlineTime) ? '' : moment(data.onlineTime * 1000).format('YYYY-MM-DD HH:mm:ss') // 上线时间
                    this.materialObj.offlineTime = (null==data.offlineTime) ? '' : moment(data.offlineTime * 1000).format('YYYY-MM-DD HH:mm:ss') // 下线时间
                    this.materialObj.visibleLang = mainMenuStore.transLanguages(data.visibleLang, 1)
                    if (1==this.materialObj.isDefault)
                        this.forever = true

                    let selectedLang = [];
                    data.languageList.map(item => {
                        let pics1 = []
                        let pics2 = []
                        item.pics.map(p => {
                            if(p) {
                                if (15 == p.type) {
                                    pics1.push(p)
                                    return false
                                }else {
                                    for (let i=0; i<this.picRules.length; i++) {
                                        if (this.picRules[i].type == p.type) {
                                            pics2[i] = p
                                        }
                                    }
                                    return false
                                }
                            }
                        })

                        this.actionImage[item.langCode].pics = pics1
                        this.languageInfo[item.langCode].pics = pics2

                        this.languages.map(tab => {
                            if (tab.langCode == item.langCode) {
                                selectedLang.push(tab);
                                return false
                            }
                        })
                    })
                    this.selectedTabs = selectedLang

                } else
                    this.$message.error(`获取素材详情失败！`);
            }).catch(err => {
                this.$message.error(`获取素材详情失败！${err}`);
            })


        }
}
</script>
