<template>
    <div class="slide-number">
        <template v-if="isNumber">
            <span class="slide-width">9</span>
            <span class="slide-height">9</span>
            <span class="slide-text" :class="{ 'slide-stroke': stroke }"
                :style="{
                    transform: `translate3d(-50%, ${translateY}, 0)`,
                    transition: slide ? 'transform 0.8s ease-in-out' : ''
                }"
                value="0123456789">0123456789</span>
        </template>
        <span v-else class="slide-char" :class="{ 'slide-stroke': stroke }" :value="value">{{value}}</span>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'RecordSlideNumber',
    props: {
        value: {
            type: [String, Number],
            default: 0,
        },
        slide: {
            type: Boolean,
            default: true
        },
        stroke: {
            type: Boolean,
            default: true
        },
        strokeColor: {
            type: String,
            default: '#ffffff'
        }
    },
    computed: {
        isNumber () {
            if (this.value) {
                return this.value.toString().match(/\d/)
            }
            return this.value === 0
        },
        translateY () {
            return this.isNumber ? `-${this.value * 10}%` : 0
        }
    }
})
</script>

<style lang="less" scoped>
@stroke-base-size: 2px;
@stroke-size: @stroke-base-size + 1px;
@stroke-size-half: (@stroke-size / 2);
@stroke-margin: -(@stroke-base-size / 2);
.slide-number {
    position: relative;
    display: inline-flex;
    overflow: hidden;
    user-select: none;
    vertical-align: middle;
    margin: 0 @stroke-margin;
    padding: 0 @stroke-size-half;
}
.slide-stroke {
    position: relative;
    &::before {
        content: attr(value);
        position: absolute;
        -webkit-text-stroke: @stroke-size v-bind(strokeColor);
        z-index: -1;
    }
}
.slide-height {
    width: 0;
    visibility: hidden;
    writing-mode: vertical-lr;
    text-orientation: upright;
}
.slide-width {
    height: 0;
    visibility: hidden;
}
.slide-text {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    writing-mode: vertical-lr;
    text-orientation: upright;
}
.slide-char {
    z-index: 1;
}
</style>
