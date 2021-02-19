<template>
  <div class="textarea">
    <span>{{ title }}</span>
    <textarea
      :value="value"
      @input="inputChange"
      :placeholder="placeholder"
      :rows="rows"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "Textarea",
  props: {
    value: {},
    title: String,
    placeholder: String,
    rows: { type: String, default: "1" },
  },

  methods: {
    inputChange($event) {
      this.$emit("input", $event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.textarea {
  margin: 5px 0;

  span {
    margin: 6px 0;
  }
  textarea {
    width: 100%;
    resize: none;
  }
}
</style>