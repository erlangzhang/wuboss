<style>
    .input-text-dialog {
        width: 100px;
    }
</style>
<template>
    <div class='layout-container'>
        <PublicHeader :title="init.title" :breadcrumbs="init.breadcrumbs"></PublicHeader>
        <div style="padding: 15px; background-color: #dddddd">
            <span>影片名称或GlobalID：</span>
            <el-input v-model="tableParams.search" size="small" style="width: 160px;">
            </el-input>
            <span>状态：</span>
            <el-select v-model="tableParams.status" size="small" placeholder="请选择" style="width: 150px;">
                <el-option
                v-for="item in fileStatuses"
                :key="item.value"
                :label="item.text"
                :value="item.value">
                </el-option>
            </el-select>
            <span>所属分类：</span>
            <el-select v-if="categoryOptions" v-model="tableParams.category" size="small" placeholder="请选择" style="width: 150px;">
                <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.text"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button size="small" type="primary" @click="handleSearch" style="margin-left:20px">搜索</el-button>
            <el-button size="small" @click="handleReset">重置</el-button>
        </div>
        <XTable :options="tableOptions" :data="tableData" :pagination="pagination" @tableParamsChange="handleTableParamsChange"></XTable>
        <MessageSelector ref="messageSelector"></MessageSelector>

        <el-dialog :visible.sync="batchVisible" size="tiny">
            <el-form>
                <el-form-item label="指导价:">
                    <el-input v-model="price" class="input-text-dialog"></el-input>
                </el-form-item>
            </el-form>
            <br>
            <el-button @click="batchVisible = false">取 消</el-button>
            <el-button type="primary" @click="batchVisible = false">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>
<script>
import moment from 'moment';
import lodash from 'lodash';
import PublicHeader from '../../components/PublicHeader.vue';
import XTable from '../../components/XTable.vue';
import MessageSelector from '../../components/MessageSelector.vue';
import {
    mediaStore
} from '../../stores';
import '../../style/index.less';

const FILE_STATUSES = [
    {text: '待入库', value: '0'},
    {text: '待审核', value: '1'},
    {text: '审核通过', value: '2'},
    {text: '审核1', value: '3'},
    {text: '审核2', value: '4'},
    {text: '驳回', value: '5'},
    {text: '上线', value: '6'},
    {text: '下线', value: '7'},
    {text: '待上线', value: '8'},
];

