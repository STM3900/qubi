<template>
  <div>
    <div class="card" v-if="selected == 'truc'">Je suis le truc</div>
    <div class="card" v-if="selected == 'machin'">Je suis le machin</div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    selected: String
  }
};
</script>

<style scoped>
.card {
  padding: 20px;
  border-radius: 5px;
  background: rgb(162, 235, 240);
  font-family: "Quicksand", sans-serif;
  width: 500px;
}

.card .icon {
  margin: 0;
  margin-bottom: 10px;
  font-size: 25px;
  color: rgb(50, 50, 50);
}

.card h1 {
  margin: 0;
}

.card p {
  margin: 0;
}
</style>
