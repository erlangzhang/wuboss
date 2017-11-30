<style scoped>
.container-role-edit {
  text-align: center;
}

.save-btn-style {
  text-align: center;
  margin-top: 20px;
}

.input-role-edit {
  width: 400px;
}

.transfer-container-role-edit {
  margin-top: 20px;
}
</style>

<template>
  <div class='layout-container'>
    <div class='breadcrumb'>
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">
          <VIcon class='breadcrumb-icon'
                 type='home' /> 首页</el-breadcrumb-item>
        <el-breadcrumb-item>酒店管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/category' }">酒店分组</el-breadcrumb-item>
        <el-breadcrumb-item>{{ !this.id ? '新增酒店分组': '编辑酒店分组'}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class='breadcrumb-header'></div>
    </div>
    <div class='content-header'>
      <VIcon type='edit' /> {{ !this.id ? '新增酒店分组': '编辑酒店分组'}}
      <div class='breadcrumb-header'></div>
      <div class='table-container container-role-edit'>
  
        <label>分组名称 </label>
        <el-input class='input-role-edit'
                  v-model="name"
                  placeholder='请输入分组名称'></el-input>
  
        <Transfer class="transfer-container-role-edit"
                  :data="data"
                  :target-keys="targetKeys"
                  :list-style="listStyle"
                  :titles="titles"
                  filterable
                  :filter-method="filterMethod"
                  @on-change="handleChange">
        </Transfer>
      </div>
    </div>
    <div class='save-btn-style'>
        <el-button @click='backBtn'>返回</el-button>
        <el-button type="primary" @click='submit'>保存</el-button>
    </div>
  </div>
</template>

<script>
import Transfer from 'iview/src/components/transfer';
import { VIcon, Btn, } from '../components';
import { hotelStore } from '../stores';
import '../style/index.less';
export default {
  data() {
    return {
      id: '',
      name: '',
      listStyle: {
        width: '350px',
        height: '400px',
        textAlign: 'left',
      },
      titles: ['未添加酒店', '已经添加酒店'],
      data: [],
      targetKeys: [],
      tmpTargetKeys: [],
      isRequest: false,
    };
  },
  components: {
    VIcon,
    Btn,
    Transfer,
  },
  created: function () {
    if (!!this.$route.query.id) {
      this.id = this.$route.query.id;
      hotelStore.getCategoryDetail(this.id).then(res => {
        this.name = res.data.name;
        this.tmpTargetKeys = res.data.hotelIds;
      });
    }
    this.getHotelList();
  },
  methods: {
    getHotelList() {
      hotelStore.getHotelList().then(res => {
        if (res.code === 0) {
          this.data = res.data.docs.map(hotel => {
            return {
              key: hotel.id,
              label: hotel.name,
            }
          });
          if (!!this.id) {
            this.targetKeys = this.tmpTargetKeys;
          }
        } else {
          this.$message.error(res.message);
        }
      }).catch(err => {
        console.error('err: ', err);
      })
    },
    filterMethod(data, query) {
      return data.label.indexOf(query) > -1;
    },
    handleChange(newTargetKeys) {
      this.targetKeys = newTargetKeys;
    },
    backBtn() {
      this.$router.push("/category");
    },
    submit() {
      if (this.name.trim() === '') {
        this.$message.warning('请输入分组名称');
        return ;
      }
      if (this.targetKeys.length === 0) {
        this.$message.warning('请添加酒店');
        return ;
      }
      if (this.isRequest) return;
      this.isRequest = true;
      let tmpPromise;
      const data = {
        name: this.name,
        hotelIds: this.targetKeys,
      }
      if (!!this.id) {
        tmpPromise = hotelStore.saveCategory({id: this.id, data});
      } else {
        tmpPromise = hotelStore.newCategory(data);
      }
      tmpPromise.then((res) => {
        if (res.code === 0) {
          this.$router.push('/category');
        } else {
          this.isRequest = false;
          this.$message.error(res.message);
        }
      }).catch((error) => { 
        this.isRequest = false;
        // console.error(error);
        this.$message.error(error.message);
      });
    },
  }
}
</script>
