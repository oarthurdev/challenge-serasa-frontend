<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body, html{
  height: 100%;
  overflow: hidden;
}

#app {
  margin: -1px;
  height: 100%;
}
</style>
