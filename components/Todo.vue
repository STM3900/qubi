<template>
  <div class="todo">
    <div v-for="(item, i) in todoList" :key="i" class="todo-list">
      <input type="checkbox" :id="`checkbox${i}`" v-model="item.finished" />
      <label
        v-if="!item.onEdit"
        :for="`checkbox${i}`"
        :class="{ finished: item.finished }"
        >{{ item.label }}</label
      >
      <input
        v-else
        type="text"
        @blur="confirmTodo(i)"
        @keyup.enter="confirmTodo(i)"
        v-model="item.label"
      />
      <button @click="removeTodo(i)">x</button>
      <button v-if="!item.onEdit" @click="editTodo(i)">e</button>
      <button v-else @click="confirmTodo(i)">c</button>
    </div>
    <button @click="addTodo">add</button
    ><input type="text" v-model="addLabel" @keyup.enter="addTodo" />
  </div>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      todoList: [],
      addLabel: ""
    };
  },
  mounted() {
    localStorage.getItem("todoList")
      ? (this.todoList = JSON.parse(localStorage.getItem("todoList")))
      : (this.todoList = []);
  },
  methods: {
    removeTodo(index) {
      this.todoList.splice(index, 1);
      this.saveTodos();
    },
    addTodo() {
      if (this.addLabel) {
        this.todoList.push({
          label: this.addLabel,
          finished: false,
          onEdit: false
        });
        this.addLabel = "";
        this.saveTodos();
      }
    },
    editTodo(index) {
      this.todoList[index].onEdit = true;
    },
    confirmTodo(index) {
      this.todoList[index].onEdit = false;
      this.saveTodos();
    },
    saveTodos() {
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }
  }
};
</script>

<style scoped>
.todo {
  margin-top: 15px;
}

.finished {
  text-decoration: line-through;
}
</style>
