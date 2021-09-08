<template>
  <div>
    <input
      type="color"
      v-model="backgroundColor"
      id="colorpicker"
      value="#0000ff"
      @change="setStyle()"
    />
    <input type="text" v-model="backgroundUrl" id="backgroundUrl" />
    <div class="background-test"></div>
  </div>
</template>

<script>
export default {
  name: "Background",
  data() {
    return {};
  },
  mounted() {
    if (localStorage.getItem("backgroundColor")) {
      this.$store.commit(
        "updateBackgroundColor",
        localStorage.getItem("backgroundColor")
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

.background-test {
  height: 100px;
}
</style>
