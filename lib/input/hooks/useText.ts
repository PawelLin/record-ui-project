import { ref, computed } from 'vue'
import { isMobile, isTruthy } from './utils'

export function useText(props, emit) {
    const targetValue = ref('')
    const value = computed(() => targetValue.value || (isTruthy(props.modelValue) ? `${props.modelValue}` : ''))
    const mobile = isMobile()
    let targetSelection = 0
    const setSelection = e => {
        e.target.setSelectionRange(targetSelection, targetSelection)
    }
    const onKeyup = e => {
        mobile && setSelection(e)
    }
    const onKeydown = e => {
        targetSelection = e.target.selectionEnd || 0
    }
    const onInput = e => {
        const target = e.target
        const modelValue = props.modelValue
        const { value, selectionEnd } = target
        if (value && !(!props.regExp || props.regExp.test(value))) {
            target.value = isTruthy(modelValue) ? `${modelValue}` : ''
        } else {
            targetSelection = selectionEnd || 0
        }
        !mobile && setSelection(e)
        emit('update:modelValue', (targetValue.value = target.value))
        emit('onInput', targetValue.value)
    }
    return { onInput, onKeyup, onKeydown, value, maxlength: props.maxlength }
}
