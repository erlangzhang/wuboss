<template>
    <div>
        <XTable ref="selected" :options="selectedOptions" :data="data"></XTable>
        <div style="clear:both"></div>

        <div class="screen-preview">
            <div class="screen-preview-div">
                <img class="preview-background" src="../images/preview4.png" width="800" height="450">
                <img v-if="previewImages[1]" class="preview-img" style="top: 266px; left: 179px; width: 193px; height: 76px" :src="previewImages[1]">
                <img v-if="previewImages[2]" class="preview-img" style="top: 68px; left: 378px; width: 193px; height: 274px" :src="previewImages[2]">
                <img v-if="previewImages[3]" class="preview-img" style="top: 68px; left: 576px; width: 95px; height: 134px" :src="previewImages[3]">
                <img v-if="previewImages[4]" class="preview-img" style="top: 68px; left: 676px; width: 95px; height: 134px" :src="previewImages[4]">
            </div>
            <div class="screen-preview-div">
                <img class="preview-background" src="../images/preview5.png" width="800" height="450">
                <img v-if="previewImages[5]" class="preview-img" style="top: 68px; left: 33px; width: 194px; height: 274px" :src="previewImages[5]">
                <img v-if="previewImages[6]" class="preview-img" style="top: 68px; left: 232px; width: 95px; height: 134px" :src="previewImages[6]">
                <img v-if="previewImages[7]" class="preview-img" style="top: 208px; left: 232px; width: 95px; height: 134px" :src="previewImages[7]">
                <img v-if="previewImages[8]" class="preview-img" style="top: 68px; left: 332px; width: 273px; height: 134px" :src="previewImages[8]">
                <img v-if="previewImages[9]" class="preview-img" style="top: 208px; left: 332px; width: 273px; height: 134px" :src="previewImages[9]">
                <img v-if="previewImages[10]" class="preview-img" style="top: 68px; left: 610px; width: 134px; height: 274px" :src="previewImages[10]">
            </div>
            <div class="screen-preview-div">
                <img v-if="previewImages" class="preview-background" src="../images/preview6.png" width="800" height="450">
                <img v-if="previewImages[11]" class="preview-img" style="top: 68px; left: 2px; width: 134px; height: 274px" :src="previewImages[11]">
                <img v-if="previewImages[12]" class="preview-img" style="top: 68px; left: 141px; width: 134px; height: 274px" :src="previewImages[12]">
                <img v-if="previewImages[13]" class="preview-img" style="top: 68px; left: 280px; width: 95px; height: 134px" :src="previewImages[13]">
                <img v-if="previewImages[14]" class="preview-img" style="top: 208px; left: 280px; width: 95px; height: 134px" :src="previewImages[14]">
                <img v-if="previewImages[15]" class="preview-img" style="top: 68px; left: 380px; width: 194px; height: 274px" :src="previewImages[15]">
                <img v-if="previewImages[16]" class="preview-img" style="top: 68px; left: 579px; width: 194px; height: 274px" :src="previewImages[16]">
            </div>
        </div>


        <!--<div class="screen-preview" style="height: 350px;">
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
        <div class="screen-preview" style="height: 350px;">
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
        </div>-->
        <el-dialog title="请选择资源" :visible.sync="dialogVisible">
            <div style="margin-bottom: 10px">
                <el-select class="category-select" v-model="category" size="small" placeholder="选择类型" @change="handleSelectChange">
                    <el-option
                            v-for="item in categoryOptions"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <Transfer
                    :titles="transferTitles"
                    :data="transferData"
                    :target-keys="transferTargetKeys"
                    :list-style="listStyle"
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
    import moment from 'moment';
    import Transfer from 'iview/src/components/transfer';
    import {
            VIcon,
            Btn,
    } from '../components';
    import {
            mainMenuStore
    } from "../stores";

    export default {
        name: 'MainMenuSelector',
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
            }
        },
        data() {
            let selectedOptions;
            if (this.editable) {
                selectedOptions = {
                    columns: [
                        {id: 'name', title: '条目名称', checked: true},
                        {id: 'actionType', title: '条目类型', checked: true},
                        {id: 'visibleLang', title: '可见语言', checked: true, formatter: (row) => {
                            return mainMenuStore.renderLanguages(row.visibleLang)
                        }},
                        {id: 'rangeInfo', title: '上下线时间', checked: true},
                    ],
                    showRowNumber: true,
                    tableOperations: [
                        /*{
                            title: '添加资源',
                            type: 'plus',
                            btnClass: 'create-btn',
                            onClick: () => { this.dialogVisible = true }
                        }*/
                    ],
                    columnOperations: [
                        {
                            title: '添加',
                            type: 'plus',
                            btnClass: 'create-btn',
                            onClick: (rowData) => {
                                this.curPosition = rowData.position - 1
                                this.dialogVisible = true }
                        },{
                            title: '移除',
                            type: 'delete',
                            btnClass: 'delete-btn',
                            visible: (rowData) => { return true },
                            confirm: {title: '确定移除吗？'},
                            onClick: (rowData) => {
                                for (let i = 0; i < this.data.length; i++) {
                                    if (rowData == this.data[i]) {
                                        let d = {
                                            position: i,
                                            name: '',
                                            actionType: '',
                                            visibleLang: '',
                                            rangeInfo: '',
                                        }
                                        this.$refs.selected.replaceRow(rowData, d);
                                    }
                                }
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
                                    for (let i = 0; i < this.data.length; i++) {
                                        if (rowData == this.data[i]) {
                                            this.data.splice(i, 1);
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    columnSortable: {
                        onSort: (rows) => {
                            this.sortedData = rows;
                        }
                    },
                };
            } else {
                selectedOptions = {
                    columns: [
                        {id: 'position', title: '位置', checked: true},
                        {id: 'name', title: '条目名称', checked: true},
                        {id: 'actionType', title: '条目类型', checked: true},
                        {id: 'visibleLang', title: '可见语言', checked: true, formatter: (row) => {
                            return mainMenuStore.renderLanguages(row.visibleLang)
                        }},
                        {id: 'rangeInfo', title: '上下线时间', checked: true},
                    ],
                };
            }

            return {
                id: this.$route.query.id,
                transferTitles: ['可选资源', '已选资源'],
                transferData: [],
                transferTargetKeys: [],
                listStyle: {
                    width: '250px',
                    height: '400px',
                    textAlign: 'left',
                },
                selectedOptions,
                categoryOptions: [
                ],
                dialogVisible: false,
                category: '',
                searchQuery: '',
                language: '',
                level: '',
                curPosition: 1,
                sortedData: null,
                categoryOptions: [
                    {name: '图片', value: 1},
                    {name: '视频', value: 2},
                    {name: '跳转栏目', value: 3},
                    {name: '电影专题', value: 4},
                    {name: '无动作', value: 5}]
            };
        },
        methods: {
            requestTableData() {
                mainMenuStore.getMMMaterialList({page: 1, limit: 10000}).then(res => {
                    this.transferData = res.data.docs.map((item, i) => {
                        item.key = `${item.name}`;
                        return item;
                    });
                });
            },
            handleSelectChange(val) {
                console.log(val)
                mainMenuStore.getMMMaterialList({actionType: val, page: 1, limit: 10000}).then(res => {
                    this.transferData = res.data.docs.map((item, i) => {
                        item.key = `${item.name}`;
                        return item;
                    });
                });
            },
            handleTransferChange(data) {
                this.transferTargetKeys = data;
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSubmit() {
                this.transferTargetKeys.forEach(key => {
                    for (let item of this.transferData) {
                        if (key == item.key) {
                            item.actionType = mainMenuStore.getActionTypeName(item.actionType)
                            item.rangeInfo = this.formatOnOffLineTime(item.isDefault, item.onlineTime, item.offlineTime)
                            item.position = this.curPosition + 1
                            this.$refs.selected.replaceRow(this.data[this.curPosition], item);
                        }
                    }
                });
                this.dialogVisible = false;
            },
            getSortedData() {
                return this.sortedData ? this.sortedData : this.data;
            },
            formatOnOffLineTime(isDefault, onlineTime, offlineTime) {
                if (1==isDefault || (null == onlineTime && null == offlineTime))
                    return '永久'
                return this.renderTime_YYYYMMDDHHMM(onlineTime) +'/'+this.renderTime_YYYYMMDDHHMM(offlineTime);
            },
            renderTime_YYYYMMDDHHMM(unix) {
                return moment(unix * 1000).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        computed: {
            previewImages: {
                get: function() {
                    const positionImageType = [-1, 29, 30, 1, 1, 1, 1, 1, 1, 29, 29, 31, 31, 1, 1, 1, 1];
                    let sortedData = this.getSortedData();
                    let images = [];
                    for (let item of sortedData) {
                        if (item.actionType != "" && item.languageList && Array.isArray(item.languageList) && item.languageList.length > 0) {
                            for (let pic of item.languageList[0].pics) {
                                if (pic.type == positionImageType[item.position]) {
                                    images[item.position] = pic.url;
                                    break;
                                }
                            }
                        }
                    }

                    return images;
                }
            }
        },
        mounted() {
            this.requestTableData();
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
