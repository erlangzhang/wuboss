<style>
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
        <el-breadcrumb-item :to="{ path: '/' }"><VIcon class='breadcrumb-icon' type='home'/> 首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class='breadcrumb-header'></div>
    </div>
    <div class='content-header'>
      <VIcon type='appstore'/> {{ !this.id ? '新增角色': '编辑角色（'+ this.roleInfo.name +'）信息'}}
      <div class='breadcrumb-header'></div>
      <div class='table-container container-role-edit' >

        <label>角色名称 </label> <el-input class='input-role-edit' v-model="roleInfo.name"></el-input>

        <Transfer
          class="transfer-container-role-edit"
          :data="data"
          :target-keys="targetKeys"
          :list-style="listStyle"
          :render-format="render"
          :titles="titles"
          filterable
          @on-change="handleChange">
          <div :style="{float: 'right', margin: '5px'}">
            <el-button type="ghost" size="small" @click="reloadData">刷新</el-button>
          </div>
        </Transfer>
      </div>
    </div>
    <el-col class='save-btn-style' :span="24"><el-button type="primary" @click="btnSaveClick">保存</el-button></el-col>
  </div>
</template>

<script>
  import Transfer from 'iview/src/components/transfer';
  import { VIcon, Btn, } from '../components';
  import { hotelStore, userStore } from '../stores';
  import '../style/index.less';
  export default {
    data() {
      return {
        listStyle: {
          width: '350px',
          height: '400px',
          textAlign: 'left',
        },
        titles: ['角色未绑定权限', '角色已绑定的权限'],
        data: [],
        targetKeys: [],
        roleInfo: {
          name: '',
          permissions: [],
        },
      };
    },
    computed: {
      id: {
        get: function() {
          if (this.$route && this.$route.query)
            return this.$route.query.id;
          else
            return '';
        }
      }
    },
    components: {
       VIcon,
       Btn,
       Transfer,
    },
    created: function() {
      this.fetch();
      if (this.id) {
        this.fetchRole(this.id);
      }
    },
    methods: {
      fetch(params) {
        userStore.listPermisson().then(res => {
          this.data = res.data.docs.map(item => {
            return {
              key: item.id,
              label: item.name,
              description: item.category.name || item.name,
              disabled: false,
            }
          });
        }).catch(err => {
          this.$message.error(`获取权限列表失败!${err}`);
        });
      },
      fetchRole(id) {
        userStore.retrieveRole(id).then(ret => {
          this.roleInfo = ret.data;
          this.targetKeys = this.roleInfo.permissions.map(item => {
            // return {
            //   key: item.id,
            //   label: item.category.name || item.name,
            //   description: item.name,
            // };
            return item.id;
          });
        }).catch(err => {
          this.$message.error(`获取角色数据失败${err}`);
        });
      },
      
      handleChange (newTargetKeys) {
        this.targetKeys = newTargetKeys;
      },
      render (item) {
        return item.label + ' - ' + item.description;
      },
      reloadData () {
        this.fetch();
        if (this.id) {
          this.fetchRole(this.id);
        }
      },
      checkParams() {
        if (!this.roleInfo.name) {
          this.$message.error('角色名称必填！');
          return false;
        }
        return true;
      },
      btnSaveClick() {
        if (!this.checkParams()) 
          return;
        this.roleInfo.permissions = this.targetKeys;
        if (!this.id) {
          userStore.createRole(this.roleInfo).then(ret => {
            this.$message({
              type: 'success',
              message: `创建角色成功!`,
            });
            this.$router.push('/roles');
          }).catch(err => {
            this.$message.error(`创建角色失败!${err}`);
          });
          return;
        }
        
        userStore.updateRole(this.id, this.roleInfo).then(ret => {
          this.$message({
            type: 'success',
            message: `更新角色成功!`,
          });
          this.$router.push('/roles');
        }).catch(err => {
          this.$message.error(`更新角色失败!${err}`);
        });
      },
    }
  }
</script>
