<template>
  <div id="app">
   
    <HelloWorld msg=""/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
@import url('../public/css/reset.css');
body,html{
    background:#f0f0f0;
}
</style>
