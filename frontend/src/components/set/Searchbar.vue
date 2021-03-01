<template>
  <div class="searchbar">
    <input type="text" :value=value @input="inputChange"/>
    <i class="fas fa-search"></i>
    
  </div>
</template>

<script>
export default {
  name: "Searchbar",
  props: {
    value: {},
  },
  methods: {
    inputChange($event) {
      this.$emit("input", $event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>

.searchbar {
  display: flex;
  position: relative;
  margin-bottom: 20px;

  input {
    background: silver;
    height: 30px;
    width: 100%;
    line-height: 30px;
    padding: 0px 12px;
    margin-right: 6px;
    border-radius: 10px;
    padding-left: 30px;
  }
  
  i {
    position: absolute;
    cursor: inherit;
    line-height: 30px;
    width: 12px;
    height: 12px;
    left: 8px;
  }

}
</style>