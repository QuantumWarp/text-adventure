import { Place, places } from "../lists/places.js";

export class Location {
  history: Place[] = [];

  current: Place = places.village;
  to?: Place;
  subLocation?: Place;

  set(current: Place, to?: Place): void {
    if (this.subLocation) {
      this.history.push(this.subLocation);
    }
    this.history.push(current);

    this.current = current;
    this.to = to;
  }

  setSub(subLocation?: Place): void {
    if (this.subLocation) {
      this.history.push(this.subLocation);
    }

    this.subLocation = subLocation;
  }
}
