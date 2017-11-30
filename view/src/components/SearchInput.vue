<style scoped>
.search-input {
    height: 30px;
    width: 180px;
    position: relative;
}

.input-text {
    position: absolute;
    height: 30px;
    width: 180px;
    padding-left: 10px;
    border: 1px solid #C4C4C4;
    border-radius: 3px;
    padding-right: 30px;
}

.el-icon-search {
    position: absolute;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    margin-left: 145px;
}

input:focus {
    border: 1px solid #20a0ff;
    border-radius: 3px;
}
</style>
<template>
    <div class='search-input'>
        <input class="input-text" v-model="searchContent" :placeholder="defaultSearch" v-on:keyup.enter="enterToSearch()"> <i class="el-icon-search" @click="enterToSearch()"></i></input>
    </div>
</template>
<script>
export default {
    props: {
        handleSearch: Function,
        defaultSearch: {
            type: String,
            default: function() {
                return '';
            }
        }
    },
    data() {
        return {
            searchContent: '',
        };
    },
    methods: {
        enterToSearch() {
            this.handleSearch(this.searchContent.trim());
        }
    }
}
</script>
