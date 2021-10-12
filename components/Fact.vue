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
  height: calc(90% + 30px);
  overflow: auto;
  margin-top: 10px;
}

p {
  font-style: italic;
  font-size: 14px;
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
}
</style>
