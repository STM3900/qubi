<template>
  <div>
    <h1>Le menu</h1>
    <ul>
      <li
        v-for="(item, i) in cardList"
        :key="i"
        :class="{ inactive: !item.active }"
        @click="item.active ? activateItem(item) : unableItem(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CardMenu",
  data() {
    return {
      cardList: [
        {
          name: "Mes notes",
          selected: "notes",
          active: true,

          isResizable: true,
          minW: 2,
          minH: 4,

          w: 4,
          h: 4
        },
        {
          name: "Heure du jour",
          selected: "clock",
          active: true,

          w: 3,
          h: 3
        },
        {
          name: "Jourbon",
          selected: "jourbon",
          active: true,

          w: 3,
          h: 3
        },
        {
          name: "Timer",
          selected: "timer",
          active: true,

          w: 3,
          h: 3
        },
        {
          name: "Ma TodoList",
          selected: "todo",
          active: true,

          isResizable: true,
          minW: 3,
          minH: 6,

          w: 3,
          h: 8
        },
        {
          name: "Chronomètre",
          selected: "stopwatch",
          active: true,

          w: 3,
          h: 3
        }
      ],
      activeItems: []
    };
  },
  methods: {
    activateItem(item) {
      const selected = item.selected;
      const w = item.w;
      const h = item.h;

      const isResizable = item.isResizable;
      const minW = item.minW;
      const minH = item.minH;

      const objectCard = {
        selected,
        w,
        h,
        isResizable,
        minW,
        minH
      };

      this.$emit("add-card", objectCard);
      item.active = false;
    },
    unableItem(item) {
      const selected = item.selected;

      this.$emit("delete-card", selected);
      item.active = true;
      /**
       * let arr = ['A', 'B', 'C'];
       * arr = arr.filter(e => e !== 'B'); // will return ['A', 'C']
       */
    }
  }
};
</script>

<style scoped>
h1 {
  font-family: "Quicksand", sans-serif;
}

li {
  font-family: "Quicksand", sans-serif;
  transition: 0.2s;
}

li:hover {
  cursor: pointer;
}

.inactive {
  opacity: 0.5;
}
</style>
