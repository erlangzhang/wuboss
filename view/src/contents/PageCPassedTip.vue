<style>
</style>
<template>
   <div class='layout-container'>
        <div class='breadcrumb'>
            <NavBar :titleList="titleList"></NavBar>
        </div>
        <p style="font-size:36px; margin-top: 80px; text-align: center;">商户资料已提交审核</p>
        <p style="font-size:16px; margin-top: 10px; text-align: center;">请耐心等待1-3个工作内，在此期间不会影响策略的编辑。</p>
        <p style="font-size:16px; margin-top: 30px; text-align: center;">3 秒后跳转回列表</p>
   </div>
</template>
<script>
import {
    VIcon,
    Btn,
    NavBar,
} from '../components';
export default{
	data(){
		return{
			titleList: ["内容管理", "本地生活圈", "商户审核", "已通过提示"],
		}

	},
	components: {
        VIcon,
        Btn,
        NavBar
    },
}
</script>