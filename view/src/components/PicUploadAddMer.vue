<style scoped>
.pic-upload-btn {
    width: 148px;
    height: 148px;
    font-size: 26px;
    margin-left: 0px;
    margin-top: 10px;
    padding-top: 5px;
    background-color: transparent;
    border-style: dashed;
}

.el-upload {
    width: 100%!important;
}

.el-upload-dragger {
    width: 100%!important;
}

.upload-dialog-class {
    min-width: '760px';
}

.tag-select2 {
    width: 90%;
}
</style>
<template>
    <div>
         <PicAppearAddMer v-if="imgList.length !== 0 && dialogVisible === false" v-for="item in imgList" :href="item.url" :key="item.url" :close="picAppearClose" /> 
        <el-button v-if="multiple!==false || imgList.length === 0" class="pic-upload-btn" @click="dialogVisible = true">
            <VIcon type='plus'/>
        </el-button>
        <el-dialog v-model="dialogVisible" :modal="modal" :close-on-click-modal="false" custom-class="upload-dialog-class" size="small" @close="handleClose">
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane label="图片上传" name="first">
                    <el-form :model="itemInfo" style="padding-bottom: 10px;" :inline="true" :rules="rules" ref="itemInfo" label-width="100px" class="demo-ruleForm">
                        <el-upload class="upload-demo" style="width: 100%;" drag :headers="uploadHeader" action="/wushu/api/picture/upload" :show-file-list="false" :on-success="handleAvatarScucess" :before-upload="beforeAvatarUpload" :auto-upload="true">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                        <el-form-item label="图片名称:" prop="name">
                            <el-input v-model="itemInfo.name" style="width:300px;" placeholder="默认图片文件名"></el-input>
                        </el-form-item>
                        <el-form-item label="选择分类:" prop="tags">
                            <el-select v-model="itemInfo.tags" multiple class='tag-select1' placeholder="请选择分类">
                                <el-option v-for="item in picTags" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="图片素材" name="second">
                    <el-form>
                        <el-form-item label="筛选分类:" prop="tags">
                            <el-select style="width: 200px;" v-model="picTagsSelc" @change="handleSelect" multiple class='tag-select2' placeholder="请选择分类">
                                <el-option v-for="item in picTags" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input class='input-name' placeholder="图片名称" v-model="search">
                            </el-input>
                             <el-input class='input-width' placeholder="图片宽"  type="number" v-model="picWidth">
                            </el-input>
                             <el-input class='input-width' placeholder="图片高"  type="number" v-model="picHeight">
                            </el-input>
                            <el-button type="primary" icon="search" @click="handleSearch">搜索</el-button>
                        </el-form-item>
                        <PicAppearAddMer v-for="item in picList" :href="item.url" :resizeUrl="item.resizeUrl" :indexKey="item.pictureId" closeDisabled previewDisabled :click="picSelect" :isSelect="item.isSelect" />
                    </el-form>
                    <el-row>
                        <el-col :span="24">
                            <el-pagination style="float: right; margin-top: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-size="pagination.pageSize" :page-sizes="[10, 20, 40, 50, 80, 100]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
                            </el-pagination>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                 <PicAppearAddMer v-for="item in imgList" :href="item.url" :key="item.url" :close="picAppearClose"/> 
                <div style="clear: both; padding: 15px;">
                    <div style="margin: 0 0 -17px; float: right; margin-top: -12px;">
                        <el-button size="small" @click="delAll" type="danger">清空所有</el-button>
                    </div>
                    <div style="height: 24px; border-bottom: 1px solid rgb(233,233,233);"></div>
                </div>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleUploadSave">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script>
