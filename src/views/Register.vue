<template>
  <div>
    <div class="register">
      <h1>This is the register page</h1>
    </div>
    <div>
      <form @submit="registerUser">
        <input v-model="username" type="text" name="username" id="username" />
        <input v-model="password" type="password" name="password" id="password" />
        <button type="submit" class="btn">Register</button>
        </form>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "register",
  data() {
    return {
          username: "",
          password: ""
    };
  },
  methods: {
    registerUser(e) { 
      e.preventDefault()
        this.username = this.username
        this.password = this.password
      axios
        .post("http://localhost:3000/register", {
                username:this.username,
                password: this.password
        })
        .then(res => {
          console.log(`sent successfully with ${res}`)          
        })
        .catch(err => {
          console.log(err);
        });
        // this.$router.push('/')
    }
  }
};


</script>