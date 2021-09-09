export const state = () => ({
  backgroundColor: "#eee",
  backgroundMode: "color",
  backgroundImage: "",
  cardCanMove: true
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
  },
  updateCardCanMove(state, message) {
    state.cardCanMove = message;
  },
  deleteBackground(state) {
    state.backgroundImage = "";
  }
};
