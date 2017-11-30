<style>
.create-btn {
    background: #841996;
    color: #fff;
    border-color: #841996;
    padding: 6px 13px 6px 6px;
    font-size: 14px;
    text-decoration:none;
  } 

.refresh-btn {
    background: #337ab7;
    color: #fff;
    border-color: #337ab7;
    padding: 6px 13px 6px 6px;
    font-size: 14px;
    text-decoration:none;
  }

  .edit-btn {
    background: #fd9927;
    color: #fff;
    border-color: #fd9927;
    padding: 6px 13px 6px 6px;
    font-size: 14px;
    text-decoration:none;
  }
</style>

<template>
    <router-link :class="btn.classes" to='/'><VIcon :type="btn.icon" class='iconfont-button'/>{{this.text}}</router-link>
</template>

<script>
  import { VIcon } from '../components';

  export default {
    props:{
      type: {
        type: String,
      },
      text: {
        type: String,
      },
      to: {
        type: String,
      }
    },
    computed: {
      btn: {
        get: function() {
          switch(this.type) {
            case 'create':
              return {
                icon: 'plus',
                classes: 'create-btn',
              }
              break;
            case 'refresh':
              return {
                icon: 'reload',
                classes: 'refresh-btn',
              }
              break;
            case 'edit':
              return {
                icon: 'edit',
                classes: 'edit-btn',
              }
            default:
              return {
                icon: 'info',
                classes: 'edit-btn',
              }
          }
        }
      }
    },
    components: {
       VIcon,
    },
  }

</script>