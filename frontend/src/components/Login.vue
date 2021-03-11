<template>
  <div id="modal-login" @mousedown="closeModal" class="modal">
    <div class="modal-content list">
      <div class="title">로그인</div>
      <div class="input-wrap">
        <input
          v-model="username"
          placeholder="아이디를 입력해주세요"
          type="text"
          @keypress.enter="login(username, password)"
        />
      </div>
      <div class="input-wrap">
        <input
          v-model="password"
          type="password"
          placeholder="영문, 숫자 혼용 8자 이상"
          @keypress.enter="login(username, password)"
        />
      </div>
      <div class="join">
        <p>아직 회원이 아니신가요?</p>
        <div @click="showJoin" class="btn--text">회원가입</div>
      </div>
      <v-btn
        dark
        depressed
        block
        class="allbtn mt-3"
        color="#42a5f5"
        @click="login(username, password)"
        >로그인 하기</v-btn
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
    login() {
      this.$axios
        .post(API.MEMBER + "/login", {
          id: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res.status === 201) {
            this.$cookies.set("token", res.data.result);
            // this.close();
            this.$router.go("/");
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    closeModal(event) {
      const login = document.getElementById("modal-login");
      if (event.target == login) this.close();
    },
    close() {
      const login = document.getElementById("modal-login");
      login.style.display = "none";
    },
    showJoin() {
      this.close();
      const join = document.getElementById("modal-join");
      join.style.display = "block";
    },
  },
};
</script>

<style lang="scss" scoped>
.join {
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