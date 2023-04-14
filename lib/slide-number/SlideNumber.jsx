import { defineComponent } from 'vue'
import './style.less'

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
    },
    render () {
        return (<div className="slide-number">
                    {
                        this.isNumber ? <>
                            <span className="slide-width">9</span>
                            <span className="slide-height">9</span>
                            <span className={['slide-text', this.stroke ? 'slide-stroke' : ''].join(' ')}
                                style={{
                                    transform: `translate3d(-50%, ${this.translateY}, 0)`,
                                    transition: this.slide ? 'transform 0.8s ease-in-out' : ''
                                }}
                                value="0123456789">0123456789
                            </span>
                        </> : <span className={['slide-char', this.stroke ? 'slide-stroke' : ''].join(' ')} value={this.value}>{this.value}</span>
                    }
                </div>)
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