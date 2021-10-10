<template>
  <div>
    <input
      v-model="text"
      type="text"
      @keyup.enter="getJourBon()"
      @mousedown="$store.commit('updateCardCanMove', false)"
    />
    <fa
      class="icon-jourbon"
      :class="{ loop: loopActive }"
      :style="{
        transition: transitionValue,
        color: `hsl(${this.$store.state.cardList[6].color}, 70%, 70%)`
      }"
      @click="getJourBon()"
      icon="redo"
    />
  </div>
</template>

<script>
export default {
  name: "Jourbon",
  data() {
    return {
      text: "",
      j: 0,
      midText: "",
      loopActive: false,
      transitionValue: "0s"
    };
  },
  mounted() {
    this.text = localStorage.getItem("jourbon") ?? "Jourbon";
    setTimeout(() => {
      this.getJourBon(true);
    }, 500);
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    generateTab() {
      const wordTab = [];
      for (let i = 0; i < this.text.length; i++) {
        wordTab.push(this.text[i].toLowerCase());
      }
      return wordTab;
    },
    getJourBon(firstTime = false) {
      if (!firstTime) {
        this.loopIcon();
        this.saveText();
      }

      const start = this.generateTab();
      let longueur = start.length;
      const end = [];

      for (let i = 0; i < longueur; i++) {
        const pos = Math.floor(Math.random() * start.length);
        end.push(start[pos]);
        start.splice(pos, 1);
      }

      let finalWord = end.join("");
      finalWord = this.capitalizeFirstLetter(finalWord);

      this.animateText(finalWord);
    },
    animateText(word) {
      setTimeout(() => {
        if (this.j < word.length) {
          this.midText += word[this.j];
          this.text = this.midText;
          this.j++;
          this.animateText(word);
        } else {
          this.midText = "";
          this.j = 0;
        }
      }, 50);
    },
    loopIcon() {
      this.transitionValue = "0.3s";
      this.loopActive = true;
      setTimeout(() => {
        this.transitionValue = "0s";
        this.loopActive = false;
      }, 300);
    },
    saveText() {
      localStorage.setItem("jourbon", this.text);
    }
  }
};
</script>

<style scoped>
div {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}

input {
  width: 85%;
  outline: none;
  font-family: "Quicksand", sans-serif;
  font-size: 16px;
  border: none;
  border-bottom: 1px black solid;
}

.icon-jourbon {
  width: 10%;
}

.icon-jourbon:hover {
  cursor: pointer;
  /*transform: rotate(10deg);*/
}

.loop {
  transition: 0.3;
  transform: rotate(360deg);
}
</style>