import VIcon from './icon';
import PicAppearAddMer from './PicAppearAddMer';
import {
    picStore
} from '../stores';
export default {
    props: {
        multiple: Boolean,
        uploadSuccess: Function,
        beforeUpload: Function,
        modal: {
            type: Boolean,
            default: function() {
                return true;
            }
        },
        defaultFileList: {
            type: Array,
            default: function() {
                return [];
            }
        },
        filterCondition: {
            type: Object,
            default: function() {
                return null;
            }
        },

    },
    data() {
        return {
            isClickOkBtn: false,
            search: '',
            picWidth:'',
            picHeight:'',
            isRightSize: true,
            dialogImageUrl: '',
            dialogVisible: false,
            isUpload: false,
            activeName: 'first',
            choosedPicTags: [],
            itemInfo: {
                name: "",
                url: '',
                tags: [],
                md5: '',
            },
            imgList: this.defaultFileList.map(item => {
                return item;
            }),
            picList: [],
            uploadHeader: {
                Authorization: sessionStorage.getItem('jwt:token'),
            },
            picTags: [],
            picTagsSelc: [],
            rules: {
                name: [{
                    required: true,
                    message: '请输入图片名称',
                    trigger: 'blur'
                }, {
                    min: 1,
                    message: '名称长度大于 1 个字符',
                    trigger: 'blur'
                }],
                tags: [{
                    type: 'array',
                    required: true,
                    message: '请选择图片分类',
                    trigger: 'change'
                }],
            },
            pagination: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
            },
        };
    },
    watch: {
        defaultFileList() {
            this.imgList = this.defaultFileList.map(item => {
                return item;
            });
        },
    },
    components: {
        VIcon,
        PicAppearAddMer,
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
        }).catch(err => {
            this.$message.error(`获取图片或标签数据失败!${err}`);
        });
        this.fetch();
    },
    methods: {
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
            if (this.choosedPicTags.length) {
                params.tags = this.choosedPicTags.toString();
            }
            this.fetch(params);
        },
        isPositiveInteger(value) {
            var re = /^[0-9]+$/;
            return re.test(value);
        },
        delAll() {
            this.imgList = [];
            if (this.uploadSuccess) {
                this.uploadSuccess(this.imgList);
            }
        },
        initPicListSelected() {
            for (const item of this.picList) {
                for (const it of this.imgList) {
                    if (item.pictureId === it.pictureId) {
                        item.isSelect = true;
                        break;
                    } else {
                        item.isSelect = false;
                    }
                }
            }
        },
        picSelect(indexKey, href, isSelect) {
            // 查找md5
            let md5 = '';
            for (let i = 0; i < this.picList.length; ++i) {
                if (this.picList[i].pictureId === indexKey) {
                    md5 = this.picList[i].md5;
                    break;
                }
            }
            if (this.multiple === true && isSelect === true) {
                this.imgList.push({
                    pictureId: indexKey,
                    url: href,
                    md5,
                    isSelect,
                });

            } else if (this.multiple === true && isSelect === false) {
                for (let i = 0; i < this.imgList.length; ++i) {
                    if (this.imgList[i].pictureId === indexKey) {
                        this.imgList.splice(i, 1);
                        break;
                    }
                }
            } else {
                this.imgList = [{
                    pictureId: indexKey,
                    url: href,
                    md5,
                    isSelect,
                }];
            }
            this.initPicListSelected();
          
        },
        handleTabClick() {
            switch (this.activeName) {
                case 'second':
                    {
                        const params = {
                            limit: this.pagination.pageSize,
                            page: this.pagination.currentPage,
                        };
                        if (this.picTagsSelc.length) {
                            params.tags = this.picTagsSelc.toString();
                        }
                        this.fetch(params);
                        break;
                    }
            }
        },
        handleSelect(values) {
            this.choosedPicTags = values;
            const params = {
                limit: this.pagination.pageSize,
                page: this.pagination.currentPage,
            };
            if (values.length) {
                params.tags = values.toString();
            }
            this.fetch(params);
        },
        handleCurrentChange(val) {
            this.pagination.currentPage = val;
            const params = {
                limit: this.pagination.pageSize,
                page: val,
            };
            if (this.picTagsSelc.length) {
                params.tags = this.picTagsSelc.toString();
            }
            this.fetch(params);
        },
        handleSizeChange(val) {
            this.pagination.pageSize = val;
            const params = {
                limit: val,
                page: this.pagination.currentPage,
            };
            if (this.picTagsSelc.length) {
                params.tags = this.picTagsSelc.toString();
            }
            this.fetch(params);
        },
        fetch(params = {
            limit: 10,
            page: 1
        }) {
            this.loading = true;
            if (this.filterCondition != null) {
                params.width = this.filterCondition.width;
                params.height = this.filterCondition.height;
            } else {
                console.log("筛选条件图片宽和高是空");
            }

            picStore.list(params).then(ret => {
                this.picList = ret.data.docs;
                this.pagination.total = Number(ret.data.total);
                this.initPicListSelected();
            }).catch(err => {
                this.$message.error(`获取图片数据失败!${err}`);
            });
        },
        handleAvatarScucess(res, file, fileList) {
            if (this.filterCondition != null && !this.isRightSize) return;
            var itemInfo = {
                name: "",
                url: '',
                tags: [],
                md5: '',
            };
            itemInfo.url = res.data.url;
            itemInfo.md5 = res.data.md5;
            itemInfo.name = file.name.substr(0, file.name.indexOf('.'));
            this.itemInfo.url = res.data.url;
            this.itemInfo.md5 = res.data.md5;
            this.itemInfo.name = file.name.substr(0, file.name.indexOf('.'));
            if (this.multiple) {
                this.imgList.push(itemInfo);
            } else {
                this.imgList = [itemInfo];
            }
            this.isUpload = true;
        },
         picAppearClose(key, href) {
            for (let i = 0; i < this.imgList.length; ++i) {
                const item = this.imgList[i];
                // picList 不选中
                for (const it of this.picList) {
                    if (item.pictureId === it.pictureId) {
                        it.isSelect = false;
                        break;
                    }
                }
                if (item.url === href) {
                    console.log(item.url,"AAAA",item.pictureId,"+++",this.imgList);
                    this.imgList.splice(i, 1);
                    if (this.uploadSuccess) {
                        console.log("BBBB",this.imgList);
                        this.uploadSuccess(this.imgList);
                    }
                    break;
                }
            }
        },
        beforeAvatarUpload(file) {
            if (this.filterCondition == null) {
                if (this.beforeUpload) {
                    return this.beforeUpload(file);
                }
                return true;
            }
            var tmpImg = new Image();
            tmpImg.onload = () => {
                if (tmpImg.width != this.filterCondition.width || tmpImg.height != this.filterCondition.height) {
                    this.$message.error("图片尺寸不符合");
                    this.isRightSize = false;
                } else {
                    this.isRightSize = true;
                    if (this.beforeUpload) {
                        return this.beforeUpload(file);
                    }
                }
            }
            tmpImg.src = URL.createObjectURL(file);
        },
        handleUploadSave() {
            if (this.imgList.length == 0) {
                this.$message.error("未选择任何图片！");
                return;
            }
            this.isClickOkBtn = true;
            if (this.activeName !== 'first') {
                this.dialogVisible = false;
                if (this.uploadSuccess) {
                    this.uploadSuccess(this.imgList);
                }
                return;
            }
            this.$refs['itemInfo'].validate((valid) => {
                if (!valid) {
                    return;
                }
                if (!this.multiple) {
                    if (!this.itemInfo.url) {
                        this.$message.error(`请选择要上传的图片!`);
                        return;
                    }
                    this.imgList = [this.itemInfo];
                    picStore.create(this.itemInfo).then(ret => {
                        this.itemInfo = {
                            name: "",
                            url: '',
                            tags: [],
                            md5: '',
                        }
                        this.dialogVisible = false;
                        if (this.uploadSuccess) {
                            this.uploadSuccess(this.imgList);
                        }
                    }).catch(err => {
                        this.$message.error(`图片添加到素材库失败！${err}`);
                    });
                } else {
                    if (this.imgList.length == 0) return;

                    var listUploadSuccess = true;
                    for (var i = 0; i < this.imgList.length; i++) {
                        this.imgList[i].tags = this.itemInfo.tags;
                        picStore.create(this.imgList[i]).then(ret => {
                            listUploadSuccess = true;
                        }).catch(err => {
                            listUploadSuccess = false;
                            this.$message.error(`图片添加到素材库失败！${err}`);
                        });
                    }

                    if (listUploadSuccess) {
                        this.dialogVisible = false;
                        if (this.uploadSuccess) {
                            this.uploadSuccess(this.imgList);
                        }
                    }
                }
            });
        },
        handleClose() {
            return;
            if (!this.isClickOkBtn) {
                this.handleCancel();
                this.isClickOkBtn = false;
            }
        },
        handleCancel() {
            this.itemInfo = {
                name: "",
                url: '',
                tags: [],
                md5: '',
            };
            this.dialogVisible = false;
            // if (this.isUpload)
            this.imgList = this.defaultFileList; //[];
            this.picList = [];
            this.activeName = 'first';
        },
    }
};
</script>
