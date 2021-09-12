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
          :class="getClass(item.selected)"
        >
          <div
            class="content"
            @click="$store.commit('updateCardCanMove', true)"
          >
            <GlobalCard
              :selected="item.selected"
              @add-card-layout="addCardLayout"
              @delete-card-layout="deleteCardLayout"
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
      menuLayout: [],
      fillerTab: [],

      draggable: true,
      resizable: false,
      responsive: true
    };
  },
  mounted() {
    this.menuLayout = JSON.parse(localStorage.getItem("layout")) ?? [];
    /*
      this.deleteCardLayout("filler");
      this.generateFillers();
    */
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

    this.menuLayout = this.menuLayout.concat(this.fillerTab);
    this.updateCardId();
  },
  methods: {
    saveCard() {
      // localStorage.setItem("layout", JSON.stringify(this.menuLayout));
    },
    addCardLayout(card) {
      card.x = 0;
      card.y = 0;

      this.menuLayout.push(card);
      this.updateCardId();
      this.saveCard();
    },
    deleteCardLayout(itemSelected) {
      this.menuLayout.splice(this.menuLayout.indexOf(itemSelected), 1);
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
      const bannedCoords = [];
      let counterTab = 0;

      let fillerWidth = 1;
      let fillerHeight = 1;

      for (let i = 0; i < this.menuLayout.length; i++) {
        for (let j = 0; j < this.menuLayout[i].h; j++) {
          for (let k = 0; k < this.menuLayout[i].w; k++) {
            bannedCoords.push({
              x: this.menuLayout[i].x + k,
              y: this.menuLayout[i].y + j
            });
          }
        }
      }
      for (let i = 0; i < 288; i++) {
        while (counterTab < bannedCoords.length && pass) {
          if (
            bannedCoords[counterTab].x == counter &&
            bannedCoords[counterTab].y == heightCounter
          ) {
            pass = false;
          }
          counterTab++;
        }
        counterTab = 0;
        if (pass) {
          this.fillerTab.push({
            selected: "filler",
            w: fillerWidth,
            h: fillerHeight,
            x: counter,
            y: heightCounter,
            isDraggable: false
          });
        } else {
          pass = true;
        }
        counter++;

        if (counter > 11) {
          counter = 0;
          heightCounter++;
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
  min-height: 100vh;
  overflow: hidden;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 10;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: white;
  border-radius: 5px;
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
</style>
