<template> 
  <div class="app">
    <Navbar :key="$route.fullPath"/>
    <div class="container">
      <router-view/>
     </div>
  </div>
</template>

<script>
import Navbar from './views/Navbar'
  export default{
    name: 'app',
    components: {
      Navbar
    }
  }
</script>

<style lang="scss">
body{
  background: #2c3e50;
  color: #FFF;
}
a{
  color: inherit;
}
</style>
