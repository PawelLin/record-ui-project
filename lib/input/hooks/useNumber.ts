import { ref, computed } from 'vue'
import { isMobile, isTruthy } from './utils'

export function useNumber(props, emit) {
    const targetValue = ref('')
    const value = computed(() => targetValue.value || (isTruthy(props.modelValue) ? `${props.modelValue}` : ''))
    const INTEGER = 8
    const DECIMAL = 2
    const maxNumberAbs = computed(() => {
        const { integer = INTEGER, decimal = DECIMAL } = props
        return Array(integer + decimal).fill(9).join('').replace(new RegExp(`(.{${integer}})`), `$1${decimal ? '.' : ''}`)
    })
    const maxValidate = value => {
        if (value === '-') return true
        const maxValue = Number(isTruthy(props.max) ? props.max : maxNumberAbs.value)
        return Number(value) <= maxValue
    }
    const minValidate = value => {
        if (value === '-') return true
        const minValue = Number(isTruthy(props.min) ? props.min : `-${maxNumberAbs.value}`)
        return Number(value) >= minValue
    }
    const withNumber = value => props.number && value ? Number(value) : value
    const regExp = computed(() => {
        const { integer = INTEGER, decimal = DECIMAL, min = 0, max = 0 } = props
        const intMaxLength = `${Math.abs(max)}`.split('.')[0].length
        const intMinLength = `${Math.abs(min)}`.split('.')[0].length
        const intLength = Math.max(intMaxLength, intMinLength, integer)
        const negative = isTruthy(min) && min >= 0 ? '' : '-?'
        const string = decimal
            ? `^${negative}(\\d{0,${intLength}})?(\\.\\d{0,${decimal}})?$`
            : `^${negative}(\\d{0,${intLength}})?$`
        return new RegExp(string)
    })
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
        if (value && !(regExp.value.test(value) && maxValidate(value) && minValidate(value))) {
            target.value = targetValue.value || (isTruthy(modelValue) ? `${modelValue}` : '')
        } else {
            targetSelection = selectionEnd || 0
        }
        !mobile && setSelection(e)
        const resultValue = targetValue.value = target.value
        emit('update:modelValue', withNumber(resultValue))
        emit('onInput', resultValue)
    }
    const onBlur = e => {
        const value = e.target.value
        if (value) {
            const value2number = Number(value)
            emit('update:modelValue', withNumber(targetValue.value = isTruthy(value2number) ? `${value2number}` : ''))
        }
        emit('onBlur', targetValue.value)
    }
    return { onInput, onBlur, onKeyup, onKeydown, value }
}
