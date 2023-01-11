export interface GameOptions {
  interface: GameInterface;
}

export interface GameInterface {
  handler: (event: Event) => void;
  write: (text: string) => void;
}
