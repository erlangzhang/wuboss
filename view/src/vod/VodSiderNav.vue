<template>
    <el-menu default-active="2" :router="true" class="side-nav el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-submenu index="1">
        <template slot="title"><VIcon class='iconfont-1' type='main_menu'/>主菜单管理</template>

        <el-menu-item class='side-nav-item' index="/main_menu/material"><VIcon class='iconfont-1' type='bars'/>主菜单素材</el-menu-item>
        <el-menu-item class='side-nav-item' index="/main_menu/index"><VIcon class='iconfont-1' type='bars'/>主菜单管理</el-menu-item>
        <el-menu-item class='side-nav-item' index="/main_menu/release"><VIcon class='iconfont-1' type='bars'/>发布管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><VIcon class='iconfont-1' type='media'/>媒资管理</template>

        <el-menu-item class='side-nav-item' index="/media/pending"><VIcon class='iconfont-1' type='bars'/>待入库</el-menu-item>
        <el-menu-item class='side-nav-item' index="/media/index"><VIcon class='iconfont-1' type='bars'/>影片库</el-menu-item>
        <el-menu-item class='side-nav-item' index="/media/topic"><VIcon class='iconfont-1' type='bars'/>专题库</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><VIcon class='iconfont-1' type='vod_home'/>VOD首页管理</template>

        <el-menu-item class='side-nav-item' index="/vod_home/release_manage"><VIcon class='iconfont-1' type='bars'/>发布管理</el-menu-item>
        <el-menu-item class='side-nav-item' index="/vod_home/home_manage"><VIcon class='iconfont-1' type='bars'/>VOD首页管理</el-menu-item>
        <el-menu-item class='side-nav-item' index="/vod_home/release_log"><VIcon class='iconfont-1' type='bars'/>首页发布日志</el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
  import { VIcon } from '../components';
  import '../style/index.less';
  export default {
    components: {
       VIcon,
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  }
</script>
