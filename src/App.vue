<script setup>
import { ref } from 'vue'
const circularProgress = ref(0)
const slideNumber = ref(0)
const calcNumber = ref(+(Math.random() * 100).toFixed(2))
setInterval(() => {
    slideNumber.value = Math.floor(Math.random() * 10)
    circularProgress.value = slideNumber.value / 10
    calcNumber.value = +(Math.random() * 100).toFixed(2)
}, 3000)
const treeCascadeData = 
[{
    title: '1',
    leftChildren: [
        { title: '2', children: [
            { title: '3' },
            { title: '3' },
        ] },
        { title: '2', children: [
            { title: '3' },
            { title: '3' },
        ] },
    ],
    rightChildren: [
        { title: '2', children: [
            { title: '3' },
            { title: '3' },
        ] },
        { title: '2', children: [
            { title: '3' },
            { title: '3' },
        ] },
    ]
}]
const inputDefault = ref('')
const inputMin = ref('')
const inputMax = ref('')
const inputMinMax = ref('')
const inputRegex = ref('')
const inputPhone = ref('')
const inputBankCard = ref('')
const inputIdCard = ref('')
const maxNumber = ref(99)
const setMaxNumber = () => maxNumber.value += 1
const minNumber = ref(-99)
const setMinNumber = () => minNumber.value -= 1
const steps = ref([
    { title: '步骤1', active: true },
    { title: '步骤2', active: true },
    { title: '步骤3-点击改变状态', active: true },
    { title: '步骤4', active: true },
    { title: '步骤5', active: false },
    { title: '步骤6', active: false }
])
const scrollTableColumns = [
    { title: '居中', key: 'index' },
    { title: '左对齐&居中', key: 'left' },
    { title: '右对齐&居中', key: 'right' }
]
const scrollTableList = Array.from(Array(15)).map((item, index) => ({ index: ++index, left: `${index}`, right: `${index}` }))
</script>

<template>
    <section class="container">
        <div class="item">
            <p class="title">飞行棋盘</p>
            <record-flight-chess class="content" />
        </div>
        <div class="item">
            <p class="title">级联树</p>
            <div class="content center">
                <record-tree-cascade :data="treeCascadeData" align="center" />
            </div>
        </div>
        <div class="item">
            <p class="title">蒲公英时钟</p>
            <record-dandelion-clock class="content" />
        </div>
        <div class="item">
            <p class="title">环形饼图</p>
            <record-pie-chart class="content" />
        </div>
        <div class="item" style="text-align: center;">
            <p class="title">滑动数字</p>
            <div class="content center">
                <record-slide-number class="slide-number" :value="slideNumber" stroke-color="#a1c4fd" />
            </div>
        </div>
        <div class="item">
            <p class="title">环形进度条</p>
            <record-circular-progress class="content" :percent="circularProgress" />
        </div>
        <div class="item">
            <p class="title">数字输入框</p>
            <div class="content column-between">
                <record-input v-model="inputDefault" type="number" placeholder="默认8位整数2位小数正负区间" number class="record-input" />
                <record-input v-model="inputMin" type="number" :integer="2" :decimal="2" :min="minNumber" :placeholder="`[${minNumber}, 99.99]的2位小数`" class="record-input" />
                <button @click="setMinNumber">- (当前最小值为{{ minNumber }})</button>
                <record-input v-model="inputMax" type="number" :integer="2" :decimal="2" :max="maxNumber" :placeholder="`[-99.99, ${maxNumber}]的2位小数`" class="record-input" />
                <button @click="setMaxNumber">+ (当前最大值为{{ maxNumber }})</button>
                <record-input v-model="inputMinMax" type="number" :integer="3" :decimal="2" :min="0" :max="100" placeholder="[0, 100]的2位小数" class="record-input" />
            </div>
        </div>
        <div class="item">
            <p class="title">正则/格式化输入框</p>
            <div class="content">
                <record-input v-model="inputRegex" :regExp="/^[A-Za-z]{0,12}$/" placeholder="只能输入12位字母" class="record-input" />
                <record-input v-model="inputPhone" format="phone" placeholder="手机号" class="record-input" />
                <record-input v-model="inputBankCard" format="bankCard" placeholder="银行卡号" class="record-input" />
                <record-input v-model="inputIdCard" format="idCard" placeholder="身份证号" class="record-input" />
            </div>
        </div>
        <div class="item">
            <p class="title">步骤条</p>
            <div class="content center">
                <record-steps :data="steps" />
            </div>
        </div>
        <div class="item">
            <p class="title">翻页表格</p>
            <div class="content">
                <record-scroll-table :list="scrollTableList" :columns="scrollTableColumns" maxlength-key="left" />
            </div>
        </div>
        <div class="item">
            <p class="title">计算数字</p>
            <div class="content center">
                <record-calc-number class="calc-number" :value="calcNumber" :fixed="2" :min-seed="0.01" />
            </div>
        </div>
    </section>
</template>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
<style lang="less" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    .item {
        margin: 0 20px;
        width: 200px;
    }
    .title {
        padding: 10px 0;
    }
    .content {
        height: 200px;
        &.center {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &.column-between {
            display: flex;
            flex-direction: column;
            align-items: cen;
        }
    }
    .record-input + .record-input {
        margin-top: 5px;
    }
    .slide-number {
        height: auto;
        color: #c2e9fb;
        font-size: 160px;
    }
    .calc-number {
        color: #c2e9fb;
        font-size: 120px;
        -webkit-text-stroke: 1px #a1c4fd;
    }
}
@media screen and (orientation: portrait) {
    .container {
        padding: 2vw;
        justify-content: space-between;
        background-color: #f5f7f9;
        .item {
            margin: 0 0 2vw;
            width: 47vw;
            background-color: #fff;
            box-shadow: 0 1px 4px rgba(0,21,41,.08);
        }
        .title {
            padding: 2px 0 5px;
        }
        .content {
            width: 47vw;
            height: 47vw;
        }
        .slide-number {
            height: auto;
        }
    }
}
</style>
