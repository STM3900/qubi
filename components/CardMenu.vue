<template>
  <nav>
    <p
      v-for="(item, i) in $store.state.cardList"
      :key="i"
      :class="{ inactive: !item.active }"
      @click="item.active ? activateItem(item) : ''"
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

  mounted() {
    if (localStorage.getItem("layoutMenu")) {
      console.log("Menu détecté");

      this.$store.commit(
        "setMenuValue",
        JSON.parse(localStorage.getItem("layoutMenu"))
      );

      for (let i = 0; i < this.$store.state.cardList.length; i++) {
        if (this.$store.state.cardList[i].numberAvailable < 1) {
          this.$store.commit("toggleItem", {
            selected: this.$store.state.cardList[i].selected,
            toggleValue: false
          });
        }
      }

      this.saveMenu();
    }
  },
  methods: {
    activateItem(item) {
      const selected = item.selected;
      if (item.numberAvailable > 0) {
        this.$store.commit("changeValueOfItem", {
          selected: selected,
          value: -1
        });

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
      }
      if (item.numberAvailable == 0) {
        this.$store.commit("toggleItem", {
          selected: selected,
          toggleValue: false
        });
      }
    },
    unableItem(item) {
      const selected = item.selected;

      this.$emit("delete-card", selected);
      if (item.numberAvailable != item.numberMax - 1) {
        this.$store.commit("changeValueOfItem", {
          selected: selected,
          value: 1
        });
      } else {
        this.$store.commit("changeValueOfItem", {
          selected: selected,
          value: 1
        });
        this.$store.commit("toggleItem", {
          selected: selected,
          toggleValue: true
        });
      }

      this.saveMenu();
    },
    saveMenu() {
      localStorage.setItem(
        "layoutMenu",
        JSON.stringify(this.$store.state.cardList)
      );
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
