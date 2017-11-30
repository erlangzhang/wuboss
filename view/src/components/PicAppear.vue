<style>
.div-img-appear {
    float: left;
    border: 1px solid #d9d9d9;
    position: relative;
    padding: 5px;
    margin-left: 10px;
    margin-top: 10px;
    width: 80px;
    height: 80px;
}

.div-img-appear-select {
    float: left;
    border: 2px solid #39f;
    position: relative;
    padding: 5px;
    margin-left: 10px;
    margin-top: 10px;
    width: 80px;
    height: 80px;
}

.img-appear {
    display: inline-block;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    left: 0;
    background-color: lightblue;
    top: 0;
    padding: 5px;
    cursor: pointer;
}

.img-appear-close-icon {
    cursor: pointer;
    float: right;
    position: absolute;
    z-index: 20;
    right: 0;
    top: 0;
    opacity: .7;
    background: #f3565d;
    color: #fff;
    border-radius: 12px!important;
    font-size: 16px;
    line-height: 16px;
}

.appear-custom-class {
    min-width: 500px;
}

.pic-image-preview {
    max-width: 420px;
    max-height: 420px;
    background-color: lightblue;
}
</style>
<template>
    <div>
        <div v-if="isShow===true" :class="isSelected ? 'div-img-appear-select': 'div-img-appear'">
            <img class="img-appear" @click="onClick" :src="resizeHref || href" />
            <VIcon v-if="!closeDisabled" type="close-circle-o" class="img-appear-close-icon" :click="closeIconClick" />
        </div>
        <el-dialog v-model="dialogVisible" custom-class="appear-custom-class" :modal="false" size="tiny">
            <div style="text-align: center;">
                <img class="pic-image-preview" :src="href || resizeHref" />
            </div>
        </el-dialog>
    </div>
</template>
<script>
import VIcon from './icon';

export default {
    props: {
        href: String,
        resizeHref: String, //缩略图的url
        close: Function,
        indexKey: String,
        previewDisabled: Boolean,
        closeDisabled: Boolean,
        click: Function,
        isSelect: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            dialogVisible: false,
            isShow: true,
            selected: this.isSelect,
        }
    },
    computed: {
        isSelected() {
            return this.isSelect === undefined ? this.selected : this.isSelect;
        },
    },

    components: {
        VIcon,
    },
    methods: {
        onClick() {
            this.selected = !this.isSelected; // !this.selected;
            if (this.click) {
                this.click(this.indexKey, this.href, this.selected);
                return;
            }
            if (this.previewDisabled) {
                this.dialogVisible = false;
                return;
            }
            this.dialogVisible = true;
        },
        closeIconClick(e) {
            this.isShow = false;
            if (this.close) {
                this.close(this.indexKey, this.href);
            }
        }
    }
}
</script>
