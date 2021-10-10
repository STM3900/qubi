<template>
  <p>"{{ fact }}"</p>
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
p {
  font-style: italic;
  font-size: 14px;
}
</style>
