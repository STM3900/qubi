<template>
  <div>
    <client-only>
      <grid-layout
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
          v-for="item in menuLayout"
          :static="item.static"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
          :isResizable="item.isResizable"
          :minW="item.minW"
          :minH="item.minH"
        >
          <div class="content">
            <GlobalCard :selected="item.selected" />
          </div>
        </grid-item>
      </grid-layout>
      <CardMenu @add-card="addCard" @delete-card="deleteCard" />
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      layout: [
        { x: 8, y: 0, w: 3, h: 3, i: "0", selected: "clock" },
        {
          x: 4,
          y: 0,
          w: 4,
          h: 4,
          i: "1",
          selected: "notes",
          isResizable: true,
          minW: 2,
          minH: 4
        },
        {
          x: 8,
          y: 0,
          w: 3,
          h: 3,
          i: "2",
          selected: "jourbon"
        },
        {
          x: 8,
          y: 0,
          w: 3,
          h: 3,
          i: "3",
          selected: "timer"
        },
        {
          x: 8,
          y: 0,
          w: 3,
          h: 3,
          i: "4",
          selected: "todo",
          isResizable: true,
          minW: 2,
          minH: 5
        },
        {
          x: 8,
          y: 0,
          w: 3,
          h: 3,
          i: "5",
          selected: "stopwatch"
        }
      ],
      savedLayout: [],
      menuLayout: [],

      draggable: true,
      resizable: false,
      responsive: true
    };
  },
  mounted() {
    if (localStorage.getItem("layout")) {
      this.savedLayout = JSON.parse(localStorage.getItem("layout"));
      for (let i = 0; i < this.savedLayout.length; i++) {
        this.layout[i].x = this.savedLayout[i].x;
        this.layout[i].y = this.savedLayout[i].y;
        this.layout[i].w = this.savedLayout[i].w;
        this.layout[i].h = this.savedLayout[i].h;
      }
    } else {
      for (let i = 0; i < this.layout.length; i++) {
        this.savedLayout.push({
          x: this.layout[i].x,
          y: this.layout[i].y,
          w: this.layout[i].w,
          h: this.layout[i].h
        });
      }
    }
  },
  methods: {
    saveSize(i, newH, newW) {
      this.savedLayout[i].w = newW;
      this.savedLayout[i].h = newH;
      localStorage.setItem("layout", JSON.stringify(this.savedLayout));
    },
    savePosition(i, newX, newY) {
      this.savedLayout[i].x = newX;
      this.savedLayout[i].y = newY;
      localStorage.setItem("layout", JSON.stringify(this.savedLayout));
    },
    addCard(card) {
      card.x = 0;
      card.y = 0;

      this.menuLayout.push(card);
      this.updateCardId();
    },
    deleteCard(itemSelected) {
      this.menuLayout = this.menuLayout.filter(
        obj => obj.selected != itemSelected
      );
      this.updateCardId();
    },
    updateCardId() {
      for (let i = 0; i < this.menuLayout.length; i++) {
        this.menuLayout[i].i = i + 1;
      }
    }
  }
};

/* 
  @resized="saveSize"
  @moved="savePosition"
*/
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
  background: #eee; /* à changer */
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: white;
  border-radius: 5px;
}

.vue-grid-item .content {
  padding: 20px;
  font-family: "Quicksand", sans-serif;
  height: 100%;
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
</style>
