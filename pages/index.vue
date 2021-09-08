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
          v-for="(item, index) in menuLayout"
          :static="item.static"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="index"
          :isResizable="item.isResizable"
          :isDraggable="item.isDraggable"
          :minW="item.minW"
          :minH="item.minH"
          @resized="saveCard"
          @moved="saveCard"
          :class="getClass(item.selected)"
        >
          <div class="content">
            <GlobalCard
              :selected="item.selected"
              @add-card-layout="addCardLayout"
              @delete-card-layout="deleteCardLayout"
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
      menuLayout: [],
      fillerTab: [],

      draggable: true,
      resizable: false,
      responsive: true
    };
  },
  mounted() {
    this.menuLayout = JSON.parse(localStorage.getItem("layout")) ?? [];
    this.deleteCardLayout("filler");
    this.generateFillers();
    let isMenu = false;
    for (let i = 0; i < this.menuLayout.length; i++) {
      if (this.menuLayout[i].selected == "menu") {
        isMenu = true;
      }
    }
    if (!isMenu) {
      this.menuLayout.push({
        selected: "menu",
        w: 3,
        h: 8,
        x: 0,
        y: 0
      });
    }

    this.menuLayout = this.menuLayout.concat(this.fillerTab);
    this.updateCardId();

    console.log(this.menuLayout);
  },
  methods: {
    saveCard() {
      localStorage.setItem("layout", JSON.stringify(this.menuLayout));
    },
    addCardLayout(card) {
      card.x = 0;
      card.y = 0;

      this.menuLayout.push(card);
      this.updateCardId();
      this.saveCard();
    },
    deleteCardLayout(itemSelected) {
      this.menuLayout = this.menuLayout.filter(
        obj => obj.selected != itemSelected
      );
      this.updateCardId();
      this.saveCard();
    },
    updateCardId() {
      for (let i = 0; i < this.menuLayout.length; i++) {
        this.menuLayout[i].i = i + 1;
      }
    },
    getClass(item) {
      return item == "filler" ? "hidden" : "";
    },
    generateFillers() {
      let counter = 0;
      let heightCounter = 0;
      let pass = true;

      for (let i = 0; i < 32; i++) {
        for (let j = 0; j < this.menuLayout.length; j++) {
          if (
            this.menuLayout[j].x == counter * 3 &&
            this.menuLayout[j].y == heightCounter
          ) {
            pass = false;
          }
        }
        if (pass) {
          this.fillerTab.push({
            selected: "filler",
            w: 3,
            h: 3,
            x: 3 * counter,
            y: heightCounter,
            isDraggable: false
          });
        } else {
          pass = true;
        }

        counter++;

        if (counter > 3) {
          counter = 0;
          heightCounter += 3;
        }
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

.hidden {
  /* visibility: hidden; */
}

/* grid layout */

.vue-grid-layout {
  background: #eee; /* à changer */
  min-height: 100vh;
  overflow: hidden;
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
