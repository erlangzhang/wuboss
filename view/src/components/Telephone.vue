<style>
</style>
<template>
    <div>
        <el-input v-model="telephoneObj.code" style="width: 80px;" type="number"></el-input>
        <el-input v-model="telephoneObj.teleNumber" style="width: 150px;" type="number"></el-input>
    </div>
</template>
<script>
export default {
    props: {
        telephoneObj: {
            type: Object,
            default: function() {
                return {
                    code: '',
                    teleNumber: ''
                }
            }

        }
    },
    data() {
        return {
            tempCode: '',
            tempTeleNumber: '',
        };
    },
    methods: {},

    created() {},
}
</script>
