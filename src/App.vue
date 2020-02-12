<template>
  <div id="app">
    <div
      v-for="todo in todos"
      class="todo"
      :class="{'complete': todo.completed}"
      :key="todo.id"
    >{{todo.title}}</div>
  </div>
</template>

<script>
import axios from "./axios-instance.js";

export default {
  name: "App",
  data() {
    return {
      todos: []
    };
  },
  created() {
    axios
      .get("/todos", {
        params: {
          _limit: 5
        }
      })
      .then(
        res => {
          this.todos = res.data;
        },
        error => {
          console.log(error);
        }
      );
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<style scoped>
.todo {
  padding: 20px;
  margin: 20px;
  border: 1px solid red;
  border-radius: 5px;
  background-color: #FF000022;
}

.todo.complete {
  border-color: green;
  background-color: #00FF0022;
}
</style>

