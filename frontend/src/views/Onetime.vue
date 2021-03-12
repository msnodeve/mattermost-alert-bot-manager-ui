<template>
  <section>
    <div class="list w-auto">
      <div class="list-title">
        <h2>메시지 전송</h2>
      </div>
      <p class="description">
        매터모스트의 여러 채널에 같은 메시지를 '지금' 전송해보세요!<br />
        메시지를 작성하고 전송하면 선택된 채널들에 메시지가 전송됩니다.<br />
      </p>
      <div class="list-content">
        <div>
          <Textarea
            v-model="inputValue.text"
            title="메시지"
            placeholder="[안내] 오전 live 방송 참여해주세요!"
            rows="6"
          />
        </div>
        <div class="d-flex justify-content-between">
          <div class="w-70">
            <Textarea
              v-model="inputValue.imageUrl"
              title="이미지 주소"
              placeholder=""
              rows="2"
            />
          </div>
          <div>
            <div class="color">
              <span>색상 설정</span>
              <v-app class="my-color-picker">
                <v-text-field v-model="inputValue.color" hide-details solo>
                  <template v-slot:append>
                    <v-menu
                      v-model="menu"
                      top
                      nudge-top="500"
                      nudge-left="400"
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on }">
                        <div :style="swatchStyle" v-on="on" />
                      </template>
                      <v-card>
                        <v-card-text class="pa-0">
                          <v-color-picker v-model="inputValue.color" flat />
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </template>
                </v-text-field>
              </v-app>
            </div>
          </div>
        </div>
        <div>
          <span>채널 목록</span>
          <div v-for="item in url.list" :key="item.id">
            <input v-model="urlIds" type="checkbox" :value="item.urlId" />
            <label> {{ item.urlAlias }}</label>
          </div>
        </div>
      </div>
      <Button @click.native="postOneTime" title="전송" />
    </div>
  </section>
</template>

<script>
import * as API from "@/api/api.js";

import Textarea from "@/components/set/Textarea.vue";
import Button from "@/components/set/Button.vue";
// import ColorPicker from "@/components/ColorPicker.vue";

export default {
  name: "Onetime",
  props: {
    url: Object,
  },
  data() {
    return {
      inputValue: { text: "", color: "#142312", imageUrl: "" },
      menu: false,
      urlIds: [],
    };
  },
  computed: {
    swatchStyle() {
      return {
        backgroundColor: this.inputValue.color,
        cursor: "pointer",
        height: "30px",
        width: "30px",
        borderRadius: this.menu ? "50%" : "4px",
        transition: "border-radius 200ms ease-in-out",
      };
    },
  },
  components: {
    Textarea,
    Button,
    // ColorPicker,
  },
  methods: {
    postOneTime() {
      const qs = require("qs");
      this.$axios
        .post(API.ONETIME, this.inputValue, {
          headers: { "X-AUTH-TOKEN": this.$cookies.get("token") },
          params: { urlIds: this.urlIds },
          paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: "repeat" });
          },
        })
        .then((res) => {
          if (res.status === 200) {
            alert(
              `ONE TIME 메시지가 전송 되었습니다! \n ${this.inputValue.text}`
            );
            // this.noti.list.push(res.data.result);
            this.inputValue.text = "";
            this.urlIds = [];
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.color {
  margin: 5px 0;

  .my-color-picker {
    border-radius: 10px;

    background: rgb(235, 235, 235) !important;
    margin-top: 5px;
    width: 100%;
    .v-input__slot {
      margin-top: 5px;
      background: rgb(235, 235, 235) !important;
      width: 100%;
      padding: 6px 10px;
      margin-top: 5px;
      border-radius: 10px;

      font-size: 1rem;
    }
  }
  .v-text-field--solo {
    border-radius: 10px;
    background: rgb(235, 235, 235) !important;
  }
}
.w-70 {
  width: 70%;
  margin-right: 20px;
}
</style>