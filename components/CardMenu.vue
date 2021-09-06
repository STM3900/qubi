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
    <p>{{ activeItems }}</p>
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
          value: "notes",
          active: true,

          isResizable: true,
          minW: 2,
          minH: 4,

          w: 4,
          h: 4
        },
        {
          name: "Heure du jour",
          value: "clock",
          active: true,

          w: 3,
          h: 3
        },
        {
          name: "Jourbon",
          value: "jourbon",
          active: true,

          w: 3,
          h: 3
        },
        {
          name: "Timer",
          value: "timer",
          active: true,

          w: 3,
          h: 3
        },
        {
          name: "Ma TodoList",
          value: "todo",
          active: true,

          isResizable: true,

          w: 3,
          h: 3
        },
        {
          name: "Chronomètre",
          value: "stopwatch",
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
      const name = item.name;
      this.activeItems.push({ name });
      item.active = false;
    },
    unableItem(item) {
      const name = item.name;
      this.activeItems.splice(this.activeItems.indexOf(name), 1);
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
}

li:hover {
  cursor: pointer;
}

.inactive {
  opacity: 0.5;
}
</style>
