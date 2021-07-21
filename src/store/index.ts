import Vue from "vue";
import Vuex from "vuex";
import config from "../../public/config.json";
import { Game } from "../interfaces/game.interface";

Vue.use(Vuex);
const baseUrl = config.baseUrl || `http://${window.location.hostname}:3000`;

export interface PandemicTrackerState {
  currentGame: Game | null;
}

export default new Vuex.Store<PandemicTrackerState>({
  state: {
    currentGame: null,
  },
  mutations: {
    setCurrentGame(state, game) {
      state.currentGame = game;
    },
  },
  actions: {
    async fetchCurrentGame({ commit }) {
      const response = await fetch(`${baseUrl}/games/latest`);
      commit("setCurrentGame", await response.json());
    },
    async drawPropagation({ commit, state }, cards) {
      let response = null;
      for (const card of cards) {
        response = await fetch(
          `${baseUrl}/games/${state.currentGame!.id}/draw-propagation/${
            card.id
          }`,
          {
            method: "POST",
          }
        );
      }
      commit("setCurrentGame", await response?.json());
    },
    async addStack({ commit, state }) {
      const response = await fetch(
        `${baseUrl}/games/${state.currentGame!.id}/stack/`,
        {
          method: "POST",
        }
      );
      commit("setCurrentGame", await response.json());
    },
    async newGame({ commit }) {
      const response = await fetch(`${baseUrl}/games/`, {
        method: "POST",
      });
      commit("setCurrentGame", await response.json());
    },
  },
  modules: {},
});
