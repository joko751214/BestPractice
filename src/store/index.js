import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    visibility: 'all',
    todos: [
      {
        id: 'a1',
        title: 'Cras justo odio',
        completed: false,
      },
    ],
    completed: '',
    cacheTodo: {},
    cacheTitle: '',
  },
  actions: {
    addTodo(context, payload) {
      const timestamp = String(Date.now());
      const value = payload.trim();
      if (!value) {
        return;
      }
      const todo = {
        id: timestamp,
        title: value,
        completed: false,
      };
      context.commit('PUSHTODO', todo);
    },
    editTodo(context, payload) {
      context.commit('EDITTODO', payload);
    },
    doneEdit(context, payload) {
      context.commit('DONETODO', payload);
      context.commit('CLEANCATCHETODO');
    },
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    PUSHTODO(state, payload) {
      state.todos.push(payload);
    },
    REMOVETODO(state, payload) {
      const index = state.todos.findIndex((el) => payload === el.id);
      state.todos.splice(index, 1);
    },
    CLEANTODOS(state) {
      state.todos = [];
    },
    CLEANCATCHETODO(state) {
      state.cacheTodo = {};
    },
    UPDATEVALUE(state, payload) {
      state.todos.forEach((item) => {
        if (item.id === payload.id) {
          item.completed = !payload.completed;
        }
      });
    },
    VISIBILITY(state, payload) {
      state.visibility = payload;
    },
    EDITTODO(state, payload) {
      state.cacheTodo = payload;
      state.cacheTitle = payload.title;
    },
    DONETODO(state, payload) {
      state.todos.forEach((item) => {
        if (item.id === state.cacheTodo.id) {
          item.title = payload;
        }
      });
      state.cacheTitle = '';
    },
  },
  getters: {
    todolist(state) {
      if (state.visibility === 'all') {
        return state.todos;
      }
      if (state.visibility === 'progress') {
        return state.todos.filter((item) => !item.completed);
      }
      return state.todos.filter((item) => item.completed);
    },
    todoNum(state) {
      return state.todos.filter((item) => !item.completed);
    },
  },
});
