<template>
  <footer>
    <p>
      Fait avec amour par
      <a href="https://theomigeat.com/" target="_blank">Théo</a> ~
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  font-family: "Quicksand", sans-serif;
  background: rgba(255, 255, 255);
  font-size: 12px;
  z-index: 100;
  padding-left: 10px;
  padding-right: 15px;
  color: rgb(50, 50, 50);
  margin-bottom: 10px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

footer a {
  color: rgb(82, 153, 211);
}

footer a:hover {
  animation: rainbow 1.5s linear infinite;
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

@media screen and (max-width: 400px) {
  footer {
    font-size: 10px;
  }
}
</style>
