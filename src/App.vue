<template>
  <v-app>
    <v-app-bar app color="teal darken-4" dark>
      <v-toolbar-title>PS0 - Tracker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="newGame()">New Game</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class App extends Vue {
  newGame() {
    if (confirm("Êtes-vous sur de vouloir commencer une nouvelle partie ?"))
      this.$store.dispatch("newGame");
  }
}
</script>
