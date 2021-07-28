<template>
  <div>
    <div v-if="timerStatus == 'inactive'" class="inactive">
      <section>
        <input v-model="timerCountHoursString" type="number" /><span>:</span>
        <input v-model="timerCountMinutesString" type="number" /><span>:</span>
        <input v-model="timerCountSecondsString" type="number" />
      </section>

      <button @click="launchTimer">start timer</button>
    </div>
    <div v-else-if="timerStatus == 'active'" class="active">
      <section class="timer">
        {{ convertToString(timerCountHours) }}:{{
          convertToString(timerCountMinutes)
        }}:{{ convertToString(timerCountSeconds) }}
      </section>
    </div>
    <div v-else class="finished">
      <section class="timer">
        {{ convertToString(timerCountHours) }}:{{
          convertToString(timerCountMinutes)
        }}:{{ convertToString(timerCountSeconds) }}
      </section>

      <br />
      terminé
      <button @click="resetTimer">reset</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timerCountHours: -1,
      timerCountMinutes: -1,
      timerCountSeconds: -1,

      timerCountHoursString: "00",
      timerCountMinutesString: "00",
      timerCountSecondsString: "00",

      timerStatus: "inactive"
    };
  },
  watch: {
    timerCountSeconds: {
      handler(value) {
        if (this.timerStatus == "active") {
          if (value >= 0) {
            setTimeout(() => {
              this.timerCountSeconds--;
            }, 1000);
          } else {
            this.checkIfMinutes();
          }
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  },
  methods: {
    checkIfMinutes() {
      if (this.timerCountMinutes > 0) {
        this.timerCountMinutes--;
        this.timerCountSeconds = 59;
      } else {
        this.timerCountSeconds = 0;
        this.checkIfHours();
      }
    },
    checkIfHours() {
      if (this.timerCountHours > 0) {
        this.timerCountHours--;
        this.timerCountMinutes = 59;
        this.timerCountSeconds = 59;
      } else {
        this.timerCountMinutes = 0;
        this.finishTimer();
      }
    },
    convertToString(value) {
      return value < 10 ? `0${value}` : value.toString();
    },
    finishTimer() {
      this.timerStatus = "finished";
      console.log("timer terminé !");
    },
    resetTimer() {
      this.timerCountHours = -1;
      this.timerCountMinutes = -1;
      this.timerCountSeconds = -1;
      this.timerStatus = "inactive";
    },
    launchTimer() {
      this.timerStatus = "active";
      this.timerCountHours = +this.timerCountHoursString;
      this.timerCountMinutes = +this.timerCountMinutesString;
      this.timerCountSeconds = +this.timerCountSecondsString;
    }
  }
};
</script>

<style scoped>
/* font-family: "Roboto Mono", monospace; */

.inactive section {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  font-size: 36px;
  margin-top: 4px;
  margin-left: -7px;
}

.inactive section input {
  font-family: "Roboto Mono", monospace;
  font-size: 36px;

  outline: none;
  width: 50px;
  border: none;
  appearance: none;
  text-align: center;
}

.timer {
  margin-top: 5px;
  font-family: "Roboto Mono", monospace;
  font-size: 36px;
}

span {
  font-family: "Roboto Mono", monospace;
  font-size: 36px;
  margin-right: -7.2px;
  margin-left: -7.2px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
