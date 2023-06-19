<template>
    <div class="scroll-table">
        <ul class="table-head">
            <li v-for="column in columns" :key="column.key">
                {{column.title}}
            </li>
        </ul>
        <div v-if="list.length" ref="tableBody" class="table-body">
            <div :class="[onePage && 'one-page']">
                <div v-for="(column, indexs) in columns" :key="column.key">
                    <ul>
                        <li :ref="!indexs ? 'tableItem' : null" v-for="(item, index) in list" :key="`${column.key}item${index}`">
                            <p>{{transData(column, item)}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="extra.list.length">
                <div v-for="column in columns" :key="column.key">
                    <ul>
                        <li v-for="(item, index) in extra.list" :key="`_item${index}`">
                            <p>{{transData(column, item)}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="!list.length" class="none">暂无数据</div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import '../style/scroll-table.less'
export default defineComponent({
    name: 'RecordScrollTable',
    props: {
        list: {
            type: Array,
            default () {
                return []
            }
        },
        columns: {
            type: Array,
            default () {
                return []
            }
        },
        maxlengthKey: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            extra: {
                list: []
            },
            onePage: false
        }
    },
    watch: {
        list () {
            this.setTableScroll()
        }
    },
    created () {
        this.time = 2000
        window.addEventListener('resize', this.setTableScroll, false)
    },
    mounted () {
        this.setTableScroll()
    },
    unmounted () {
        window.removeEventListener('resize', this.setTableScroll, false)
        clearTimeout(this.tableTimeout)
    },
    methods: {
        transData (column, item) {
            return item[column.key]
        },
        setTableScroll () {
            clearTimeout(this.tableTimeout)
            this.extra.list = []
            if (!this.list.length) return
            this.$nextTick(() => {
                let start = 1
                const scrollTops = [0]
                const body = this.$refs.tableBody
                const item = this.$refs.tableItem
                const bodyHeight = body.offsetHeight
                const itemHeight = item.map(item => item.offsetHeight)
                const itemMaxHeight = itemHeight.reduce((total, num) => total + num, 0)
                const itemScrollHeight = itemMaxHeight - bodyHeight
                body.scrollTop = 0
                if (itemMaxHeight > bodyHeight) {
                    const heightReduces = [0]
                    itemHeight.forEach(item => {
                        heightReduces.push(heightReduces[heightReduces.length - 1] + item)
                    })
                    heightReduces.forEach((item, index) => {
                        const scrollTop = scrollTops[scrollTops.length - 1]
                        if (item - scrollTop - bodyHeight > 0) {
                            // 记录第一页显示的个数
                            if (scrollTops.length === 1) {
                                const maxTextLengthItem = this.getMaxLengthItem()
                                this.extra.list = [...this.list.slice(0, index), maxTextLengthItem]
                            }
                            const newScrollTop = Math.min(itemScrollHeight, heightReduces[index - 1])
                            if (newScrollTop > scrollTop) {
                                scrollTops.push(newScrollTop)
                            }
                        }
                    })
                    const setAnimate = () => {
                        let oldTop = scrollTops[start - 1]
                        let newTop = scrollTops[start]
                        // let seed = Math.max(1, Math.abs(newTop - oldTop) / 100) // 增加的滚动高度小于1不会滚动
                        const seed = 1 // 增加的滚动高度小于1不会滚动
                        const animate = () => {
                            oldTop += seed
                            if (oldTop < newTop) {
                                body.scrollTop = oldTop
                                requestAnimationFrame(animate)
                            } else {
                                body.scrollTop = start === 0 ? 0 : newTop
                                this.tableTimeout = setTimeout(setAnimate, this.time)
                            }
                        }
                        if (start > (scrollTops.length - 1)) {
                            start = 0
                            newTop = itemMaxHeight
                            // seed = Math.max(1, Math.abs(itemMaxHeight - oldTop) / 100)
                        }
                        animate()
                        start += 1
                    }
                    this.tableTimeout = setTimeout(setAnimate, this.time)
                } else {
                    this.onePage = true
                }
            })
        },
        getMaxLengthItem () {
            let maxLength = 0
            let maxIndex = 0
            this.list.forEach((item, index) => {
                const string = item[this.maxlengthKey]
                const stringLength = string.length + string.replace(/[^\u4e00-\u9fa5]/g, '').length
                if (stringLength > maxLength) {
                    maxLength = stringLength
                    maxIndex = index
                }
            })
            return this.list[maxIndex]
        }
    }
})
</script>
