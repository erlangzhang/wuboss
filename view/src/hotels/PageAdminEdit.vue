<style>
  .save-btn-style-admin-edit {
    text-align: center;
    margin: 20px;
  }
  .input-edit-admin-edit {
    width: 500px;
  }
  .transfer-container-role-edit {
    margin-top: 20px;
  }
  .from-container-admin-edit {
    margin: 20px;
  }
  .from-style-admin-edit {
    text-align: center;
  }
  .from-style-layout-admin-edit {
   margin: 0 auto;
   margin-top: 20px;
   border: 1px solid #e7ecf1;
   padding: 20px 0px 10px 0px;
   background: white;
 }
 .step-style-admin-edit {
   text-align: center;
 }
 .select-style-admin-edit {
   width: 500px;
 }
 .step-style-1 {
   width: 0px;
 }
 .search-btn-admin-edit {
   margin-left: 10px;
 }
 .row-admin-edit {
    margin-right: 10px;
    text-align: right;
 }
 .label-admin-edit {
   font-size: 13px;
 }
 .tag-admin-edit {
   margin-left: 10px;
   margin-bottom: 10px;
 }
 .row-style-admin-edit {
   margin: 10px;
 }

 .col-form-style-admin-edit {
   
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
      <VIcon type='appstore'/> {{ !this.id ? '新增管理员': '编辑管理员（'+ this.accountInfo.name +'）信息'}}
      <div class='breadcrumb-header'></div>
        <div class='table-container' >
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户信息" name="first">
              <el-steps :space="600" :active="stepActive" class="step-style-admin-edit">
                <el-step title="基础信息" ></el-step>
                <el-step class="step-style-1" title="酒店权限"></el-step>
              </el-steps>

              <div class='from-style-layout-admin-edit'>
                <el-row v-if="stepActive === 1">
                  <el-col :span="24" class="col-form-style-admin-edit">
                    <el-form label-position="right" :rules="rules" ref="ruleForm" label-width="100px" :model="accountInfo">
                      <el-form-item label="管理员账号" prop="account" required >
                        <el-input class="input-edit-admin-edit" :disabled="id ? true : false" placeholder="请输入公司内部邮箱账号" v-model="accountInfo.account"></el-input>
                      </el-form-item>
                      <el-form-item v-if="!id" label="密码" prop="password" required>
                        <el-input class="input-edit-admin-edit" type="password" v-model="accountInfo.password"></el-input>
                      </el-form-item>
                      <el-form-item label="姓名" prop="name" required>
                        <el-input class="input-edit-admin-edit" placeholder="请输入公司内部姓名" v-model="accountInfo.name"></el-input>
                      </el-form-item>
                      <el-form-item label="部门" prop="department" required>
                        <el-input class="input-edit-admin-edit" v-model="accountInfo.department"></el-input>
                      </el-form-item>
                      <el-form-item  label="手机号码" prop="telephone" required>
                        <el-input class="input-edit-admin-edit" v-model="accountInfo.telephone" auto-complete="off"></el-input>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="分配角色" prop="roles" required>
                        <el-select class="select-style-admin-edit" v-model="selectRole" multiple placeholder="请选择">
                          <el-option
                            v-for="item in rolesData"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>

                <div v-if="stepActive === 2">
                  <el-row v-if="rowChecked.length !== 0">
                    <el-col :span="2" class="row-admin-edit"><label class="label-admin-edit">已选择的酒店分组: </label></el-col>
                    <el-col :span="20">
                      <el-tag
                        class="tag-admin-edit"
                        v-for="tag in rowChecked"
                        :closable="true"
                        type="success"
                        @close="handleCloseHotelTag(tag)"
                      >
                        {{tag.name}}
                      </el-tag>
                    </el-col>
                  </el-row>
                  <el-row v-if="citys.length !== 0">
                    <el-col :span="2" class="row-admin-edit"><label class="label-admin-edit">已筛选的城市: </label></el-col>
                    <el-col :span="20">
                      <el-tag
                        class="tag-admin-edit"
                        v-for="tag in citys"
                        :closable="true"
                        type="primary"
                        @close="handleClose(tag)"
                      >
                        {{tag.name}}
                      </el-tag>
                    </el-col>
                  </el-row>
                  <el-row>
                    <!--
                    <el-col :span="2" class="row-admin-edit"><label class="label-admin-edit">筛选城市: </label></el-col>
                    <el-col :span="9"><Dist :onSelect='disSelect' size="small" level="2"/> </el-col>
                    -->
                    <el-col :span="1" class="row-admin-edit"><label class="label-admin-edit">搜索: </label></el-col>
                    <el-col :span="4"><el-input v-model="search" placeholder="酒店分组名称" size="small"></el-input></el-col>
                    <el-col :span="1"><el-button type="primary" @click="handleSearch" class="search-btn-admin-edit" size="small" icon="search">搜索</el-button></el-col>
                  </el-row>
                  <el-row class="row-style-admin-edit">
                    <!--
                      <el-table 
                      ref="table"
                      :data="hotels"
                      v-loading="loading"
                      element-loading-text="加载中"
                      border
                      @select-all="handleSelectAll"
                      style="width: 100%">
                      <el-table-column type="selection" width="50">
                        <template scope="scope">
                          <el-checkbox v-model="scope.row.isSelected" @change="onChecked(scope.row)"></el-checkbox>
                        </template>
                      </el-table-column>
                      <el-table-column prop="hostId" label="酒店ID">
                      </el-table-column>
                      <el-table-column prop="name" label="酒店名称">
                      </el-table-column>
                      <el-table-column prop="address" label="地址">
                        <template scope="scope">
                          <p>{{ renderAddress(scope.row) }}</p>
                          <p>{{ scope.row.detailAddress }}</p>
                        </template>
                      </el-table-column>
                      <el-table-column prop="agency" label="所属办事处">
                      </el-table-column>
                    </el-table>
                    --> 
                    <el-table 
                      ref="table"
                      :data="hotels"
                      v-loading="loading"
                      element-loading-text="加载中"
                      border
                      @select-all="handleSelectAll"
                      @sort-change='handleSortChange'
                      style="width: 100%">
                      <el-table-column type="selection" width="50">
                        <template scope="scope">
                          <el-checkbox v-model="scope.row.isSelected" @change="onChecked(scope.row)"></el-checkbox>
                        </template>
                      </el-table-column>
                      
                      <el-table-column prop="name" label='分组名称' sortable></el-table-column>
                      <el-table-column prop="hotelIds" label='酒店列表' :formatter='categoryFormat'></el-table-column>
                      <el-table-column prop="createdAt" label='创建时间' sortable>
                        <template scope="scope">
                          <label> {{ renderTime(scope.row.createdAt) }}</label>
                        </template>
                      </el-table-column>
                      <el-table-column prop="updatedAt" label='更新时间' sortable>
                        <template scope="scope">
                          <label> {{ renderTime(scope.row.updatedAt) }}</label>
                        </template>
                      </el-table-column>
                      <el-table-column prop="status" label='状态'>
                          <template scope='scope'>
                              <el-tag :type='!!scope.row.status ? "success" : "danger"'>{{ !!scope.row.status ? "正常" : "禁用" }}</el-tag>
                          </template>
                      </el-table-column>
                    </el-table>
                    <div class="table-pagination">
                      <el-pagination 
                        :current-page="pagination.currentPage"
                        :page-sizes="[10, 20, 30, 40]" 
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-size="pagination.pageSize"
                        layout="total, sizes, prev, pager, next, jumper" 
                        :total="pagination.total">
                      </el-pagination>
                    </div> 
                  </el-row>
                </div>
              </div> 
              <div class='save-btn-style-admin-edit'>
                <el-button type="info" :disabled="stepActive === 1" @click="btnUpClick">上一步</el-button>
                <el-button type="info" :disabled="stepActive === 2 || activeTab === 'second'" @click="btnNextClick">下一步</el-button>
                <el-button type="primary" :disabled="stepActive !== 2 && activeTab !== 'second'" @click="btnSaveClick">保存</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane v-if="id" label="密码修改" name="second">
              <el-form label-position="right" label-width="100px" :model="accountInfo">
                 <el-form-item label="原密码" prop="password" required>
                  <el-input class="input-edit-admin-edit" placeholder="不修改请留空" type="password" v-model="accountInfo.password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password" required>
                  <el-input class="input-edit-admin-edit" placeholder="不修改请留空" type="password" v-model="accountInfo.newPwd"></el-input>
                </el-form-item>
              </el-form>
              <div class='save-btn-style'>
                  <el-button type="primary"  @click="btnUpdatePwdClick">保存</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
  </div>
</template>

<script>
  import lodash from 'lodash';
  import validator from 'validator';
  import moment from 'moment';
  import Transfer from 'iview/src/components/transfer';
  import { VIcon, Btn, Dist, } from '../components';
  import { userStore, hotelStore } from '../stores';
  import '../style/index.less';
  const i = 10;
  export default {
    data() {
      let  validateTel = (rule, value, callback) => {
           let regExp = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
           if (value === '') {
                 callback(new Error('请输手机号码'))
              } else if (regExp.test(value) === false) {
                 callback(new Error('手机号码由11位数字组成，不能是汉字或其它'))
            }else{
               callback()
            }
            
      }
      return {
        loading: false,
        search: '',
        checked: true,
        stepActive: 1,
        rolesData: [],
        selectRole: [],
        citys: [],
        hotels: [],
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
        selectHotels: new Map(),
        rowChecked: [],
        accountInfo: {
          name: '',
          account: '',
          department: '',
          telephone: '',
          lastLoginTime: 0,
          lastLoginIp: '',
          roles: [],
          hotels: [],
          hotelGroups: [],
          password: '',
          newPwd: '',
        },
        activeName2: 'first',
        activeTab: 'first',
        

        rules: {
          password: [
            { required: true, message: '请输入密码,长度不少于6位', trigger: 'blur' },
            { min: 6, message: '长度不少于6位', trigger: 'blur' }
          ],
          telephone:[
             { required: true, message: '请输入手机号,长度不超过11位', trigger: 'blur' },
             { max: 11, message: '长度不超过11位数字', trigger: 'blur' },
             { validator: validateTel, trigger: 'blur' }     
          ],
          account: [
             { required: true, message: '请输入账号', trigger: 'change' }
          ],
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
       Dist,
    },
    created: function() {
      userStore.listRoles().then(ret => {
        this.rolesData = ret.data.docs.map(item => {
          return {
            value: item.id,
            label: item.name,
          }
        });
      }).catch(err => {
        this.$message.error(`获取角色数据失败！${err}`);
      });

      if (!this.id) {
        this.fetchHotelCategoryList();
        return;
      }
      Promise.all([
        userStore.retrieveAccount(this.id),
        hotelStore.getCategoryList(),
      ]).then(results => {
        this.accountInfo = results[0].data;
        this.selectRole = this.accountInfo.roles.map(item => {
          return item.name;
        });
        for (const item of this.accountInfo.hotelGroups) {
          this.rowChecked.push({
            id: item.id,
            isSelected: true,
            name: item.name,
          });
        }

        this.hotels = results[1].data.docs;
        this.pagination.total = results[1].data.total;

        if(!this.id || this.accountInfo.hotelGroups.length === 0) {
          for (const item of this.hotels) {
            this.$set(item, 'isSelected', false);
          }
          return;
        }
        for (const item of this.hotels) {
          for (const item1 of this.accountInfo.hotelGroups) {
            if (item.id === item1.id) {
              this.$set(item, 'isSelected', true);
              break;
            } else {
              this.$set(item, 'isSelected', false);
            }
          }
        }
      }).catch(err =>{
        this.$message.error(`获取账号数据或获取酒店数据失败！${err}`);
      });
    },
    methods: {
      renderTime(unix) {
        return moment(unix * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
      handleSortChange(param) {
        const tmp = {
          limit: this.pagination.pageSize,
          page: this.pagination.currentPage
        };
        if (!!param.prop) {
          const order = param.order === 'ascending' ? '' : '-';
          tmp.sort = order + param.prop;
        }
        this.fetchHotelCategoryList(tmp);
      },
      categoryFormat(row, column) {
        return row.hotelIds.join('、');
      },
      handleClick(tab, event) {
        this.activeTab = tab.name;
      },
      resetChecked() {
        const array = new Array();
        for( const item of this.rowChecked) {
          array.push(item);
        }
        this.rowChecked = null;
        this.rowChecked = array;
      },
      handleCloseHotelTag(tag) {
        lodash.remove(this.rowChecked, item => {
          return item.id === tag.id;
        });
        this.resetChecked();
        for (const item of this.hotels) {
          if (item.id === tag.id) {
            item.isSelected = false;
            break;
          }
        }
      },
      onChecked(row){
        row.isSelected = !!row.isSelected;

        let isSet = false;
        for(const item of this.rowChecked) {
          if (item.id === row.id) {
            item.isSelected = !!row.isSelected;
            isSet = true;
            break;
          }
        }
        if (!isSet) {
          this.rowChecked.push({
            id: row.id,
            isSelected: row.isSelected,
            name: row.name,
          });
        }

        lodash.remove(this.rowChecked, item => {
          return item.isSelected === false;
        });
        this.resetChecked();
      },
      checkParams() {
        if (!this.accountInfo.account) {
          this.$message.error('账号必填！');
          return false;
        }
        // let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!validator.isEmail(this.accountInfo.account)) {
          this.$message.error('账号不是合法的邮箱账号！');
          return false;
        }
        

        if (!this.accountInfo.name) {
          this.$message.error('姓名必填！');
          return false;
        }
        if (!this.accountInfo.department) {
          this.$message.error('部门必填！');
          return false;
        }
        if (!this.id && !this.accountInfo.password) {
          this.$message.error('密码必填！');
          return false;
        }
        // 字母+数字+特殊字符   
        // ^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$

        if (!this.accountInfo.telephone) {
          this.$message.error('手机号码必填！');
          return false;
        }
        let reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
        if (!reg.test(this.accountInfo.telephone)) {
          this.$message.error('请输入正确的手机号！');
          return false;
        }

        if (!this.selectRole.length) {
          this.$message.error('角色必填！');
          return false;
        }
        // if (!this.accountInfo.hotels.length) {
        //   this.$message.error('酒店必填！');
        //   return false;
        // }
        return true;
      },
      handleSelectAll(selection) {
        for(const item of this.hotels) {
          item.isSelected = selection.length !== 0;

          let isSet = false;
          for(const item1 of this.rowChecked) {
            if (item1.id === item.id) {
              item1.isSelected = selection.length !== 0;
              isSet = true;
              break;
            }
          }
          if (!isSet) {
            this.rowChecked.push({
              id: item.id,
              name: item.name,
              isSelected: selection.length !== 0,
            });
          }
        }
        lodash.remove(this.rowChecked, item => {
          return item.isSelected === false;
        });
        this.resetChecked();
      },
      fetchHotels(params = { limit: 10, page: 1}) {
        this.loading = true;
        hotelStore.getHotelList(params).then(ret => {
          this.loading = false;
          this.hotels = ret.data.docs;
          this.pagination.total = Number(ret.data.total);
          // this.pagination.pageSize = Number(ret.data.limit);
          // this.pagination.currentPage = Number(ret.data.page);
          for (const item of this.hotels) {
            this.$set(item, 'isSelected', false);
            for (const item1 of this.accountInfo.hotels) {
              if (item.id === item1.id) {
                this.$set(item, 'isSelected', true);
                break;
              }
            }

            for (const it of this.rowChecked) {
              if (it.id === item.id) {
                this.$set(item, 'isSelected', it.isSelected);
                break;
              }
            }
          }
        }).catch( err=> {
          this.loading = false;
          this.$message.error(`获取酒店数据失败！${err}`);
        });
      },
      fetchHotelCategoryList(params = {limit: 10, page: 1}) {
        this.loading = true;
        hotelStore.getCategoryList(params).then(ret => {
          this.loading = false;
          this.hotels = ret.data.docs;
          this.pagination.total = Number(ret.data.total);
          
          for (const item of this.hotels) {
            this.$set(item, 'isSelected', false);
            for (const item1 of this.accountInfo.hotelGroups) {
              if (item.id === item1.id) {
                this.$set(item, 'isSelected', true);
                break;
              }
            }

            for (const it of this.rowChecked) {
              if (it.id === item.id) {
                this.$set(item, 'isSelected', it.isSelected);
                break;
              }
            }
          }
        }).catch( err=> {
          this.loading = false;
          this.$message.error(`获取酒店分组数据失败！${err}`);
        });
      },
      renderAddress(row) {
        return `${row.province}, ${row.city}, ${row.county}`;
      },
      disSelect(distInfo) {
        if (distInfo.city.name) {
          this.citys.push(distInfo.city);
        }
      },
      btnUpClick () {
        this.stepActive -= 1;
      },
      btnNextClick () {
        this.$refs['ruleForm'].validate((valid) => {
          if (!valid) {
            return false;
          }
          if (this.checkParams()) {
            this.stepActive += 1;
          }
        });
      },
      btnSaveClick() {
        if (!this.checkParams()) 
          return;
        this.accountInfo.hotelGroups = this.hotels.map(item => {
          if (item.isSelected) {
            return {
              id: item.id,
              name: item.name,
            };
          }
          return null;
        })
        this.accountInfo.hotelGroups = lodash.compact(this.accountInfo.hotelGroups);
        
        this.accountInfo.roles = this.selectRole.map(item => {
          for(const item1 of this.rolesData) {
            if (item === item1.label || item === item1.value) {
              return {
                id: item1.value,
                name: item1.label,
              }
            }
          }
        });

        if (!this.id) {
          userStore.createAccount(this.accountInfo).then(res => {
           if (res.code === 0) {
              this.$message({
                type: 'success',
                message: `操作成功!`,
              });
              this.$router.push('/admins');
            } else {
              this.$message.error(res.message);
            }
          }).catch(err => {
            this.$message.error(`创建账号失败!${err}`);
          });
          return;
        }
        
        userStore.updateAccount(this.id, this.accountInfo).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: `操作成功!`,
            });
            this.$router.push('/admins');
          } else {
            this.$message.error(res.message);
          }
        }).catch(err => {
          this.$message.error(`更新账号失败!${err}`);
        });
      },
      btnUpdatePwdClick() {
        const postInfo = {
          password: this.accountInfo.password,
          newPwd: this.accountInfo.newPwd
        }
        userStore.updateAccountPwd(this.id, postInfo).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: `操作成功!`,
            });
            this.$router.push('/admins');
          } else {
            this.$message.error(res.message);
          }
        }).catch(err => {
          this.$message.error(`更新账号失败!${err}`);
        });
      },
      handleClose(tag) {
        for (let i = 0; i < this.citys.length; ++i) {
          if (this.citys[i].id === tag.id) {
            this.citys.splice(i, 1);
            return;
          }
        }
      },
      recoredChecked() {
        for (const item of this.hotels) {
          if(item.isSelected) {
            this.rowChecked.push({
              id: item.id,
              isSelected: item.isSelected,
              name: item.name,
            });
          }
        }
      },
      handleSearch(ev) {
        const params = { 
          limit: this.pagination.pageSize,
						page: this.pagination.currentPage
          };
        if (this.search || this.citys) {
          if (this.search)
            params.search = this.search;

          if (this.citys.length !== 0) {
            params.citys = this.citys.map(item => {
              return item.id;
            }).toString();
          }
        }
        this.fetchHotelCategoryList(params);
      },
      handleSizeChange(val) {
        // 先记录已经选择的行
        this.recoredChecked();

        this.pagination.pageSize = val;
        const params = this.search ? { search: this.search, page: this.pagination.currentPage, limit: val } : { page: this.pagination.currentPage, limit: val };
        this.fetchHotelCategoryList(params);
      },
      handleCurrentChange(val) {
        // 先记录已经选择的行
        this.recoredChecked();

        this.pagination.currentPage = val;
        const params = this.search ? { search: this.search } : { page: val, limit: this.pagination.pageSize };
        this.fetchHotelCategoryList(params);
      },
    }
  }
</script>