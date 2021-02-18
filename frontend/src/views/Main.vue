<template>
  <div class="main">
    <div class="container">
      <div class="logo"></div>
      <section>
        <div class="form">
          <input v-model="msg" type="text" />
          <button @click="postNoti">Submit</button>
        </div>
        <div class="list">
          <div class="list-title">
            <h2>Notifications</h2>
            <input type="text" v />
          </div>
          <div class="list-content">
            <div class="list-item" v-for="item in list" :key="item.idx">
              {{ item }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/api.js";

export default {
  data() {
    return {
      msg: "",
      list: [],
    };
  },
  created() {
    this.getNoti();
  },
  methods: {
    getNoti() {
      this.$axios
        .get(API.NOTI)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    postNoti() {
      this.$axios.post(API.NOTI, {});
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
  min-height: 700px;
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

.list {
  /* color: white; */
  background: white;
  border-radius: 36px;
  padding: 20px;
  min-height: 100px;
}
.list > .list-title {
  display: flex;
  justify-content: space-between;
  padding: 12px;
}
.list > .list-title > h2 {
  margin: 0px;
}
.list > .list-title > input {
  height: 30px;
  line-height: 30px;
}
.list > .list-item {
  color: black;
  background: white;
  border-radius: 36px;
  margin: 6px;
}
</style>