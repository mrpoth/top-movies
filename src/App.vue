<template>
  <div id="app" class="dark-theme">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
          <button @click="changeTheme" class="btn btn-theme">Change theme</button>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  methods:{
    
    changeTheme() {
      let body = document.body
      let app = document.getElementById('app');
      if (!app.classList.contains('light-theme') && !body.classList.contains('light-theme') ) {
        app.classList.remove('dark-theme');
        body.classList.remove('dark-theme');
        app.classList.add('light-theme');
        body.classList.add('light-theme');
      } else {
        app.classList.remove('light-theme');
        body.classList.remove('light-theme');
        app.classList.add('dark-theme');
        body.classList.add('dark-theme');
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

.dark-theme {
  background-color: #1b262c;
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
  position:absolute;
  right:20px;
}

@media screen and (max-width: 768px) {
  .btn-theme {
    display:block;
    position:relative;
    right:auto;
  }
}
</style>
