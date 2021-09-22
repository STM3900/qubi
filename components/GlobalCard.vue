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
        <fa class="icon" icon="clock" />
        <h3>Heure du jour</h3>
      </section>
      <Time />
    </div>
    <div class="card" v-if="selected == 'notes'">
      <section>
        <fa class="icon" icon="sticky-note" />
        <h3>Mes notes</h3>
      </section>
      <Note :uniqueIdNotes="uniqueIdCardNotes" />
    </div>
    <div class="card" v-if="selected == 'jourbon'">
      <section>
        <fa class="icon" icon="random" style="color: #ef476f;" />
        <h3>Jourbon</h3>
      </section>
      <Jourbon />
    </div>
    <div class="card" :class="{ timer: shakeTimer }" v-if="selected == 'timer'">
      <section>
        <fa class="icon" icon="hourglass" />
        <h3>Timer</h3>
      </section>
      <Timer @shakeTimer="shakeTimer = !shakeTimer" />
    </div>
    <div class="card" v-if="selected == 'todo'">
      <section>
        <fa class="icon" icon="list-ul" />
        <h3>Ma TodoList</h3>
      </section>
      <Todo :uniqueIdTodos="uniqueIdCardTodos" />
    </div>
    <div class="card" v-if="selected == 'stopwatch'">
      <section>
        <fa class="icon" icon="stopwatch" />
        <h3>Chronomètre</h3>
      </section>
      <Stopwatch />
    </div>
    <div class="card" v-if="selected == 'filler'"></div>
    <div class="card" v-if="selected == 'menu'">
      <section>
        <h3 class="menu-title">Menu</h3>
      </section>
      <CardMenu @add-card="addCard" @delete-card="deleteCard" />
    </div>
    <div class="card" v-if="selected == 'background'">
      <section>
        <fa class="icon" icon="code" />
        <h3>Fond d'écran</h3>
      </section>
      <Background />
    </div>
    <button v-if="selected != 'menu'" @click="deleteCardButton(selected)">
      delete
    </button>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    selected: String,
    id: Number,
    uniqueIdCardNotes: Number,
    uniqueIdCardTodos: Number
  },
  data() {
    return {
      shakeTimer: false,
      ntm: ["ntm connard", "ntm l'informatique", "ntm ma vie"]
    };
  },
  methods: {
    addCard(objectCard) {
      this.$emit("add-card-layout", objectCard);
    },
    deleteCard(selected) {
      this.$emit("delete-card-layout", selected);
    },
    deleteCardButton(selected) {
      this.$emit("delete-card-layout-button", this.id);
      const indexSelected = this.$store.state.indexOfSelected;
      const storenumberAvailable = this.$store.state.cardList[indexSelected]
        .numberAvailable;
      const storenumberMax = this.$store.state.cardList[indexSelected]
        .numberMax;

      if (storenumberAvailable != storenumberMax - 1) {
        this.$store.commit("changeValueOfItem", {
          selected: selected,
          value: 1
        });
      } else {
        this.$store.commit("changeValueOfItem", {
          selected: selected,
          value: 1
        });
        this.$store.commit("toggleItem", {
          selected: selected,
          toggleValue: true
        });
      }

      localStorage.setItem(
        "layoutMenu",
        JSON.stringify(this.$store.state.cardList)
      );
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

.menu-title {
  padding: 20px;
}

.card p {
  margin-top: 5px;
}

.timer {
  animation: tremblementerror 0.3s 0s 1;
}

@keyframes tremblementerror {
  0% {
    transform: translate(0);
  }

  20% {
    transform: translate(10px);
  }

  40% {
    transform: translate(-10px);
  }

  60% {
    transform: translate(10px);
  }

  80% {
    transform: translate(-10px);
  }

  100% {
    transform: translate(0);
  }
}
</style>
