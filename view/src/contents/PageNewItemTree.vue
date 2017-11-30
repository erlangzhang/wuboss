<template>
	<div class='layout-container'>
		<div class='breadcrumb'>
			<el-breadcrumb separator=">">
				<el-breadcrumb-item >
				<span @click='focusIndex()'>
					<VIcon class='breadcrumb-icon' type='home' />首页</span></el-breadcrumb-item>
				<el-breadcrumb-item>素材管理</el-breadcrumb-item>
				<el-breadcrumb-item>{{`${this.id ? '编辑' : '新建'}`}}栏目树</el-breadcrumb-item>
			</el-breadcrumb>
			<div class='breadcrumb-header'></div>
		</div>
		<div class='content-header'>
			<VIcon type='edit' /> {{`栏目树-${this.id ? '编辑' : '新建'}`}}
			<div class='breadcrumb-header'></div>
		</div>
		<div class="create-item-tree-container">
			<el-form :model="itemTreeInfo" :rules="rules" ref="itemTreeInfo" label-width="100px" class="demo-ruleForm">
				<el-form-item label="所属EPG:"  prop="epgChecked">
					<el-radio-group v-model="itemTreeInfo.epgChecked" @change="getCheckedEPG">
						<el-radio v-for="(item, index) of epgs"
							:label="item">
						</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="项目名称:" prop="name">
					<el-input v-model="itemTreeInfo.name" ></el-input>
				</el-form-item>
				<el-form-item label="项目描述:">
					<el-input type="textarea" :rows="3" v-model="itemTreeInfo.description" ></el-input>
				</el-form-item>
				<el-form-item label="栏目树配置:" required>
					<el-button type="info" icon="edit" size="small" @click="treeEdit">编辑</el-button>
					<el-tree v-if="treeData.length !== 0" :data="treeData" :props="defaultProps" style="width: 500px;" node-key="index" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
					</el-tree>
				</el-form-item>
				<el-form-item style="text-align: center;">
					<!--
						<el-button style="width: 100px;text-align: center;">重置</el-button>
					-->
					<el-button type="primary" style="width:100px;text-align: center;" @click="handleSaveBtn">保存</el-button>
				</el-form-item>
			</el-form>

			<el-dialog v-model="editDialogVisible" title="编辑栏目树" size="large" :modal="false">
				<el-tabs type="border-card" v-model="editableTabsValue">
					<el-tab-pane name="select">
						<span slot="label"><i class="el-icon-date"></i> 栏目选择</span>
						<ListColumnItem :selectColumnId="selectData.columnId" :epgChoosedList="epgChoosedList" :onSelect="onSelect"/>
					</el-tab-pane>
					<el-tab-pane name="edit">
					<!-- 	<span slot="label"><i class="el-icon-edit"></i> 栏目新建/编辑</span>
						<EditColumnItem :columnId="selectData.columnId" :onSave="onSave"/>  zz-->
								<span slot="label"><i class="el-icon-edit"></i> 栏目新建</span>
						<EditColumnItem :onSave="onSave"/>
					</el-tab-pane>
				</el-tabs>
				<span v-if="editableTabsValue==='select'" slot="footer" class="dialog-footer">
					<el-button @click="handleCancelOk">取 消</el-button>
					<el-button type="primary" @click="handleEditOk">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import {
    VIcon,
    Btn,
} from '../components';
import PageNewItem from './PageNewItem';
import EditColumnItem from './EditColumnItem';
import ListColumnItem from './ListColumnItem';
import { contentStore } from '../stores';
import {
    mapActions
} from 'vuex';
export default {
	data() {
		return {
			editDialogVisible: false,
			editableTabsValue: 'select',
			epgChecked: '',
			epgs: [],
			epgChoosedList:[],
			itemTreeInfo:{
				epgChecked:'',
				name:'',
				description:'',
				treeConfig: '',
			},
			rules:{
				name: [
					{ required: true, message: '请输入项目名称', trigger: 'blur' },
					{ min: 2, message: '长度在大于两个字符', trigger: 'blur' }
				],
				epgChecked:[
					{ required: true, message: '请选择epg', trigger: 'change' }
				],
				treeConfig: [
					{ required: true, message: '请配置栏目树', trigger: 'blur' }
				],
			},
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			idIndex: 1,
			treeData: [],
			type: 'default',
			currentData: {},
			selectData: {},
		};
	},
	components: {
		VIcon,
		Btn,
		PageNewItem,
		EditColumnItem,
		ListColumnItem,
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
	
	created() {
		contentStore.listEpgs().then(ret => {
			this.epgs = ret.data.epgs;
		}).catch(err => {
			this.$message.error(`获取epg数据失败！${err}`);
		});
		if (this.id) {
			contentStore.retrieveColumnTree(this.id).then(ret => {
				const data = ret.data;
				this.itemTreeInfo.name = data.name;
				this.itemTreeInfo.description = data.description;
				this.itemTreeInfo.epgChecked = data.style;
				this.treeData = this.dbTree2page(data.child);
			}).catch(err => {
				this.$message.error(`获取栏目树数据失败!${err}`);
			});
		}
	},
	methods: {
    ...mapActions({
          setMenuIndex: 'hotel/SET_CUR_EDIT_ID',
      }),
    focusIndex() {
          this.$router.push('/');
          this.setMenuIndex({
              curEditId: '1'
          });
    },
		onSelect(row) {
			this.currentData = row;
		},
		onSave(row) {
			this.currentData = row;
			console.log("保存的数据：",this.currentData);
			this.handleEditOk();
		},
		getCheckedEPG(value){
			this.epgChoosedList=[value];
			console.log("所选的EPG版本：：",this.epgChoosedList);
		},
		handleCancelOk() {
			this.editDialogVisible = false;
		},
		handleEditOk() {
			if (!this.currentData.language) {
				this.$message.error('请先点击选中栏目');
				return;
			}
			this.editDialogVisible = false;
			switch(this.type) {
				case 'delete': {
					this.remove(this.selectData);
					break;
				}
				case 'append': {
					const bo = this.isExist(this.treeData);
					if (bo) {
						this.$message.error('同级目录已经存在该栏目！');
						return;
					}
					this.append(this.selectData);
					break;
				}
				case 'children': {
					const bo = this.isExistChildren(this.selectData.children);
					if (bo) {
						this.$message.error('同级目录已经存在该栏目！');
						return;
					}
					this.children(this.selectData);
					break;
				}
				default: {
					const index = ++this.idIndex;
					const tmp = {
						index,
						columnId: this.currentData.columnId,
						label: this.currentData.language[0].name,
						children: [],
					};
					this.treeData.push(tmp);
				}
			}
			this.type = 'default';
		},
		treeEdit() {
			this.itemTreeInfo.treeEdit = 'edit';
			this.editDialogVisible = true;
		},
		appendImp(parent, node, sourceData, data) {
			if (node.index === sourceData.index) {
				parent.push(data);
				return true;
			}
			for (const item of node.children) {
				const bo = this.appendImp(node.children, item, sourceData, data);
				if (bo) {
					return true;
				}
			}
			return false;
		},
		editImp(node, sourceData) {
			if (node.index === sourceData.index) {
				node.label = this.currentData.language[0].name;
				return true;
			}
			for (const item of node.children) {
				const bo = this.editImp(item, sourceData);
				if (bo) {
					return true;
				}
			}
			return false;
		},
		append(data) {
			if (data.columnId === this.currentData.columnId) {
				// 编辑
				for (const item of this.treeData) {
					if (item.index !== data.index) {
						const bo = this.editImp(item, data);
						if (bo) {
							return;
						}
						continue;
					}
					item.label = this.currentData.language[0].name;
					break;
				}
				return;
			}
			const index = ++this.idIndex;
			const tmp = {
				index,
				columnId: this.currentData.columnId,
				label: this.currentData.language[0].name,
				children: []
			};
			for (const item of this.treeData) {
				if (item.index !== data.index) {
					const bo = this.appendImp(this.treeData, item, data, tmp);
					if (bo) {
						return;
					}
					continue;
				}

				console.log("要添加到树里面的数据",tmp);
				this.treeData.push(tmp);
				break;
			}
		},

		childrenImp(node, sourceData, data) {
			if (!node.children) {
				node.children = [];
			}
			if (node.index === sourceData.index) {
				node.children.push(data);
				return true;
			}
			for (const item of node.children) {
				const bo = this.childrenImp(item, sourceData, data);
				if (bo) {
					return true;
				}
			}
			return false;
		},

		children(data) {
			const index = ++this.idIndex;
			const tmp = {
				index,
				columnId: this.currentData.columnId,
				label: this.currentData.language[0].name,
				children: []
			};
			for (const item of this.treeData) {
				if (item.index !== data.index) {
					const bo = this.childrenImp(item, data, tmp);
					if (bo) {
						return;
					}
					continue;
				}
				if (!item.children) {
					item.children = [];
				}
				item.children.push(tmp);
				break;
			}
		},

		removeImp(node, data) {
			if (!node.children) {
				return false;
			}
			for (let i = 0; i < node.children.length; ++i) {
				const item = node.children[i];
				if (item.index !== data.index) {
					const bo = this.removeImp(item, data);
					if (bo) {
						return true;
					}
					continue;
				}
				node.children.splice(i, 1);
				return true;
			}
			return false;
		},
		remove(data) {
			for (let i = 0; i < this.treeData.length; ++i) {
				const item = this.treeData[i];
				if (item.index !== data.index) {
					const bo = this.removeImp(item, data);
					if (bo) {
						break;
					}
					continue;
				}
				this.treeData.splice(i, 1);
				break;
			}
		},
		isExistChildren(children) {
			for (const it of children) {
				if (it.columnId === this.currentData.columnId) {
					return true;
				}
				if (it.children) {
					let bo = this.isExist(it.children);
					if (bo) {
						return true;
					}
				}
			}
			return false;
		},

		isExist(tree) {
			let existed = false;
			let isBrother = false;
			for (const it of tree) {
				if (it.columnId === this.currentData.columnId) {
					existed = true;
				}
				if (it.columnId === this.selectData.columnId) {
					isBrother = true;
				}
				if (it.children) {
					let bo = this.isExist(it.children);
					if (bo) {
						return true;
					}
				}
				if (existed && isBrother) {
					return true;
				}
			}
			return false;
		},

		click(type, data) {
			this.type = type;
			this.selectData = data;
			if (type !== 'delete') {
				this.editDialogVisible = true;
			} else {
				this.remove(data);
			}
		},
		plus(store, data) {
			this.click('append', data);
		},
		plusChildren(store, data) {
			this.click('children', data);
		},
		delete(store, data) {
			this.click('delete', data);
		},
		renderContent(h, {
			node,
			data,
			store
		}) {
			return ( 
				<span>
					<span>
						<span>{node.label}</span>
					</span>
					<span style="float: right; margin-right: 20px">
						<el-button type="success" size="mini" icon="plus" on-click={ () => this.plus(store, data) }></el-button>
						<el-button type="info" size="mini" icon="share" on-click={ () => this.plusChildren(store, data) }></el-button>
						<el-button type="danger" size="mini" icon="delete" on-click={ () => this.delete(store, data) }></el-button>
					</span>
				</span>
			)
		},

		dbTree2page(tree) {
			const tmp = [];
			if (!tree || tree.length === 0) {
				return tmp;
			}
			for (const item of tree) {
				tmp.push({
						columnId: item.columnId,
						index: item.index,
						label: item.language[0].name, // item.name,
						children: this.dbTree2page(item.child)
					});
			}
			return tmp;
		},
		pageTree2DB(tree) {
			const tmp = [];
			if (!tree || tree.length === 0) {
				return tmp;
			}
			for (const item of tree) {
				tmp.push({
						columnId: item.columnId,
						// index: item.index,
						child: this.pageTree2DB(item.children)
					});
			}
			return tmp;
		},
		handleSaveBtn() {
			this.$refs['itemTreeInfo'].validate((valid) => {
				if (valid) {
					console.log(this.treeData,"樹");
					if (this.treeData.length === 0) {
						this.$message.error( '请编辑栏目树' );
						return;
					}
					const tmp = {
						name: this.itemTreeInfo.name.trim(),
						description: this.itemTreeInfo.description,
						style: this.itemTreeInfo.epgChecked,
						child: this.pageTree2DB(this.treeData),
					};
					if(tmp.name.trim() == ''){
						this.$message.error("项目名称不能为空字符！");
						return;
					}
					if (this.id) {
						contentStore.updateColumnTree(this.id, tmp).then(ret => {
							this.$message({
								message: '更新栏目树成功!',
								type: 'success'
							});
							this.$router.replace('/content/items-tree-store');	
						}).catch(err => {
							this.$message.error(`更新失败!${err}`);
						});
						return;
					}
					contentStore.createColumnTree(tmp).then(ret => {
						this.$message({
              message: '创建栏目树成功!',
              type: 'success'
            });
						this.$router.replace('/content/items-tree-store');
					}).catch(err => {
						this.$message.error(`创建失败!${err}`);
					});
				} else {
					return false;
				}
			});
		},
	}
}
</script>
