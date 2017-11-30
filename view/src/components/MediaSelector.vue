<template>
    <div>
        <XTable ref="selected" :options="selectedOptions" :data="data"></XTable>
        <div v-if="previewType == 1" style="margin: 20px 0;">
            <div style="float:left">
                <span>语言：</span>
                <el-radio-group size="small" v-model="language" @change="handleLanguageChange">
                    <el-radio-button v-for="item in languages" :label="item.label"></el-radio-button>
                </el-radio-group>
            </div>
            <div style="float:right">
                <span>影片等级：</span>
                <el-radio-group size="small" v-model="level" @change="handleLevelChange">
                    <el-radio-button v-for="item in levels" :label="item.label"></el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div style="clear:both"></div>
        <div class="screen-preview" v-if="previewType == 1">
            <div class="screen-preview-div">
                <img class="preview-background" src="../images/preview1.png" width="800" height="450">
                <img v-if="previewImages.length > 0" class="preview-img" style="top: 68px; left: 210px; width: 224px; height: 340px" :src="previewImages[0]">
                <img v-if="previewImages.length > 1" class="preview-img" style="top: 242px; left: 441px; width: 145px; height: 168px" :src="previewImages[1]">
                <img v-if="previewImages.length > 2" class="preview-img" style="top: 242px; left: 594px; width: 145px; height: 168px" :src="previewImages[2]">
            </div>
            <div class="screen-preview-div">
                <img class="preview-background" src="../images/preview2.png" width="800" height="450">
                <img v-if="previewImages.length > 3" class="preview-img" style="top: 67px; left: 32px; width: 117px; height: 168px" :src="previewImages[3]">
                <img v-if="previewImages.length > 4" class="preview-img" style="top: 242px; left: 32px; width: 117px; height: 168px" :src="previewImages[4]">
                <img v-if="previewImages.length > 5" class="preview-img" style="top: 67px; left: 157px; width: 224px; height: 343px" :src="previewImages[5]">
                <img v-if="previewImages.length > 6" class="preview-img" style="top: 67px; left: 388px; width: 145px; height: 168px" :src="previewImages[6]">
                <img v-if="previewImages.length > 7" class="preview-img" style="top: 242px; left: 388px; width: 145px; height: 168px" :src="previewImages[7]">
                <img v-if="previewImages.length > 8" class="preview-img" style="top: 67px; left: 541px; width: 145px; height: 168px" :src="previewImages[8]">
                <img v-if="previewImages.length > 9" class="preview-img" style="top: 242px; left: 541px; width: 145px; height: 168px" :src="previewImages[9]">
            </div>
            <div class="screen-preview-div">
                <img class="preview-background" src="../images/preview3.png" width="800" height="450">
                <img v-if="previewImages.length > 10" class="preview-img" style="top: 67px; left: 32px; width: 117px; height: 168px" :src="previewImages[10]">
                <img v-if="previewImages.length > 11" class="preview-img" style="top: 242px; left: 32px; width: 117px; height: 168px" :src="previewImages[11]">
                <img v-if="previewImages.length > 12" class="preview-img" style="top: 67px; left: 157px; width: 117px; height: 168px" :src="previewImages[12]">
                <img v-if="previewImages.length > 13" class="preview-img" style="top: 242px; left: 157px; width: 117px; height: 168px" :src="previewImages[13]">
                <img v-if="previewImages.length > 14" class="preview-img" style="top: 67px; left: 282px; width: 117px; height: 168px" :src="previewImages[14]">
                <img v-if="previewImages.length > 15" class="preview-img" style="top: 242px; left: 282px; width: 117px; height: 168px" :src="previewImages[15]">
                <img v-if="previewImages.length > 16" class="preview-img" style="top: 67px; left: 407px; width: 117px; height: 168px" :src="previewImages[16]">
                <img v-if="previewImages.length > 17" class="preview-img" style="top: 242px; left: 407px; width: 117px; height: 168px" :src="previewImages[17]">
                <img v-if="previewImages.length > 18" class="preview-img" style="top: 67px; left: 532px; width: 117px; height: 168px" :src="previewImages[18]">
                <img v-if="previewImages.length > 19" class="preview-img" style="top: 242px; left: 532px; width: 117px; height: 168px" :src="previewImages[19]">
                <img v-if="previewImages.length > 20" class="preview-img" style="top: 67px; left: 657px; width: 117px; height: 168px" :src="previewImages[20]">
                <img v-if="previewImages.length > 21" class="preview-img" style="top: 242px; left: 657px; width: 117px; height: 168px" :src="previewImages[21]">
            </div>
        </div>
        <div class="screen-preview" v-if="previewType == 2" style="height: 350px;">
            <div class="imgs-div" style="flex: 1">
                <div class="column" style="flex: 2">
                    <div class="row" style="flex: 3">
                        <div class="cell" style="flex: 1"><p>视频位</p></div>
                    </div>
                    <div class="row" style="flex: 1">
                        <div class="cell" style="flex: 1"><p>盛阳会员</p></div>
                        <div class="cell" style="flex: 1"><p>①</p></div>
                    </div>
                </div>
                <div class="column" style="flex: 1">
                    <div class="cell" style="flex: 1"><p>②</p></div>
                </div>
                <div class="column" style="flex: 2">
                    <div class="row" style="flex: 1">
                        <div class="cell" style="flex: 1"><p>③</p></div>
                        <div class="cell" style="flex: 1"><p>④</p></div>
                    </div>
                    <div class="row" style="flex: 1">
                        <div class="cell" style="flex: 1"><p>酒店位置</p></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="screen-preview" v-if="previewType == 2" style="height: 350px;">
            <div class="imgs-div" style="flex: 1">
                <div class="column" style="flex: 4">
                    <div class="cell" style="flex: 1"><p>⑤</p></div>
                </div>
                <div class="column" style="flex: 2">
                    <div class="row" style="flex: 1">
                        <div class="cell" style="flex: 1"><p>⑥</p></div>
                    </div>
                    <div class="row" style="flex: 1">
                        <div class="cell" style="flex: 1"><p>⑦</p></div>
                    </div>
                </div>
                <div class="column" style="flex: 6">
                    <div class="row" style="flex: 1">
                        <div class="cell" style="flex: 1"><p>⑧</p></div>
                    </div>
                    <div class="row" style="flex: 1">
                        <div class="cell" style="flex: 1"><p>⑨</p></div>
                    </div>
                </div>
                <div class="column" style="flex: 3">
                    <div class="cell" style="flex: 1"><p>⑩</p></div>
                </div>
                <div class="column" style="flex: 3">
                    <div class="cell" style="flex: 1"><p>⑪</p></div>
                </div>
            </div>
        </div>
        <el-dialog title="请选择资源" :visible.sync="dialogVisible">
            <div style="margin-bottom: 10px">
                <el-select class="category-select" v-model="category" size="small" placeholder="选择类型" @change="handleSelectChange">
                    <el-option
                        v-for="item in categoryOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <Transfer
                :titles="transferTitles"
                :data="transferData"
                :target-keys="transferTargetKeys"
                :list-style="listStyle"
                :render-format="renderTransferRow"
                filterable
                @on-change="handleTransferChange">
            </Transfer>
            <div class="dialog-bottom-btn-div">
                <el-button size="small" @click="handleCancel">取消</el-button>
                <el-button size="small" type="primary" @click="handleSubmit">确定选择</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import XTable from './XTable.vue';
