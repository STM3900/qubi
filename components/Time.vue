<template>
  <div>
    <h1>{{ timestamp }}</h1>
  </div>
</template>

<script>
export default {
  name: "Time",
  data() {
    return {
      timestamp: new Date().toLocaleTimeString()
    };
  },
  mounted() {
    setInterval(this.getNow, 1000);
  },
  methods: {
    getNow() {
      const today = new Date();
      this.timestamp = today.toLocaleTimeString();
    }
  }
};
</script>

<style scoped>
h1 {
  font-family: "Roboto Mono", monospace;
  margin: 0;
  font-weight: normal;
  font-size: 36px;
}
</style>
