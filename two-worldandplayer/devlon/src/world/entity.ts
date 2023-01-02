import { Vector3 } from "babylonjs";

export default class Entity {
  constructor(
    public id: string,
    public position: Vector3,
    public moveSpeed: number
  ) {}

  move(direction: Vector3) {
    this.position.addInPlace(direction.scale(this.moveSpeed));
  }
}
