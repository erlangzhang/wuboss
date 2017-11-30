<style scoped>
</style>
<template>
    <div>
        <el-row>
            <el-input v-model="customCategoryItem.name" style="width: 148px;float: left"></el-input>
            <div style="float: left;padding-left: 10px">
                <i class="el-icon-plus" v-if="customCategoryItem.name !=''&&index==customCategory.length-1 && customCategory.length <= 4" @click="addCate"></i></div>
            <div style="float: left;padding-left: 10px;">
                <i class="el-icon-minus" v-if="customCategory.length>1" @click="minusCate(index)"></i></div>
                <!-- customCategoryItem.name!=''&&  -->
        </el-row>
        <PicUploadAddMer :multiple="true" :defaultFileList="renderImgList('', customCategoryItem.pictures, {})" :uploadSuccess="iconUploadSuccess" :beforeUpload="iconBeforeUpload" :modal="false" />
        <span style="color: red;  font-size: 12px;">多张图片轮播顺序为图片上传顺序</span>
    </div>
</template>
<script>
import PicUploadAddMer from './PicUploadAddMer';
export default {
    props: {
        customCategoryCallback: Function,
        customCategoryItem: {
            type: Object,
            default: function() {
                return {}
            }
        },
        customCategory: {
            type: Array,
            default: function() {
                return [];
            }
        },
        index: {
            type: null,
            default: function() {
                return 0;
            }
        }
    },
    data() {
        return {
            imageUrl: '',
            dialogImageUrl: '',
            dialogVisible: false,
            input: '',
            data: "nihao",
        };
    },
    watch: {
        'customCategoryItem.pictures' () {
            console.log("自定义图片数组",this.customCategoryItem);
        }
    },
    components: {
        PicUploadAddMer,
    },
    methods: {
        iconBeforeUpload(file) {
            const isOutSize = file.size / 1024 / 1024 > 2;
            if (isOutSize)
                this.$message.error('上传图片大小不能超过 2MB!');
            return !isOutSize;
        },
        iconUploadSuccess(fileList) {
            this.customCategory[this.index].pictures = fileList;
            this.customCategoryCallback(fileList);
            // this.$emit('allCateList', this.customCategory);
        },
        renderImgList(type, list, {}) {
            return list;
        },
        addCate() {
            var cusCategoryObj = {
                name: "",
                pictures: [],
            };
            this.customCategory.push(cusCategoryObj);
        },
        minusCate() {
            this.$emit('minusCateEvent', this.index);
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },

        picBeforUpload(file) {

        },

    },

    created() {},
}
</script>
