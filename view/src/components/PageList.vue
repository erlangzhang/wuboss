<style>

</style>

<template>

<div class='layout-container'>
  <div class='breadcrumb'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '>' }"><VIcon class='breadcrumb-icon' type='home'/> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>酒店管理</el-breadcrumb-item>
      <el-breadcrumb-item>酒店列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='breadcrumb-header'></div>
  </div>
  <div class='content-header'>
    <VIcon type='appstore'/> 酒店列表
    <div class='breadcrumb-header'></div>
  </div>
  <div class='operator-bar'>
    <router-link class="create-btn" to='/'><VIcon type='plus' class='iconfont-button'/>新建</router-link>
    <router-link class="refresh-btn" to='/'><VIcon type='reload' class='iconfont-button'/>刷新</router-link>
    <router-link class="edit-btn" to='/'><VIcon type='edit' class='iconfont-button'/>编辑</router-link>
    <el-dropdown>
      <span class="batch-btn">
        <VIcon type="check-square-o"/>
        批量操作 <VIcon type="down"/>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><VIcon type="delete" class='iconfont-button'/>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <a href="javascript:;" @click="dialogVisible = true" class="delete-btn">
      <VIcon type="delete" class='iconfont-button'/>删除
    </a>
    <el-dialog v-model="dialogVisible" size="tiny">
      <span><VIcon type="question-circle" class="delete-btn-dialog-icon"/>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  <div class='table-container' >
    <span class='table-title'>显示第 {{(pagination.currentPage - 1) * pagination.pageSize || 1 }} 至 {{pagination.currentPage * pagination.pageSize}} 项，共 {{hotels.length}} 项</span>
    <el-dropdown class="select-row-dropdown" :hide-on-click="false">
      <el-button class="select-row" >
        选择列 <VIcon type="down"/>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><el-checkbox v-model="columnsChecked.name">酒店名称</el-checkbox></el-dropdown-item>
        <el-dropdown-item><el-checkbox v-model="columnsChecked.address">地址</el-checkbox></el-dropdown-item>
        <el-dropdown-item><el-checkbox v-model="columnsChecked.opt">操作</el-checkbox></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> 
    
    <el-table
    :data="hotels"
    border
    style="width: 100%"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      v-if="columnsChecked.name"
      label="酒店名称"
      prop="name"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      v-if="columnsChecked.address"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      v-if="columnsChecked.opt"
      show-overflow-tooltip>
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="table-pagination" >
    <el-pagination
      :current-page="pagination.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="hotels.length">
    </el-pagination>
  </div>
  </div>
  </div>
</template>

<script>
  import { VIcon, Btn, } from '../components';
  import { hotelStore } from '../stores';
  import '../style/index.less';
  export default {
    data() {
      return {
        hotels: [],
        dialogVisible: false,
        columnsChecked: {
          name: true,
          address: true,
          opt: true 
        },
        pagination: {
          currentPage: 1,
          pageSize: 10,
        }
      }
    },
    components: {
       VIcon,
       Btn,
    },
    created: function() {
      const _this = this;
      hotelStore.list().then(res => {
        _this.hotels = res.data.items;
      }).catch(err => {
        console.log('err: ', err);
      })
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>