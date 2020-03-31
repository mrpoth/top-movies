<template>
  <div>
    <div class="login">
      <h1>This is the login page</h1>
    </div>
    <div>
      <form @submit="loginUser">
        <input v-model="username" type="text" name="username" id="username" />
        <input v-model="password" type="password" name="password" id="password" />
        <button type="submit" class="btn">login</button>
        </form>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "login",
  data() {
    return {
          username: "",
          password: ""
    };
  },
  methods: {
    loginUser(e) { 
      e.preventDefault()
        this.username = this.username
        this.password = this.password
      axios
        .post("http://localhost:3000/login", {
                withCredentials: true,
                username:this.username,
                password: this.password
        })
        .then(res => {
          console.log(res)          
        })
        .catch(err => {
          console.log(err);
        });
        // this.$router.push('/')
    }
  }
};


</script>