import { Scene } from "babylonjs";
import Entity from "./entity";
import Player from "./player";

export default class World {
  player: Player;
  constructor(scene: Scene, public entities: Entity[] = []) {
    this.player = new Player(scene);
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  removeEntity(entity: Entity) {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }
  update() {
    this.player.update();
    this.entities.forEach((e) => e.update());
  }
}
