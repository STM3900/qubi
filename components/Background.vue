<template>
  <div class="background">
    <div class="background-menu">
      <section :class="[showInput ? 'section-extended' : 'section-wraped']">
        <fa
          class="icon-background"
          icon="image"
          @click="
            showInput = !showInput;
            checkInput();
          "
        />
        <input
          type="text"
          v-model="backgroundUrl"
          :class="[showInput ? 'input-extended' : 'input-hide']"
          id="backgroundUrl"
          @input="setBackgroundImg"
        />
      </section>
      <section>
        <aside
          class="color-dot"
          :style="[
            showInput
              ? colorDotDisabled
              : { backgroundColor: $store.state.backgroundColor }
          ]"
          @click="!showInput ? (showPanel = !showPanel) : ''"
        ></aside>
        <color-panel
          class="color-panel"
          :class="{ showpanel: showPanel }"
          v-model="backgroundColor"
          @change="
            setStyle();
            freezeCard();
          "
        ></color-panel>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Background",
  data() {
    return {
      showPanel: false,
      showInput: false,

      colorDotDisabled: {
        backgroundColor: "rgb(150,150,150)",
        opacity: "0.2"
      }
    };
  },
  mounted() {
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
  },
  computed: {
    backgroundColor: {
      get() {
        return this.$store.state.backgroundColor;
      },
      set(value) {
        this.$store.commit("updateBackgroundColor", value);
      }
    },
    backgroundUrl: {
      get() {
        return this.$store.state.backgroundImage;
      },
      set(value) {
        this.$store.commit("updateBackgroundImage", value);
      }
    }
  },
  methods: {
    setStyle() {
      localStorage.setItem(
        "backgroundColor",
        this.$store.state.backgroundColor
      );
    },
    setBackgroundImg() {
      localStorage.setItem("backgroundImg", this.$store.state.backgroundImage);
    },
    freezeCard() {
      if (this.$store.state.cardCanMove) {
        this.$store.commit("updateCardCanMove", false);
        this.$store.commit("deleteBackground");
        localStorage.removeItem("backgroundImg");
      }
    },
    checkInput() {
      if (this.showPanel && this.showInput) {
        this.showPanel = false;
      }
    }
  }
};

/*:style="{ backgroundColor: color }" @click="setBackground"*/
</script>

<style scoped>
h1 {
  font-family: "Roboto Mono", monospace;
  margin: 0;
  font-weight: normal;
  font-size: 36px;
}

.background {
  height: 55px;
  overflow: hidden;
}

.background-menu {
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  gap: 20px;
}

.background-menu section {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}

.background-menu section:first-child {
  border-right: rgb(50, 50, 50) solid 1px;
  padding-right: 20px;
  transition: 0.5s;
}

.background-menu section input {
  transition: 0.5s;
}

.section-wraped {
  width: 25px;
}

.section-extended {
  width: 223px;
}

.input-hide {
  width: 0px;
  clip-path: circle(0% at 0% 50%);
}

.input-extended {
  width: 100%;
  clip-path: circle(100%);
}

.icon-background {
  color: rgb(50, 50, 50);
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-right: 10px;
}

.icon-background:hover {
  cursor: pointer;
}

.color-dot {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  transition: 0.3s;
}

.color-dot:hover {
  cursor: pointer;
}

.color-panel {
  position: absolute;
  right: 15px;
  top: 75px;
  clip-path: circle(0% at 0% 0%);
  transition: 0.3s;
}

.showpanel {
  transition: 0.8s;
  top: 120px;
  /* right: 0px; */
  clip-path: circle(100%);
}
</style>
