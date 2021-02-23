<template>
  <div class="container mt-3">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">編輯內容</span>
      </div>
      <input type="text" class="form-control" placeholder="準備要做的任務"
      :value="$store.state.cacheTitle" @input="inputValue">
      <div class="input-group-append">
        <router-link to="/">
          <button class="btn btn-outline-primary" type="button"
          @click="confirmEdit($store.state.cacheTodo)">確認</button>
          <button class="btn btn-outline-danger" type="button"
          @click="$store.commit('CANCEL')">取消</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    confirmEdit(value) {
      this.$store.commit('DONEEDIT', value);
    },
    inputValue(e) {
      this.$store.commit('INPUTVALUE', e.target.value);
    },
  },
};
</script>

<style>

</style>
