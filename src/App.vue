<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
          <button @click="changeTheme" class="btn btn-theme">Change theme</button>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  methods:{
    changeTheme() {
      let body = document.getElementsByTagName('body')[0];
      let home = document.getElementById('home');
      if (!home.classList.contains('light-theme' && !body.classList.contains('light-theme')) ) {
        home.classList.toggle('light-theme');
        body.classList.toggle('light-theme');
      }
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #3282b8;
}

#nav a.router-link-exact-active {
  color: #0f4c75;
}

body {
  background-color: #1b262c;
}
.home {
  color: #bbe1fa;
}

.light-theme {
  color:#004775;
  background-color:#f1f1f1;
}

.btn {
  background-color: #3282b8;
  border: none;
  color: white;
  border-radius: 5px;
  padding: 5px;
  margin: 5px auto;
}

.btn-theme {
  position:fixed;
  right:20px;
}
</style>
