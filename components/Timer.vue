<template>
  <div>
    <div v-if="timerStatus == 'inactive'">
      <input v-model="timerCountHoursString" type="number" />
      <input v-model="timerCountMinutesString" type="number" />
      <input v-model="timerCountSecondsString" type="number" />
      <button @click="launchTimer">start timer</button>
    </div>
    <div v-else-if="timerStatus == 'active'">
      {{ convertToString(timerCountHours) }} :
      {{ convertToString(timerCountMinutes) }} :
      {{ convertToString(timerCountSeconds) }}
    </div>
    <div v-else>
      {{ convertToString(timerCountHours) }} :
      {{ convertToString(timerCountMinutes) }} :
      {{ convertToString(timerCountSeconds) }}
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

      timerCountHoursString: "",
      timerCountMinutesString: "",
      timerCountSecondsString: "",

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
