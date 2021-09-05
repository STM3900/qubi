<template>
  <div>
    <h1>Le menu</h1>
    <ul>
      <li v-for="(item, i) in cardList" :key="i" :class="{ inactive: !item.active }" @click="item.active ? activateItem(item) : unableItem(item)">{{ item.name }}</li>
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
            active: true
        },
        {
            name: "Heure du jour",
            active: true
        },
        {
            name: "Jourbon",
            active: true
        },
        {
            name: "Timer",
            active: true
        },
        {
            name: "Ma TodoList",
            active: true
        },
        {
            name: "Chronomètre",
            active: true
        },
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
}
</script>

<style scoped>
h1 {
  font-family: "Quicksand", sans-serif;
}

li{
  font-family: "Quicksand", sans-serif;
}

li:hover {
  cursor: pointer;
}

.inactive {
  opacity: 0.5;
}
</style>