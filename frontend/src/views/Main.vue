<template>
  <div class="main">
    <div class="container">
      <div>
        <Onetime :inputValue="inputValue" :url="url" />
        <section class="w-auto list">
          <div class="list-title">
            <h2>알림 목록</h2>
            <div class="d-flex">
              <Button @click.native="openModalGroups" title="새 알림 만들기" />
            </div>
          </div>
          <Searchbar />
          <div class="list-content">
            <div class="list-item" v-for="item in group.list" :key="item.id">
              <div class="flex-col">
                [시간] - {{ item.time }}<br />
                [채널] - {{ item.matterMostUrl.urlAlias }}<br />
                [내용] - {{ item.matterMostNotification.message }}
              </div>
            </div>
          </div>
          <Groups :inputValue="inputValue" :noti="noti" :url="url" />
          <!-- <div class="d-flex">
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
            <Button @click.native="postGroup" title="send" />
          </div> -->
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
import Onetime from "@/views/Onetime.vue";
import Groups from "@/views/Groups.vue";
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
    Onetime,
    Groups,
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
    openModalGroups() {
      const $groups = document.getElementById("modal-groups");
      $groups.style.display = "block";
    },
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
  max-width: 750px;
  min-height: 1000px;
  margin: auto;
  padding: 150px 30px;
}
</style>