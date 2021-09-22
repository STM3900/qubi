<template>
  <div>
    <textarea
      placeholder="Ecrivez ce qu'il vous passe par la tête"
      name=""
      id=""
      v-model="message"
      @input="saveData"
      @mousedown="$store.commit('updateCardCanMove', false)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "Note",
  props: {
    uniqueIdNotes: Number
  },
  computed: {
    message: {
      get() {
        return this.$store.state.notesData[this.uniqueIdNotes];
      },
      set(value) {
        this.$store.commit("updateNotesData", {
          id: this.uniqueIdNotes,
          data: value
        });
      }
    }
  },
  created() {
    if (localStorage.getItem(`data${this.uniqueIdNotes}`)) {
      this.$store.commit("updateNotesData", {
        id: this.uniqueIdNotes,
        data: localStorage.getItem(`data${this.uniqueIdNotes}`)
      });
    }
  },
  methods: {
    saveData() {
      localStorage.setItem(
        `data${this.uniqueIdNotes}`,
        this.$store.state.notesData[this.uniqueIdNotes]
      );
    }
  }
};
</script>

<style scoped>
div {
  height: 100%;
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
