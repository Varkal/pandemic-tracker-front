import { GameStack } from "./stack.interface";

export interface Game {
  id: number;
  stacks: GameStack[];
}
