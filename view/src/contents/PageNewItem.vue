<style>
.create-container table tr {
    margin-top: 50px;
}

.create-container table tr td:first-child {
    text-align: right;
}

.new-description .el-input__inner {
    border-radius: 5px;
    height: 100px;
}

.description-top {
    vertical-align: top;
    text-align: right;
}

.new-item-checkbox .el-checkbox__inner {
    width: 14px;
    height: 14px;
}

.new-item-checkbox .el-checkbox__label {
    font-size: 8px;
}


/*头像样式*/

.avatar-uploader {
    width: 148px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
}

.avatar {
    width: 148px;
    height: 148px;
    display: block;
}

.el-radio__label {
    font-size: 8px;
}

.el-radio__inner {
    width: 14px;
    height: 14px;
}

.choosedVersionStyle .el-radio-button__inner {
    background: #83dee6;
    font-size: 8px;
}

.choosedLanguageStyle .el-radio-button__inner {
    background: #64c8d8;
    font-size: 8px;
}
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>
                    <span @click='focusIndex()'>
                    <VIcon class='breadcrumb-icon' type='home' />首页</span></el-breadcrumb-item>
                <el-breadcrumb-item>素材管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{this.id ? '编辑栏目' : '新建栏目'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class='breadcrumb-header'></div>
        </div>
        <div class='content-header'>
            <VIcon type='appstore' /> {{this.id ? '栏目内容-编辑' : '栏目内容-新建'}}
            <div class='breadcrumb-header'></div>
        </div>
        <div class="table-container">
            <el-form :model="itemObj" :rules="rules" ref="itemInfo" label-width="100px" class="demo-ruleForm">
                <!--
                        <el-form-item label="栏目项名称:" prop="name">
                            <el-input type="input" placeholder="请输入栏目项名称" v-model="itemObj.name"></el-input>
                        </el-form-item>
                    -->
                <el-form-item label="栏目类型:">
                    <el-select v-model="itemObj.type" style="width:320px" placeholder="请选择栏目">
                        <el-option v-for="item in columnType" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="栏目名称:" required>
                    <el-tabs v-model="nameTabsValue" style="width:46%" type="border-card">
                        <el-tab-pane v-for="(item, index) in nameTabs" :label="item.title" :name="item.name">
                            <el-input type="input" :placeholder="'请输入 '+ item.title +' 栏目名称'" v-model="itemObj[item.name].name"></el-input>
                        </el-tab-pane>
                    </el-tabs>
                </el-form-item>
                <el-form-item label="描述:" style="width:50%" prop="description">
                    <el-input type="textarea" :rows="4" v-model="itemObj.description"></el-input>
                </el-form-item>
                <el-form-item label="是否为条目:" prop="isLeafNode">
                    <el-switch v-model="itemObj.isLeafNode" on-text="是" off-text="否" on-color="#13ce66" off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="后台服务:">
                    <el-select v-model="itemObj.action.fun" @change="actionSelect" style="width:320px" placeholder="请选择关联动作">
                        <!--      <el-option v-for="item in actions" :label="item.name" :value="item.value">
                        </el-option>   改之前-->
                        <el-option v-for="item in actions" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关联信息:">
                    <el-input v-if="isShowParamInput === true" style="width:45%" type="input" v-model="itemObj.action.parameters"></el-input>
                    <el-select v-if="isShowParamInput === false" v-model="value" @change="actionParamSelect" style="width:320px" placeholder="请选择关联信息">
                        <el-option v-for="item in newsOpt" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属EPG:" prop="epgChecked">
                    <el-checkbox-group class="new-item-checkbox" v-model="itemObj.epgChecked" @change="handleEpgSelect(itemObj.epgChecked)">
                        <el-checkbox v-for="item in epgs" :label="item">
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item v-if="itemObj.epgChecked.length !== 0" style="width:50%" label="EPG配置:">
                    <el-tabs v-model="epgsTabValue" type="border-card">
                        <el-tab-pane v-for="(item, index) in epgsTabs" :label="item.title" :name="item.name">
                            <el-form-item label="栏目语言:">
                                <el-checkbox-group class="new-item-checkbox" v-model="itemObj[item.name].langChecked" @change="handleLanguageSelect(itemObj[item.name].langChecked)">
                                    <el-checkbox v-for="item in language" :label="item.name">
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item v-if="itemObj[item.name].langChecked.length !== 0" label="栏目配置:">
                                <el-tabs v-model="itemObj[item.name].langTabValue" type="card">
                                    <el-tab-pane v-for="(item0, index) in itemObj[item.name].langTabs" :label="item0.title" :name="item0.name">
                                        <el-form-item label="普通图标:">
                                            <!--
                                                        <ImageAppear 
                                                            v-if="id && !isIconSelect && !!itemObj[item.name][item0.name].icon && !!itemObj[item.name][item0.name].icon.url" 
                                                            :href="itemObj[item.name][item0.name].icon.url" 
                                                            :close="imgAppearClose.bind(this, itemObj[item.name], item0.name,'icon' )"/>
                                                        -->
                                            <PicUpload :uploadSuccess="iconUploadSuccess" :defaultFileList="renderImgList('icon', item, item0)" :beforeUpload="iconBeforeUpload" />
                                        </el-form-item>
                                        <el-form-item label="高亮图标:">
                                            <!--
                                                        <ImageAppear v-if="id && !isHightIconSelect && !!itemObj[item.name][item0.name].highlightIcon && !!itemObj[item.name][item0.name].highlightIcon.url"
                                                        :href="itemObj[item.name][item0.name].highlightIcon.url" 
                                                        :close="imgAppearClose.bind(this, itemObj[item.name], item0.name, 'highlightIcon')"/>
                                                        -->
                                            <PicUpload :uploadSuccess="hightIconUploadSuccess" :defaultFileList="renderImgList('highlightIcon', item, item0)" :beforeUpload="iconBeforeUpload" />
                                        </el-form-item>
                                        <el-form-item multiple label="图片:">
                                            <!--
                                                        <div v-if="id && !isPicSelect && itemObj[item.name][item0.name].pics && itemObj[item.name][item0.name].pics.length !== 0">
                                                            <ImageAppear 
                                                                v-for="(picItem, picIndex) in itemObj[item.name][item0.name].pics"
                                                                :href="picItem.url"
                                                                :close="imgAppearClose.bind(this, itemObj[item.name], item0.name, 'pics', picIndex)"
                                                            >
                                                            </ImageAppear>
                                                        </div>
                                                        -->
                                            <PicUpload :multiple="true" :defaultFileList="itemObj[item.name][item0.name].pics" :uploadSuccess="picUploadSuccess" :beforeUpload="picBeforUpload" />
                                            <span style="color: red; margin-left: 100px; font-size: 12px;">多张图片轮播顺序为图片上传顺序</span>
                                        </el-form-item>
                                    </el-tab-pane>
                                </el-tabs>
                            </el-form-item>
                        </el-tab-pane>
                    </el-tabs>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100px;text-align: center;" @click="handleCancleBtn">重置</el-button>
                    <el-button type="primary" style="width:100px;text-align: center;" @click="handleSaveBtn()">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {
    VIcon,
    Btn,
    PicUpload,
    ImageAppear,
} from '../components';
import {
    contentStore,
    picStore,
    appStore,
} from '../stores';
import func from './function';
import {
    mapActions
} from 'vuex';
export default {
    data() {
            return {
                value: '',
                isShowParamInput: true,
                isPicSelect: false,
                isHightIconSelect: false,
                isIconSelect: false,
                dialogUploadVisible: false,
                itemInfo: {
                    name: "",
                    url: '',
                    tags: [],
                    md5: '',
                },
                itemObj: {
                    type: '',
                    name: '',
                    description: '',
                    isLeafNode: false,
                    action: {
                        fun: '',
                        parameters: '',
                    },
                    epgChecked: [],
                },
                uploadHeader: {
                    Authorization: sessionStorage.getItem('jwt:token'),
                },

                newsOpt: [{
                    label: '国内时政',
                    value: 0,
                }, {
                    label: '财经新闻',
                    vale: 1,
                }, {
                    label: '国际时政',
                    vale: 2,
                }, {
                    label: '娱乐新闻',
                    vale: 3,
                }, {
                    label: '英语新闻',
                    vale: 4,
                }, {
                    label: '世园会媒体报道',
                    vale: 5,
                }, {
                    label: '世园会工作动态',
                    vale: 6,
                }],

                epgs: [],
                language: [],
                picTags: [],
                actions: [{
                    name: '请选择',
                    value: '请选择'
                }], //关联动作
                epgsTabValue: '1',
                epgsTabs: [],
                // epgChecked: [],

                langTabValue: '1',
                langTabs: [],
                langChecked: [],

                columnType: ['请选择'],

                nameTabs: [],
                nameTabsValue: '1',

                rules: {
                    name: [{
                        required: true,
                        message: '请输入栏目名称',
                        trigger: 'blur'
                    }, {
                        min: 2,
                        message: '长度最少 2 个字符',
                        trigger: 'blur'
                    }],
                    epgChecked: [{
                        type: 'array',
                        required: true,
                        message: '请至少选择一个epg',
                        trigger: 'change'
                    }],
                    type: [{
                        required: true,
                        message: '请选择栏目类型',
                        trigger: 'change'
                    }],
                },
            };
        },
        components: {
            VIcon,
            Btn,
            PicUpload,
            ImageAppear,
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
        created() {
            Promise.all([
                contentStore.listEpgs(),
                contentStore.listLanguage(),
                contentStore.listMethod(),
                picStore.listPicTags(),
                contentStore.listColumnType()
            ]).then(results => {
                this.epgs = results[0].data.epgs;
                this.language = results[1].data;
                this.actions = this.actions.concat(results[2].data);
                this.picTags = results[3].data.name.map(item => {
                    return {
                        value: item,
                        label: item,
                    }
                });
                this.columnType = this.columnType.concat(results[4].data.map(item => {
                    return item.name;
                }));
                this.nameTabs = this.language.map(item => {
                    this.$set(this.itemObj, item.code, {
                        languageType: item.code,
                        name: ''
                    });
                    return {
                        title: `${item.name}-${item.code}`,
                        name: item.code,
                    };
                });
                this.nameTabsValue = this.nameTabs[0].name;

                // 动态构造epg 配置项参数
                this.epgs.map(item => {
                    const tmp = {
                        styleName: item,
                        langChecked: [],
                        langTabs: [],
                        langTabValue: '',
                    };
                    // 构造epg 下面的语言配置项参数
                    for (const item of this.language) {
                        const config = {
                            languageType: item.code,
                            highlightIcon: {
                                url: '',
                                md5: '',
                            },
                            icon: {
                                url: '',
                                md5: '',
                            },
                            pics: [],
                        };
                        tmp[item.code] = config;
                        tmp[item.name] = config;
                    }
                    this.$set(this.itemObj, item, tmp);
                });
                if (!this.id)
                    return;
                contentStore.getItemInfo(this.id).then(ret => {
                    const data = ret.data;
                    this.itemObj.action = data.action;
                    this.itemObj.name = data.name;
                    this.itemObj.isLeafNode = data.isLeafNode;
                    this.itemObj.description = data.description;
                    this.itemObj.type = data.type;
                    // 栏目名称
                    for (const item of data.language) {
                        this.itemObj[item.languageType] = item;
                    }
                    // epg 配置
                    for (const item of data.style) {
                        this.itemObj.epgChecked.push(item.styleName);
                        const tmp = this.itemObj[item.styleName];
                        for (const it of item.content) {
                            const iconData = {
                                languageType: it.languageType,
                                // highlightIcon: it.highlightIcon,
                                // icon: it.icon,
                                // pics: it.pics,
                                icon: {
                                    url: '',
                                    md5: '',
                                },
                                highlightIcon: {
                                    url: '',
                                    md5: '',
                                },
                                pics: [],
                            };

                            for (const picItem of it.pics) {
                                const tmpPic = {
                                    ...picItem,
                                };
                                delete tmpPic.type;
                                switch (Number(picItem.type)) {
                                    case 13:
                                        {
                                            iconData.icon = tmpPic;
                                            break;
                                        }
                                    case 14:
                                        {
                                            iconData.highlightIcon = tmpPic;
                                            break;
                                        }
                                    case 15:
                                        { //栏目图片
                                            iconData.pics.push(tmpPic);
                                            break;
                                        }
                                }
                            }
                            tmp[it.languageType] = iconData;
                            for (const lan of this.language) {
                                if (lan.code === it.languageType) {
                                    tmp.langChecked.push(lan.name);
                                    tmp[lan.name] = iconData;
                                    break;
                                }
                            }
                            if (tmp.langChecked.length !== 0) {
                                tmp.langTabValue = tmp.langChecked[0];
                                tmp.langTabs = tmp.langChecked.map(item => {
                                    return {
                                        title: `${item}`,
                                        name: item,
                                    };
                                });
                            }
                        }
                        this.itemObj[item.styleName] = tmp;
                    }
                    if (this.itemObj.epgChecked.length !== 0) {
                        this.epgsTabs = this.itemObj.epgChecked.map(item => {
                            return {
                                title: `epg ${item}`,
                                name: item,
                            };
                        });
                        this.epgsTabValue = this.itemObj.epgChecked[0];
                    }
                }).catch(err => {
                    this.$message.error(`获取 编辑 数据失败！${err}`);
                });
            }).catch(err => {
                this.$message.error(`获取epg 或 语言 或 关联动作 或 编辑 数据失败！${err}`);
            });
        },
        methods: {
            ...mapActions({
                setMenuIndex: 'hotel/SET_CUR_EDIT_ID',
            }),
            focusIndex() {
                this.$router.push('/');
                this.setMenuIndex({
                    curEditId: '1'
                });
            },
            actionSelect(value) {
                this.isShowParamInput = true;
                // switch (value) {
                //     case 'tv_list':
                //     case 'movie_list':
                //     case 'magazine_list':
                //     case 'survey':
                //     case 'food_service':
                //     case 'global_time':
                //     case 'stock_list':
                //     case 'weather_list':
                //     case 'meeting_service':
                //     case 'recomm_list':
                //     case 'satisfaction_service':
                //         this.itemObj.action.parameters = 'categoryid=';
                //         break;
                //     case 'show_movie_detail':
                //         this.itemObj.action.parameters = 'programid=';
                //         break;
                //     case 'show_magazine':
                //     case 'show_service_item':
                //         this.itemObj.action.parameters = 'itemid=';
                //         break;
                //     case 'laundry':
                //     case 'check_out':
                //     case 'language_list':
                //     case 'bill_list':
                //         break;
                //     case 'play_video':
                //         this.itemObj.action.parameters = 'contentids=';
                //         break;
                //     case 'news_list':
                //         this.isShowParamInput = false;
                //         this.itemObj.action.parameters = 'newsidx=';
                //         break;
                //     case 'launch_app':
                //         this.itemObj.action.parameters = 'packagename=';
                //         break;
                //     case 'show_web_page':
                //         this.itemObj.action.parameters = 'weburl=""';
                //         break;
                //     case 'phone_fee':
                //     case 'free_movie':
                //     case 'travel_life':
                //         this.itemObj.action.parameters = 'categoryid=';
                //         break;
                // }
            },
            actionParamSelect(value) {
                this.itemObj.action.parameters += value;
            },
            renderImgList(type, epgItem, languageItem) {
                if (this.itemObj[epgItem.name][languageItem.name][type].url) {
                    return [this.itemObj[epgItem.name][languageItem.name][type]];
                }
                return [];
            },
            imgAppearClose(obj, itemName, itemName1, index) {
                for (const item of this.language) {
                    if (item.name !== itemName) {
                        continue;
                    }
                    if (!index) {
                        obj[item.code][itemName1] = {
                            url: '',
                            md5: ''
                        };
                    } else {
                        obj[item.code][itemName1][index] = {
                            url: '',
                            md5: ''
                        };
                    }
                    break;
                }
            },
            handleEpgSelect(values) {
                // 删除上一次选中，这次未选中的数据
                for (const it in this.itemObj) {
                    for (const epg of this.epgs) {
                        if (it === epg) { // 是epg 配置属性
                            if (values.toString().indexOf(it) === -1) {
                                const tmp = {
                                    styleName: it,
                                    langChecked: [],
                                    langTabs: [],
                                    langTabValue: '',
                                };
                                // 构造epg 下面的语言配置项参数
                                for (const item of this.language) {
                                    const tmpData = {
                                        languageType: item.code,
                                        highlightIcon: {
                                            url: '',
                                            md5: '',
                                        },
                                        icon: {
                                            url: '',
                                            md5: '',
                                        },
                                        pics: [],
                                    };
                                    tmp[item.code] = tmpData;
                                    tmp[item.name] = tmpData;
                                }
                                this.itemObj[it] = tmp;
                            }
                        }
                    }
                }

                this.epgsTabs = values.map(item => {
                    return {
                        title: `epg ${item}`,
                        name: item,
                    };
                });
                this.epgsTabValue = values[0];
            },

            handleLanguageSelect(values) {
                // 删除上一次选中，这次未选中的数据
                for (const it in this.itemObj[this.epgsTabValue]) {
                    for (const lang of this.language) {
                        if (it !== lang.code) {
                            continue;
                        }

                        // 是 语言 配置属性
                        if (values.toString().indexOf(lang.name) !== -1) {
                            continue;
                        }

                        // 构造epg 下面的语言配置项参数
                        const tmp = {
                            languageType: it,
                            highlightIcon: {
                                url: '',
                                md5: '',
                            },
                            icon: {
                                url: '',
                                md5: '',
                            },
                            pics: [],
                        };
                        this.itemObj[this.epgsTabValue][it] = tmp;
                    }
                }

                this.itemObj[this.epgsTabValue].langTabs = values.map(item => {
                    return {
                        title: `${item}`,
                        name: item,
                    };
                });
                this.itemObj[this.epgsTabValue].langTabValue = values[0];
            },

            handleSaveBtn() {
                this.$refs['itemInfo'].validate((valid) => {
                    if (valid) {
                        const tmp = func.columnPageDataConvertDB(this.itemObj, this.epgs, this.language);

                        console.log("要增加的栏目信息", tmp);
                        if (!tmp) {
                            this.$message.error('请选择栏目图标 并选择栏目高亮图标');
                            return;
                        }
                        if (tmp.language.length === 0) {
                            this.$message.error('请输入栏目名称');
                            return;
                        }
                        for (var i = 0; i < tmp.language.length; i++) {
                            if (tmp.language[i].name.trim() == '') {
                                this.$message.error("栏目名称不能为空字符！");
                                return;
                            }
                        }
                        for (var i = 0; i < tmp.language.length; i++) {
                            tmp.language[i].name = tmp.language[i].name.trim();
                        }
                        console.log("去掉名称中空格之后的tmp>>>", tmp);
                        for (var i = 0; i < tmp.language.length; i++) {
                            if (tmp.language[i].languageType === "chi") {
                                break;
                            } else {
                                this.$message.error('中文栏目名称必填!');
                                return;
                            }
                        }
                        if (tmp.style.length === 0) {
                            this.$message.error('请配置栏目图标');
                            return;
                        }
                        if (tmp.type == '请选择') {
                            tmp.type = '';
                        }
                        if (tmp.action.fun == '请选择') {
                            tmp.action.fun = '';
                            tmp.action.parameters = '';
                        }
                        if (this.id) {
                            contentStore.updateItem(this.id, tmp).then(ret => {
                                this.$message({
                                    message: '更新栏目成功!',
                                    type: 'success'
                                });
                                this.$router.replace('/content/items-store');
                            }).catch(err => {
                                this.$message.error(`更新失败!${err}`);
                            });
                            return;
                        }
                        contentStore.publishItem(tmp).then(ret => {
                            this.$router.replace('/content/items-store');
                            this.$message({
                                message: '创建栏目成功!',
                                type: 'success'
                            });
                        }).catch(err => {
                            this.$message.error(`创建失败!${err}`);
                        });
                    } else {
                        return false;
                    }
                });
            },

            init() {
                this.itemObj = {
                    name: '',
                    description: '',
                    isLeafNode: false,
                    action: {
                        fun: '',
                        parameters: '',
                    },
                    epgChecked: [],
                };
                this.language.map(item => {
                    this.$set(this.itemObj, item.code, {
                        languageType: item.code,
                        name: ''
                    });
                });
                this.epgs.map(item => {
                    const tmp = {
                        styleName: item,
                        langChecked: [],
                        langTabs: [],
                        langTabValue: '',
                    };
                    // 构造epg 下面的语言配置项参数
                    for (const item of this.language) {
                        const config = {
                            languageType: item.code,
                            highlightIcon: {
                                url: '',
                                md5: '',
                            },
                            icon: {
                                url: '',
                                md5: '',
                            },
                            pics: [],
                        };
                        tmp[item.code] = config;
                        tmp[item.name] = config;
                    }
                    this.$set(this.itemObj, item, tmp);
                });
            },

            handleCancleBtn() {
                this.init();
            },

            iconUploadSuccess(fileList) {
                for (const item of this.language) {
                    if (item.name !== this.itemObj[this.epgsTabValue].langTabValue) {
                        continue;
                    }
                    this.isIconSelect = true;
                    this.itemObj[this.epgsTabValue][item.code].icon = {
                        md5: fileList.length === 0 ? '' : fileList[0].md5,
                        url: fileList.length === 0 ? '' : fileList[0].url,
                        sequence: 0,
                    };
                    break;
                }
            },
            hightIconUploadSuccess(fileList) {
                for (const item of this.language) {
                    if (item.name !== this.itemObj[this.epgsTabValue].langTabValue) {
                        continue;
                    }
                    this.isHightIconSelect = true;
                    this.itemObj[this.epgsTabValue][item.code].highlightIcon = {
                        md5: fileList.length === 0 ? '' : fileList[0].md5,
                        url: fileList.length === 0 ? '' : fileList[0].url,
                        sequence: 0,
                    };
                    break;
                }
            },

            iconBeforeUpload(file) {
                // let isEnableUpload = true;
                // let isOutSize = false;
                // switch(file.type) {
                //  case 'image/jpeg':
                //      isOutSize = file.size / 1024 / 1024 > 0.5;
                //      if (isOutSize)
                //          this.$message.error('上传 jpeg 图片大小不能超过 500kb!');
                //      break;
                //  case 'image/png':
                //      isOutSize = file.size / 1024 / 1024 > 2;
                //      if (isOutSize)
                //          this.$message.error('上传 png 图片大小不能超过 2MB!');
                //      break;
                //  default:
                //      isEnableUpload = false;
                //      this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                // }
                // return isEnableUpload && !isOutSize; 
                const isOutSize = file.size / 1024 / 1024 > 2;
                if (isOutSize)
                    this.$message.error('上传 图片大小不能超过 2MB!');
                return !isOutSize;
            },

            picUploadSuccess(fileList) {

                for (const item of this.language) {
                    if (item.name !== this.itemObj[this.epgsTabValue].langTabValue) {
                        continue;
                    }
                    this.isPicSelect = true;
                    if (fileList.length === 0) {
                        this.itemObj[this.epgsTabValue][item.code].pics = [];
                        return;
                    }

                    let sequence = -1;
                    const tmp = fileList.map(item => {
                        sequence = sequence + 1;
                        return {
                            md5: item.md5,
                            url: item.url,
                            sequence,
                        };
                    });
                    const tmp1 = [];
                    this.itemObj[this.epgsTabValue][item.code].pics = this.itemObj[this.epgsTabValue][item.code].pics || [];
                    tmp.forEach(tmpItem => {
                        let isAdd = true;
                        for (let item1 of this.itemObj[this.epgsTabValue][item.code].pics) {
                            if (item1.md5 === tmpItem.md5) {
                                item1 = tmpItem;
                                isAdd = false;
                                break;
                            }
                        }
                        if (isAdd) {
                            tmp1.push(tmpItem);
                        }
                    });
                    this.itemObj[this.epgsTabValue][item.code].pics = this.itemObj[this.epgsTabValue][item.code].pics.concat(tmp1);
                    break;
                }
            },

            picBeforUpload(file) {
                const isOutSize = file.size / 1024 / 1024 > 2;
                if (isOutSize)
                    this.$message.error('上传 图片大小不能超过 2MB!');
                return !isOutSize;
                // let isEnableUpload = true;
                // let isOutSize = false;
                // switch(file.type) {
                //  case 'image/jpeg':
                //      isOutSize = file.size / 1024 / 1024 > 0.5;
                //      if (isOutSize)
                //          this.$message.error('上传 jpeg 图片大小不能超过 500kb!');
                //      break;
                //  case 'image/png':
                //      isOutSize = file.size / 1024 / 1024 > 2;
                //      if (isOutSize)
                //          this.$message.error('上传 png 图片大小不能超过 2MB!');
                //      break;
                //  default:
                //      isEnableUpload = false;
                //      this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                // }
                // return isEnableUpload && !isOutSize; 
            },
        },
}
</script>
