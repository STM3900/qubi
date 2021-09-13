<template>
  <div class="todo">
    <div
      v-for="(item, i) in $store.state.todosData[this.uniqueIdTodos]"
      :key="i"
      class="todo-list"
    >
      <section class="todo-list-item">
        <input
          type="checkbox"
          :id="`checkbox${i}`"
          v-model="todoData[i].finished"
        />
        <label
          v-if="!item.onEdit"
          :for="`checkbox${i}`"
          :class="{ finished: item.finished }"
          >{{ item.label }}</label
        >
        <textarea
          v-else
          type="text"
          :ref="`textarea${i}`"
          @blur="confirmTodo(i)"
          @keyup.enter="confirmTodo(i)"
          @input="autoGrow(i)"
          v-model="item.label"
        ></textarea>
      </section>
      <section class="todo-list-button">
        <fa @click="removeTodo(i)" class="todo-icon" icon="times" />
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
      <fa @click="addTodo" class="todo-icon" icon="plus" />
      <input
        type="text"
        v-model="addLabel"
        @keyup.enter="addTodo"
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
      todoList: [],
      addLabel: "",
      cooldownStatus: true
    };
  },
  mounted() {
    /*
    localStorage.getItem("todoList")
      ? (this.todoList = JSON.parse(localStorage.getItem("todoList")))
      : (this.todoList = []);
    */
  },
  computed: {
    todoData: {
      get() {
        return this.$store.state.todosData[this.uniqueIdTodos];
      },
      set(value) {
        this.$store.commit("updateTodosFinished", {
          id: this.uniqueIdNotes,
          data: value,
          index: 0
        });
      }
    }
  },
  methods: {
    setCooldown() {
      this.cooldownStatus = false;
      setTimeout(() => {
        this.cooldownStatus = true;
      }, 100);
    },
    removeTodo(index) {
      this.$store.commit("removeTodoStore", {
        id: this.uniqueIdTodos,
        index: index
      });
      this.saveTodos();
    },
    addTodo() {
      if (this.addLabel) {
        console.log(this.uniqueIdTodos);
        this.$store.commit("addTodosStore", {
          id: this.uniqueIdTodos,
          label: this.addLabel
        });
        this.addLabel = "";
        this.saveTodos();
      }
    },
    editTodo(index) {
      if (this.cooldownStatus) {
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
      this.saveTodos();
      this.setCooldown();
    },
    saveTodos() {
      // localStorage.setItem("todoList", JSON.stringify(this.todoList));
    },
    /**
     * Fonction pas très propre, mais bon ça marche
     */
    autoGrow(index) {
      if (this.cooldownStatus) {
        setTimeout(() => {
          const ref = this.$refs[`textarea${index}`][0]; // à l'arrache hein
          ref.style.height = "5px";
          ref.style.height = ref.scrollHeight + "px";
          ref.focus();
        }, 1);
      }
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
</style>
