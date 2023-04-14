<script setup>
import { ref } from 'vue'
const slideNumber = ref(0)
setInterval(() => {
    slideNumber.value = Math.floor(Math.random() * 10)
    console.log(slideNumber.value)
}, 2000)
</script>

<template>
    <section class="container">
        <record-dandelion-clock />
        <record-circular-progress :percent="0.8" />
        <record-pie-chart />
        <div>
            <record-slide-number class="slide-number" :value="slideNumber" />
        </div>
    </section>
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
}
.container > * {
    flex: 1;
    max-width: 15%;
}
.slide-number {
    font-size: 50px;
}
</style>
