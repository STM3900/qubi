<template>
  <div>
    {{ timerCountHours }}h {{ timerCountMinutes }}m {{ timerCountSeconds }}s
  </div>
</template>

<script>
export default {
  data() {
    return {
      timerCountSeconds: 10,
      timerCountMinutes: 0,
      timerCountHours: 0,
      isTimerActive: true
    };
  },
  watch: {
    timerCountSeconds: {
      handler(value) {
        if (this.isTimerActive) {
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

        this.isTimerActive = false;
        console.log("timer terminé !");
      }
    }
  }
};
</script>
