<template>
<div>
<h1>Dashboard v1.0.0</h1>
<h3>Your token is <b>{{actualToken}}</b> </h3>
</div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      actualToken: 0
    }
  },
  mounted () {
    this.actualToken = localStorage.getItem('token')
  }
}
</script>
