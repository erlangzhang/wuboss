<style>
.logo-tool {
    float: right !important;
    margin-right: 30px;
}

.login-tool {
    float: right !important;
}

.user-logo {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin-top: 12px;
}

.icon-style {
    padding-right: 5px;
}
</style>
<template>
    <el-menu theme="dark" :default-active="menuIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">酒店管理</el-menu-item>
        <el-menu-item index="2">运维管理</el-menu-item>
        <el-menu-item index="3">内容管理</el-menu-item>
        <el-menu-item index="4">数据中心</el-menu-item>
        <el-menu-item class="logo-tool" index="5"><img class='user-logo' :src='user.logo' /></el-menu-item>
        <el-submenu class="login-tool" index="6">
            <template slot="title">{{user.name}}</template>
            <el-menu-item index="6-1">
                <VIcon type='setting' class="icon-style" />账号设置</el-menu-item>
            <el-menu-item index="6-2">
                <VIcon type='logout' class="icon-style" />退出</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
import VIcon from './icon';
import {
    appStore
} from '../stores';
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    data() {
            return {};
        },
        components: {
            VIcon,
        },

        computed: {
            ...mapGetters({
                menuIndex: 'hotel/GET_CUR_EDIT_ID'
            }),
            user: {
                get: function() {
                    return {
                        name: appStore.payload.name,
                        logo: appStore.payload.logo || 'http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1494214800611.jpg' //'https://avatars3.githubusercontent.com/u/17545551?v=3&s=40',
                    }
                }
            },
        },
        methods: {
            ...mapActions({
                setMenuIndex: 'hotel/SET_CUR_EDIT_ID',
                setSubmenuIndex: 'content/SET_SUB_MENU_INDEX'

            }),
            handleSelect(key, keyPath) {
                console.log("key是", key);
                this.setMenuIndex({
                    curEditId: key,
                });

                switch (key) {
                    case '1':
                        this.$router.push('/');
                        break;
                    case '2':
                        break;
                    case '3':
                        this.$router.push('/content');
                        this.setSubmenuIndex({
                            submenuIndex: '',
                        });
                        break;
                    case '4':
                        break;
                    case '6-1':
                        this.$router.push(`/admin/edit?id=${appStore.payload.id}`);
                        break;
                    case '6-2':
                        appStore.logout(appStore.payload.id).then(ret => {
                            appStore.token = null;
                            appStore.payload = null;
                            // 
                            this.$router.replace('/');
                            window.location.reload();
                        }).catch(err => {
                            this.$message.error(`登出失败！${err}`);
                        });
                        break;
                }
            }
        }
}
</script>;
