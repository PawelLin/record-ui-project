<script>
export default {
    name: 'RecordInput'
}
</script>
<script setup>
import { computed } from 'vue'
import { useNumber, useFormat, useText } from './hooks'
const props = defineProps({
    modelValue: {
        type: [String, Number],
        required: true
    },
    type: {
        type: String,
        default: 'text',
        validator (value) {
            return ['text', 'number'].includes(value)
        }
    },
    maxlength: Number,
    integer: Number,
    decimal: Number,
    max: Number,
    min: Number,
    format: {
        type: String,
        validator (value) {
            return ['phone', 'bankCard', 'idCard'].includes(value)
        }
    },
    regExp: RegExp,
    placeholder: String,
    number: Boolean
})
const emit = defineEmits(['update:modelValue', 'onInput', 'onBlur'])
const inputmode = computed(() => (props.type === 'number' || props.format ? 'numeric' : 'text'))
const useEvent = () => {
    let result
    if (props.format) {
        result = useFormat(props, emit)
    } else if (props.type === 'number') {
        result = useNumber(props, emit)
    } else {
        result = useText(props, emit)
    }
    return result
}
const { onInput, onBlur, onKeyup, onKeydown, value, maxlength } = useEvent()
</script>

<template>
    <input
        :value="value"
        @input="onInput"
        @blur="onBlur"
        @keyup="onKeyup"
        @keydown="onKeydown"
        :inputmode="inputmode"
        :maxlength="maxlength"
        :placeholder="placeholder"
        type="text"
        class="record-input"
    />
</template>

<style lang="less" scoped>
.record-input {
    padding: 4px 7px;
    height: 34px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    &:hover, &:focus {
        border-color: #42b883;
    }
    &:focus {
        outline: 0;
        box-shadow: 0 0 0 2px rgba(45, 240, 204, 0.2);
    }
}
</style>
