<template>
  <div class="main">
    <div class="container">
      <div class="logo"></div>
      <div>
        <section class="w-auto list">
          <div class="list-title">
            <h2>Groups</h2>
            <div>
              <input type="text" />
              <i class="fas fa-search"></i>
            </div>
          </div>
          <div class="list-content">
            <div>
              <!-- <div class="form">
                <input
                  v-model="inputValue.notiMsg"
                  type="text"
                  placeholder="Message"
                />
                <button @click="postNoti"><i class="fas fa-plus"></i></button>
              </div> -->
            </div>
            <div class="list-item" v-for="item in group.list" :key="item.idx">
              <div class="mx-3">
                <span>Group</span>
                {{ item.groupId }} | {{ item.time }}
              </div>
              <div class="mx-3">
                <span>Noti</span>
                {{ item.matterMostNotification.notiId }} |
                {{ item.matterMostNotification.message }}
              </div>
              <div class="mx-3">
                <span>Url</span>
                {{ item.matterMostUrl.urlId }} |
                {{ item.matterMostUrl.urlAlias }}
              </div>
            </div>
          </div>
        </section>
        <div class="d-flex">
          <section class="list">
            <div class="list-title">
              <h2>Notifications</h2>
              <div>
                <input type="text" />
                <i class="fas fa-search"></i>
              </div>
            </div>
            <div class="list-content">
              <div>
                <div class="form">
                  <input
                    v-model="inputValue.notiMsg"
                    type="text"
                    placeholder="Message"
                  />
                  <button @click="postNoti"><i class="fas fa-plus"></i></button>
                </div>
              </div>
              <div class="list-item" v-for="item in noti.list" :key="item.idx">
                {{ item.notiId }} | {{ item.message }}
              </div>
            </div>
          </section>

          <section class="list">
            <div class="list-title">
              <h2>Urls</h2>
              <div>
                <input type="text" />
                <i class="fas fa-search"></i>
              </div>
            </div>
            <div class="list-content">
              <div>
                <div class="form">
                  <input
                    v-model="inputValue.url.urlAlias"
                    type="text"
                    placeholder="Alias"
                  />
                  <input
                    v-model="inputValue.url.url"
                    type="text"
                    placeholder="Hook Url"
                  />
                  <button @click="postUrl"><i class="fas fa-plus"></i></button>
                </div>
              </div>
              <div class="list-item" v-for="item in url.list" :key="item.idx">
                {{ item.urlId }} | {{ item.urlAlias }}<br />
                {{ item.url }}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/api.js";

export default {
  data() {
    return {
      inputValue: {
        notiMsg: "",
        url: { url: "", urlAlias: "" },
      },
      group: {
        list: [],
      },
      noti: {
        list: [
          { notiId: 11, message: "알림 테스트 11 입니다." },
          { notiId: 12, message: "알림 테스트 12 입니다." },
        ],
        file: null,
      },
      url: {
        list: [],
      },
    };
  },
  mounted() {
    this.getNoti();
    this.getUrl();
    this.getGroup();
  },
  methods: {
    getGroup() {
      this.$axios
        .get(API.GROUP)
        .then((res) => {
          console.log(res.data);
          this.group.list = res.data.result;
        })
        .catch((err) => {
          alert(err);
        });
    },
    getNoti() {
      this.$axios
        .get(API.NOTI)
        .then((res) => {
          this.noti.list = res.data.result;
        })
        .catch((err) => {
          alert(err);
        });
    },
    getUrl() {
      this.$axios
        .get(API.URL)
        .then((res) => {
          this.url.list = res.data.result;
        })
        .catch((err) => {
          alert(err);
        });
    },
    postNoti() {
      this.$axios
        .post(API.NOTI, { message: this.inputValue.notiMsg })
        .then((res) => {
          if (res.status === 201) {
            alert("등록 되었습니다!");
            // this.noti.list.push(res.data.result);
            this.getNoti();
          }
        })
        .catch((err) => {
          alert(err);
        });
      this.inputValue.notiMsg = "";
    },
    postUrl() {
      this.$axios
        .post(API.URL, this.inputValue.url)
        .then((res) => {
          if (res.status === 201) {
            alert("등록 되었습니다!");
            // this.noti.list.push(res.data.result);
            this.getUrl();
          }
        })
        .catch((err) => {
          alert(err);
        });
      this.inputValue.url.url = "";
      this.inputValue.url.urlAlias = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.d-flex {
  display: flex;
  justify-content: space-between;
}
.w-auto {
  width: auto !important;
}
.mx-3 {
  background: rgba(255, 255, 255, 0.3);
  margin: 0 0.5rem;
  padding: 6px 12px;
  border-radius: 18px;
}
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
  max-width: 1000px;
  min-height: 1000px;
  margin: auto;
  padding: 150px 30px;
}

.form {
  display: flex;
  background: white;
  height: 50px;
  width: 80%;

  padding: 6px;
  margin: 20px auto;
  border-radius: 18px;

  input {
    width: 80%;
    margin: 0 8px;
    padding: 0 8px;
    border: 0;
    /* border-radius: 36px; */
  }
  button {
    width: 120px;
    color: white;
    background: #051937;
    border-radius: 36px;
    margin: 6px;
  }
}
.list {
  color: white;
  background: rgba(0, 0, 0, 0.4);
  width: 40%;
  min-height: 100px;

  padding: 20px;
  margin-bottom: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 36px;

  .form {
    height: 30px;
    background: white;
    // background: rgba(100, 100, 150, 0.5);
    color: white;
    button {
      width: 50px;
      margin: 0px;
    }
    input {
      border-radius: 16px;
      background: rgba(0, 0, 0, 0.4);
    }
  }
  .list-title {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    h2 {
      margin: 0px;
    }
    input {
      height: 30px;
      line-height: 30px;
      border-radius: 36px;
      margin-right: 6px;
    }
  }
  .list-item {
    display: flex;
    // color: black;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    margin: 12px;
    padding: 12px;
  }
}
</style>