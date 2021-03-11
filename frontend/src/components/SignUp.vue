<template>
  <div id="modal-join" @mousedown="closeModal" class="modal">
    <div class="modal-content list">
      <div class="title">회원가입</div>
      <div class="input-wrap">
        <input
          v-model="username"
          placeholder="아이디를 입력해주세요"
          type="text"
          @keypress.enter="join(username, password)"
        />
      </div>
      <div class="input-wrap">
        <input
          v-model="password"
          type="password"
          placeholder="영문, 숫자 혼용 8자 이상"
          @keypress.enter="join(username, password)"
        />
      </div>
      <div class="login">
        <p>이미 회원이신가요?</p>
        <div @click="showLogin" class="btn--text">로그인</div>
      </div>
      <v-btn
        dark
        depressed
        block
        class="allbtn mt-3"
        color="#1e88e5"
        @click="join(username, password)"
        >회원가입 하기</v-btn
      >
    </div>
  </div>
</template>

<script>
import * as API from "@/api/api.js";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    join() {
      this.$axios
        .post(API.MEMBER + "/join", {
          id: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res.status === 201) {
            console.log(res.data);
            this.showLogin();
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    closeModal(event) {
      const join = document.getElementById("modal-join");
      if (event.target == join) this.close();
    },
    close() {
      const join = document.getElementById("modal-join");
      join.style.display = "none";
    },
    showLogin() {
      const login = document.getElementById("modal-login");
      login.style.display = "block";
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: space-between;
  p {
    color: gray;
  }
  div {
    cursor: pointer;
    font-weight: 500;
  }
}
.title {
  font-size: 1.25rem;
  font-weight: 700;
}
.modal-content {
  width: 450px !important;
}
input {
  width: 100%;
  border: 1px solid silver;
  padding: 7px 15px;
  margin-bottom: 5px;
  height: 40px;
}
input:focus {
  outline: none;
}
</style>