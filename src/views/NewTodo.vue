<template>
  <div class="container mt-3">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">確認新增事項</span>
      </div>
      <input type="text" class="form-control" placeholder="準備要做的任務"
      :value="$store.state.newTodo" readonly>
      <div class="input-group-append">
        <router-link to="/">
          <button class="btn btn-primary" type="button" @click="confirm">確認</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['confirm']),
  },
};
</script>

<style>

</style>
