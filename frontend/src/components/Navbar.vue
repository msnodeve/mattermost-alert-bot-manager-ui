<template>
  <div class="navbar">
    <Login />
    <SignUp />
    <div class="d-flex justify-content-between">
      <button @click="goMain" class="logo">MM BOT</button>
      <button v-show="!isToken" @click="openLoginModal">로그인</button>
      <button v-show="isToken" @click="logout">로그아웃</button>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import SignUp from "@/components/SignUp.vue";

export default {
  components: {
    Login,
    SignUp,
  },
  computed: {
    isToken() {
      return this.$cookies.get("token");
    },
  },
  methods: {
    openLoginModal() {
      const $login = document.getElementById("modal-login");
      $login.style.display = "block";
    },
    goMain() {
      this.$router.go("/");
    },

    logout() {
      this.$cookies.remove("token");
      this.$router.go("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  padding: 0 25px;
  line-height: 50px;
  z-index: 8000;

  background: white;

  -webkit-box-shadow: 0 2px 6px -6px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0 2px 6px -6px rgba(0, 0, 0, 0.6);
  box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.6);

  .right-contents {
    position: absolute;
    right: 25px;
  }
  button:focus {
    outline: none;
  }
}
</style>