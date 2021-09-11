<template>
  <nav>
    <p
      v-for="(item, i) in cardList"
      :key="i"
      :class="{ inactive: !item.active }"
      @click="item.active ? activateItem(item) : unableItem(item)"
    >
      <fa class="icon-menu" :icon="item.icon" />
      {{ item.name }}
      {{ item.numberAvailable }}
    </p>
  </nav>
</template>

<script>
export default {
  name: "CardMenu",
  data() {
    return {
      cardList: [
        {
          name: "Mes notes",
          icon: "sticky-note",
          selected: "notes",
          active: true,

          isResizable: true,
          minW: 2,
          minH: 4,
          numberAvailable: 3,
          numberMax: 3,

          w: 4,
          h: 4
        },
        {
          name: "Heure du jour",
          icon: "clock",
          selected: "clock",
          active: true,
          numberAvailable: 1,
          numberMax: 1,

          w: 3,
          h: 3
        },
        {
          name: "Jourbon",
          icon: "random",
          selected: "jourbon",
          active: true,
          numberAvailable: 1,
          numberMax: 1,

          w: 3,
          h: 3
        },
        {
          name: "Timer",
          icon: "hourglass",
          selected: "timer",
          active: true,
          numberAvailable: 1,
          numberMax: 1,

          w: 3,
          h: 3
        },
        {
          name: "Ma TodoList",
          icon: "list-ul",
          selected: "todo",
          active: true,
          numberAvailable: 3,
          numberMax: 3,

          isResizable: true,
          minW: 3,
          minH: 6,

          w: 3,
          h: 8
        },
        {
          name: "Chronomètre",
          icon: "stopwatch",
          selected: "stopwatch",
          active: true,
          static: false,
          numberAvailable: 1,
          numberMax: 1,

          w: 3,
          h: 3
        },
        {
          name: "Fond d'écran",
          icon: "code",
          selected: "background",
          active: true,
          static: false,
          numberAvailable: 1,
          numberMax: 1,

          w: 3,
          h: 3
        }
      ],
      activeItems: []
    };
  },
  mounted() {
    if (localStorage.getItem("layoutMenu")) {
      this.cardList = JSON.parse(localStorage.getItem("layoutMenu"));
    }
  },
  methods: {
    activateItem(item) {
      if (item.numberAvailable > 0) {
        item.numberAvailable--;

        const selected = item.selected;
        const w = item.w;
        const h = item.h;

        const isResizable = item.isResizable;
        const isStatic = item.static;
        const isDraggable = item.isDraggable;
        const minW = item.minW;
        const minH = item.minH;

        const objectCard = {
          selected,
          w,
          h,
          isResizable,
          static: isStatic,
          isDraggable,
          minW,
          minH
        };

        this.$emit("add-card", objectCard);

        this.saveMenu();
        console.log(objectCard);
      }
      if (item.numberAvailable == 0) {
        item.active = false;
      }
    },
    unableItem(item) {
      const selected = item.selected;
      item.numberAvailable = item.numberMax;

      this.$emit("delete-card", selected);
      item.active = true;
      this.saveMenu();
      /**
       * let arr = ['A', 'B', 'C'];
       * arr = arr.filter(e => e !== 'B'); // will return ['A', 'C']
       */
    },
    saveMenu() {
      //! localStorage.setItem("layoutMenu", JSON.stringify(this.cardList));
    }
  }
};
</script>

<style scoped>
nav {
  background: white;
  z-index: 999;
}

.icon-menu {
  margin-right: 5px;
  color: rgb(150, 150, 150);
}

p {
  font-family: "Quicksand", sans-serif;
  transition: 0.2s;
  margin: 0;
  /* haut | droit | bas | gauche */
  padding: 10px 20px 10px 20px;
}

p:hover {
  cursor: pointer;
}

.inactive {
  background: rgb(245, 245, 245);
  color: black;
}
</style>
