<style scoped>
.preview-container {
    width: 1000px;
}

.box-container {
    position: relative;
}

.preview-info {}

.clear:after {
    content: '';
    display: block;
    clear: both;
}

.last-box {
    min-height: 500px;
}

.preview-table td,
.preview-table th {
    vertical-align: top;
}

.element::-webkit-scrollbar {
    display: none
}

.outer-container {
    overflow: hidden;
}

.box-container::-webkit-scrollbar {
    display: none;
}

img {
    background-color: lightblue;
}
</style>
<template>
    <div class="preview-container clear">
        <div style="float: left;width:150px;">
            <el-menu default-active="activeIndex" class="el-menu-vertical-demo" style="width: 100px;" @close="handleClose" theme="white">
                <el-menu-item v-for="(item,index) in menuList" :index='index.toString()' @click="showLayout(index)">{{item}}</el-menu-item>
            </el-menu>
        </div>
        <div class="outer-container">
            <div class='box-container' style="height:500px; overflow-y: auto;margin: 10px 0;">
                <div class="preview-info clear">
                    <div style="float: left;width:400px;">
                        <el-row>
                            <span style="font-size: 25px;font-style: bond;">{{previewLanguageObj.name}}</span>
                        </el-row>
                        <el-row>
                            <span style="font-size:20px;">{{previewObj.category}}</span>
                        </el-row>
                        <table class="preview-table" style=" font-size:larger;border-spacing:0px 2px;">
                            <tr>
                                <td style="width: 100px;font-style: bond;">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</td>
                                <td>{{address}}</td>
                            </tr>
                            <tr>
                                <td>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：</td>
                                <td>
                                    <span v-for="item in previewObj.phone">
                                            {{item}}</br></span>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 100px;">营业时间：</td>
                                <td>
                                    <tr v-for="item in previewObj.biztime">{{item}}</tr>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div style="float: left;margin-left: 15px;">
                        <img :src="previewLanguageObj.qrcode" style="width: 180px;height: 180px">
                    </div>
                </div>
                <div v-for="(item,index) in previewLanguageObj.customCategory">
                    <p style="font-size:25px;">{{item.name}}</p>
                    <ul class="clear">
                        <li v-for="itemChild in item.pictures" style="float: left;">
                            <img v-bind:src="itemChild.url" style="width: 150px;height: 150px">
                        </li>
                    </ul>
                </div>
                <div class='last-box'>
                    <span style="font-size:25px;">如何到达</span></br>
                    <img v-bind:src="previewLanguageObj.routepic.url" style="width: 630px;height: 280px">
                    </br>
                    <span style="width:700px;">{{previewLanguageObj.routeinfo}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        previewData: {
            type: Object,
            default: function() {
                return {};
            }
        },
    },
    watch: {
        previewData() {
            this.previewObj = this.previewData;
            console.log(this.previewData, "III");
            this.previewLanguageObj = this.previewData.language[0];
            this.previewLanguageObj.qrcode = this.previewLanguageObj.pictures[2].url;


            if (this.previewLanguageObj.address.province.name) {
                this.address = this.previewLanguageObj.address.province.name;
                if (this.previewLanguageObj.address.city) {
                    this.address += this.previewLanguageObj.address.city.name;
                    if (this.previewLanguageObj.address.dist) {
                        this.address += this.previewLanguageObj.address.dist.name;
                    }
                }
            }
            this.address += this.previewLanguageObj.address.street;

            console.log(this.address, "预览的地址YY");
            // this.address = this.previewLanguageObj.address.province.name + this.previewLanguageObj.address.city.name + this.previewLanguageObj.address.dist.name + this.previewLanguageObj.address.street;
        },
    },
    data() {
        return {
            menuList: [],
            previewObj: {},
            previewLanguageObj: {},
            activeIndex: "0",
        }
    },
    methods: {
        handleClose() {

        },
        showLayout(index) {
            this.activeIndex = index.toString();
            const box = this.$el.querySelector('.box-container');
            const tmpDiv = box.children[index];
            box.scrollTop = tmpDiv.offsetTop;
        },
    },

    created: function() {
        this.previewObj = this.previewData;


        this.previewLanguageObj = this.previewData.language[0];
        this.previewLanguageObj.qrcode = this.previewLanguageObj.pictures[2].url;

        var tempMenu = this.previewLanguageObj.customCategory.map(item => {
            return item.name;
        });
        this.menuList.push("商户资料");
        for (var i = 0; i < tempMenu.length; i++) {
            this.menuList.push(tempMenu[i]);
        }
        this.menuList.push("如何到达");



        if (this.previewLanguageObj.address.province.name) {
            this.address = this.previewLanguageObj.address.province.name;
            if (this.previewLanguageObj.address.city) {
                this.address += this.previewLanguageObj.address.city.name;
                if (this.previewLanguageObj.address.dist) {
                    this.address += this.previewLanguageObj.address.dist.name;
                }
            }
        }
        this.address += this.previewLanguageObj.address.street;

        console.log(this.address, "预览的地址PP");
        // this.address = this.previewLanguageObj.address.province.name + this.previewLanguageObj.address.city.name + this.previewLanguageObj.address.dist.name + this.previewLanguageObj.address.street;
    }

}
</script>
