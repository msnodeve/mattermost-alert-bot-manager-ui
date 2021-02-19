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
  },
};
</script>

<style lang="scss" scoped>
.button {
  width: 40px;
}
</style>