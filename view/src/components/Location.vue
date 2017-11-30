/*
 * @Author: Hedgehog 
 * @Date: 2017-04-17 22:01:47 
 * @Last Modified by: Hedgehog
 * @Last Modified time: 2017-04-19 14:13:33
 */

 /*
  * 用法：
  * :default-point='{lng: Number, lat: Number}' 
  * @change='locationChange'
  *
  */

<style scoped>
  .el-dialog .el-input {
    width: 130px;
    margin-right: 20px;
  }
  .bm-view {
    margin-top: 20px;
    width:  100%;
    height: 450px;
  }
</style>
<template>
  <el-row :gutter="4">
    <el-col :span="6">
      <el-input type='number' v-model='defaultPoint.lng' :disabled="true"></el-input>
    </el-col>
    <el-col :span="6">
      <el-input type='number' v-model='defaultPoint.lat' :disabled="true"></el-input>
    </el-col>
    <el-col :span="3">
      <el-button type="primary" icon="edit" @click='dialogVisible = true'></el-button>
    </el-col>
    <el-dialog title="酒店坐标信息" size="large" :close-on-click-modal='false' v-model="dialogVisible">
      <label>城市：</label><el-input v-model='city'></el-input>
      <label>关键字：</label><el-input v-model='keyword'></el-input>
      <label>经度：</label><el-input v-model='center.lng'></el-input>
      <label>纬度：</label><el-input v-model='center.lat'></el-input>
      <baidu-map class="bm-view" :center="center" zoom="15" @ready="mapReady">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"/>
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"/>
        <bm-marker :position="center" :dragging="true" @dragend="dragend" :icon="centerIcon" :offset="centerIconOffset"></bm-marker>
        <bm-local-search :keyword="keyword" :auto-viewport="true" :location="city" @markersset="markersset"></bm-local-search>
      </baidu-map>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeLocation">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import Vue from 'vue';
import BaiduMap from 'vue-baidu-map';
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'D5QTg8B7kGWDdp0oMp6KOjrO',
})
export default {
  data() {
    return {
      city: '',
      keyword: '',
      dialogVisible: false,
      center: {
        lng: 0.0,
        lat: 0.0,
      },
      centerIcon: {
        url: 'data:image/png;base64,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',
        size: {
          width: 32,
          height: 32,
        },
      },
      centerIconOffset: {
        width: 0,
        height: -15,
      },
      map: {},
      BMap: {},
    }
  },
  props: {
    defaultPoint: {
      type: Object,
      default() {
        return {
          lng: 0.0,
          lat: 0.0,
        }
      },
    },
  },
  watch: {
    dialogVisible(newVal) {
      this.center.lng = this.defaultPoint.lng;
      this.center.lat = this.defaultPoint.lat;
    }
  },
  methods: {
    mapReady({BMap, map}) {
      this.BMap = BMap;
      this.map = map;
    },
    dragend(obj) {
      this.center.lng = obj.point.lng;
      this.center.lat = obj.point.lat;
    },
    markersset(arr) {
      arr.map((point) => {
        point.marker.addEventListener('click', (event) => {
            var point = event.target.point;
            this.map.centerAndZoom(point, 13);
            this.center.lng = point.lng;
            this.center.lat = point.lat;
        });
      })
    },
    changeLocation() {
      this.dialogVisible = false;
      this.defaultPoint.lng = this.center.lng;
      this.defaultPoint.lat = this.center.lat;
      this.$emit('change', this.defaultPoint);
    }
  },
}
</script>