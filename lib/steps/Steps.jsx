import { defineComponent, h } from 'vue'
import '../style/steps.less'

export default defineComponent({
    name: 'RecordSteps',
    props: {
        data: {
            type: Array,
            default () {
                return []
            }
        }
    },
    render () {
        return (<div className="record-steps">
            {
                this.data.map(item => {
                    const tag = item.active ? 'div' : 'section'
                    return (<tag className={['item', item.active ? 'active' : ''].join(' ').trim()} onClick={() => item.active = !item.active}>
                        <div className="icon"></div>
                        <div className="contain">{item.title}</div>
                    </tag>)
                })
            }
        </div>)
        return h('div', {
            class: 'record-steps'
        }, this.data.map(item => {
            const tag = item.active ? 'div' : 'section'
            return h(tag, {
                class: {
                    item: true,
                    active: item.active
                },
                onClick () {
                    item.active = !item.active
                }
            }, [
                h('div', {
                    class: 'icon'
                }),
                h('div', {
                    class: 'contain'
                }, item.title)
            ])
        }))
    }
})