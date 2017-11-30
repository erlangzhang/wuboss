<template>
    <i :class="classes" @click="handleClick" :style="styles"></i>
</template>
<script>
    import "./style/iconfont.css";
    
    export default {
        props: {
            type: String,
            size: [Number, String],
            color: String,
            click: Function,
        },
        computed: {
            classes () {
                return `icon-${this.type}`;
            },
            styles () {
                let style = {};

                if (this.size) {
                    style['font-size'] = `${this.size}px`;
                }

                if (this.color) {
                    style.color = this.color;
                }

                return style;
            }
        },
        methods: {
            handleClick(e) {
                if (this.click) {
                    this.click(e);
                }
            }
        }
    };
</script>
