<template>
  <div class="container">
    <div class="card">
      <fa class="icon" icon="code" />
      <h1>Titre de ma carte</h1>
      <p>Description et contenu</p>
    </div>
    <div class="card card-2">
      <fa class="icon" icon="database" />
      <h1>Titre de ma seconde carte</h1>
      <p>Description et contenu 2</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  gap: 15px 25px;
}

.card {
  padding: 20px;
  border-radius: 5px;
  background: white;
  font-family: "Quicksand", sans-serif;
  width: 500px;
}

.card-2 {
  width: 800px;
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
