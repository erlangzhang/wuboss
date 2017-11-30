<style>
.div-img-appear {
  float: left;
  border: 1px solid #d9d9d9;
  position: relative;
  padding: 5px;
  margin-left: 10px;
  margin-top: 10px;
  width: 80px;
  height: 80px;
}

.div-img-appear-select {
  float: left;
  border: 2px solid #39f;
  position: relative;
  padding: 5px;
  margin-left: 10px;
  margin-top: 10px;
  width: 80px;
  height: 80px;
}

.img-appear {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  padding: 5px;
  cursor: pointer;
}
.img-appear-close-icon {
  cursor: pointer;
  float: right;
  position: absolute;
  z-index: 20;
  right: 0;
  top: 0;
  opacity: .7;
  background: #f3565d;
  color: #fff;
  border-radius: 12px!important;
  font-size: 16px;
  line-height: 16px;
}

.appear-custom-class {
  min-width: 500px;
}

.pic-image-preview {
	max-width: 420px;
	max-height: 420px;
}

</style>

<template>
  <div>
    <div v-if="isShow===true" class="div-img-appear">
      <img class="img-appear" @click="onClick" :src="resizeHref || href"/>
      <VIcon type="close-circle-o" class="img-appear-close-icon" :click="closeIconClick"/>
    </div>
    <el-dialog v-model="dialogVisible" custom-class="appear-custom-class" :modal="false" size="tiny">
      <div style="text-align: center;">
        <img class="pic-image-preview" :src="href || resizeHref" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VIcon from './icon';

export default {
  props: {
    resizeHref: String,
    href: String,
    close: Function,
  },
  data() {
    return {
      dialogVisible: false,
      isShow: true,
    }
  },

  components: {
    VIcon,
  },
  methods: {
    onClick() {
      this.dialogVisible = true;
    },
    closeIconClick(e) {
      this.isShow = false;
      if (this.close) {
        this.close(this.indexKey, this.href);
      }
    }
  }
}
 
</script>