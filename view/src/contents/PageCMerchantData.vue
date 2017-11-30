<style scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
    height: 100px;
    line-height: 100px;
    text-align: center;
}

.grid-content {
    border-radius: 4px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.filter {
    float: right;
    margin-top: -36px;
}
</style>
<template>
    <div class='layout-container'>
        <div class='breadcrumb'>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '>' }">
                    <VIcon class='breadcrumb-icon' type='home' /> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                <el-breadcrumb-item>本地生活圈</el-breadcrumb-item>
                <el-breadcrumb-item>数据统计</el-breadcrumb-item>
                <el-breadcrumb-item>商户数据</el-breadcrumb-item>
            </el-breadcrumb>
            <div class='content-header'>
                <VIcon type='appstore' /> 商户数据
                <div class='breadcrumb-header'></div>
            </div>
        </div>
        <div class='table-container'>
            <span class='table-title'>数据总览</span>
            <Dist class="select-row-dropdown" :onSelect='addressChange' size="small" level="2" />
            <div class='table-container'>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-card :body-style="{ padding: '0px' }" style="float: left,width:100%">
                            <img src="http://img05.tooopen.com/images/20150531/tooopen_sy_127457023651.jpg" style="width: 100px;height: 100px;float: left;border-radius: 50%" class="image">
                            <div style="padding: 14px; float: left;line-height: 3">
                                <span>好吃的汉堡</span>
                                <div class="bottom clearfix">
                                    <time class="time">1000</time>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6 ">
                        <div class="grid-content bg-purple ">
                            <el-card :body-style="{ padding: '0px' }" style="float: left,width:100%">
                                <img src="http://img05.tooopen.com/images/20150531/tooopen_sy_127457023651.jpg" style="width: 100px;height: 100px;float: left;border-radius: 50%" class="image">
                                <div style="padding: 14px; float: left;line-height: 3">
                                    <span>好吃的汉堡</span>
                                    <div class="bottom clearfix">
                                        <time class="time">1000</time>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="6 ">
                        <div class="grid-content bg-purple ">
                            <el-card :body-style="{ padding: '0px' }" style="float: left,width:100%">
                                <img src="http://img05.tooopen.com/images/20150531/tooopen_sy_127457023651.jpg" style="width: 100px;height: 100px;float: left;border-radius: 50%" class="image">
                                <div style="padding: 14px; float: left;line-height: 3">
                                    <span>好吃的汉堡</span>
                                    <div class="bottom clearfix">
                                        <time class="time">1000</time>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="6 ">
                        <div class="grid-content bg-purple ">
                            <el-card :body-style="{ padding: '0px' }" style="float: left,width:100%">
                                <img src="http://img05.tooopen.com/images/20150531/tooopen_sy_127457023651.jpg" style="width: 100px;height: 100px;float: left;border-radius: 50%" class="image">
                                <div style="padding: 14px; float: left;line-height: 3">
                                    <span>好吃的汉堡</span>
                                    <div class="bottom clearfix">
                                        <time class="time">1000</time>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class='table-container'>
            <div class='table-title'>
                <el-radio-group v-model="condition">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="上线"></el-radio-button>
                </el-radio-group>
            </div>
            <el-button type="primary" icon="search" class="filter" @click="dialogVisible = true">筛选</el-button>
            <el-row>
                <bar-chart :chart-data="datacollection" :height="150" :options="{responsive: false, maintainAspectRatio: false}"></bar-chart>
                <Doughnut :chart-data="dataDoucollection" :height="150"></Doughnut>
            </el-row>
        </div>
        <el-dialog title="提示" v-model="dialogVisible" size="tiny">
            <el-checkbox-group v-model="checkedCities1" :min="1" :max="2">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
               <el-button @click="dialogVisible = false">取 消</el-button>
               <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    VIcon,
    Dist
} from '../components';
import BarChart from './BarChart.js';
import Doughnut from './Doughnut.js';

export default {
    data() {
            return {
                condition: '全部 ',
                dialogVisible: false,
                checkedCities1: ['上海', '北京'],
                cities: ['上海', '北京', '广州', '深圳'],
                datacollection: {
                    labels: ['北京', '上海'],
                    datasets: [{
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [40, 20]
                    }]
                },
                dataDoucollection: {
                    labels: ['北京', '上海'],
                    datasets: [{
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [40, 20]
                    }]
                },
            };
        },
        mounted() {
            this.fillData()
        },

        components: {
            VIcon,
            Dist,
            BarChart,
            Doughnut,
        },
        methods: {
            addressChange(addrObj) {},
            fillData() {
                this.datacollection = {
                    labels: ['厦门', '东莞', "深圳"],
                    datasets: [{
                        label: '上线',
                        backgroundColor: '#f87979',
                        data: [1, 5, 6]
                    }, {
                        label: '未上线',
                        backgroundColor: '#hhhfff',
                        data: [4, 5, 1]
                    }]
                };
                this.dataDoucollection = {
                    labels: ['今天', '明天', "后天"],
                    datasets: [{
                        label: '房价',
                        backgroundColor: '#f87979',
                        data: [40, 20, 60]
                    }, {
                        label: '天气',
                        backgroundColor: '#ggghhh',
                        data: [40, 20, 60]
                    }]
                };

            },
        },
}
</script>
