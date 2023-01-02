import { Scene, Vector3, MeshBuilder, Mesh } from "babylonjs";
import Entity from "./entity";

export default class Player extends Entity {
  moveDirection: Vector3 = new Vector3();
  mesh: Mesh;

  constructor(public scene: Scene) {
    super("player", new Vector3(), 0.2);
    this.mesh = MeshBuilder.CreateSphere(this.id, { diameter: 2 }, scene);
  }

  onKeyDown(keyCode: any) {
    switch (keyCode) {
      case 87: // W key
        this.moveDirection.z = 1;
        break;
      case 65: // A key
        this.moveDirection.x = -1;
        break;
      case 83: // S key
        this.moveDirection.z = -1;
        break;
      case 68: // D key
        this.moveDirection.x = 1;
        break;
    }
  }

  onKeyUp(keyCode: any) {
    // reset the move direction based on the key released
    switch (keyCode) {
      case 87: // W key
        this.moveDirection.z = 0;
        break;
      case 65: // A key
        this.moveDirection.x = 0;
        break;
      case 83: // S key
        this.moveDirection.z = 0;
        break;
      case 68: // D key
        this.moveDirection.x = 0;
        break;
    }
  }

  update() {
    this.mesh.moveWithCollisions(this.moveDirection.scale(this.moveSpeed));
  }
}
