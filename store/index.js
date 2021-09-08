export const state = () => ({
  backgroundColor: "",
  backgroundMode: "color",
  backgroundImage: ""
});

export const mutations = {
  updateBackgroundColor(state, message) {
    state.backgroundColor = message;
  },
  updateBackgroundMode(state, message) {
    state.backgroundMode = message;
  },
  updateBackgroundImage(state, message) {
    state.backgroundImage = message;
  }
};
