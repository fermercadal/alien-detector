<template>
  <div id="nav">
    <router-link :to="{ name: 'Test' }">Test</router-link> |
    <router-link :to="{ name: 'About' }">About</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
body {
  font-size: 16px;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  width: 100vw;
  height: 100vh;

  box-sizing: border-box;
  padding: 2rem;
}
</style>
