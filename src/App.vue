<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"></router-link>
      <router-link to="/search"></router-link>
      <router-link to="/settings"></router-link>
    </div>
    <transition name="bounce">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
  @import "assets/styles/style";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>