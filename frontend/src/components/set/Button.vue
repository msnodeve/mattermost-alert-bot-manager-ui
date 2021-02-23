<template>
  <div class="button">
    <button>{{ title }}</button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    color: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "40px",
    },
  },
};
</script>

<style lang="scss" scoped>
// .button {
//   width: 40px;
// }
button {
  cursor: pointer;
}
</style>