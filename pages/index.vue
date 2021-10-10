<template>
  <div>
    <client-only>
      <grid-layout
        :style="{
          backgroundColor: $store.state.backgroundColor,
          backgroundImage: `url(${this.$store.state.backgroundImage})`
        }"
        :layout.sync="menuLayout"
        :col-num="12"
        :row-height="30"
        :is-draggable="draggable"
        :is-resizable="resizable"
        :responsive="responsive"
        :vertical-compact="true"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="(item, index) in menuLayout"
          :static="item.static"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="index"
          :isResizable="item.isResizable"
          :isDraggable="$store.state.cardCanMove"
          :minW="item.minW"
          :minH="item.minH"
          @resized="saveCard"
          @moved="saveCard"
          :class="
            item.selected == 'menu' && $store.state.lastItemMenuActive
              ? 'background-menu'
              : ''
          "
        >
          <div
            class="content"
            @click="$store.commit('updateCardCanMove', true)"
          >
            <GlobalCard
              :selected="item.selected"
              :uniqueIdCardNotes="item.uniqueIdNotes"
              :uniqueIdCardTodos="item.uniqueIdTodos"
              :id="index"
              @add-card-layout="addCardLayout"
              @delete-card-layout="deleteCardLayout"
              @delete-card-layout-button="deleteCardLayoutButton"
              :class="item.selected != 'menu' ? 'card-padding' : ''"
            />
          </div>
        </grid-item>
      </grid-layout>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uniqueIdNotes: 0,
      uniqueIdTodos: 0,
      uniqueIdNotesList: [],
      uniqueIdTodosList: [],
      menuLayout: [],
      fillerTab: [],

      draggable: true,
      resizable: false,
      responsive: true
    };
  },
  mounted() {
    this.menuLayout = JSON.parse(localStorage.getItem("layout")) ?? [];
    this.uniqueIdNotesList =
      JSON.parse(localStorage.getItem("uniqueIdNotesList")) ?? [];
    this.uniqueIdTodosList =
      JSON.parse(localStorage.getItem("uniqueIdTodosList")) ?? [];
    let isMenu = false;
    for (let i = 0; i < this.menuLayout.length; i++) {
      if (this.menuLayout[i].selected == "menu") {
        isMenu = true;
      }
    }
    if (!isMenu) {
      this.menuLayout.push({
        selected: "menu",
        w: 2,
        h: 10,
        x: 0,
        y: 0
      });
    }

    /*background */
    if (localStorage.getItem("backgroundColor")) {
      this.$store.commit(
        "updateBackgroundColor",
        localStorage.getItem("backgroundColor")
      );
    }
    if (localStorage.getItem("backgroundImg")) {
      this.$store.commit(
        "updateBackgroundImage",
        localStorage.getItem("backgroundImg")
      );
    }

    this.menuLayout = this.menuLayout.concat(this.fillerTab);
    this.updateCardId();
  },
  methods: {
    saveCard() {
      localStorage.setItem("layout", JSON.stringify(this.menuLayout));
    },
    addCardLayout(card) {
      card.x = 0;
      card.y = 0;
      if (card.selected == "notes") {
        let uniqueIdOk;

        if (this.uniqueIdNotesList.length) {
          uniqueIdOk = this.uniqueIdNotesList[0];
          this.uniqueIdNotesList.shift();
        } else {
          if (this.uniqueIdNotes >= 3) {
            this.uniqueIdNotes = 0;
          }
          uniqueIdOk = this.uniqueIdNotes;
        }

        card.uniqueIdNotes = uniqueIdOk;
        this.uniqueIdNotes++;
      } else if (card.selected == "todo") {
        let uniqueIdOk;

        if (this.uniqueIdTodosList.length) {
          uniqueIdOk = this.uniqueIdTodosList[0];
          this.uniqueIdTodosList.shift();
        } else {
          if (this.uniqueIdTodos >= 3) {
            this.uniqueIdTodos = 0;
          }
          uniqueIdOk = this.uniqueIdTodos;
        }

        card.uniqueIdTodos = uniqueIdOk;
        this.uniqueIdTodos++;
      }

      this.menuLayout.push(card);
      this.updateCardId();
      this.saveCard();
    },
    deleteCardLayout(itemSelected) {
      this.menuLayout.splice(this.menuLayout.indexOf(itemSelected), 1);
      this.updateCardId();
      this.saveCard();
    },
    deleteCardLayoutButton(index) {
      const currentUniqueIdNotes = this.menuLayout[index].uniqueIdNotes;
      const currentUniqueIdTodos = this.menuLayout[index].uniqueIdTodos;

      if (currentUniqueIdNotes != undefined) {
        localStorage.removeItem(`data${currentUniqueIdNotes}`);

        this.uniqueIdNotesList.push(currentUniqueIdNotes);
        localStorage.setItem(
          "uniqueIdNotesList",
          JSON.stringify(this.uniqueIdNotesList)
        );

        this.$store.commit("updateNotesData", {
          id: currentUniqueIdNotes,
          data: ""
        });
      }

      if (currentUniqueIdTodos != undefined) {
        localStorage.removeItem(`todoList${currentUniqueIdTodos}`);

        this.uniqueIdTodosList.push(currentUniqueIdTodos);
        localStorage.setItem(
          "uniqueIdTodosList",
          JSON.stringify(this.uniqueIdTodosList)
        );

        this.$store.commit("updateTodoList", {
          id: currentUniqueIdNotes,
          value: []
        });
      }
      this.menuLayout.splice(index, 1);
      this.updateCardId();
      this.saveCard();
    },
    updateCardId() {
      for (let i = 0; i < this.menuLayout.length; i++) {
        this.menuLayout[i].i = i + 1;
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  gap: 15px 25px;
}

/* grid layout */

.vue-grid-layout {
  min-height: 100vh;
  overflow: hidden;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 10;
}

.vue-grid-item {
  transition: 0.3s;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: white;
  border-radius: 5px;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.background-menu {
  background: rgb(245, 245, 245) !important;
}

.vue-grid-item .content {
  font-family: "Quicksand", sans-serif;
  height: 100%;
}

.card-padding {
  padding: 20px;
}

.vue-grid-item .text {
  font-size: 24px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}

.testcard {
  transform: rotate(10deg);
}
</style>
