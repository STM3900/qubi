<template>
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="449.000000pt"
    height="100"
    viewBox="0 0 449.000000 450.000000"
    preserveAspectRatio="xMidYMid meet"
    class="logo"
  >
    <g
      transform="translate(0.000000,450.000000) scale(0.100000,-0.100000)"
      stroke="none"
    >
      <path
        d="M144 4441 c-23 -10 -52 -34 -65 -52 l-24 -34 -3 -2088 c-2 -2341 -9
-2132 71 -2185 l41 -27 731 0 731 0 41 27 c80 53 73 -156 71 2185 l-3 2088
-24 34 c-13 18 -42 42 -65 52 -39 18 -80 19 -751 19 -671 0 -712 -1 -751 -19z"
      />
      <path
        d="M2625 4446 c-41 -19 -83 -66 -95 -107 -6 -20 -10 -278 -10 -654 0
-580 2 -623 19 -660 22 -48 44 -69 94 -90 32 -13 141 -15 860 -15 l823 0 44
23 c25 12 55 37 68 56 l22 35 -2 660 -3 661 -24 34 c-13 18 -42 42 -65 52 -39
18 -83 19 -871 18 -672 0 -836 -2 -860 -13z"
      />
      <path
        d="M2651 2100 c-49 -12 -83 -40 -108 -90 l-23 -44 0 -836 0 -836 23 -44
c12 -24 35 -53 50 -64 28 -21 38 -21 886 -24 l858 -2 33 22 c18 13 43 36 54
51 21 28 21 34 24 888 3 940 6 887 -55 943 -15 14 -49 30 -75 36 -58 12 -1614
12 -1667 0z"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: "Logo"
};
</script>

<style scoped>
.logo {
  animation: logoanimation 15s linear infinite;
}

@keyframes logoanimation {
  0% {
    fill: #e87d7d;
  }
  12% {
    fill: #e8df7d;
  }
  24% {
    fill: #a1e87d;
  }
  36% {
    fill: #7de8b3;
  }
  48% {
    fill: #7dc4e8;
  }
  60% {
    fill: #8f7de8;
  }
  72% {
    fill: #e87dc4;
  }
  84%,
  100% {
    fill: #e87d7d;
  }
}
</style>
