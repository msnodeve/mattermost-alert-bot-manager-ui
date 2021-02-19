<template>
  <div class="searchbar">
    <input type="text" value="필터 검색기능 구현 중입니다" disabled />
    <i class="fas fa-search"></i>
  </div>
</template>

<script>
export default {
  name: "Searchbar",
};
</script>

<style lang="scss" scoped>
.searchbar {
  display: flex;

  input {
    color: silver;
    height: 30px;
    width: 100%;
    line-height: 30px;
    padding: 0px 12px;
    margin-right: 6px;
    border-radius: 10px;
  }
  i {
    line-height: 30px;
  }
}
</style>