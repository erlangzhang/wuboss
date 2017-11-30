<template>
    <el-menu default-active="2" :router="true" class="side-nav el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-submenu index="1">
        <template slot="title"><VIcon class='iconfont-1' type='hotel'/>酒店管理</template>

        <el-menu-item class='side-nav-item' index="/hotel"><VIcon class='iconfont-1' type='bars'/>酒店列表</el-menu-item>
        <el-menu-item class='side-nav-item' index="/category"><VIcon class='iconfont-1' type='bars'/>酒店分组</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><VIcon class='iconfont-1' type='setting'/>系统管理</template>
        <el-menu-item class='side-nav-item' index="/roles"><VIcon class='iconfont-1' type='solution'/>角色管理</el-menu-item>
        <el-menu-item class='side-nav-item' index="/admins"><VIcon class='iconfont-1' type='team'/>管理员</el-menu-item>
        <el-menu-item class='side-nav-item' index="/optlog"><VIcon class='iconfont-1' type='code-square-o'/>操作日志</el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
  import { VIcon } from '../components';
  // import '../style/iconfont.css';
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
