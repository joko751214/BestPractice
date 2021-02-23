<template>
  <div id="home" class="container my-3">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">待辦事項</span>
      </div>
      <input type="text" class="form-control" placeholder="準備要做的任務"
      v-model="title" @keyup.enter="addTodo" id="addTodo">
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="addTodo">新增</button>
      </div>
    </div>
    <div class="card text-center">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item" @click="$store.commit('VISIBILITY', 'all')">
            <a class="nav-link" href="#"
            :class="{ 'active': $store.state.visibility === 'all' }">全部</a>
          </li>
          <li class="nav-item" @click="$store.commit('VISIBILITY', 'progress')">
            <a class="nav-link " href="#"
            :class="{ 'active': $store.state.visibility === 'progress' }">進行中</a>
          </li>
          <li class="nav-item" @click="$store.commit('VISIBILITY', 'completed')">
            <a class="nav-link" href="#"
            :class="{ 'active': $store.state.visibility === 'completed' }">已完成</a>
          </li>
        </ul>
      </div>
      <ul class="list-group list-group-flush text-left">
        <li class="list-group-item" v-for="item in todolist" :key="item.id">
          <div class="d-flex" @dblclick="editTodo(item)"
            v-if="item.id !== $store.state.cacheTodo.id">
            <div class="form-check">
              <input type="checkbox" class="form-check-input"
              :id="item.id" @change="updateValue(item)"
              :checked="item.completed">
              <label class="form-check-label" :for="item.id"
              :class="{ 'completed': item.completed }">
                {{ item.title }}
              </label>
            </div>
            <button type="button" class="close ml-auto removeBtn"
            aria-label="Close" @click="removeTodo(item.id)">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <input type="text" class="form-control"
          :value="$store.state.cacheTitle"
          @keyup.enter="doneEdit"
          @keyup.esc="cancelEdit" v-else>
        </li>
        <!-- <li class="list-group-item">
          <input type="text" class="form-control">
        </li> -->
      </ul>
      <div class="card-footer d-flex justify-content-between">
        <span>還有 {{ todoNum.length }} 筆任務未完成</span>
        <a href="#" @click.prevent="removeAll">清除所有任務</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      title: '',
      visibility: 'all',
    };
  },
  methods: {
    addTodo() {
      this.$store.dispatch('addTodo', this.title);
      this.title = '';
    },
    removeTodo(id) {
      this.$store.commit('REMOVETODO', id);
    },
    editTodo(item) {
      this.$store.dispatch('editTodo', item);
    },
    cancelEdit() {
      this.$store.commit('CLEANCATCHETODO');
    },
    /* eslint-disable no-param-reassign */
    doneEdit(e) {
      this.$store.dispatch('doneEdit', e.target.value);
    },
    removeAll() {
      this.$store.commit('CLEANTODOS');
    },
    updateValue(item) {
      this.$store.commit('UPDATEVALUE', item);
    },
  },
  computed: {
    ...mapGetters(['todolist', 'todoNum']),
  },
};
</script>

<style lang="sass">
  .completed
    text-decoration: line-through
</style>