import Transfer from 'iview/src/components/transfer';
import {
    VIcon,
    Btn,
} from '../components';
import {
    mediaStore
} from '../stores';

const PREVIEW_TYPE_VOD_HOME = 1;
const PREVIEW_TYPE_MAIN_MENU = 2;

const OPTION_TOPIC = -1;
const COLUMN_OPTION = [
    {id: 'name', title: '影片/专题名称', checked: true, formatter: (row) => {
        return row.language[0].name;
    }},
    {id: 'globalId', title: 'ID', checked: true},
    {id: 'category', title: '类型', checked: true, formatter: (row) => {
        if (row.objectType == 19) {
            return '';
        }
        return row.operateInfo.category.map(item => item.name).join('、');
    }},
    {id: 'level', title: '分级', checked: true, formatter: (row) => {
        if (row.objectType == 19) {
            return '';
        }
        return row.operateInfo.vodrank;
    }},
    {id: 'langs', title: '所属语言', checked: true, formatter: (row) => {
        if (row.objectType == 19) {
            return '';
        }
        return mediaStore.getLanguagesByCodes(row.operateInfo.langs).join('、');
    }},
];

export default {
    name: 'MediaSelector',
    components: {
        XTable,
        VIcon,
        Btn,
    },
    props: {
        data: {
            type: Array,
        },
        editable: {
            type: Boolean,
            default: true,
        },
        previewType: {
            type: Number,
            default: PREVIEW_TYPE_MAIN_MENU,
        },
        withTopic: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        let selectedOptions;
        if (this.editable) {
            selectedOptions = {
                columns: COLUMN_OPTION,
                tableOperations: [
                    {
                        title: '添加资源',
                        type: 'plus',
                        btnClass: 'create-btn',
                        onClick: () => { this.dialogVisible = true }
                    }
                ],
                columnOperations: [
                    {
                        title: '移除',
                        type: 'delete',
                        btnClass: 'delete-btn',
                        visible: (rowData) => { return true },
                        confirm: {title: '确定移除吗？'},
                        onClick: (rowData) => {
                            console.log(`delete rowData`, rowData);
                            this.$refs.selected.deleteRow(rowData);
                        }
                    }
                ],
                batchOperations: [
                    {
                        title: '移除资源',
                        type: 'delete',
                        confirm: {title: '确定移除吗？'},
                        onClick: (rows) => {
                            for (let rowData of rows) {
                                this.$refs.selected.deleteRow(rowData);
                            }
                        }
                    }
                ],
                columnSortable: {
                    onSort: (rows) => {
                        this.sortedData = rows;
                    }
                },
                showRowNumber: true,
            };
        } else {
            selectedOptions = {
                columns: COLUMN_OPTION,
                showRowNumber: true,
            };
        }

        return {
            transferTitles: ['可选资源', '已选资源'],
            transferData: [],
            transferTargetKeys: [],
            listStyle: {
                width: '250px',
                height: '400px',
                textAlign: 'left',
            },
            selectedOptions,
            categoryOptions: [],
            dialogVisible: false,
            category: '',
            searchQuery: '',
            language: '中文',
            level: '1、2、3',
            languageCode: 'chi',
            levelCode: 3,
            languages: [
                {label: '中文', name: 'chi'},
                {label: '英语', name: 'eng'},
                {label: '日语', name: 'jpn'},
            ],
            levels: [
                {label: '1、2、3', name: 3},
                {label: '1、2', name: 2},
                {label: '1', name: 1},
            ],
            sortedData: null,
        };
    },
    computed: {
        previewImages: {
            get: function() {
                let sortedData = this.getSortedData();
                let images = [];
                for (let item of sortedData) {
                    if (item.operateInfo.langs.indexOf(this.languageCode) >= 0 && item.operateInfo.vodrank <= this.levelCode) {
                        for (let lang of item.language) {
                            if (lang.langCode == this.languageCode) {
                                for (let pic of lang.pics) {
                                    if (pic.type == 1) {
                                        images.push(pic.url);
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }

                return images;
            }
        }
    },
    methods: {
        requestFilmData(categoryId) {
            mediaStore.getFilmlList({page: 1, limit: 10000, category: categoryId, status: '6'}).then(res => {
                this.transferData = res.data.docs.map((item, i) => {
                    item.key = `3-${item.globalId}`;
                    item.objectType = 3; // 3表示是影片，19表示是专题
                    return item;
                });
                this.transferTargetKeys = [];
                console.log('this.transferData', this.transferData);
            });
        },
        requestTopicData() {
            mediaStore.getTopicList({page: 1, limit: 10000}).then(res => {
                this.transferData = res.data.docs.map((item, i) => {
                    item.key = `19-${item.globalId}`;
                    item.objectType = 19; // 3表示是影片，19表示是专题
                    return item;
                });
            });
            this.transferTargetKeys = [];
        },
        requestCategoryData() {
            mediaStore.getCategoryList().then(res => {
                let categoryOptions = res.data.map(item => ({
                    value: item.id,
                    label: item.name,
                }));

                if (this.withTopic) {
                    categoryOptions.push({value: OPTION_TOPIC, label: '专题'});
                }

                this.categoryOptions = categoryOptions;
            });
        },
        handleSelectChange(val) {
            console.log('handleSelectChange', val);

            if (val != OPTION_TOPIC) {
                this.requestFilmData(val);
            } else {
                this.requestTopicData();
            }
        },
        renderTransferRow(item) {
            return item.language[0].name;
        },
        handleTransferChange(data) {
            console.log('handleTransferChange', data);
            this.transferTargetKeys = data;
        },
        handleCancel() {
            this.dialogVisible = false;
        },
        handleSubmit() {
            this.transferTargetKeys.forEach(key => {
                for (let item of this.transferData) {
                    if (key == item.key) {
                        let exists = false;
                        for (let entry of this.data) {
                            if (entry.globalId == item.globalId) {
                                exists = true;
                                break;
                            }
                        }
                        // 当列表中尚未存在才添加
                        if (!exists) {
                            console.log('push item', item);
                            this.$refs.selected.pushRow(item);
                        }
                        break;
                    }
                }
            });
            this.dialogVisible = false;
        },
        getSortedData() {
            return this.sortedData ? this.sortedData : this.data;
        },
        handleLanguageChange(label) {
            for (let language of this.languages) {
                if (label == language.label) {
                    this.languageCode = language.name;
                    break;
                }
            }
        },
        handleLevelChange(label) {
            for (let level of this.levels) {
                if (label == level.label) {
                    this.levelCode = level.name;
                    break;
                }
            }
        },
    },
    mounted() {
        this.requestCategoryData();
        this.requestFilmData('');
    },
}
</script>
<style>
.category-select {
    width: 30%;
}
.search-query-input {
    width: 50%;
}
.screen-preview {
    margin: 20px 0;
    width: 100%;
    border: 2px solid gray;
    padding: 15px;
    display: flex;
    flex-direction: column;
}
.screen-preview h1 {
    font-size: 48px;
    float: left;
}
.screen-preview .marquee {
    margin-top:15px;
    font-size: 20px;
    float: right;
}
.screen-preview .imgs-div {
    display: flex;
    font-size: 24px;
}
.screen-preview .imgs-div .column {
    display: flex;
    height: 100%;
    flex-direction: column;
}
.screen-preview .imgs-div .row {
    display: flex;
    width: 100%;
    flex-direction: row;
}
.screen-preview .imgs-div .cell {
    border: 2px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    background: lightgray;
}
.dialog-bottom-btn-div {
    margin-top: 10px;
    margin-bottom: 50px;
    float: right;
}
.screen-preview-div {
    width: 800px;
    height: 450px;
    margin: 10px;
    position: relative;
}
.preview-background {
    position: absolute;
    left: 0;
    top: 0;
}
.preview-img {
    position: absolute;
}
</style>
