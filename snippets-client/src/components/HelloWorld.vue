<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="wrapper">
    <img src="/logo.png" alt="Snippets Logo" class="logo"/>

    <h1>{{ msg }}</h1>
  
    <div class="card">
      <button type="button" @click="count++">count is {{ count }}</button>
    </div>
  </div>

</template>

<style scoped>
.logo {
    width: 100px; /* Adjust the size as needed */
    height: auto;
    display: block;
    margin: 0 auto;
    padding-bottom: 20px;
}
.header {
    text-align: center;
    color: #f8f8ff;
    padding-bottom: 20px;
}
h1.header {
    font-size: 18px;
}

</style>