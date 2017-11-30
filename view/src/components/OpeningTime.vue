<style>
</style>
<template>
    <div>
        <el-select placeholder="请选择" v-model="day" style="float: left" @change="changeTime">
            <el-option label="工作日" value="工作日"></el-option>
            <el-option label="周末" value="周末"></el-option>
            <el-option label="全天" value="全天"></el-option>
        </el-select>
        <!--    <el-time-picker v-model="timeRange" :picker-options="{selectableRange: '00:00:00 - 23:59:00'}" is-range placeholder="选择时间范围" format="HH:mm" style="float: left" @change="getRangeTime">
        </el-time-picker> -->
        <el-time-picker v-model="startTime" :picker-options="{selectableRange: '00:00:00 - 23:59:00'}" placeholder="选择开始时间" format="HH:mm" style="float: left" @change="changeTime">
        </el-time-picker>
        <div style="float: left;padding-left: 10px;padding-right: 10px;">
            <i class="el-icon-more"></i></div>
        <el-time-picker v-model="endTime" :picker-options="{selectableRange: '00:00:00 - 23:59:00'}" placeholder="选择结束时间" format="HH:mm" style="float: left" @change="changeTime">
        </el-time-picker>
        <div style="float: left;padding-left: 10px;">
            <i v-if="openingTimeObj.day != '' && openingTimeObj.sTime != '' && openingTimeObj.eTime !='' && index ==length-1 &&length<=2 " class="el-icon-plus" @click="addOpeningTime"></i>
        </div>
        <div style="float: left;padding-left: 10px;">
            <i class="el-icon-minus" v-if="length>1" @click="minusOpeningTime(index)"></i>
            <!-- openingTimeObj.day !='' && openingTimeObj.sTime != '' && openingTimeObj.eTime !='' && -->
        </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    props: {
        openTimeCallBack: Function,
        openingTimeObj: {
            type: Object,
            default: function() {
                return {};
            }
        },
        length: {
            type: Number,
        },
        index: {
            type: Number,
        }
    },
    data() {
        return {
            timeRange: [],
            startTime: null,
            endTime: null,
            day: '',
            startTimeText: "",
            endTimeText: "",
            unwatchTimeRange: null,


        };
    },
    watch: {
        openingTimeObj(newObj) {
            this.setTimeRange();
        }
    },
    methods: {

        addOpeningTime() {
            var openTimeObj = {
                day: "",
                sTime: "",
                eTime: "",
            };
            this.$emit('openTimeEvent', openTimeObj);
        },
        minusOpeningTime(index) {
            this.$emit('minusTimeEvent', index);
        },
        formatTime(time) {
            if (!time) {
                return false;
            }
            const h = ('0' + time.getHours()).slice(-2);
            const m = ('0' + time.getMinutes()).slice(-2);
            return `${h}:${m}`;
        },
        changeTime(time) {
            if (this.formatTime(this.startTime) === this.openingTimeObj.sTime &&
                this.formatTime(this.endTime) === this.openingTimeObj.eTime &&
                this.day === this.openingTimeObj.day) {
                return;
            }
            this.openTimeCallBack(this.day, this.formatTime(this.startTime), this.formatTime(this.endTime), this.index);
        },
        setTimeRange() {
            if (!this.openingTimeObj.sTime || !this.openingTimeObj.eTime) {
                return;
            }
            var temTime = this.openingTimeObj.sTime.split(":");
            var fromHH = temTime[0];
            var fromMM = temTime[1];

            var temToTime = this.openingTimeObj.eTime.split(":");
            var toHH = temToTime[0];
            var toMM = temToTime[1];
            this.startTime = new Date(2017, 1, 1, fromHH, fromMM);
            this.endTime = new Date(2017, 1, 1, toHH, toMM);
            this.day = this.openingTimeObj.day;
        }
    },

    created() {
        if (!!this.openingTimeObj.day) {
            this.setTimeRange();
        }
    }

}
</script>
