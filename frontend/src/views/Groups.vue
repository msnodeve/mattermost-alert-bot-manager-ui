<template>
  <div @click="closeModal" id="modal-groups" class="modal">
    <div class="modal-content list">
      <div class="list-title">
        <h2>알림 설정</h2>
        <i @click="closeModal" id="button-close" class="fas fa-times"></i>
      </div>
      <div class="list-content">
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
        <Button @click.native="postGroup" title="Send"/>
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
</style>