<template>
  <div class="button">
    <button class="btn btn-dark">{{ title }}</button>
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
.button {
  display: inline-block;
}
button {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
  background-color: #2a2e33;
  border-color: #2a2e33;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>