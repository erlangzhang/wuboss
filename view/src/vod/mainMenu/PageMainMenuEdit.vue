<style>
    .step-bottom-btn-div {
        margin-top: 10px;
        margin-bottom: 50px;
        float: right;
    }
</style>

<template>
    <div class='layout-container'>
        <PublicHeader :title="init.title" :breadcrumbs="init.breadcrumbs"></PublicHeader>
        <div class="table-container">
            <el-form :model="mainObj" label-width="120px" ref="mainObj" :rules='rules'>
                <MainMenuSelector ref="MainMenuSelector" :data="tableData" :editable="editFlag"></MainMenuSelector>

                <div class="step-bottom-btn-div">
                    <el-button size="small" @click="handleCancel">返回</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import {
        mainMenuStore
} from "../../stores";
import moment from 'moment';
import PublicHeader from '../../components/PublicHeader.vue';
import XTable from '../../components/XTable.vue';
import MainMenuSelector from '../../components/MainMenuSelector.vue';
export default {
    data() {
            return {
                id: this.$route.query.id,
                init: {
                    breadcrumbs: ['主菜单管理', '主菜单管理', '查看'],
                    title: '主菜单管理',
                },
                editFlag: false,
                tableData: [],
                loading: false,
                mainObj: {
                    dateTime: '', // 推荐位标题名
                },
                rules: {
                }
            };
        },
        methods: {
            // 保存
            handleSubmit(formName) {
                this.$router.push('/main_menu/index');
            },
            // 取消
            handleCancel(formName) {
                this.$router.push('/main_menu/index');
            },
            handleSearch() {
            },
            formatOnOffLineTime(onlineTime, offlineTime) {
                return this.renderTime_YYYYMMDDHHMM(onlineTime) +'/'+this.renderTime_YYYYMMDDHHMM(offlineTime);
            },
            renderTime_YYYYMMDDHHMM(unix) {
                return moment(unix * 1000).format('YYYY-MM-DD HH:mm');
            },
        },
        computed: {
        },
        components: {
            PublicHeader,
            XTable,
            MainMenuSelector
        },
        created() {
            console.log('this.id : ' + this.id)
            if (!this.id)
                return

            let params = {}
            params.hostId = this.id
            mainMenuStore.getHotelItemList(params).then(ret => {
                console.log('ret-- ' + JSON.stringify(ret))
                let data = ret.data.docs
                this.tableData = data.map(item => {
                    item.actionType = mainMenuStore.getActionTypeName(item.actionType)
                    item.name = item.itemName
                    return item
                })

            }).catch(err => {
                this.$message.error(`获取主菜单详情失败！${err}`);
            })

        }
}
</script>
