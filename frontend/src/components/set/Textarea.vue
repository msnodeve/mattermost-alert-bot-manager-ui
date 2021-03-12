<template>
  <div class="textarea">
    <span>{{ title }}</span>
    <textarea
      :value="value"
      @input="inputChange"
      :placeholder="placeholder"
      :rows="rows"
      :style="`resize: ${resize}`"
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
    resize: { type: String, default: "none" },
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

  textarea {
    // color: white;
    background: rgb(235, 235, 235);
    width: 100%;
    // padding: 4px 10px 8px 10px;
    padding: 6px 10px;
    margin-top: 5px;
    border-radius: 10px;

    font-size: 1rem;
  }
}
</style>