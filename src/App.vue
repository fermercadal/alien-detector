<template>
  <header>
    <div id="nav">
      <router-link :to="{ name: 'Test' }">Test</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>

    <h1>Alient Detector</h1>
  </header>
  <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&family=Signika:wght@500&display=swap");

body {
  background-color: #fefefe;
  font-size: 16px;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  width: 100vw;
  height: 100vh;

  box-sizing: border-box;
  padding: 2rem;

  #nav {
    color: #22577a;

    a {
      color: #22577a;
      font-weight: 600;

      &.router-link-active {
        color: #38a3a5;
      }
    }
  }

  h1 {
    font-family: "Signika", Helvetica, Arial, sans-serif;
    font-size: 2em;
    font-weight: 500;
  }
}
</style>