export default {
    data() {
        return {
            init: {
                breadcrumbs: ['媒资管理', '影片库'],
                title: '影片库',
            },
            tableData: [],
            pagination: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
            },
            dialogVisible: false,
            batchVisible: false,
            price: 212,
            loading: false,
            tableParams: {
                page: 1,
                limit: 10,
                search: '',
                sort: '',
                status: null,
                category: null,
            },
            fileStatuses: FILE_STATUSES,
            categoryOptions: null,
            sequenceEditable: false,
            
        }
    },
    computed: {
        tableOptions: function () {
            return {
                columns: [
                    {id: 'globalId', title: 'GlobalID', checked: true},
                    {
                        id: 'sequence', title: '排序', checked: true, 
                        editable: !this.sequenceEditable ? null : {
                            formatter: (rowData) => {
                                return rowData.operateInfo.sequence;
                            },
                            onEdit: (rowData, value) => {
                                console.log('edit value', value);
                                mediaStore.updateFilmCategorySequence(rowData.globalId, this.tableParams.category, parseInt(value))
                                    .then(res => {
                                        console.log('updateFilmCategorySequence success');
                                        this.requestTableData();
                                    }).catch(err => {
                                        this.$alert(`编辑排序序号失败`, '错误', {confirmButtonText: '确定'});
                                    })
                            }
                        },
                    },
                    {id: 'name', title: '节目名称', checked: true, formatter: (row) => {
                        return row.language ? row.language[0].name : row.name;
                    }},
                    {id: 'price', title: '指导价', checked: true, formatter: (row) => {
                        return row.operateInfo.price
                    }},
                    {
                        id: 'isfree', title: '收费', checked: true, 
                        formatter: (row) => {
                            return mediaStore.isFree(row.operateInfo.isfree)
                        }, 
                        filter: {
                            multiple: false,
                            data: [
                                {text: '付费', value: '付费'},
                                {text: '免费', value: '免费'},
                            ],
                            onFilter: (value, row) => {
                                return value == mediaStore.isFree(row.operateInfo.isfree);
                            }
                        }
                    },
                    {
                        id: 'caflag', title: '监管', checked: true, 
                        formatter: (row) => {
                            return mediaStore.isCa(row.operateInfo.caflag)
                        }, 
                        filter: {
                            multiple: false,
                            data: [
                                {text: '是', value: '是'},
                                {text: '否', value: '否'},
                            ],
                            onFilter: (value, row) => {
                                return value == mediaStore.isCa(row.operateInfo.caflag);
                            }
                        }
                    },
                    {id: 'createdAt', title: '创建时间', checked: true, formatter: (row) => {
                        return mediaStore.renderTime_YYYYMMDDHHMM(row.createdAt)
                    }},
                    {
                        id: 'status', title: '状态', checked: true,
                        formatter: (row) => {
                            return mediaStore.getFilmStatue(row.status)
                        }, 
                        filter: {
                            multiple: false,
                            data: FILE_STATUSES,
                            onFilter: (value, row) => {
                                return value == row.status;
                            }
                        },
                    },
                ],
                tableOperations: [
                    {
                        title: '刷新',
                        icon: 'reload',
                        type: 'default',
                        onClick: () => { this.requestTableData() }
                    },
                ],
                columnOperations: [
                    {
                        title: '详情',
                        icon: 'edit',
                        type: 'warning',
                        onClick: (rowData) => { this.$router.push('/media/pending-edit?id='+rowData.globalId+'&editType=language'); }
                    }, {
                        title: '运营',
                        icon: 'edit',
                        type: 'warning',
                        onClick: (rowData) => { this.$router.push('/media/pending-edit?id='+rowData.globalId+'&editType=operate'); }
                    }, {
                        title: '删除',
                        icon: 'delete',
                        type: 'danger',
                        visible: (rowData) => { return true },
                        confirm: {title: '确定删除吗？'},
                        onClick: (rowData) => { this.handleDelete(rowData); }
                    }, {
                        title: '下发情况',
                        // icon: 'document',
                        type: 'info',
                        onClick: (rowData) => { this.$refs.messageSelector.showDialog(rowData.globalId); }
                    }
                ],
                batchOperations: [
                    {
                        title: '删除',
                        icon: 'delete',
                        confirm: {title: '确定删除吗？'},
                        onClick: (rows) => { this.handleBatchDelete(rows) }
                    }, {
                        title: '批量改价',
                        icon: 'delete',
                        onClick: (rows) => { this.batchVisible = true; }
                    }, {
                        title: '上线',
                        onClick: (rows) => {
                            let ids = rows.map(item => item.globalId);
                            mediaStore.batchUpdateFilmStatus({id: ids, status: 6}).then(res => {
                                this.$message('批量上线成功');
                                this.requestTableData();
                            }).catch(error => {
                                this.$message('批量上线失败');
                            });
                        }
                    }, {
                        title: '下线',
                        onClick: (rows) => {
                            let ids = rows.map(item => item.globalId);
                            mediaStore.batchUpdateFilmStatus({id: ids, status: 7}).then(res => {
                                this.$message('批量下线成功');
                                this.requestTableData();
                            }).catch(error => {
                                this.$message('批量下线失败');
                            });
                        }
                    }, {
                        title: '免费',
                        onClick: (rows) => {
                            let ids = rows.map(item => item.globalId);
                            mediaStore.batchUpdateFilmStatus({id: ids, isfree: 1}).then(res => {
                                this.$message('批量免费成功');
                                this.requestTableData();
                            }).catch(error => {
                                this.$message('批量免费失败');
                            });
                        }
                    }, {
                        title: '收费',
                        onClick: (rows) => {
                            let ids = rows.map(item => item.globalId);
                            mediaStore.batchUpdateFilmStatus({id: ids, isfree: 0}).then(res => {
                                this.$message('批量收费成功');
                                this.requestTableData();
                            }).catch(error => {
                                this.$message('批量收费失败');
                            });
                        }
                    }, {
                        title: '批量改价',
                        onClick: (rows) => {
                            let ids = rows.map(item => item.globalId);
                            this.$prompt('请输入价格', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                inputPattern: /[0-9\.]+/,
                                inputErrorMessage: '价格格式不正确'
                            }).then(({ value }) => {
                                mediaStore.batchUpdateFilmStatus({id: ids, price: value}).then(res => {
                                    this.$message('批量改价成功');
                                    this.requestTableData();
                                }).catch(error => {
                                    this.$message('批量改价失败');
                                });
                            }).catch(() => {

                            });
                        }
                    }, {
                        title: '授权监管',
                        onClick: (rows) => {
                            let ids = rows.map(item => item.globalId);
                            mediaStore.batchUpdateFilmStatus({id: ids, caflag: 1}).then(res => {
                                this.$message('批量授权监管成功');
                                this.requestTableData();
                            }).catch(error => {
                                this.$message('批量授权监管失败');
                            });
                        }
                    }, {
                        title: '取消监管',
                        onClick: (rows) => {
                            let ids = rows.map(item => item.globalId);
                            mediaStore.batchUpdateFilmStatus({id: ids, caflag: 0}).then(res => {
                                this.$message('批量取消监管成功');
                                this.requestTableData();
                            }).catch(error => {
                                this.$message('批量取消监管失败');
                            });
                        }
                    }, {
                        title: '下发',
                        icon: 'delete',
                        onClick: (rows) => {
                            this.$router.push('/media/issued?data='+JSON.stringify(rows.map(item => {
                                return {
                                    id: item.globalId,
                                    name: item.language ? item.language[0].name : item.name,
                                };
                            })));
                        }
                    }
                ]
            };
            
        },
    },
    components: {
        PublicHeader,
        XTable,
        MessageSelector
    },
    methods: {
        handleTableParamsChange(params) {
            this.tableParams = Object.assign({}, this.tableParams, params);
            this.requestTableData();
        },
        requestTableData() {
            let otherParams = {};
            if (!this.tableParams.status) {
                otherParams.status = '2,6,7,8';
            }
            mediaStore.getFilmlList({...this.tableParams, ...otherParams}).then(res => {
                this.tableData = res.data.docs;
                this.pagination = {
                    currentPage: res.data.page,
                    pageSize: res.data.limit,
                    total: res.data.total,
                };

                if (this.tableParams.category) {
                    this.sequenceEditable = true;
                    this.tableOptions = {...this.tableOptions};
                } else {
                    this.sequenceEditable = false;
                    this.tableOptions = {...this.tableOptions};
                }
            });
        },
        requestCategoryData() {
            mediaStore.getCategoryList().then(res => {
                let categoryOptions = res.data.map(item => ({
                    value: item.id,
                    text: item.name,
                }));

                this.categoryOptions = categoryOptions;
            });
        },
        // 删除
        handleDelete(row){
            mediaStore.deleteFilm({id: [row.globalId]}).then(ret => {
                console.log('ret-- ' + JSON.stringify(ret))
                if (0 == ret.code) {
                    this.$message('删除成功');
                    this.requestTableData();
                } else
                    this.$message.error('删除失败');

            }).catch(err => {
                this.$message.error(`删除影片失败！${err}`);
            })
        },
        // 批量删除
        handleBatchDelete(rows) {
            if(null == rows || 0 >= rows.length) {
                this.$message.error('请先勾选需要删除的影片');
                return
            }

            let idArr = []
            rows.map(item => idArr.push(item.globalId))
            mediaStore.deleteFilm({id: idArr}).then(ret => {
                console.log('ret-- ' + JSON.stringify(ret))
                if (0 == ret.code) {
                    this.$message('删除成功');
                    this.requestTableData();
                } else
                    this.$message.error('删除失败');

            }).catch(err => {
                this.$message.error(`删除影片失败！${err}`);
            })

        },
        handleSearch() {
            this.requestTableData();
        },
        handleReset() {
            this.tableParams.search = '';
            this.tableParams.status = null;
            this.tableParams.category = null;
            this.requestTableData();
        }

    },
    mounted() {
        this.requestTableData();
        this.requestCategoryData();
    }
    
}
</script>
