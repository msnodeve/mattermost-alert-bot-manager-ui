<template>
  <div class="main">
    <div class="container">
      <div class="logo">
        <img src="@/assets/logo.png" alt="mm-bot" />
      </div>
      <v-tabs fixed-tabs>
        <v-tab>메시지 전송</v-tab>
        <v-tab>정기 알림 목록</v-tab>
        <v-tab>공지 목록</v-tab>
        <v-tab>채널 목록</v-tab>
        <v-tab-item>
          <div>
            <Onetime :inputValue="inputValue" :url="url" />
          </div>
        </v-tab-item>
        <v-tab-item>
          <div>
            <section class="list">
              <div class="list-title">
                <h2>알림 목록</h2>
                <div class="d-flex">
                  <Button
                    @click.native="openModalGroups"
                    title="새 알림 만들기"
                  />
                </div>
              </div>
              <p class="description">
                정해진 시간에 매일 전송되는 알림을 만들어보세요!<br />
                새 알림을 만들고, 아래에서 알림들의 목록을 확인 할 수
                있습니다<br />
              </p>
              <Searchbar />
              <div class="list-content">
                <div
                  class="list-item"
                  v-for="item in group.list"
                  :key="item.id"
                >
                  <div class="flex-col">
                    [시간] - {{ item.time }}<br />
                    [채널] - {{ item.matterMostUrl.urlAlias }}<br />
                    [내용] - {{ item.matterMostNotification.message }}
                  </div>
                </div>
              </div>
              <Groups :inputValue="inputValue" :noti="noti" :url="url" />
            </section>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div>
            <section class="list">
              <div class="list-title">
                <h2>공지사항</h2>
              </div>
              <p class="description">
                자주 사용하는 공지들을 미리 저장하고 알림을 생성하세요!<br />
              </p>
              <div class="list-content">
                <div>
                  <Textarea
                    v-model="inputValue.notiMsg"
                    title="새 공지 생성하기"
                    rows="6"
                    resize="vertical"
                  />
                  <Button @click.native="postNoti" title="저장" />
                </div>
                <br />
                <Searchbar v-model="filter.noti" />
                <div
                  class="list-item"
                  v-for="item in filterNotiList"
                  :key="item.id"
                >
                  {{ item.notiId }} | {{ item.message }}
                </div>
              </div>
            </section>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div>
            <section class="list">
              <div class="list-title">
                <h2>매터모스트 채널</h2>
              </div>
              <p class="description">
                메시지를 전송하고자 하는 채널을 미리 저장하세요!<br />
                매터모스트 > 통합 > Incoming Webhook 에서 Hook Url을 가져와서
                통해 채널 등록이 가능합니다.<br />
                이후엔 생성할 때 저장한 채널 별칭으로 확인 할 수 있습니다!<br />
              </p>
              <div class="list-content">
                <div>
                  <Textarea
                    v-model="inputValue.url.urlAlias"
                    title="채널 별칭"
                    placeholder="[서울 1반]"
                    rows="1"
                  />
                  <Textarea
                    v-model="inputValue.url.url"
                    title="Hook URL"
                    placeholder="ex: 2fuehfF17g"
                    rows="1"
                  />
                  <Button @click.native="postUrl" title="저장" />
                </div>
                <br />
                <Searchbar v-model="filter.url" />
                <div
                  class="list-item"
                  v-for="item in filterUrlList"
                  :key="item.id"
                >
                  {{ item.urlId }} | {{ item.urlAlias }}<br />
                  {{ item.url }}
                </div>
              </div>
            </section>
          </div>
        </v-tab-item>
      </v-tabs>
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
  computed: {
    filterNotiList() {
      return this.noti.list.filter((item) =>
        item.message.includes(this.filter.noti)
      );
    },
    filterUrlList() {
      return this.url.list.filter((item) =>
        item.urlAlias.includes(this.filter.url)
      );
    },
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
      filter: {
        noti: "",
        url: "",
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
          console.log(err);
        });
    },
    getNoti() {
      this.$axios
        .get(API.NOTI)
        .then((res) => {
          this.noti.list = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUrl() {
      this.$axios
        .get(API.URL)
        .then((res) => {
          this.url.list = res.data.result;
        })
        .catch((err) => {
          console.log(err);
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
          console.log(err);
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
          console.log(err);
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
          console.log(err);
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
}
.container {
  max-width: 950px;
  min-height: 1000px;
  margin: auto;
  padding: 0;
  background: white;
  border: {
    left: 3px solid gray;
    right: 3px solid gray;
  }
  .logo {
    text-align: center;
    padding-top: 50px;
  }
}
section {
  margin-bottom: 150px;
}
</style>