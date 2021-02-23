<template>
  <div class="container my-3">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">待辦事項</span>
      </div>
      <input type="text" class="form-control" placeholder="準備要做的任務"
      v-model="title">
      <div class="input-group-append">
        <router-link to="/new">
          <button class="btn btn-primary" type="button" @click="addTodo">新增</button>
        </router-link>
      </div>
    </div>
    <div class="card text-center">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item" @click="$store.state.visibility = 'all'">
            <a class="nav-link" href="#"
            :class="{ 'active': $store.state.visibility === 'all' }">全部</a>
          </li>
          <li class="nav-item" @click="$store.state.visibility = 'progress'">
            <a class="nav-link " href="#"
            :class="{ 'active': $store.state.visibility === 'progress' }">進行中</a>
          </li>
          <li class="nav-item" @click="$store.state.visibility = 'completed'">
            <a class="nav-link" href="#"
            :class="{ 'active': $store.state.visibility === 'completed' }">已完成</a>
          </li>
        </ul>
      </div>
      <ul class="list-group list-group-flush text-left">
        <li class="list-group-item" v-for="item in todolist" :key="item.id">
          <div class="d-flex">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" :id="item.id"
              :checked="item.completed" @change="updateValue">
              <label class="form-check-label" :for="item.id"
              :class="{ 'completed': item.completed }">
                {{ item.title }}
              </label>
            </div>
            <router-link to="/edit" class="ml-5">
              <button class="btn btn-primary" type="button" @click="editTodo(item)">
                編輯
              </button>
            </router-link>
            <button type="button" class="close ml-auto" aria-label="Close"
            @click="removeTodo(item)">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </li>
        <!-- <li class="list-group-item">
          <input type="text" class="form-control">
        </li> -->
      </ul>
      <div class="card-footer d-flex justify-content-between">
        <span>還有 {{ todoNum }} 筆任務未完成</span>
        <a href="#" @click.prevent="$store.commit('REMOVEALL')">清除所有任務</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      title: '',
    };
  },
  methods: {
    addTodo() {
      this.$store.commit('NEWTODO', this.title);
    },
    removeTodo(item) {
      this.$store.commit('REMOVETODO', item);
    },
    updateValue(e) {
      this.$store.commit('UPDATEVALUE', e);
    },
    editTodo(item) {
      this.$store.commit('EDITTODO', item);
    },
  },
  computed: {
    ...mapGetters(['todolist', 'todoNum']),
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
