<style scoped>
#previewLayout {}

#merchantData:after {
    content: '';
    display: block;
    clear: both;
}

#diningPics ul:after {
    content: '';
    display: block;
    clear: both;
}

#specialDish ul:after {
    content: '';
    display: block;
    clear: both;
}

#merchantData:after {
    content: '';
    display: block;
    clear: both;
}
</style>
<template>
    <div>
        <el-row>
            <el-col :span="4">
                <el-menu default-active="1" class="el-menu-vertical-demo" style="width: 100px;float: left" @close="handleClose" theme="white">
                    <el-menu-item index="1" @click="showLayout(1)">商户资料</el-menu-item>
                    <el-menu-item index="2" @click="showLayout(2)">商家海报</el-menu-item>
                    <el-menu-item index="3" @click="showLayout(3)">特色分类</el-menu-item>
                    <el-menu-item index="4" @click="showLayout(4)">如何到达</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20" style="overflow:auto;height:430px;" id="totalRight">
                <div id="previewLayout" style="float: left">
                    <div id="merchantData" style="width: 630px;padding-top: 5px;">
                        <div style="float: left;width:420px;">
                            <el-row>
                                <span style="font-size: 25px;font-style: bond;">{{previewObj.language[0].name}}</span>
                            </el-row>
                            <el-row>
                                <span style="font-size:20px;">{{previewObj.category}}</span>
                            </el-row>
                            <el-form :label-position="labelPosition" label-width="100px">
                                <el-form-item label='地               址:'>
                                    <span>{{address}}</span>
                                </el-form-item>
                                <el-form-item label='电               话:'>
                                    <span v-for="item in previewObj.phone">
                                            {{item}}</br></span>
                                </el-form-item>
                                <el-form-item label='营业时间:'>
                                    <span v-for="item in previewObj.biztime">{{item}}</br></span>
                                </el-form-item>
                            </el-form>
                            <!--   <table style=" font-size: 20px;border-spacing:0px 2px;">
                                <tr>
                                    <td valign="top" style="width: 100px;">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</td>
                                    <td valign="top">{{address}}</td>
                                </tr>
                                <tr>
                                    <td align="top">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：</td>
                                    <td align="top">
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
                            </table> -->
                        </div>
                        <div style="float: left;margin-left: 15px;">
                            <img src="http://img05.tooopen.com/images/20150531/tooopen_sy_127457023651.jpg" style="width: 180px;height: 180px">
                        </div>
                    </div>
                    <div id="diningPics" style="width: 630px;padding-top: 5px;">
                        <span style="font-size: 25px;font-style: bond">商家海报</span>
                        <ul>
                            <li v-for="item in previewObj.language[0].pictures" style="float: left">
                                <img v-bind:src="item.url" style="width: 100px;height: 100px">
                            </li>
                        </ul>
                    </div>
                    <div id="specialDish" style="width: 630px;padding-top: 5px;">
                        <span style="font-size: 25px;font-style: bond">特色分类</span>
                        <ul>
                            <li v-for="item in previewObj.language[0].customCategory" style="float: left">
                                <div v-for="item in item.pictures" v-bind:src="item.url">
                                    <img v-bind:src="item.url" style="width: 100px;height: 100px" />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div id="map" style="width: 630px;height: 430px;padding-top: 5px;">
                        <span style="font-size: 25px;font-style: bond">如何到达</span>
                        <img v-bind:src="previewObj.language[0].routepic.url" style="width: 630px;height: 300px">
                        <span>{{previewObj.language[0].routeinfo}}</span></br>
                    </div>
                </div>
            </el-col>
        </el-row>
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
            console.log(this.previewData, "改变");
            this.previewObj = this.previewData;

            this.address = this.previewObj.language[0].address.province.name + this.previewObj.language[0].address.city.name + this.previewObj.language[0].address.dist.name + this.previewObj.language[0].address.street;
            console.log("this>address", this.address);
        }
    },
    data() {
        return {
            form: {},
            previewObj: {},
            address: '',
            labelPosition: 'left',
        };
    },
    methods: {
        handleClose() {},
        showLayout(index) {
            var divLayout = document.getElementById("totalRight");
            var firstHeight = document.getElementById("merchantData");
            var secondHeight = document.getElementById("diningPics");
            var thirdHeight = document.getElementById("specialDish");
            console.log(firstHeight.offsetHeight, secondHeight.offsetHeight, thirdHeight.offsetHeight);
            var scrollHeight = 0;
            switch (index) {
                case 1:
                    divLayout.scrollTop = 0;
                    break
                case 2:
                    scrollHeight = firstHeight.offsetHeight;
                    divLayout.scrollTop = scrollHeight;
                    break;
                case 3:
                    scrollHeight = firstHeight.offsetHeight + secondHeight.offsetHeight;
                    divLayout.scrollTop = scrollHeight;
                    break;
                case 4:
                    scrollHeight = firstHeight.offsetHeight + secondHeight.offsetHeight + thirdHeight.offsetHeight;
                    divLayout.scrollTop = scrollHeight;
                    break;
            }
            console.log(">>>>>>>", scrollHeight);
        }
    },
    created: function() {
        this.previewObj = this.previewData;

        this.address = this.previewObj.language[0].address.province.name + this.previewObj.language[0].address.city.name + this.previewObj.language[0].address.dist.name + this.previewObj.language[0].address.street;
    },
}
</script>
