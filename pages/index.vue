<template>
  <div>
    <client-only>
      <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="draggable"
        :is-resizable="resizable"
        :responsive="responsive"
        :vertical-compact="true"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="item in layout"
          :static="item.static"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
          :isResizable="item.isResizable"
          :minW="item.minW"
        >
          <div class="content"><GlobalCard :selected="item.selected" /></div>
        </grid-item>
      </grid-layout>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 4, h: 4, i: "0", selected: "truc" },
        { x: 8, y: 0, w: 3, h: 3, i: "1", selected: "clock" },
        {
          x: 4,
          y: 0,
          w: 4,
          h: 4,
          i: "2",
          selected: "notes",
          isResizable: true,
          minW: 2
        }
      ],
      draggable: true,
      resizable: false,
      responsive: true,
      index: 0
    };
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

/*
Idées de widgets :
- Affichage de l'heure
- La météo (difficile)
- Todo
- Embed de site ?
- Mini jeu ?
- Lecteur de musique ? (inutile)
- Galerie d'images ?
- Bloc note
*/
</style>
