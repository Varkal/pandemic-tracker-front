import { Card } from "./card.interface";

export interface GameStack {
  id: number;
  order: number;
  cards: Card[];
}
