<style></style>
<template>
    <div class='breadcrumb'>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item>
                <span @click='focusIndex()'>
                <VIcon class='breadcrumb-icon' type='home' /> 首页</span></el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in titleList">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
import VIcon from './icon';
import {
    mapActions
} from 'vuex';
export default {
    props: {
        titleList: {
            type: Array,
            default: function() {
                return [];
            }
        },

    },
    data() {
        return {};
    },
    methods: {
        ...mapActions({
            setMenuIndex: 'hotel/SET_CUR_EDIT_ID',

        }),
        focusIndex() {
            this.$router.push('/');
            this.setMenuIndex({
                curEditId: '1',
            });
        },

    },
    components: {
        VIcon,
    }
}
</script>
