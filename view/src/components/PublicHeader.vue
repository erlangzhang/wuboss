<template>
    <div>
        <div class='breadcrumb'>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">
                    <VIcon class='breadcrumb-icon' type='home' /> 首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="breadcrumb in breadcrumbs">
                    {{ breadcrumb }}
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class='breadcrumb-header'></div>
        </div>
        <div class='content-header'>
            <VIcon type='appstore' /> {{ title }}
            <div class='breadcrumb-header'></div>
        </div>
    </div>
</template>
<script>
    import VIcon from './icon';

    export default {
        name: 'PublicHeader',
        components: {
            VIcon
        },
        props: {
            title: {
                type: String
            },
            breadcrumbs: {
                type: Array
            }
        },
    }
</script>