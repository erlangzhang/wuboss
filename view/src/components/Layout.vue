<style>
</style>
<template>
    <div>
        <div :class="[collapse ? 'ant-layout-aside ant-layout-aside-collapse' : 'ant-layout-aside']">
            <aside class="ant-layout-sider">
                <div class="ant-layout-logo">
                    <img :class="[collapse ? 'ant-logo' : 'ant-logo-1']" style="width: 64px; height: 43px; margin-top: -4px;" src="../images/sun-logo.png">
                </div>
                <router-view name="side-nav"></router-view>
            </aside>
            <div class="ant-layout-main">
                <div class="hms-layout-nav-header">
                    <page-nav></page-nav>
                </div>
                <router-view name="layout-main"></router-view>
            </div>
            <!-- <div class="ant-layout-footer">2017 © 云Boss by Sunlight. Ver:{{version}} Date:{{date}}</div> -->
        </div>
    </div>
</template>
<script>
import './style.less';
import Nav from './Navigation';
import copyright from './copyright.js';
export default {
    props: {
        collapse: {
            type: Boolean,
            default: false,
        }
    },
    data: function() {
        return {
            version: '',
            date: '',
        };
    },
    components: {
        'page-nav': Nav,
    },
    methods: {
        onCollapseChange: function() {
            this.collapse = !this.collapse;
        },
    },
    created: function() {
        console.log(copyright.date);
        this.version = copyright.version;
        this.date = copyright.date;

    }
}
</script>
