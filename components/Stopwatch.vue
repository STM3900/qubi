<template>
  <div class="chrono-card">
    <div class="chrono-text-container">
      <p v-if="!isTimerActive" class="chrono-text">00:00:00</p>
      <p v-else class="chrono-text">
        {{ convertToString(timerCountHours) }}:{{
          convertToString(timerCountMinutes)
        }}:{{ convertToString(timerCountSeconds) }}
      </p>
    </div>

    <div class="chrono-buttons">
      <fa
        v-if="!isTimerActive"
        @click="launchTimer"
        class="icon-chrono"
        icon="play"
        :style="{
          color: `hsl(${this.$store.state.cardList[3].color}, 70%, 70%)`
        }"
      />
      <div v-else>
        <fa
          v-if="!isPaused"
          @click="pauseTimer"
          class="icon-chrono active-icons"
          icon="pause"
        />
        <fa
          v-else
          @click="resumeTimer"
          class="icon-chrono active-icons"
          icon="play"
        />
        <fa @click="resetTimer" class="icon-chrono active-icons" icon="stop" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stopwatch",
  data() {
    return {
      timerCountHours: -1,
      timerCountMinutes: -1,
      timerCountSeconds: -1,

      isTimerActive: false,
      isPaused: false
    };
  },
  watch: {
    timerCountSeconds: {
      handler(value) {
        this.useTimer(value);
      },
      immediate: true
    }
  },
  methods: {
    launchTimer() {
      this.isTimerActive = true;
      this.timerCountHours++;
      this.timerCountMinutes++;
      this.timerCountSeconds++;
    },
    useTimer(value) {
      if (this.isTimerActive && !this.isPaused) {
        if (value < 60) {
          this.timeout = setTimeout(() => {
            if (!this.isPaused) {
              this.timerCountSeconds++;
            }
          }, 1000);
        } else {
          this.checkIfMinutes();
        }
      }
    },
    checkIfMinutes() {
      if (this.timerCountMinutes < 58) {
        this.timerCountMinutes++;
        this.timerCountSeconds = 0;
      } else {
        this.timerCountSeconds = 0;
        this.checkIfHours();
      }
    },
    checkIfHours() {
      this.timerCountHours++;
      this.timerCountMinutes = 0;
      this.timerCountSeconds = 0;
    },
    pauseTimer() {
      clearTimeout(this.timeout);
      this.isPaused = true;
    },
    resumeTimer() {
      this.isPaused = false;
      this.useTimer(this.timerCountSeconds);
    },
    resetTimer() {
      clearTimeout(this.timeout);
      this.isTimerActive = false;

      this.timerCountHours = -1;
      this.timerCountMinutes = -1;
      this.timerCountSeconds = -1;
    },
    convertToString(value) {
      return value == "" ? "00" : value < 10 ? `0${value}` : value.toString();
    }
  }
};
</script>

<style scoped>
.chrono-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-top: 25px;
}

.chrono-text {
  font-family: "Roboto Mono", monospace;
  font-size: 36px;
  margin: 0;
  margin-right: 20px;
}

.chrono-buttons .icon-chrono {
  margin-right: 8px;
}

.icon-chrono {
  font-size: 18px;
  margin-top: 3px;
  transition: 0.3s;
}

.icon-chrono:hover {
  cursor: pointer;
}
</style>
