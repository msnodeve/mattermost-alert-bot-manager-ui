<template>
  <div class="main">
    <div class="container">
      <div>
        <section>
          <div class="w-auto list">
            <div class="list-title">
              <h2>One-time Send</h2>
            </div>
            <div class="list-content2">
              <div>
                <Textarea
                  v-model="inputValue.onetime.message"
                  title="Message"
                  placeholder="[안내] 오전 live 방송 참여해주세요!"
                  rows="6"
                />
              </div>
              <div>
                <span>Urls</span>
                <div v-for="item in url.list" :key="item.id">
                  <input
                    v-model="inputValue.onetime.urlIds"
                    type="checkbox"
                    :value="item.urlId"
                  />
                  <label> {{ item.urlAlias }}</label>
                </div>
              </div>
              <Button @click.native="postOneTime" title="send" />
            </div>
          </div>
        </section>

        <section class="w-auto list">
          <div class="list-title">
            <h2>Groups</h2>
          </div>
          <Searchbar />
          <div class="list-content">
            <div class="list-item" v-for="item in group.list" :key="item.id">
              <div class="flex-col">
                {{ item.groupId }} ({{ item.time }}) |
                {{ item.matterMostNotification.message }}
                ----
                {{ item.matterMostUrl.urlAlias }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div>
              <span>Notifications</span>
              <div v-for="item in noti.list" :key="item.id">
                <input
                  v-model="inputValue.group.notiId"
                  type="radio"
                  :value="item.notiId"
                />
                <label> {{ item.message }}</label>
              </div>
            </div>
            <div>
              <span>Groups</span>
              <div v-for="item in url.list" :key="item.id">
                <input
                  v-model="inputValue.group.urlId"
                  type="radio"
                  :value="item.urlId"
                />
                <label> {{ item.urlAlias }}</label>
              </div>
            </div>
            <div>
              <Textarea
                v-model="inputValue.group.time"
                title="Time"
                placeholder="17:55"
              />
            </div>
          </div>
          <Button @click.native="postGroup" title="send" />
        </section>

        <div class="d-flex">
          <section class="list">
            <div class="list-title">
              <h2>Notifications</h2>
            </div>
            <div class="list-content">
              <div>
                <Textarea
                  v-model="inputValue.notiMsg"
                  title="Message"
                  rows="6"
                />
                <Button @click.native="postNoti" title="Save" />
              </div>
              <br />
              <Searchbar />
              <div class="list-item" v-for="item in noti.list" :key="item.id">
                {{ item.notiId }} | {{ item.message }}
              </div>
            </div>
          </section>

          <section class="list">
            <div class="list-title">
              <h2>Urls</h2>
            </div>
            <div class="list-content">
              <div>
                <Textarea
                  v-model="inputValue.url.urlAlias"
                  title="채널 별명"
                  placeholder="[서울 1반]"
                  rows="1"
                />
                <Textarea
                  v-model="inputValue.url.url"
                  title="Hook URL"
                  placeholder="ex: 2fuehfF17g"
                  rows="1"
                />
                <Button @click.native="postUrl" title="Save" />
              </div>
              <br />
              <Searchbar />
              <div class="list-item" v-for="item in url.list" :key="item.id">
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
import Textarea from "@/components/set/Textarea.vue";
import Button from "@/components/set/Button.vue";
import Searchbar from "@/components/set/Searchbar.vue";

export default {
  mounted() {
    this.getNoti();
    this.getUrl();
    this.getGroup();
  },
  components: {
    Textarea,
    Button,
    Searchbar,
  },
  data() {
    return {
      inputValue: {
        notiMsg: "",
        url: { url: "", urlAlias: "" },
        onetime: {
          message: "",
          urlIds: [],
        },
        group: {
          time: "",
          notiId: 0,
          urlId: 0,
        },
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
  methods: {
    checked() {},
    getGroup() {
      this.$axios
        .get(API.GROUP)
        .then((res) => {
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
    postOneTime() {
      console.log(this.inputValue.onetime.urlIds);
      const qs = require("qs");
      this.$axios
        .post(
          API.ONETIME,
          {},
          {
            params: this.inputValue.onetime,
            paramsSerializer: function (params) {
              return qs.stringify(params, { arrayFormat: "repeat" });
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            alert(
              `ONE TIME 메시지가 전송 되었습니다! \n ${this.inputValue.onetime.message}`
            );
            // this.noti.list.push(res.data.result);
            this.inputValue.onetime.message = "";
            this.inputValue.onetime.urlIds = [];
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    postGroup() {
      this.$axios
        .post(API.GROUP, {}, { params: this.inputValue.group })
        .then((res) => {
          if (res.status === 201) {
            alert(`Group 설정이 완료 되었습니다! \n `);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background-image: linear-gradient(
    to right,
    #051937,
    #004d7a,
    #008793,
    #00bf72,
    #a8eb12
  );
  i {
    cursor: pointer;
  }
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
  width: 45%;
  min-height: 100px;

  padding: 30px;
  margin-bottom: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 36px;

  .form {
    height: 30px;
    background: white;
    // background: rgba(100, 100, 150, 0.5);
    color: white;
    button {
      width: 30px;
      margin: 0px;
      border: 0px;
    }
    input {
      border-radius: 16px;
      // background: rgba(0, 0, 0, 0.4);
    }
  }
  .list-title {
    display: flex;
    justify-content: space-between;
    // padding: 12px;
    h2 {
      margin: 0;
      margin-bottom: 30px;
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
    margin: 12px 0px;
    padding: 12px;
  }
}
</style>