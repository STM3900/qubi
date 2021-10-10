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
      <button @click="isClicked = !isClicked">Commencer</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "Overlayqubi",
  data() {
    return {
      isClicked: false
    };
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgb(20, 20, 20);
  z-index: 999999999999;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  transition: 1s;
}

.logo {
  width: 25%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
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
}

section p {
  font-family: "Quicksand", sans-serif;
  font-size: 16px;
  color: rgb(225, 225, 225);
  text-align: center;
  margin: 0;
}

section button {
  font-family: "Quicksand", sans-serif;
  padding: 10px 45px;
  font-size: 16px;
  color: rgb(225, 225, 225);
  background: none;
  border: solid 1px rgb(225, 225, 225);
  transition: 0.3s;
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
</style>
