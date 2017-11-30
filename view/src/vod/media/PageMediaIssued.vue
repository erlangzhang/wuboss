<style>
    .content-title {
        margin-top: 20px;
        font-size: 16px;
        margin-bottom: 20px;
    }
    .issuedForm {
        background-color: #e4e8f1;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 10px;
        margin: 10px;
    }
    .btn-add-issued {
        margin-left: 20px;
    }
    .btn-choose-hotel{
        margin-left: 10px;
        margin-top: 5px;
    }
    .tag-hotel {
        background-color: #FFF;
        border: 1px solid #dddee1;
        width: 700px;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    .tag-cell {
        margin-left: 5px;
    }
</style>

<template>
    <div class='layout-container' style="margin-bottom: 500px">
        <PublicHeader :title="init.title" :breadcrumbs="init.breadcrumbs"></PublicHeader>
        <div class="table-container">
            <span>已选择：{{ films.map(item=>(`《${item.name}》`)).join(' 、 ') }}，共 {{ films.length }} 部影片。</span>
            <div class='content-title'>
                <span>下发策略</span>
                <!--<el-button type="primary" size="mini" class="btn-add-issued" @click="addIssued">添加策略</el-button>-->
            </div>

            <el-form :model="issuedObj" ref="issuedObj" :rules='rules'>
                <el-form class="issuedForm" label-width="120px" v-for="item in issuedItems">

                    <el-form-item label="下发酒店:" class="btn-choose-hotel">
                        <el-button type="primary" size="mini" @click="chooseHotel">选择酒店</el-button>
                    </el-form-item>

                    <el-form-item>
                        <div class="tag-hotel">
                            <el-tag class="tag-cell" v-for="tag in tags" :key="tag.name"
                                    :closable="true" :type="tag.type"  @close="handleClose(tag)">
                                {{tag.name}}
                            </el-tag>
                        </div>
                    </el-form-item>

                    <el-row type="flex">
                        <el-form-item label="下发时间:">
                            <el-date-picker
                                v-model="dateRange"
                                type="datetimerange"
                                placeholder="选择时间范围">
                            </el-date-picker>
                        </el-form-item>
                        <!--<el-form-item label-width="20px">
                            <el-select v-model="issuedObj.timeItem" placeholder="请选择">
                                <el-option v-for="item in timeItems" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>-->
                    </el-row>

                </el-form>

                <HotelDialog ref="hotelDialog" v-on:hotelDialogCb="listenToDialog"></HotelDialog>

                <el-form-item>
                    <el-button type="primary" @click="handleSubmit('issuedObj')">保存</el-button>
                    <el-button @click="handleCancel('issuedObj')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import PublicHeader from '../../components/PublicHeader.vue';
import HotelDialog from '../../components/HotelDialog.vue';
import {
    mediaStore
} from "../../stores";
import moment from 'moment';
export default {
    data() {
            return {
                init: {
                    breadcrumbs: ['媒资管理', '影片库', '影片下发'],
                    title: '影片下发',

                },
                issuedObj: {
                    issuedTime:'',
                    timeItems:'',
                    introduction:'',
                    tags:''
                },
                timeItems: [
                    {value:1, label:'1:00-2:00'},
                    {value:2, label:'2:00-3:00'},
                    {value:3, label:'3:00-4:00'},
                ],
                hotelData: [],
                issuedItems: [1],
                hDialogVisible: false,
                tags: [
                    // { name: '阳光酒店', type: 'gray' },
                ],
                rules: {
                },
                films: [],
                dateRange: [],
            };
        },
        methods: {
            // 添加策略
            addIssued() {
                this.issuedItems.push(1);
            },
            // 选择酒店
            chooseHotel() {
                this.$refs.hotelDialog.showDialog();
            },
            listenToDialog(data) {
                console.log(`listenToDialog data`, data);
                let newData = [];
                for (let item of data) {
                    let found = false;
                    for (let tag of this.tags) {
                        if (item.id == tag.id) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        newData.push({...item, type: 'gray'});
                    }
                }
                this.tags = this.tags.concat(newData);
            },
            // 移除酒店
            handleClose(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1)
            },
            // 保存
            handleSubmit(formName) {
                if (this.tags.length == 0) {
                    this.$alert(`请选择酒店`, '提示', {confirmButtonText: '确定'});
                    return;
                }
                if (this.dateRange.length < 2) {
                    this.$alert(`请选择时间范围`, '提示', {confirmButtonText: '确定'});
                    return;
                }

                mediaStore.releaseFilms({
                    films: this.films.map(item => (item.id)),
                    hotels: this.tags.map(item => ({
                        hostId: item.hostId,
                        name: item.name,
                        city: item.city,
                    })),
                    onlineTime: [
                        parseInt(this.dateRange[0].getTime() / 1000),
                        parseInt(this.dateRange[1].getTime() / 1000)
                    ]
                }).then(res => {
                    this.$router.go(-1);
                }).catch(err => {
                    this.$alert(`下发失败：${err.message}`, '错误', {confirmButtonText: '确定'});
                });
            },
            // 取消
            handleCancel(formName) {
                this.$router.go(-1);
            }
        },
        components: {
            HotelDialog,
            PublicHeader
        },
        created() {
            this.films = JSON.parse(this.$route.query.data);
        },
        
}
</script>
