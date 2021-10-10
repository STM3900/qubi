<template>
  <div>
    <div v-if="!isTimerActive" class="inactive timer-card">
      <section>
        <input
          v-model="timerCountHoursString"
          @input="test(0)"
          @click="test(0, true)"
          @blur="test(0, false, true)"
          type="number"
          onkeydown="javascript: return event.keyCode === 8 ||
event.keyCode === 46 ? true : !isNaN(Number(event.key))"
        /><span>:</span>
        <input
          v-model="timerCountMinutesString"
          @input="test(1)"
          @click="test(1, true)"
          @blur="test(1, false, true)"
          type="number"
          onkeydown="javascript: return event.keyCode === 8 ||
event.keyCode === 46 ? true : !isNaN(Number(event.key))"
        /><span>:</span>
        <input
          v-model="timerCountSecondsString"
          @input="test(2)"
          @click="test(2, true)"
          @blur="test(2, false, true)"
          type="number"
          onkeydown="javascript: return event.keyCode === 8 ||
event.keyCode === 46 ? true : !isNaN(Number(event.key))"
        />
      </section>
      <section>
        <fa
          @click="launchTimer"
          class="icon-timer play-button"
          icon="play"
          :style="{
            color: `hsl(${this.$store.state.cardList[4].color}, 70%, 70%)`
          }"
        />
      </section>
    </div>
    <div v-else class="active timer-card">
      <section class="timer">
        {{ convertToString(timerCountHours) }}:{{
          convertToString(timerCountMinutes)
        }}:{{ convertToString(timerCountSeconds) }}
      </section>
      <section>
        <fa
          @click="finishTimer"
          class="icon-timer active-icons"
          icon="stop"
          :style="{
            color: `hsl(${this.$store.state.cardList[4].color}, 70%, 70%, 0.6)`
          }"
        />
        <fa
          v-if="!isPaused"
          @click="pauseTimer"
          class="icon-timer active-icons"
          icon="pause"
          :style="{
            color: `hsl(${this.$store.state.cardList[4].color}, 70%, 70%)`
          }"
        />
        <fa
          v-else
          @click="resumeTimer"
          class="icon-timer active-icons"
          icon="play"
          :style="{
            color: `hsl(${this.$store.state.cardList[4].color}, 70%, 70%)`
          }"
        />
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      timerCountHours: -1,
      timerCountMinutes: -1,
      timerCountSeconds: -1,

      timerCountHoursString: "00",
      timerCountMinutesString: "00",
      timerCountSecondsString: "00",

      isTimerActive: false,
      isPaused: false,
      timeout: ""
    };
  },
  watch: {
    timerCountSeconds: {
      handler(value) {
        this.useTimer(value);
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
      return value == "" ? "00" : value < 10 ? `0${value}` : value.toString();
    },
    useTimer(value) {
      if (this.isTimerActive && !this.isPaused) {
        if (value >= 0) {
          this.timeout = setTimeout(() => {
            if (!this.isPaused) {
              this.timerCountSeconds--;
            }
          }, 1000);
        } else {
          this.checkIfMinutes();
        }
      }
    },
    finishTimer() {
      this.isTimerActive = false;
      this.isPaused = false;

      this.timerCountHours = -1;
      this.timerCountMinutes = -1;
      this.timerCountSeconds = -1;

      this.timerCountHoursString = "00";
      this.timerCountMinutesString = "00";
      this.timerCountSecondsString = "00";

      this.$emit("shakeTimer");
      setTimeout(() => {
        this.$emit("shakeTimer");
      }, 300);
      console.log("timer terminé !");
    },
    pauseTimer() {
      clearTimeout(this.timeout);
      this.isPaused = true;
    },
    resumeTimer() {
      this.isPaused = false;
      this.useTimer(this.timerCountSeconds);
    },
    launchTimer() {
      if (
        +this.timerCountHoursString > 0 ||
        +this.timerCountMinutesString > 0 ||
        +this.timerCountSecondsString > 0
      ) {
        this.isTimerActive = true;
        this.timerCountHours = +this.timerCountHoursString;
        this.timerCountMinutes = +this.timerCountMinutesString;
        this.timerCountSeconds = +this.timerCountSecondsString;
      }
    },
    test(index, isClicked = false, isDeFocus = false) {
      switch (index) {
        case 0:
          !isClicked
            ? (this.timerCountHoursString = this.verificationFormat(
                this.timerCountHoursString,
                0
              ))
            : (this.timerCountHoursString = "");
          if (isDeFocus) {
            this.timerCountHoursString = this.convertToString(
              this.timerCountHoursString
            );
          }

          break;
        case 1:
          !isClicked
            ? (this.timerCountMinutesString = this.verificationFormat(
                this.timerCountMinutesString,
                1
              ))
            : (this.timerCountMinutesString = "");
          if (isDeFocus) {
            this.timerCountMinutesString = this.convertToString(
              this.timerCountMinutesString
            );
          }
          break;
        case 2:
          !isClicked
            ? (this.timerCountSecondsString = this.verificationFormat(
                this.timerCountSecondsString,
                2
              ))
            : (this.timerCountSecondsString = "");
          if (isDeFocus) {
            this.timerCountSecondsString = this.convertToString(
              this.timerCountSecondsString
            );
          }
          break;
      }
    },
    verificationFormat(value, index) {
      if (value.length > 2) {
        value = value.substr(0, 2);
      } else if (+value > 59 && index != 0) {
        value = 59;
      } else if (+value > 23 && index == 0) {
        value = 23;
      }
      return value;
    }
  }
};
</script>

<style scoped>
.timer-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  gap: 20px;
}

.icon-timer {
  font-size: 18px;
  margin-top: 3px;
  transition: 0.3s;
}

.icon-timer:hover {
  cursor: pointer;
  transform: rotate(4deg);
}

.play-button {
  margin-right: 5px;
}

.active-icons {
  margin-top: 10px;
  margin-right: 8px;
}

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
  color: rgb(200, 200, 200);
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

input {
  color: rgb(200, 200, 200);
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
