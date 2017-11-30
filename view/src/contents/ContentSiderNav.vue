<template>
    <el-menu :router="true" class="side-nav el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :default-active="submenuIndex" @select="handleSelect">
        <!-- default-active="2"  -->
        <el-submenu index="1">
            <template slot="title">
                <VIcon class='iconfont-1' type='book' />栏目管理</template>
            <el-menu-item class='side-nav-item' index="1-1" @click="gotoItemManagement()">
                <VIcon class='iconfont-1' type='bars' />栏目管理</el-menu-item>
            <!--    
            <el-menu-item class='side-nav-item' index="1-2" @click="gotoItemCheck()">
                <VIcon class='iconfont-1' type='bars' />栏目审核</el-menu-item>
                -->
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <VIcon class='iconfont-1' type='hdd' />素材管理</template>
            <el-menu-item class='side-nav-item' index="2-1" @click="gotoPublicPicsStore()">
                <VIcon class='iconfont-1' type='picture' />公共图片库</el-menu-item>
            <el-menu-item class='side-nav-item' index="2-2" @click="gotoItemsStore()">
                <VIcon class='iconfont-1' type='book' />栏目库</el-menu-item>
            <el-menu-item class='side-nav-item' index="2-3" @click="gotoItemsTreeStore()">
                <VIcon class='iconfont-1' type='sharealt' />栏目树库</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <VIcon class='iconfont-1' type="retweet"></VIcon>本地生活圈</template>
            <el-submenu index="3-1" class='side-nav-item'>
                <template slot="title">
                    <VIcon class='iconfont-1' type="laptop"></VIcon>商户库</template>
                <el-menu-item class='side-nav-item' index="/content/add-merchant">
                    <VIcon class='iconfont-1' type="plus-square-o" @click="gotoAddMerchant()"></VIcon>添加商户</el-menu-item>
                <el-menu-item class='side-nav-item' index="/content/all-merchant">
                    <VIcon class='iconfont-1' type="calculator" @click="gotoAllMerchant()"></VIcon>全部商户</el-menu-item>
            </el-submenu>
            <el-submenu index="3-2" class='side-nav-item'>
                <template slot="title">
                    <VIcon class='iconfont-1' type="question-circle-o"></VIcon> 商户审核</template>
                <el-menu-item class='side-nav-item' index="/content/unchecked">
                    <VIcon class='iconfont-1' type="minus-circle-o"></VIcon>待审核</el-menu-item>
                <el-menu-item class='side-nav-item' index="/content/passed">
                    <VIcon class='iconfont-1' type="check-circle-o"></VIcon>已通过</el-menu-item>
                <el-menu-item class='side-nav-item' index="/content/rejected">
                    <VIcon class='iconfont-1' type="close-circle-o"></VIcon>驳回</el-menu-item>
            </el-submenu>
            <el-submenu index="3-3" class='side-nav-item'>
                <template slot="title">
                    <VIcon class='iconfont-1' type="file-ext"></VIcon>商户发布</template>
                <el-menu-item class='side-nav-item' index="/content/publish-management">
                    <VIcon class='iconfont-1' type="filter"></VIcon>发布管理</el-menu-item>
                <el-menu-item class='side-nav-item' index="/content/publish-logs">
                    <VIcon class='iconfont-1' type="tags-o"></VIcon>发布日志</el-menu-item>
            </el-submenu>
            <el-submenu index="3-4" class='side-nav-item'>
                <template slot="title">
                    <VIcon class='iconfont-1' type="exclamation-circle-o"></VIcon>发布情况</template>
                <el-menu-item class='side-nav-item' index="/content/hotel-publish-status">
                    <VIcon class='iconfont-1' type="hotel"></VIcon>酒店发布情况</el-menu-item>
            </el-submenu>
            <!--  <el-submenu index="3-5">
                <template slot="title">
                    <Icon class='iconfont-1' type="pie-graph"></Icon>数据统计</template>
                <el-menu-item index="/content/merchant-data">
                    <Icon class='iconfont-1' type="calculator"></Icon>商户数据</el-menu-item>
                <el-menu-item index="/content/online-data">
                    <Icon class='iconfont-1' type="ios-pulse-strong"></Icon>上线数据</el-menu-item>
            </el-submenu> -->
        </el-submenu>
        <el-submenu index="11">
            <template slot="title">
                <VIcon class='iconfont-1' type='main_menu' />主菜单管理</template>
            <el-menu-item class='side-nav-item' index="/main_menu/material">
                <VIcon class='iconfont-1' type='bars' />主菜单素材</el-menu-item>
            <el-menu-item class='side-nav-item' index="/main_menu/index">
                <VIcon class='iconfont-1' type='bars' />主菜单管理</el-menu-item>
            <el-menu-item class='side-nav-item' index="/main_menu/release">
                <VIcon class='iconfont-1' type='bars' />发布管理</el-menu-item>
        </el-submenu>
        <el-submenu index="12">
            <template slot="title">
                <VIcon class='iconfont-1' type='media' />媒资管理</template>
            <el-menu-item class='side-nav-item' index="/media/pending">
                <VIcon class='iconfont-1' type='bars' />待入库</el-menu-item>
            <el-menu-item class='side-nav-item' index="/media/index">
                <VIcon class='iconfont-1' type='bars' />影片库</el-menu-item>
            <el-menu-item class='side-nav-item' index="/media/topic">
                <VIcon class='iconfont-1' type='bars' />专题库</el-menu-item>
        </el-submenu>
        <el-submenu index="13">
            <template slot="title">
                <VIcon class='iconfont-1' type='vod_home' />VOD首页管理</template>
            <el-menu-item class='side-nav-item' index="/vod_home/release_manage">
                <VIcon class='iconfont-1' type='bars' />发布管理</el-menu-item>
            <el-menu-item class='side-nav-item' index="/vod_home/home_manage">
                <VIcon class='iconfont-1' type='bars' />VOD首页管理</el-menu-item>
            <el-menu-item class='side-nav-item' index="/vod_home/release_log">
                <VIcon class='iconfont-1' type='bars' />首页发布日志</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
import {
    VIcon
} from '../components';
// import '../style/iconfont.css';
import '../style/index.less';
import {
    mapGetters,
    mapActions
} from 'vuex';
export default {
    computed: {
        ...mapGetters({
            submenuIndex: 'content/GET_SUB_MENU_INDEX'
        }),
    },

    watch: {
        submenuIndex() {
            console.log("获取的submenu", this.submenuIndex);
        }
    },
    components: {
        VIcon,
    },
    methods: {
        ...mapActions({
            setSubmenuIndex: 'content/SET_SUB_MENU_INDEX'
        }),
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleSelect(key, keyPath) {
            console.log(key, "ABCD");
            this.setSubmenuIndex({
                submenuIndex: key,
            });
        },
        gotoItemManagement() {
            this.$router.push("/content");
        },
        gotoItemCheck() {
            // alert("暂无内容");
        },
        gotoPublicPicsStore() {
            this.$router.push("/content/public-pics-store");
        },
        gotoItemsStore() {
            this.$router.push("/content/items-store");
        },
        gotoItemsTreeStore() {
            this.$router.push("/content/items-tree-store");
        },
        gotoAddMerchant() {
            this.setSubmenuIndex({
                submenuIndex: '/content/add-merchant',
            });
        },
        gotoAllMerchant() {
            this.setSubmenuIndex({
                submenuIndex: '/content/all-merchant',
            });
        },


    }
}
</script>
