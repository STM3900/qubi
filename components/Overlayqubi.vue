<template>
  <div
    class="overlay"
    :class="[isClicked ? 'overlay-extended' : 'overlay-hide']"
  >
    <section class="logo">
      <Logo />
    </section>
    <section class="text">
      <h1>Bienvenue sur Qubi</h1>
      <p>
        Écrivez des notes, gérez vos todos, et bien plus
      </p>
    </section>
    <section>
      <button @click="launchQubi">Commencer</button>
    </section>
    <footer>
      <p>
        Fait avec amour par
        <a href="https://theomigeat.com/" target="_blank">Théo</a> ~
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Overlayqubi",
  data() {
    return {
      isClicked: false
    };
  },
  methods: {
    launchQubi() {
      this.isClicked = true;
      localStorage.setItem("notFirstTime", true);
      setTimeout(() => {
        this.$emit("hideoverlay");
      }, 1000);
    }
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999999999999;
  background: rgb(20, 20, 20);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  transition: 1s;
  animation: showBackground 0.3s linear;
}

.logo {
  width: 250px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  animation: showLogo 0.5s ease;
}

.text {
  margin-top: 25px;
  margin-bottom: 35px;
}

section h1 {
  font-family: "Quicksand", sans-serif;
  font-size: 32px;
  color: rgb(225, 225, 225);
  font-weight: normal;
  text-align: center;

  margin-bottom: 10px;

  animation: showH1 0.7s ease;
}

section p {
  font-family: "Quicksand", sans-serif;
  font-size: 16px;
  color: rgb(225, 225, 225);
  text-align: center;
  margin: 0;

  animation: showText 0.9s ease;
}

section button {
  font-family: "Quicksand", sans-serif;
  padding: 10px 45px;
  font-size: 16px;
  color: rgb(225, 225, 225);
  background: none;
  border: solid 1px rgb(225, 225, 225);
  transition: 0.3s;

  animation: showButton 1.1s ease;
}

section button:hover {
  background: rgb(225, 225, 225);
  color: rgb(20, 20, 20);
  cursor: pointer;
}

.overlay-extended {
  clip-path: circle(0%);
}

.overlay-hide {
  clip-path: circle(100%);
}

footer {
  position: absolute;
  bottom: 0;
  font-family: "Quicksand", sans-serif;
  color: white;
  animation: showButton 1.3s ease;
  font-size: 14px;
}

footer a {
  color: rgb(82, 153, 211);
}

footer a:hover {
  animation: rainbow 1.5s linear infinite;
}

@keyframes showBackground {
  from {
    background: #eeeeee;
  }
  to {
    background: rgb(20, 20, 20);
  }
}

@keyframes showLogo {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  20% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes showH1 {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes showText {
  0% {
    opacity: 0;
  }
  70% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes showButton {
  0% {
    opacity: 0;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes showFooter {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes rainbow {
  0% {
    color: rgb(82, 153, 211);
  }
  12% {
    color: #8f7de8;
  }
  24% {
    color: #e87dc4;
  }
  36% {
    color: #e87d7d;
  }
  48% {
    color: #e8df7d;
  }
  60% {
    color: #a1e87d;
  }
  72% {
    color: #7de8b3;
  }
  84%,
  100% {
    color: rgb(82, 153, 211);
  }
}

@media screen and (max-width: 640px) {
  .logo {
    width: 50%;
  }
}

@media screen and (max-width: 400px) {
  section h1 {
    font-size: 24px;
  }

  section p {
    font-size: 14px;
  }

  section button {
    font-size: 14px;
  }
}
</style>
