<template>
  <div :class="selected == 'menu' ? 'menu-background-card' : ''">
    <div v-if="selected == 'truc'">
      <section>
        <fa class="icon" icon="code" />
        <h3>Titre de ma carte</h3>
      </section>
      <p>Description et contenu</p>
    </div>
    <div class="card" v-if="selected == 'clock'">
      <section>
        <fa
          class="icon"
          icon="clock"
          :style="{ color: `hsl(${store[2].color}, 70%, 70%)` }"
        />
        <h3>Heure du jour</h3>
      </section>
      <Time />
    </div>
    <div class="card" v-if="selected == 'notes'">
      <section>
        <fa
          class="icon"
          icon="sticky-note"
          :style="{ color: `hsl(${store[1].color}, 70%, 70%)` }"
        />
        <h3>Mes notes</h3>
      </section>
      <Note :uniqueIdNotes="uniqueIdCardNotes" />
    </div>
    <div class="card" v-if="selected == 'jourbon'">
      <section>
        <fa
          class="icon"
          icon="random"
          :style="{ color: `hsl(${store[6].color}, 70%, 70%)` }"
        />
        <h3>Jourbon</h3>
      </section>
      <Jourbon />
    </div>
    <div class="card" :class="{ timer: shakeTimer }" v-if="selected == 'timer'">
      <section>
        <fa
          class="icon"
          icon="hourglass"
          :style="{ color: `hsl(${store[4].color}, 70%, 70%)` }"
        />
        <h3>Timer</h3>
      </section>
      <Timer @shakeTimer="shakeTimer = !shakeTimer" />
    </div>
    <div class="card" v-if="selected == 'todo'">
      <section>
        <fa
          class="icon"
          icon="list-ul"
          :style="{ color: `hsl(${store[0].color}, 70%, 70%)` }"
        />
        <h3>Ma TodoList</h3>
      </section>
      <Todo :uniqueIdTodos="uniqueIdCardTodos" />
    </div>
    <div class="card" v-if="selected == 'stopwatch'">
      <section>
        <fa
          class="icon"
          icon="stopwatch"
          :style="{ color: `hsl(${store[3].color}, 70%, 70%)` }"
        />
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
        <fa
          class="icon"
          icon="code"
          :style="{ color: `hsl(${store[5].color}, 70%, 70%)` }"
        />
        <h3>Fond d'écran</h3>
      </section>
      <Background />
    </div>
    <fa
      v-if="selected != 'menu'"
      class="icon delete-button"
      icon="times"
      :style="{
        'border-bottom-color': $store.state.backgroundColor,
        'border-left-color': $store.state.backgroundColor
      }"
      @click="deleteCardButton(selected)"
    />
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
      store: this.$store.state.cardList
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
      this.$store.commit("changeValueOfItem", {
        selected: selected,
        value: 1
      });
      this.$store.commit("toggleItem", {
        selected: selected,
        toggleValue: true
      });

      this.$emit("delete-card-layout-button", this.id);

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

.menu-background-card {
  background: white;
  border-radius: 5px;
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

.delete-button {
  position: absolute;
  top: -0px;
  right: -0px;
  font-size: 16px;
  padding: 8px 14px;
  border-bottom: solid 3px;
  border-left: solid 3px;
  border-bottom-left-radius: 5px;
  transition: 0.3s;
  color: rgb(50, 50, 50);
}

.delete-button:hover {
  cursor: pointer;
}

.timer {
  animation: tremblementerror 0.3s 0s 1;
}

@keyframes tremblementerror {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  16% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  32% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  48% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  64% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  80% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  100% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
}
</style>
