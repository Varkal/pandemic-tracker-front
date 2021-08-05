import Vue from "vue";
import Vuex from "vuex";
import { Game } from "../interfaces/game.interface";

Vue.use(Vuex);

export interface PandemicTrackerState {
  currentGame: Game | null;
  config: {
    baseUrl: string;
    apiKey?: string;
  } | null;
}

export default new Vuex.Store<PandemicTrackerState>({
  state: {
    currentGame: null,
    config: null,
  },
  mutations: {
    setConfig(state, config) {
      state.config = config;
    },
    setCurrentGame(state, game) {
      state.currentGame = game;
    },
  },
  actions: {
    async fetchConfig({ commit }) {
      const config = await fetch(`config.json`).then((response) =>
        response.json()
      );
      commit("setConfig", config);
    },
    async fetchCurrentGame({ commit, state }) {
      const response = await fetch(`${state.config!.baseUrl}/games/latest`, {
        headers: {
          ...(state.config!.apiKey && { Authorization: state.config!.apiKey }),
        },
      });
      commit("setCurrentGame", await response.json());
    },
    async drawPropagation({ commit, state }, cards) {
      let response = null;
      for (const card of cards) {
        response = await fetch(
          `${state.config!.baseUrl}/games/${
            state.currentGame!.id
          }/draw-propagation/${card.id}`,
          {
            method: "POST",
            headers: {
              ...(state.config!.apiKey && {
                Authorization: state.config!.apiKey,
              }),
            },
          }
        );
      }
      commit("setCurrentGame", await response?.json());
    },
    async addStack({ commit, state }) {
      const response = await fetch(
        `${state.config!.baseUrl}/games/${state.currentGame!.id}/stack/`,
        {
          method: "POST",
          headers: {
            ...(state.config!.apiKey && {
              Authorization: state.config!.apiKey,
            }),
          },
        }
      );
      commit("setCurrentGame", await response.json());
    },
    async newGame({ commit, state }) {
      const response = await fetch(`${state.config!.baseUrl}/games/`, {
        method: "POST",
        headers: {
          ...(state.config!.apiKey && { Authorization: state.config!.apiKey }),
        },
      });
      commit("setCurrentGame", await response.json());
    },
  },
  modules: {},
});
