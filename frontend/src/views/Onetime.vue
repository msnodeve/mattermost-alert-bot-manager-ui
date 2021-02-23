<template>
  <section>
    <div class="list w-auto">
      <div class="list-title">
        <h2>One-time Send</h2>
      </div>
      <div class="list-content">
        <div>
          <Textarea
            v-model="inputValue.onetime.message"
            title="Message"
            placeholder="[안내] 오전 live 방송 참여해주세요!"
            rows="6"
          />
        </div>
        <div>
          <span>채널 목록</span>
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
</template>

<script>
import * as API from "@/api/api.js";

import Textarea from "@/components/set/Textarea.vue";
import Button from "@/components/set/Button.vue";

export default {
  name: "Onetime",
  props: {
    inputValue: Object,
    url: Object,
  },
  components: {
    Textarea,
    Button,
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
</style>