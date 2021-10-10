<template>
  <div class="todo">
    <div
      v-for="(item, i) in $store.state.todosData[uniqueIdTodos]"
      :key="i"
      class="todo-list"
    >
      <section class="todo-list-item">
        <input
          type="checkbox"
          :id="`checkbox${i}${uniqueIdTodos}`"
          v-model="todoListData[i].finished"
          @click="toggleTodoData(i)"
        />
        <label
          v-if="!item.onEdit"
          :for="`checkbox${i}${uniqueIdTodos}`"
          :class="{ finished: todoListData[i].finished }"
          >{{ item.label }}</label
        >
        <textarea
          v-else
          type="text"
          :ref="`textarea${i}${uniqueIdTodos}`"
          @blur="confirmTodo(i)"
          @keyup.enter="confirmTodo(i)"
          @input="autoGrow(i)"
          @mousedown="$store.commit('updateCardCanMove', false)"
          v-model="todoListData[i].label"
        ></textarea>
      </section>
      <section class="todo-list-button">
        <fa
          @click="removeTodo(i)"
          class="todo-icon todo-icon-secondary"
          icon="times"
        />
        <fa
          v-if="!item.onEdit"
          @click="
            editTodo(i);
            autoGrow(i);
          "
          class="todo-icon"
          icon="edit"
        />
        <fa v-else @click="confirmTodo(i)" class="todo-icon" icon="check" />
      </section>
    </div>
    <div class="add-todo">
      <fa
        @click="addTodo"
        class="todo-icon"
        icon="plus"
        :style="{
          color: `hsl(${this.$store.state.cardList[0].color}, 70%, 70%)`
        }"
      />
      <input
        type="text"
        v-model="addLabel"
        @keyup.enter="addTodo"
        @mousedown="$store.commit('updateCardCanMove', false)"
        placeholder="Nouvelle Todo"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: {
    uniqueIdTodos: Number
  },
  data() {
    return {
      todoListData: [],
      addLabel: "",
      cooldownStatus: true,
      isInStore: false
    };
  },
  created() {
    if (localStorage.getItem(`todoList${this.uniqueIdTodos}`)) {
      this.$store.commit("updateTodoList", {
        id: this.uniqueIdTodos,
        value: JSON.parse(localStorage.getItem(`todoList${this.uniqueIdTodos}`))
      });
      this.todoListData = this.$store.state.todosData[this.uniqueIdTodos];
      this.isInStore = true;
    } else {
      this.$store.commit("updateTodoList", {
        id: this.uniqueIdTodos,
        value: []
      });
    }
  },
  methods: {
    setCooldown() {
      this.cooldownStatus = false;
      setTimeout(() => {
        this.cooldownStatus = true;
      }, 200);
    },
    removeTodo(index) {
      this.$store.commit("removeTodoStore", {
        id: this.uniqueIdTodos,
        index: index
      });
      if (!this.isInStore) {
        this.todoListData.splice(index, 1);
      }

      this.saveTodos();
    },
    addTodo() {
      if (this.addLabel) {
        this.$store.commit("addTodosStore", {
          id: this.uniqueIdTodos,
          label: this.addLabel
        });
        if (!this.isInStore) {
          this.todoListData.push({
            id: this.uniqueIdTodos,
            label: this.addLabel
          });
        }

        this.addLabel = "";
        this.saveTodos();
      }
    },
    editTodo(index) {
      if (this.cooldownStatus) {
        this.todoListData[index].label = this.$store.state.todosData[
          this.uniqueIdTodos
        ][index].label;

        this.$store.commit("toggleTodoStoreEdit", {
          id: this.uniqueIdTodos,
          toggleValue: true,
          index: index
        });
      }
    },
    confirmTodo(index) {
      this.$store.commit("toggleTodoStoreEdit", {
        id: this.uniqueIdTodos,
        toggleValue: false,
        index: index
      });

      this.$store.commit("updateTotosText", {
        id: this.uniqueIdTodos,
        index: index,
        label: this.todoListData[index].label
      });

      this.saveTodos();
      this.setCooldown();
    },
    saveTodos() {
      localStorage.setItem(
        `todoList${this.uniqueIdTodos}`,
        JSON.stringify(this.$store.state.todosData[this.uniqueIdTodos])
      );
    },
    /**
     * Fonction pas très propre, mais bon ça marche
     */
    autoGrow(index) {
      if (this.cooldownStatus) {
        setTimeout(() => {
          const ref = this.$refs[`textarea${index}${this.uniqueIdTodos}`][0]; // à l'arrache hein
          ref.style.height = "5px";
          ref.style.height = ref.scrollHeight + "px";
          ref.focus();
        }, 1);
      }
    },
    changeTodoValue(key, evt) {
      this.$store.commit("updateTotosText", {
        id: this.uniqueIdTodos,
        index: key,
        label: evt.data
      });
    },
    chargeTodoListData() {
      this.todoListData = this.$store.state.todosData[this.uniqueIdTodos];
    },
    toggleTodoData(i) {
      this.$store.commit("updateTodosFinished", {
        id: this.uniqueIdTodos,
        index: i,
        value: !this.todoListData[i].finished
      });

      this.saveTodos();
    }
  }
};
</script>

<style scoped>
.todo {
  margin-top: 15px;
  height: 100%;
  overflow: auto;
}

.todo-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
}

.todo-list-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;

  overflow-wrap: anywhere;
  margin-bottom: 10px;
}

.todo-list-item label:hover {
  cursor: pointer;
}

.todo-list-item input[type="checkbox"] {
  margin-left: 0;
}

.todo-list-item textarea {
  width: 100%;
  font-family: "Quicksand", sans-serif;
  border: none;
  font-size: 16px;
  margin: 0;
  padding: 0;
  outline: none;

  resize: none;
  overflow: hidden;
  min-height: 0px;
}

.todo-list-button {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  align-content: center;
  color: rgb(50, 50, 50);
}

.todo-icon-secondary {
  color: rgb(200, 200, 200);
}

.todo-list-button .todo-icon {
  margin-left: 10px;
  font-size: 16px;
}

.todo-icon:hover {
  cursor: pointer;
}

.add-todo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}

.add-todo input {
  width: 100%;
  margin-left: 5px;
  border: none;
  outline: none;
  font-family: "Quicksand", sans-serif;
  font-size: 16px;
}

.add-todo .todo-icon {
  font-size: 16px;
}

.finished {
  text-decoration: line-through;
}

/* test */

input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

input[type="checkbox"] + label::before {
  content: "\a0";
  display: inline-block;
  margin: 0.2em 0.5em;
  margin-left: 0;
  width: 0.8em;
  height: 0.8em;
  line-height: 0.75em;
  transition: all 0.5s;
  border: 1px solid silver;
  border-radius: 3px;
}

input[type="radio"] + label::before {
  border-radius: 50%;
}

input[type="checkbox"]:checked + label::before {
  content: "\a0";
  background: hsl(0, 70%, 70%);
  border: 1px solid white;
  box-shadow: inset 0 0 0 1px white, 0 0 0 1px hsl(0, 70%, 70%);
  margin-left: 5px;
}
</style>
