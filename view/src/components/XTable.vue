<template>
    <div>
        <div class='operator-bar'>
            <el-button 
                v-if="options.tableOperations"
                v-for="operation in options.tableOperations"
                :type="operation.type"
                size="small"
                @click="handleTableOperationClicked(operation)">
                {{ operation.title }}
            </el-button>
            <el-dropdown v-if="options.batchOperations" @command="handleBatchOperationClicked" trigger="click" style="margin-left: 10px">
                <el-button size="small">批量操作&nbsp;<i class="el-icon-arrow-down"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(operation, i) in options.batchOperations" :command="''+i">
                        <VIcon :type="operation.type" class='batch-iconfont-button'/>
                        {{ operation.title }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span v-if="options.batchOperations" class="batch-select-span">{{ `选择了 ${this.itemSelected.length} 项` }}</span>
        </div>
        <div class='table-container'>
            <span v-if="pagination" class='table-title'>显示第 {{(pagination.currentPage - 1) * pagination.pageSize + 1}} 至 {{(pagination.currentPage - 1) * pagination.pageSize + data.length}} 条，共 {{data.length}} 条</span>
            <span v-if="!pagination" class='table-title'>共 {{data.length}} 条</span>
            <el-dropdown class="select-row-dropdown" :hide-on-click="false">
                <el-button class="select-row">
                    选择列
                    <VIcon type="down"/>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="column in options.columns">
                        <el-checkbox v-model="columnsChecked[column.id]">{{ column.title }}</el-checkbox>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-input v-if="search" class='search-input' :placeholder="search.placeholder" icon="search" v-model="searchQuery" size="small"
                      :on-icon-click="handleSearch" @keyup.enter.native="handleSearch">
            </el-input>
            <el-table ref="xtable" :data="data" v-loading="loading" element-loading-text="加载中" border style="width:100%; cursor:pointer" stripe
                      @sort-change='handleSortChanged' @selection-change="handleSelectionChanged">
                <el-table-column v-if="options.batchOperations" type="selection" width="55">
                </el-table-column>
                <el-table-column v-if="options.columnSortable" label="排序" width="70">
                    <template scope="scope">
                        <a href="javascript:;">
                            <VIcon type='appstore' class='iconfont-button xtable-sortable-icon'/>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column v-if="options.showRowNumber" label="位置" width="70">
                    <template scope="scope">
                        <span>{{ parseInt(scope.row._position) + 1 }}</span>
                    </template>
                </el-table-column>

                <el-table-column v-if="options.needExpand" type="expand">
                    {{ options.expandData }}
                </el-table-column>

                <el-table-column 
                    v-for="column in options.columns" 
                    v-if="columnsChecked[column.id]" 
                    :label="column.title" 
                    :prop="column.id" 
                    :width="column.width"
                    :filter-multiple="column.filter && column.filter.multiple"
                    :filters="column.filter && column.filter.data"
                    :filter-method="column.filter && column.filter.onFilter"
                    filter-placement="bottom">
                    <template scope="scope">
                        <div v-if="column.formatter" v-html="column.formatter(scope.row)">
                        </div>
                        <div v-else-if="column.editable">
                            <span v-if="!inputVisible[`${column.id}-${scope.$index}`]">{{ column.editable.formatter ? column.editable.formatter(scope.row) : scope.row[column.id] }}</span>
                            <el-button v-if="!inputVisible[`${column.id}-${scope.$index}`]" size="mini" @click="handleEdit(scope.row, column.id, scope.$index)">编辑</el-button>
                            <el-input v-if="inputVisible[`${column.id}-${scope.$index}`]" v-model="inputValue" size="mini" style="width: 50px;"></el-input>
                            <el-button v-if="inputVisible[`${column.id}-${scope.$index}`]" size="mini" @click="handleEditSubmit(scope.row, column.id, scope.$index, column.editable.onEdit)">确认</el-button>
                        </div>
                        <div v-else>
                            {{ scope.row[column.id] }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column v-if="options.columnOperations" label="操作" :width="columnOperationsWidth" show-overflow-tooltip>
                    <template scope="scope">
                        <el-button 
                            v-for="operation in options.columnOperations"
                            v-if="!operation.visible || operation.visible()" 
                            :type="operation.type"
                            size="mini"
                            :icon="operation.icon" 
                            @click="handleColumnOperationClicked(scope.row, operation)">
                            {{ operation.title }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="pagination" class="table-pagination">
                <el-pagination :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" @current-change='handleCurrentPageChanged' @size-change='handlePageSizeChanged'>
                </el-pagination>
            </div>
            <el-dialog v-model="dialogVisible" size="tiny">
                <span><VIcon type="question-circle" class="delete-btn-dialog-icon"/>确定删除吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleOperationOk">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import VIcon from './icon';
    import Sortable from 'sortablejs';

    const OPERATION_TYPE_TABLE = 'table';
    const OPERATION_TYPE_COLUMN = 'column';
    const OPERATION_TYPE_BATCH = 'batch';

    export default {
        name: 'XTable',
        components: {
            VIcon
        },
        props: {
            options: {
                type: Object
            },
            data: {
                type: Array
            },
            pagination: {
                type: Object
            },
            search: {
                type: Object
            }
        },
        data() {
            console.log('this.options', this.options);

            const columnsChecked = {};
            for (let column of this.options.columns) {
                columnsChecked[column.id] = column.checked;
            }
            return {
                columnsChecked: columnsChecked,
                searchQuery: '',
                loading: false,
                dialogVisible: false,
                currentRowData: null,
                currentOperation: null,
                currentOperationType: false,
                itemSelected: [],
                sortData: null,
                tableParams: {
                    page: 1,
                    limit: 10,
                    search: '',
                    sort: '',
                },
                nextId: 1,
                inputVisible: {},
                inputValue: '',
            }

        },
        computed: {
            columnOperationsWidth() {
                return this.options.columnOperations.length * 65 + 35;
            }
        },
        created() {
            if (this.options.showRowNumber) {
                for (let i in this.data) {
                    this.data[i]._position = i;
                    this.data[i]._id = this.nextId++;
                }
                console.log(`this.data`, this.data);
            }
            if (this.options.columnSortable) {
                this.sortData = Object.assign([], this.data);
            }
        },
        mounted() {
            // if (this.options.showRowNumber) {
            //     for (let i in this.data) {
            //         this.data[i]._position = i;
            //         this.data[i]._id = this.nextId++;
            //     }
            // }
            // if (this.options.columnSortable) {
            //     this.sortData = Object.assign([], this.data);
            // }

            if (this.options.columnSortable) {
                Sortable.create(this.$refs.xtable.$el.getElementsByTagName('tbody')[0], {
                    handle: '.xtable-sortable-icon',
                    animation: 150,
                    onSort: (evt) => {
                        let tempRow = this.sortData[evt.oldIndex];
                        this.sortData.splice(evt.oldIndex, 1);
                        this.sortData.splice(evt.newIndex, 0, tempRow);

                        // 修正this.data的序号
                        if (this.options.showRowNumber) {
                            for (let i in this.sortData) {
                                for (let j in this.data) {
                                    if (this.data[j]._id == this.sortData[i]._id) {
                                        this.data.splice(j, 1, {...this.sortData[i], _position: i});
                                        break;
                                    }
                                }
                            }
                        }
                        
                        console.log('onSort!');

                        this.options.columnSortable.onSort(this.sortData);
                    }
                });
            }
        },
        methods: {
            handleSelectionChanged(val) {
                this.itemSelected = val;
            },
            handleSortChanged() {

            },
            handleSearch(ev) {
                this.search.onSearch(this.searchQuery);
            },
            handleColumnOperationClicked(rowData, operation) {
                if (operation.confirm) {
                    this.currentRowData = rowData;
                    this.currentOperation = operation;
                    this.currentOperationType = OPERATION_TYPE_COLUMN;
                    this.dialogVisible = true;
                } else {
                    operation.onClick(rowData);
                }
            },
            handleTableOperationClicked(operation) {
                if (operation.confirm) {
                    this.currentOperation = operation;
                    this.currentOperationType = OPERATION_TYPE_TABLE;
                    this.dialogVisible = true;
                } else {
                    operation.onClick();
                }
            },
            handleBatchOperationClicked(command) {
                if (this.itemSelected.length == 0) {
                    this.$message('请至少选择一个项目');
                    return;
                }

                let operation = this.options.batchOperations[command];

                if (operation.confirm) {
                    this.currentOperation = operation;
                    this.currentOperationType = OPERATION_TYPE_BATCH;
                    this.dialogVisible = true;
                } else {
                    operation.onClick(this.itemSelected);
                }
            },
            handleOperationOk() {
                switch (this.currentOperationType) {
                    case OPERATION_TYPE_TABLE:
                        this.currentOperation.onClick();
                        break;
                    case OPERATION_TYPE_COLUMN:
                        this.currentOperation.onClick(this.currentRowData);
                        break;
                    case OPERATION_TYPE_BATCH:
                        this.currentOperation.onClick(this.itemSelected);
                        break;
                    default:
                        break;
                }

                this.dialogVisible = false;
            },
            handleCurrentPageChanged(currentPage) {
                console.log('handleCurrentPageChanged', currentPage);
                this.tableParams.page = currentPage;
                this.$emit('tableParamsChange', this.tableParams);
            },
            handlePageSizeChanged(size) {

            },
            pushRow(rowData) {
                if (this.options.showRowNumber) {
                    rowData._id = this.nextId++;
                    rowData._position = this.data.length;
                }

                this.data.push({...rowData});
                if (this.options.columnSortable) {
                    this.sortData.push({...rowData});
                    this.options.columnSortable.onSort(this.sortData);
                }
            },
            replaceRow(oldRow, newRow) {
                let _id = oldRow._id;
                let _position = oldRow._position;
                
                if (this.options.showRowNumber) {
                    for (let i in this.data) {
                        if (this.data[i]._id == _id) {
                            this.data.splice(i, 1, {...newRow, _id, _position});
                            break;
                        }
                    }

                    if (this.options.columnSortable) {
                        for (let i in this.sortData) {
                            if (this.sortData[i]._id == _id) {
                                this.sortData.splice(i, 1, {...newRow, _id, _position});
                                break;
                            }
                        }
                    }
                }
            },
            deleteRow(rowData) {
                let _id = rowData._id;
                for (let i = 0; i < this.data.length; i++) {
                    if (rowData == this.data[i]) {
                        this.data.splice(i, 1);
                        break;
                    }
                }

                if (this.options.columnSortable) {
                    for (let i = 0; i < this.sortData.length; i++) {
                        if (_id == this.sortData[i]._id) {
                            this.sortData.splice(i, 1);
                            break;
                        }
                    }
                }

                // 修正this.data的序号
                if (this.options.showRowNumber) {
                    for (let i in this.sortData) {
                        for (let j in this.data) {
                            if (this.data[j]._id == this.sortData[i]._id) {
                                this.data.splice(j, 1, {...this.sortData[i], _position: i});
                                break;
                            }
                        }
                    }
                }
            },
            handleEdit(row, name, i) {
                console.log(`edit`, `${name}-${i}`);
                for (let column of this.options.columns) {
                    if (column.id == name) {
                        if (column.editable) {
                            if (column.editable.formatter) {
                                this.inputValue = column.editable.formatter(row);
                            } else {
                                this.inputValue = row[name];
                            }
                            break;
                        }
                    }
                }
                
                // this.inputValue = row[name];
                this.inputVisible[`${name}-${i}`] = true;
                this.inputVisible = {...this.inputVisible};
            },
            handleEditSubmit(row, name, i, callback) {
                this.inputVisible[`${name}-${i}`] = false;
                this.inputVisible = {...this.inputVisible};
                callback(row, this.inputValue);
            },
        }
    }
</script>