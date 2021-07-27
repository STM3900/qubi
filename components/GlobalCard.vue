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
      <h1>{{ timestamp }}</h1>
    </div>
    <div class="card" v-if="selected == 'notes'">
      <section>
        <fa class="icon" icon="star" />
        <h3>Mes notes</h3>
      </section>
      <textarea
        placeholder="Ecrivez ce qu'il vous passe par la tête"
        name=""
        id=""
        v-model="message"
        @input="saveData"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    selected: String
  },
  data() {
    return {
      timestamp: new Date().toLocaleTimeString(),
      message: ""
    };
  },
  created() {
    if (this.selected == "clock") {
      setInterval(this.getNow, 1000);
    }

    localStorage.getItem("data")
      ? (this.message = localStorage.getItem("data"))
      : (this.message = "");
  },
  methods: {
    getNow() {
      const today = new Date();
      this.timestamp = today.toLocaleTimeString();
    },
    saveData() {
      localStorage.setItem("data", this.message);
    }
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

textarea {
  margin-top: 15px;

  width: 100%;
  height: 100%;
  resize: none;
  outline: none;
  font-family: "Quicksand", sans-serif;
  font-size: 16px;
  border: none;
}

::-webkit-scrollbar {
  width: 4px;
  background: #ffffff;
  border-left: 1px solid #ffffff;
}

::-webkit-scrollbar-track {
  border-radius: 1px;
}

::-webkit-scrollbar-thumb {
  background: rgb(50, 50, 50);
  border-left: 0px solid #ffffff;
}
</style>
