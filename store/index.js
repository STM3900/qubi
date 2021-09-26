export const state = () => ({
  backgroundColor: "#eee",
  backgroundMode: "color",
  backgroundImage: "",
  cardCanMove: true,
  cardList: [
    {
      name: "Mes notes",
      icon: "sticky-note",
      selected: "notes",
      active: true,

      isResizable: true,
      minW: 2,
      minH: 4,
      numberAvailable: 3,
      numberMax: 3,

      w: 4,
      h: 4
    },
    {
      name: "Heure du jour",
      icon: "clock",
      selected: "clock",
      active: true,
      numberAvailable: 1,
      numberMax: 1,

      w: 3,
      h: 3
    },
    {
      name: "Jourbon",
      icon: "random",
      selected: "jourbon",
      active: true,
      numberAvailable: 1,
      numberMax: 1,

      w: 3,
      h: 3
    },
    {
      name: "Timer",
      icon: "hourglass",
      selected: "timer",
      active: true,
      numberAvailable: 1,
      numberMax: 1,

      w: 3,
      h: 3
    },
    {
      name: "Ma TodoList",
      icon: "list-ul",
      selected: "todo",
      active: true,
      numberAvailable: 3,
      numberMax: 3,

      isResizable: true,
      minW: 3,
      minH: 6,

      w: 3,
      h: 8
    },
    {
      name: "Chronomètre",
      icon: "stopwatch",
      selected: "stopwatch",
      active: true,
      static: false,
      numberAvailable: 1,
      numberMax: 1,

      w: 3,
      h: 3
    },
    {
      name: "Fond d'écran",
      icon: "code",
      selected: "background",
      active: true,
      static: false,
      numberAvailable: 1,
      numberMax: 1,

      w: 3,
      h: 3
    }
  ],
  indexOfSelected: 0,
  notesData: ["", "", ""],
  todosData: [[], [], []]
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
  },
  setMenuValue(state, menu) {
    state.cardList = menu;
  },
  getIndexOfSelected(state, selected) {
    state.indexOfSelected = state.cardList
      .map(function(o) {
        return o.selected;
      })
      .indexOf(selected);
  },
  changeValueOfItem(state, payload) {
    this.commit("getIndexOfSelected", payload.selected);
    state.cardList[state.indexOfSelected].numberAvailable += payload.value;
  },
  toggleItem(state, payload) {
    this.commit("getIndexOfSelected", payload.selected);
    state.cardList[state.indexOfSelected].active = payload.toggleValue;
  },
  updateNotesData(state, payload) {
    state.notesData[payload.id] = payload.data;
  },
  addTodosStore(state, payload) {
    state.todosData[payload.id].push({
      label: payload.label,
      finished: false,
      onEdit: false
    });
  },
  updateTodoList(state, payload) {
    state.todosData[payload.id] = payload.value;
  },
  removeTodoStore(state, payload) {
    state.todosData[payload.id].splice(payload.index, 1);
  },
  toggleTodoStoreEdit(state, payload) {
    state.todosData[payload.id][payload.index].onEdit = payload.toggleValue;
  },
  updateTodosFinished(state, payload) {
    state.todosData[payload.id][payload.index].finished = payload.value;
  },
  updateTotosText(state, payload) {
    state.todosData[payload.id][payload.index].label = payload.label;
  },
  toggleTodoActive(state, payload) {
    state.todosData[payload.id][payload.index].active = payload.toggleValue;
  }
};
