<template>
  <v-row>
    <v-col cols="12">
      <v-card class="pa-0">
        <v-btn
          v-if="selected.length === 0"
          color="primary"
          fab
          fixed
          bottom
          right
          @click="addStack"
        >
          <v-icon>mdi-redo</v-icon>
        </v-btn>
        <v-btn v-else color="primary" fab fixed bottom right @click="draw">
          <v-icon>mdi-cards-outline</v-icon>
        </v-btn>
        <v-list class="pa-0">
          <v-list-item-group
            v-for="(stack, $index) in nonEmptyStacks"
            :key="stack.id"
          >
            <v-list-item dark class="teal" inactive :ripple="false">
              <span v-if="$index === 0">Groupe actif</span>
              <span v-else>Actif dans {{ $index }} groupe(s)</span>
            </v-list-item>
            <v-list-item
              v-for="card in stack.cards"
              :key="card.id"
              @click="select(card)"
              :class="getColor(card)"
            >
              <v-list-item-icon>
                <v-icon color="blue" v-if="card.faction === 'blue'"
                  >mdi-compass-rose</v-icon
                >
                <v-icon color="grey darken-3" v-if="card.faction === 'black'"
                  >mdi-earth</v-icon
                >
                <v-icon color="red darken-3" v-if="card.faction === 'red'"
                  >mdi-hammer-wrench</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="d-flex align-center">
                  <span
                    :class="
                      card.cardType === 'exposition'
                        ? 'green--text lighten-2'
                        : ''
                    "
                    >{{ card.name }}</span
                  >
                  <v-icon
                    color="green lighten-2"
                    v-if="card.cardType === 'exposition'"
                    >mdi-biohazard</v-icon
                  >
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GameStack } from "@/interfaces/stack.interface";
import { Card } from "@/interfaces/card.interface";

@Component
export default class Home extends Vue {
  selected: Card[] = [];

  mounted() {
    this.$store.dispatch("fetchCurrentGame");
  }

  getColor(card: Card) {
    if (this.selected.find((c) => c.id === card.id)) {
      return "teal accent-1";
    }
  }

  get currentGame() {
    return this.$store.state.currentGame || {};
  }

  get discardStack() {
    return this.currentGame?.stacks[0];
  }

  get firstNonEmptyStack() {
    return this.nonEmptyStacks[0];
  }

  get nonEmptyStacks() {
    return this.stacks.filter((stack: GameStack) => stack.cards.length > 0);
  }

  get stacks() {
    return this.currentGame?.stacks?.slice(1) || [];
  }

  select(card: Card) {
    console.log(card);
    if (!this.selected.find((c) => c.id === card.id)) {
      this.selected = [...this.selected, card];
    } else {
      this.selected = this.selected.filter((c) => c.id !== card.id);
    }
  }

  async draw() {
    await this.$store.dispatch("drawPropagation", this.selected);
    this.selected = [];
  }

  addStack() {
    this.$store.dispatch("addStack");
  }
}
</script>
