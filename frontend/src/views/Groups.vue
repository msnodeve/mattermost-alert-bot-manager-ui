<template>
  <div @click="closeModal" id="modal-groups" class="modal">
    <div class="modal-content list">
      <div class="list-title">
        <h2>알림 설정</h2>
        <i @click="closeModal" id="button-close" class="fas fa-times"></i>
      </div>
      <p class="description">
        미리 설정해놓은 공지와 채널을 선택하고 시간을 입력해주세요! <br />
        설정한 채널과 시간에 매일 알림이 전송됩니다!
      </p>
      <div class="list-content">
        <div class="">
          <div class="content">
            <span>공지</span>
            <div v-for="item in noti.list" :key="item.id">
              <input
                v-model="inputValue.group.notiId"
                type="radio"
                :value="item.notiId"
              />
              <label> {{ item.message }}</label>
            </div>
          </div>
          <div class="content">
            <span>채널</span>
            <div v-for="item in url.list" :key="item.id">
              <input
                v-model="inputValue.group.urlId"
                type="radio"
                :value="item.urlId"
              />
              <label> {{ item.urlAlias }}</label>
            </div>
          </div>
          <div class="content">
            <Textarea
              v-model="inputValue.group.time"
              title="시간"
              placeholder="17:55"
            />
          </div>
        </div>
        <Button @click.native="postGroup" title="Send" />
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/api.js";
import Textarea from "@/components/set/Textarea.vue";
import Button from "@/components/set/Button.vue";

export default {
  name: "Groups",
  props: {
    inputValue: Object,
    url: Object,
    noti: Object,
  },
  components: {
    Textarea,
    Button,
  },
  methods: {
    closeModal(event) {
      const onetime = document.getElementById("modal-groups");
      const bg = document.getElementById("button-close");
      if ((event.target == onetime) | (event.target == bg))
        onetime.style.display = "none";
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
.content {
  margin: 20px 0px;
}
.description {
  color: black;
}
</style>