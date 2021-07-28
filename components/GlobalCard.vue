<template>
  <div>
    <div class="card" v-if="selected == 'truc'">
      <section>
        <fa class="icon" icon="code" />
        <h3>Titre de ma carte</h3>
      </section>
      <p>Description et contenu</p>
    </div>

    <div class="card" v-if="selected == 'clock'">
      <section>
        <fa class="icon" icon="code" />
        <h3>Heure de la journée</h3>
      </section>
      <Time />
    </div>
    <div class="card" v-if="selected == 'notes'">
      <section>
        <fa class="icon" icon="star" />
        <h3>Mes notes</h3>
      </section>
      <Note />
    </div>
    <div class="card" v-if="selected == 'jourbon'">
      <section>
        <fa class="icon" icon="random" style="color: #ef476f;" />
        <h3>Jourbon</h3>
      </section>
      <Jourbon />
    </div>
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
div {
  height: calc(100% - 45px);
}

section {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}

.card .icon {
  margin: 0;
  font-size: 18px;
  color: rgb(22, 22, 22);
  margin-right: 10px;
}

.card h1 {
  margin: 0;
}

.card h3 {
  margin: 0;
  font-size: 22px;
}

.card p {
  margin-top: 5px;
}
</style>
