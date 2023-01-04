import { slowType } from "./slow-type.js";

export class Write {
  static async standard(message: string): Promise<void> {
    await slowType(message)
  }

  static instant(message: string): void {
    console.log(message);
  }

  static gap(amount: number = 1) {
    for(var i = 0; i < amount; i++){
      console.log('');
    }
  }
}