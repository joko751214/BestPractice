import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newTodo: '',
    todos: [{
      id: 'a1',
      title: 'Cras justo odio',
      completed: false,
    },
    {
      id: '112525',
      title: '123',
      completed: false,
    }],
    visibility: 'all',
    cacheTodo: {},
    cacheTitle: '',
  },
  actions: {

  },
  mutations: {
    NEWTODO(state, payload) {
      state.newTodo = payload.trim();
    },
    ADDTODO(state) {
      if (!state.newTodo) {
        return;
      }
      const timestamp = String(Date.now());
      const obj = {
        id: timestamp,
        title: state.newTodo,
        completed: false,
      };
      state.todos.push(obj);
      state.newTodo = '';
    },
    REMOVETODO(state, payload) {
      const index = state.todos.findIndex((el) => el.id === payload.id);
      state.todos.splice(index, 1);
    },
    UPDATEVALUE(state, payload) {
      state.todos.forEach((item) => {
        if (item.id === payload.target.id) {
          // eslint-disable-next-line no-param-reassign
          item.completed = payload.target.checked;
        }
      });
    },
    EDITTODO(state, payload) {
      state.cacheTodo = payload;
      state.cacheTitle = payload.title;
    },
    DONEEDIT(state, payload) {
      console.log(payload);
      state.todos.forEach((item) => {
        if (item.id === payload.id) {
          // eslint-disable-next-line no-param-reassign
          item.title = state.cacheTitle;
        }
      });
      state.cacheTitle = '';
      state.cacheTodo = {};
    },
    INPUTVALUE(state, payload) {
      state.cacheTitle = payload;
    },
    CANCEL(state) {
      state.cacheTitle = state.cacheTodo.title;
    },
    REMOVEALL(state) {
      state.todos = [];
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
      return state.todos.filter((item) => !item.completed).length;
    },
  },
});
