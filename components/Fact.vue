<template>
  <div>
    <p>"{{ fact }}"</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Fact",
  data() {
    return {
      fact: ""
    };
  },
  mounted() {
    axios
      .get("https://uselessfacts.jsph.pl/today.json?language=en")
      .then(response => (this.fact = response.data.text));
  }
};
</script>

<style scoped>
div {
  /* promis le prochain projet je le structure bien et je refais plus de trucs comme ça */
  height: calc(100% + 30px);
  overflow: auto;
}

p {
  font-style: italic;
  font-size: 14px;
}
</style>
