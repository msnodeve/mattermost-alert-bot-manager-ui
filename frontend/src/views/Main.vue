<template>
  <div class="main">
    <div class="container">
      <div class="logo"></div>
      <div class="form">
        <input v-mode="msg" />
        <button @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/api.js";

export default {
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    submit() {
      console.log(API);
      this.$axios.post(API.post_msg, {});
    },
  },
};
</script>

<style scoped>
.main {
  background-image: linear-gradient(
    to right,
    #051937,
    #004d7a,
    #008793,
    #00bf72,
    #a8eb12
  );
  /* border-bottom-left-radius: 50% 200px;
  border-bottom-right-radius: 50% 200px; */
}
.container {
  max-width: 750px;
  min-height: 400px;
  margin: auto;
  padding: 30px;
}
.main > .logo {
}
.form {
  display: flex;
  background: white;
  height: 50px;
  width: 600px;

  padding: 6px;
  margin: 150px auto;
  border-radius: 36px;
}
.form > input {
  width: 80%;
  margin: 0 8px;
  border: 0;
  /* border-radius: 36px; */
}
.form > button {
  width: 120px;
  color: white;
  background: #051937;
  border-radius: 36px;
  margin: 6px;
}
</style>