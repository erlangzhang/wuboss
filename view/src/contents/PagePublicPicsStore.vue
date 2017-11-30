<style>
.checkbox-height {
    text-align: center;
    height: 50px;
    line-height: 50px;
}

.check-group-container {
    padding-top: 10px;
}

.checkbox-style-change .el-checkbox__inner {
    width: 35px;
    height: 50px;
}

.el-input__inner {
    /*border-radius: 30px;*/
    /*输入框的圆角程度*/
}

.search-bar {
    height: 50px;
    line-height: 50px;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.new-pic-store tr td:first-child {
    text-align: right;
    vertical-align: top;
}

.pic-image-render {
    width: 64px;
    height: 64px;
    margin-top: 5px;
}

.pic-image-preview {
    max-width: 420px;
    max-height: 420px;
}

.tag-select {
    width: 480px;
    float: right;
    margin-top: -14px;
    margin-bottom: 10px;
    margin-right: 10px;
}

.tag-select1 {
    width: 400px;
}

.input-name {
    width: 200px;
}

.tag-select-2 {
    width: 480px;
}

.input-width {
    width: 80px;
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
                <el-breadcrumb-item>公共图片库</el-breadcrumb-item>
            </el-breadcrumb>
            <div class='breadcrumb-header'></div>
        </div>
        <div class='content-header'>
            <VIcon type='appstore' /> 公共图片库
            <div class='breadcrumb-header'></div>
        </div>
        <div class="pic-type-choose">
            <div class="check-group-container">
                <div class='operator-bar'>
                    <el-select v-model="selectTags" class='tag-select-2' multiple placeholder="请选择图片类型">
                        <el-option v-for="item in picTags" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input class='input-width' type="number" placeholder="宽" v-model="picWidth">
                    </el-input>
                    <el-input class='input-width' type="number" placeholder="高" v-model="picHeight">
                    </el-input>
                    <el-input class='input-name' placeholder="图片名称" v-model="search">
                    </el-input>
                    <el-button type="primary" icon="search" @click="handleSearch">搜索</el-button>
                </div>
                <div class='operator-bar'>
                    <a class="create-btn" href="javascript:;" @click="onUpload">
                        <VIcon type='plus' class='iconfont-button' />上传</a>
                    <a href="javascript:;" @click="handleRefresh" class="refresh-btn">
                        <VIcon type='reload' class='iconfont-button' />刷新</a>
                    <el-dropdown @command="handleBatchCommand">
                        <span class="batch-btn">
                                                    <VIcon type="check-square-o"/>
                                                    批量操作 <VIcon type="down"/>
                                            </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="delete">
                                <VIcon type="delete" class='batch-iconfont-button' />删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span class="batch-select-span" v-if="this.selectItems.length !== 0">{{ `选择了 ${this.selectItems.length} 项`}}</span>
                    <!--   <el-tag class="tag-admin-edit" v-for="tag in selectItems" :closable="true" type="primary">
                        {{tag.name}}
                    </el-tag> -->
                </div>
                <div class='table-container'>
                    <span class='table-title'>显示第 {{(pagination.currentPage - 1) * pagination.pageSize +1|| 1 }} 至 {{getLastPage}} 条，共 {{pagination.total}} 条</span>
                    <el-dropdown class="select-row-dropdown" :hide-on-click="false">
                        <el-button class="select-row">
                            选择列
                            <VIcon type="down" />
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-checkbox v-model="columnsChecked.id">id</el-checkbox>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-checkbox v-model="columnsChecked.name">图片名称</el-checkbox>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-checkbox v-model="columnsChecked.picture">图片</el-checkbox>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-checkbox v-model="columnsChecked.size">尺寸</el-checkbox>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-checkbox v-model="columnsChecked.pictureType">图片类型</el-checkbox>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-checkbox v-model="columnsChecked.createdAt">创建时间</el-checkbox>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-checkbox v-model="columnsChecked.updatedAt">更新时间</el-checkbox>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-checkbox v-model="columnsChecked.opt">操作</el-checkbox>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!--
                                            <el-input
                                            class='search-input'
                                            placeholder="图片名称"
                                            icon="search"
                                            v-model="search"
                                            :on-icon-click="handleSearch">
                                        </el-input>
                    <el-select v-model="selectTags" class='tag-select' multiple placeholder="请选择图片类型">
                                            <el-option
                                                v-for="item in picTags"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                        -->
                    <el-table :data="datas" v-loading="loading" element-loading-text="加载中" border style="width: 100%" @sort-change='handleSortChange' @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                            <template scope="scope">
                                <el-checkbox v-model="scope.row.isSelected" @change="onChecked(scope.row)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="columnsChecked.id" label="id" prop="pictureId">
                        </el-table-column>
                        <el-table-column v-if="columnsChecked.name" label="图片名称" prop="name">
                        </el-table-column>
                        <el-table-column label="图片" v-if="columnsChecked.picture">
                            <template scope="scope">
                                <img class="pic-image-render" :src="scope.row.resizeUrl" />
                            </template>
                        </el-table-column>
                        <el-table-column label="尺寸(宽*高)" v-if="columnsChecked.size">
                            <template scope="scope">
                                <label> {{ `${scope.row.width} * ${scope.row.height}` }}</label>
                            </template>
                        </el-table-column>
                        <el-table-column label="图片类型" v-if="columnsChecked.pictureType">
                            <template scope="scope">
                                <el-col>
                                    <el-tag v-for="tag in scope.row.tags" :type="renderTag(tag)" style="margin-right: 5px;">
                                        {{ tag }}
                                    </el-tag>
                                </el-col>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间" prop="createdAt" sortable width="180" v-if="columnsChecked.createdAt">
                            <template scope="scope">
                                <label> {{ renderTime(scope.row.createdAt) }}</label>
                            </template>
                        </el-table-column>
                        <el-table-column label="更新时间" prop="updatedAt" sortable width="180" v-if="columnsChecked.updatedAt">
                            <template scope="scope">
                                <label> {{ renderTime(scope.row.updatedAt) }}</label>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="260" v-if="columnsChecked.opt" show-overflow-tooltip>
                            <template scope="scope">
                                <a href="javascript:;" @click="handlePreview(scope.row)" class="retrieve-btn">
                                    <VIcon type="eye-o" class='iconfont-button' />预览
                                </a>
                                <a class="edit-btn" href="javascript:;" @click="onEdit(scope.row.pictureId)">
                                    <VIcon type='edit' class='iconfont-button' />编辑</a>
                                <a href="javascript:;" @click="handleDel(scope.row)" class="delete-btn">
                                    <VIcon type="delete" class='iconfont-button' />删除
                                </a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="table-pagination">
                        <el-pagination :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <el-dialog v-model="dialogVisible" size="tiny">
                <span><VIcon type="question-circle" class="delete-btn-dialog-icon"/> 删除操作可能引起引用该图片的页面错误！确定删除吗？</span>
                <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="handleDelOk">确 定</el-button>
                            </span>
            </el-dialog>
            <el-dialog v-model="batchDialogVisible" size="tiny">
                <span><VIcon type="question-circle" class="delete-btn-dialog-icon"/>删除操作可能引起引用该图片的页面错误！确定要批量删除吗？</span>
                <span slot="footer" class="dialog-footer">
                            <el-button @click="batchDialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="handleBatchDelOk">确 定</el-button>
                        </span>
            </el-dialog>
            <el-dialog :title="id ? '编辑' : '新增'" v-model="dialogUploadVisible" @close="handleCancel">
                <el-form :model="itemInfo" :rules="rules" ref="itemInfo" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="图片:" prop="url">
                        <el-upload v-if="!id" class="avatar-uploader" :headers="uploadHeader" action="/shineblue/api/picture/upload" :show-file-list="false" :on-success="handleAvatarScucess" :before-upload="beforeAvatarUpload">
                            <img v-if="itemInfo.url" :src="itemInfo.url" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <img v-if="itemInfo.url && id" :src="itemInfo.url" class="avatar">
                        <span v-if="!id" style="font-size: 3px;color: gray">注：图片大小不超过2M,图片格式为jpg和png</span>
                    </el-form-item>
                    <el-form-item label="图片名称:" prop="name">
                        <el-input v-model="itemInfo.name" style="width:50%;"></el-input>
                    </el-form-item>
                    <el-form-item label="选择分类:" prop="tags">
                        <el-select v-model="itemInfo.tags" multiple class='tag-select1' placeholder="请选择分类" style="width:70%;">
                            <el-option v-for="item in picTags" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleCancel">取 消</el-button>
                        <el-button type="primary" @click="handleUploadSave">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog title="预览" v-model="previewDialogVisible" size="small">
                <div style="text-align: center;">
                    <img class="pic-image-preview" :src="previewData.url" />
                </div>
                <span slot="footer" class="dialog-footer">
                        <!--     <el-button @click="previewDialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="previewDialogVisible = false">确 定</el-button> -->
                        </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import {
    VIcon,
    Btn,
    ImageAppear,
    PicUpload
} from '../components';
import {
    contentStore,
    picStore,
} from '../stores';
import common from '../common';
import {
    mapActions
} from 'vuex';
import lodash from 'lodash';
export default {
    data() {
            return {
                picTags: [],
                datas: [],
                picWidth: '',
                picHeight: '',
                dialogVisible: false,
                batchDialogVisible: false,
                selectRow: {},
                selectItems: [],
                search: "",
                allTags: [],
                loading: false,
                selectTags: [],
                uploadHeader: {
                    Authorization: sessionStorage.getItem('jwt:token'),
                },
                id: '',
                itemInfo: {
                    name: "",
                    url: '',
                    tags: [],
                    md5: '',
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入图片名称',
                        trigger: 'blur'
                    }, {
                        min: 1,
                        message: '名称不能为空',
                        trigger: 'blur'
                    }],
                    url: [{
                        required: true,
                        message: '请选择上传的图片',
                        trigger: 'change'
                    }],
                    tags: [{
                        type: 'array',
                        required: true,
                        message: '请选择图片分类',
                        trigger: 'change'
                    }],
                },
                dialogUploadVisible: false,
                columnsChecked: {
                    name: true,
                    picture: true,
                    size: true,
                    pictureType: true,
                    createdAt: true,
                    updatedAt: true,
                    opt: true,
                    id: true,
                },
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },
                previewDialogVisible: false,
                previewData: {},
            };
        },
        components: {
            VIcon,
            Btn,
            ImageAppear,
            PicUpload
        },
        created: function() {
            picStore.listPicTags().then(ret => {
                this.allTags = ret.data.name;
                this.picTags = ret.data.name.map(item => {
                    return {
                        value: item,
                        label: item,
                    }
                });
                this.fetch();
            }).catch(err => {
                this.$message.error(`获取图片或标签数据失败!${err}`);
            });
        },
        computed: {
            getLastPage: function() {
                var maxCurrPage = parseInt(this.pagination.total / this.pagination.pageSize);
                var yushu = this.pagination.total % this.pagination.currentPage;
                if (yushu != 0) {
                    if (this.pagination.currentPage <= maxCurrPage) {
                        return this.pagination.currentPage * this.pagination.pageSize;
                    } else {
                        return this.pagination.total;
                    }
                } else {
                    return this.pagination.currentPage * this.pagination.pageSize;
                }
            }
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
            onUpload() {
                const bo = common.auth('图片库新建');
                if (bo)
                    this.dialogUploadVisible = true
                else {
                    this.$message.error('没有权限进行该操作!');
                }
            },
            handleSortChange(param) {
                const tmp = {
                    limit: this.pagination.pageSize,
                    page: this.pagination.currentPage
                };
                if (!!param.prop) {
                    const order = param.order === 'ascending' ? '' : '-';
                    tmp.sort = order + param.prop;
                }
                this.fetch(tmp);
            },
            renderTime(unix) {
                return common.renderTime(unix);
            },
            renderTag(tag) {
                const baseTag = ['primary', 'success', 'warnin', 'danger'];
                for (let i = 0; i < this.allTags.length; ++i) {
                    if (this.allTags[i] === tag)
                        return baseTag[i % baseTag.length];
                }
            },
            renderArray(array) {
                return common.renderArray(array);
            },
            handleBatchCommand(command) {
                if (this.selectItems.length === 0) {
                    this.$message({
                        message: '请先选择操作的项！',
                        type: 'warning'
                    });
                    return;
                }
                switch (command) {
                    case 'delete':
                        {
                            this.batchDialogVisible = true;
                            break;
                        }
                }
            },
            handleSearch(ev) {
                const params = {
                    page: this.pagination.currentPage,
                    limit: this.pagination.pageSize,
                };
                if (this.search) {
                    params.search = this.search;
                }
                if (this.picWidth) {
                    params.width = Number(this.picWidth);
                    if (params.width < 1 || !this.isPositiveInteger(params.width)) {
                        this.$message.error("请填写正确的宽！");
                        this.picWidth = '';
                        return;
                    }
                }
                if (this.picHeight) {
                    params.height = Number(this.picHeight);
                    if (params.height < 1 || !this.isPositiveInteger(params.width)) {
                        this.$message.error("请填写正确的高！");
                        this.picHeight = '';
                        return;
                    }
                }
                if (this.selectTags.length !== 0) {
                    params.tags = this.selectTags.toString();
                }
                this.fetch(params);

            },

            isPositiveInteger(value) {
                var re = /^[0-9]+$/;
                return re.test(value);
            },

            handleDel(row) {
                this.dialogVisible = true;
                this.selectRow = row;
            },
            handleDelOk() {
                picStore.batchDelete([this.selectRow.pictureId]).then(ret => {
                    this.dialogVisible = false;
                    this.pagination.currentPage = 1;
                    const params = {
                        page: this.pagination.currentPage,
                        limit: this.pagination.pageSize
                    };
                    if (this.search) {
                        params.search = this.search;
                    }
                    this.fetch(params);
                }).catch(err => {
                    this.$message.error(`删除失败！${err}`);
                });
            },
            handleBatchDelOk() {
                const idArray = this.selectItems.map(item => {
                    return item.pictureId;
                })
                picStore.batchDelete(idArray).then(ret => {
                    this.batchDialogVisible = false;
                    const params = {
                        page: 1,
                        limit: this.pagination.pageSize
                    };
                    if (this.search) {
                        params.search = this.search;
                    }
                    this.fetch(params);
                }).catch(err => {
                    this.$message.error(`批量删除失败！${err}`);
                });
            },
            handleRefresh() {
                const params = {
                    page: this.pagination.currentPage,
                    limit: this.pagination.pageSize,
                };
                if (this.search) {
                    params.search = this.search;
                }
                if (this.picWidth) {
                    params.width = Number(this.picWidth);

                    if (params.width <= 0) {
                        this.$message.error("宽必须大于0！");
                        this.picWidth = '';
                        return;
                    }
                }
                if (this.picHeight) {
                    params.height = Number(this.picHeight);
                    if (params.height <= 0) {
                        this.$message.error("高必须大于0！");
                        this.picHeight = '';
                        return;
                    }
                }
                if (this.selectTags.length !== 0) {
                    params.tags = this.selectTags.toString();
                }
                this.fetch(params);
            },

            onChecked(row) {
                row.isSelected = !!row.isSelected;
                let isSet = false;
                for (const item of this.selectItems) {
                    if (item.pictureId === row.pictureId) {
                        item.isSelected = !!row.isSelected;
                        isSet = true;
                        break;
                    }
                }
                if (!isSet) {
                    this.selectItems.push({
                        pictureId: row.pictureId,
                        isSelected: row.isSelected,
                        name: row.name,
                    });
                }
                lodash.remove(this.selectItems, item => {
                    return item.isSelected === false;
                });
                this.resetChecked();
            },

            handleSelectionChange(selection) {
                for (const item of this.datas) {
                    item.isSelected = selection.length !== 0;
                    let isSet = false;
                    for (const item1 of this.selectItems) {
                        if (item1.pictureId === item.pictureId) {
                            item1.isSelected = selection.length !== 0;
                            isSet = true;
                            break;
                        }
                    }
                    if (!isSet) {
                        this.selectItems.push({
                            pictureId: item.pictureId,
                            name: item.name,
                            isSelected: selection.length !== 0,
                        });
                    }
                }

                console.log("全选取出来的selectitem", this.selectItems);

                lodash.remove(this.selection, item => {
                    return item.isSelected === false;
                });
                this.resetChecked();
                // this.selectItems = selection;
            },
            resetChecked() {
                const array = new Array();
                for (const item of this.selectItems) {
                    if (item.isSelected !== false) {
                        array.push(item);
                    }
                }
                this.selectItems = null;
                this.selectItems = array;
                console.log(" this.selectItems去掉false以后的数组>>>", this.selectItems);
            },
            fetch(params = {
                limit: 10,
                page: 1
            }) {
                this.loading = true;
                picStore.list(params).then(ret => {
                    this.datas = ret.data.docs;
                    this.pagination.total = Number(ret.data.total);
                    this.loading = false;
                    for (const item of this.datas) {
                        this.$set(item, "isSelected", false);
                        for (const itemS of this.selectItems) {
                            if (item.pictureId === itemS.pictureId) {
                                this.$set(item, 'isSelected', itemS.isSelected);
                                break;
                            }
                        }
                    }
                }).catch(err => {
                    this.$message.error(`获取图片数据失败!${err}`);
                    this.loading = false;
                });
            },
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                const params = {
                    limit: val,
                    page: this.pagination.currentPage,
                };
                if (this.search) {
                    params.search = this.search;
                }
                this.fetch(params);
            },
            handleCurrentChange(val) {
                this.pagination.currentPage = val;
                const params = {
                    limit: this.pagination.pageSize,
                    page: val,
                };
                if (this.search) {
                    params.search = this.search;
                }
                this.fetch(params);
            },

            handleAvatarScucess(res, file, fileList) {
                this.itemInfo.url = res.data.url;
                this.itemInfo.md5 = res.data.md5;
                this.itemInfo.name = file.name.substr(0, file.name.indexOf('.'));
            },
            beforeAvatarUpload(file) {
                // const isOutSize = file.size / 1024 / 1024 > 2;
                // if (isOutSize)
                //     this.$message.error('上传图片大小不能超过 2MB!');
                // return !isOutSize;

                // let isEnableUpload = true;
                // let isOutSize = false;
                // switch (file.type) {
                //     case 'image/jpeg':
                //         isOutSize = file.size / 1024 / 1024 > 0.5;
                //         if (isOutSize)
                //             this.$message.error('上传 jpeg 图片大小不能超过 500kb!');
                //         break;
                //     case 'image/png':
                //         isOutSize = file.size / 1024 / 1024 > 2;
                //         if (isOutSize)
                //             this.$message.error('上传 png 图片大小不能超过 2MB!');
                //         break;
                //     default:
                //         isEnableUpload = false;
                //         this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                // }
                // return isEnableUpload && !isOutSize; 

                let isEnableUpload = true;
                let isOutSize = false;
                switch (file.type) {
                    case 'image/jpeg':
                    case 'image/png':
                    case 'image/jpg':
                    case 'image/bmp':
                    case 'image/gif':
                        isOutSize = file.size / 1024 / 1024 > 2;
                        if (isOutSize)
                            this.$message.error('上传图片大小不能超过 2MB!');
                        break;
                    default:
                        isEnableUpload = false;
                        this.$message.error('上传头像图片只能是图片格式!');
                }
                return isEnableUpload && !isOutSize;
            },
            handleUploadSave() {
                this.$refs['itemInfo'].validate((valid) => {
                    if (valid) {
                        if (this.id) {
                            picStore.update(this.id, {
                                name: this.itemInfo.name,
                                tags: this.itemInfo.tags
                            }).then(ret => {
                                // this.$message({ type: 'success', message: `更新成功！`});
                                this.itemInfo = {
                                    name: "",
                                    url: '',
                                    tags: [],
                                    md5: '',
                                };
                                this.dialogUploadVisible = false;
                                this.id = '';

                                this.fetch();
                            }).catch(err => {
                                this.$message.error(`更新失败！${err}`);
                            });
                        } else {
                            picStore.create(this.itemInfo).then(ret => {
                                this.itemInfo = {
                                    name: "",
                                    url: '',
                                    tags: [],
                                    md5: '',
                                }
                                this.dialogUploadVisible = false;
                                this.fetch();
                            }).catch(err => {
                                this.$message.error(`创建失败！${err}`);
                            })
                        }
                    }
                });

            },
            handleCancel() {
                this.itemInfo = {
                    name: "",
                    url: '',
                    tags: [],
                    md5: '',
                };
                this.dialogUploadVisible = false;
                this.id = '';
            },
            onEdit(id) {
                const bo = common.auth('图片库编辑/锁定');
                if (!bo) {
                    this.$message.error('没有权限进行该操作!');
                    return;
                }
                picStore.retrieve(id).then(ret => {
                    this.itemInfo = ret.data;
                    this.dialogUploadVisible = true;
                    this.id = id;
                }).catch(err => {
                    this.$message.error(`获取数据失败！${err}`);
                });
            },

            handlePreview(row) {
                this.previewData = row;
                this.previewDialogVisible = true;
            },
        },
}
</script>
