<template>
    <div>
        <span v-if="decimal" class="decimal hidden">.{{decimal}}</span>
        <span>{{integer}}</span>
        <span v-if="decimal" class="decimal">.{{decimal}}</span>
    </div>
</template>

<script>
import '../style/calc-number.less'
export default {
    name: 'RecordCalcNumber',
    props: {
        value: {
            type: Number,
            default: 0
        },
        minSeed: {
            type: Number,
            default: 1
        },
        fixed: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            animatedNumber: 0
        }
    },
    computed: {
        integer () {
            return this.animatedNumber.toString().split('.')[0]
        },
        decimal () {
            return this.animatedNumber.toString().split('.')[1] || Array.from(Array(this.fixed)).map(item => 0).join('')
        }
    },
    watch: {
        value: {
            handler (newValue, oldValue) {
                this.animated(newValue, oldValue || 0)
            },
            immediate: true
        }
    },
    methods: {
        animated (newValue, oldValue) {
            const fixed = this.fixed
            const seed = Math.max(this.minSeed, Number(Number(Math.abs(newValue - oldValue) / 20).toFixed(fixed)))
            const isAdd = newValue > oldValue
            const animate = () => {
                const value = this.animatedNumber
                if (newValue !== oldValue) {
                    if (isAdd) {
                        const calcValue = this.add(value, seed)
                        if (calcValue < newValue) {
                            this.animatedNumber = calcValue
                            this.requestAnimationFrame(animate)
                        } else {
                            this.animatedNumber = newValue
                        }
                    } else {
                        const calcValue = this.subtract(value, seed)
                        if (calcValue > newValue) {
                            this.animatedNumber = calcValue
                            this.requestAnimationFrame(animate)
                        } else {
                            this.animatedNumber = newValue
                        }
                    }
                }
            }
            animate()
        },
        fixFloat (value1, value2) {
            value1 = value1.toString()
            value2 = value2.toString()
            const value1DecimalLength = value1.replace(/\d+.?(\d+)?/, '$1').length
            const value2DecimalLength = value2.replace(/\d+.?(\d+)?/, '$1').length
            const maxDecimalLength = Math.max(value1DecimalLength, value2DecimalLength)
            value1 += Math.pow(10, maxDecimalLength - value1DecimalLength).toString().substr(1)
            value2 += Math.pow(10, maxDecimalLength - value2DecimalLength).toString().substr(1)
            value1 = Number(value1.replace('.', ''))
            value2 = Number(value2.replace('.', ''))
            return [value1, value2, maxDecimalLength]
        },
        add (value1, value2) {
            const [_value1, _value2, maxDecimalLength] = this.fixFloat(value1, value2)
            return Number(((_value1 + _value2) / Math.pow(10, maxDecimalLength)).toFixed(maxDecimalLength))
        },
        subtract (value1, value2) {
            const [_value1, _value2, maxDecimalLength] = this.fixFloat(value1, value2)
            return Number(((_value1 - _value2) / Math.pow(10, maxDecimalLength)).toFixed(maxDecimalLength))
        },
        requestAnimationFrame (func) {
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(func)
            } else {
                setTimeout(func, 1000 / 60)
            }
        }
    }
}
</script>
